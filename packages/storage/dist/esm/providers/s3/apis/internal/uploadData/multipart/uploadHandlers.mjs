import { Amplify } from '@aws-amplify/core';
import { StorageAction } from '@aws-amplify/core/internals/utils';
import '@smithy/md5-js';
import '@aws-amplify/core/internals/aws-client-utils';
import '../../../../utils/client/runtime/s3TransferHandler/fetch.mjs';
import 'fast-xml-parser';
import '../../../../utils/client/runtime/s3TransferHandler/xhr.mjs';
import 'buffer';
import { StorageError } from '../../../../../../errors/StorageError.mjs';
import { resolveS3ConfigAndInput } from '../../../../utils/resolveS3ConfigAndInput.mjs';
import { CanceledError } from '../../../../../../errors/CanceledError.mjs';
import '../../../../../../errors/types/validation.mjs';
import { logger } from '../../../../../../utils/logger.mjs';
import { validateStorageOperationInput } from '../../../../utils/validateStorageOperationInput.mjs';
import { STORAGE_INPUT_KEY, DEFAULT_QUEUE_SIZE, DEFAULT_ACCESS_LEVEL } from '../../../../utils/constants.mjs';
import '../../../../utils/client/s3data/base.mjs';
import '../../../../utils/client/s3data/getObject.mjs';
import '../../../../utils/client/s3data/listObjectsV2.mjs';
import '../../../../utils/client/s3data/putObject.mjs';
import '../../../../utils/client/s3data/createMultipartUpload.mjs';
import '../../../../utils/client/s3data/uploadPart.mjs';
import { completeMultipartUpload } from '../../../../utils/client/s3data/completeMultipartUpload.mjs';
import '../../../../utils/client/s3data/listParts.mjs';
import { abortMultipartUpload } from '../../../../utils/client/s3data/abortMultipartUpload.mjs';
import '../../../../utils/client/s3data/copyObject.mjs';
import { headObject } from '../../../../utils/client/s3data/headObject.mjs';
import '../../../../utils/client/s3data/deleteObject.mjs';
import { getStorageUserAgentValue } from '../../../../utils/userAgent.mjs';
import { calculateContentCRC32 } from '../../../../utils/crc32.mjs';
import { IntegrityError } from '../../../../../../errors/IntegrityError.mjs';
import { uploadPartExecutor } from './uploadPartExecutor.mjs';
import { getUploadsCacheKey, removeCachedUpload } from './uploadCache.mjs';
import { getConcurrentUploadsProgressTracker } from './progressTracker.mjs';
import { loadOrCreateMultipartUpload } from './initialUpload.mjs';
import { getDataChunker } from './getDataChunker.mjs';
import { calculatePartSize } from './calculatePartSize.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Create closure hiding the multipart upload implementation details and expose the upload job and control functions(
 * onPause, onResume, onCancel).
 *
 * @internal
 */
const getMultipartUploadHandlers = (uploadDataInput, size) => {
    let resolveCallback;
    let rejectCallback;
    let inProgressUpload;
    let resolvedS3Config;
    let abortController;
    let resolvedAccessLevel;
    let resolvedBucket;
    let resolvedKeyPrefix;
    let resolvedIdentityId;
    let uploadCacheKey;
    let finalKey;
    let expectedBucketOwner;
    // Special flag that differentiates HTTP requests abort error caused by pause() from ones caused by cancel().
    // The former one should NOT cause the upload job to throw, but cancels any pending HTTP requests.
    // This should be replaced by a special abort reason. However,the support of this API is lagged behind.
    let isAbortSignalFromPause = false;
    const { resumableUploadsCache } = uploadDataInput.options ?? {};
    const startUpload = async () => {
        const { options: uploadDataOptions, data } = uploadDataInput;
        const resolvedS3Options = await resolveS3ConfigAndInput(Amplify, uploadDataInput);
        abortController = new AbortController();
        isAbortSignalFromPause = false;
        resolvedS3Config = resolvedS3Options.s3Config;
        resolvedBucket = resolvedS3Options.bucket;
        resolvedIdentityId = resolvedS3Options.identityId;
        expectedBucketOwner = uploadDataOptions?.expectedBucketOwner;
        const { inputType, objectKey } = validateStorageOperationInput(uploadDataInput, resolvedIdentityId);
        const { contentDisposition, contentEncoding, contentType = 'application/octet-stream', metadata, preventOverwrite, onProgress, } = uploadDataOptions ?? {};
        finalKey = objectKey;
        // Resolve "key" specific options
        if (inputType === STORAGE_INPUT_KEY) {
            const accessLevel = uploadDataOptions
                ?.accessLevel;
            resolvedKeyPrefix = resolvedS3Options.keyPrefix;
            finalKey = resolvedKeyPrefix + objectKey;
            resolvedAccessLevel = resolveAccessLevel(accessLevel);
        }
        const optionsHash = (await calculateContentCRC32(JSON.stringify(uploadDataOptions))).checksum;
        if (!inProgressUpload) {
            const { uploadId, cachedParts, finalCrc32 } = await loadOrCreateMultipartUpload({
                s3Config: resolvedS3Config,
                accessLevel: resolvedAccessLevel,
                bucket: resolvedBucket,
                keyPrefix: resolvedKeyPrefix,
                key: objectKey,
                contentType,
                contentDisposition,
                contentEncoding,
                metadata,
                data,
                size,
                abortSignal: abortController.signal,
                checksumAlgorithm: uploadDataOptions?.checksumAlgorithm,
                optionsHash,
                resumableUploadsCache,
                expectedBucketOwner,
            });
            inProgressUpload = {
                uploadId,
                completedParts: cachedParts,
                finalCrc32,
            };
        }
        uploadCacheKey = size
            ? getUploadsCacheKey({
                file: data instanceof File ? data : undefined,
                accessLevel: resolvedAccessLevel,
                contentType: uploadDataOptions?.contentType,
                bucket: resolvedBucket,
                size,
                key: objectKey,
                optionsHash,
            })
            : undefined;
        const dataChunker = getDataChunker(data, size);
        const completedPartNumberSet = new Set(inProgressUpload.completedParts.map(({ PartNumber }) => PartNumber));
        const onPartUploadCompletion = (partNumber, eTag, crc32) => {
            inProgressUpload?.completedParts.push({
                PartNumber: partNumber,
                ETag: eTag,
                // TODO: crc32 can always be added once RN also has an implementation
                ...(crc32 ? { ChecksumCRC32: crc32 } : {}),
            });
        };
        const concurrentUploadsProgressTracker = getConcurrentUploadsProgressTracker({
            size,
            onProgress,
        });
        const concurrentUploadPartExecutors = [];
        for (let index = 0; index < DEFAULT_QUEUE_SIZE; index++) {
            concurrentUploadPartExecutors.push(uploadPartExecutor({
                dataChunkerGenerator: dataChunker,
                completedPartNumberSet,
                s3Config: resolvedS3Config,
                abortSignal: abortController.signal,
                bucket: resolvedBucket,
                finalKey,
                uploadId: inProgressUpload.uploadId,
                onPartUploadCompletion,
                onProgress: concurrentUploadsProgressTracker.getOnProgressListener(),
                isObjectLockEnabled: resolvedS3Options.isObjectLockEnabled,
                useCRC32Checksum: Boolean(inProgressUpload.finalCrc32),
                expectedBucketOwner,
            }));
        }
        await Promise.all(concurrentUploadPartExecutors);
        validateCompletedParts(inProgressUpload.completedParts, size);
        const { ETag: eTag } = await completeMultipartUpload({
            ...resolvedS3Config,
            abortSignal: abortController.signal,
            userAgentValue: getStorageUserAgentValue(StorageAction.UploadData),
        }, {
            Bucket: resolvedBucket,
            Key: finalKey,
            UploadId: inProgressUpload.uploadId,
            ChecksumCRC32: inProgressUpload.finalCrc32,
            IfNoneMatch: preventOverwrite ? '*' : undefined,
            MultipartUpload: {
                Parts: sortUploadParts(inProgressUpload.completedParts),
            },
            ExpectedBucketOwner: expectedBucketOwner,
        });
        if (size) {
            const { ContentLength: uploadedObjectSize } = await headObject(resolvedS3Config, {
                Bucket: resolvedBucket,
                Key: finalKey,
                ExpectedBucketOwner: expectedBucketOwner,
            });
            if (uploadedObjectSize && uploadedObjectSize !== size) {
                throw new StorageError({
                    name: 'Error',
                    message: `Upload failed. Expected object size ${size}, but got ${uploadedObjectSize}.`,
                });
            }
        }
        if (resumableUploadsCache && uploadCacheKey) {
            await removeCachedUpload(resumableUploadsCache, uploadCacheKey);
        }
        const result = {
            eTag,
            contentType,
            metadata,
        };
        return inputType === STORAGE_INPUT_KEY
            ? { key: objectKey, ...result }
            : { path: objectKey, ...result };
    };
    const startUploadWithResumability = () => startUpload()
        .then(resolveCallback)
        .catch(error => {
        const abortSignal = abortController?.signal;
        if (abortSignal?.aborted && isAbortSignalFromPause) {
            logger.debug('upload paused.');
        }
        else {
            // Uncaught errors should be exposed to the users.
            rejectCallback(error);
        }
    });
    const multipartUploadJob = () => new Promise((resolve, reject) => {
        resolveCallback = resolve;
        rejectCallback = reject;
        startUploadWithResumability();
    });
    const onPause = () => {
        isAbortSignalFromPause = true;
        abortController?.abort();
    };
    const onResume = () => {
        startUploadWithResumability();
    };
    const onCancel = (message) => {
        // 1. abort in-flight API requests
        abortController?.abort(message);
        const cancelUpload = async () => {
            // 2. clear upload cache.
            if (uploadCacheKey && resumableUploadsCache) {
                await removeCachedUpload(resumableUploadsCache, uploadCacheKey);
            }
            // 3. clear multipart upload on server side.
            await abortMultipartUpload(resolvedS3Config, {
                Bucket: resolvedBucket,
                Key: finalKey,
                UploadId: inProgressUpload?.uploadId,
                ExpectedBucketOwner: expectedBucketOwner,
            });
        };
        cancelUpload().catch(e => {
            logger.debug('error when cancelling upload task.', e);
        });
        rejectCallback(
        // Internal error that should not be exposed to the users. They should use isCancelError() to check if
        // the error is caused by cancel().
        new CanceledError(message ? { message } : undefined));
    };
    return {
        multipartUploadJob,
        onPause,
        onResume,
        onCancel,
    };
};
const resolveAccessLevel = (accessLevel) => accessLevel ??
    Amplify.libraryOptions.Storage?.S3?.defaultAccessLevel ??
    DEFAULT_ACCESS_LEVEL;
const validateCompletedParts = (completedParts, size) => {
    const partsExpected = Math.ceil(size / calculatePartSize(size));
    const validPartCount = completedParts.length === partsExpected;
    const sorted = sortUploadParts(completedParts);
    const validPartNumbers = sorted.every((part, index) => part.PartNumber === index + 1);
    if (!validPartCount || !validPartNumbers) {
        throw new IntegrityError();
    }
};
const sortUploadParts = (parts) => {
    return [...parts].sort((partA, partB) => partA.PartNumber - partB.PartNumber);
};

export { getMultipartUploadHandlers };
//# sourceMappingURL=uploadHandlers.mjs.map
