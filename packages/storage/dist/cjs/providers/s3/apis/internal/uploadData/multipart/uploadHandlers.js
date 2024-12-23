'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMultipartUploadHandlers = void 0;
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const utils_2 = require("../../../../utils");
const constants_1 = require("../../../../utils/constants");
const StorageError_1 = require("../../../../../../errors/StorageError");
const CanceledError_1 = require("../../../../../../errors/CanceledError");
const s3data_1 = require("../../../../utils/client/s3data");
const userAgent_1 = require("../../../../utils/userAgent");
const utils_3 = require("../../../../../../utils");
const crc32_1 = require("../../../../utils/crc32");
const IntegrityError_1 = require("../../../../../../errors/IntegrityError");
const uploadPartExecutor_1 = require("./uploadPartExecutor");
const uploadCache_1 = require("./uploadCache");
const progressTracker_1 = require("./progressTracker");
const initialUpload_1 = require("./initialUpload");
const getDataChunker_1 = require("./getDataChunker");
const calculatePartSize_1 = require("./calculatePartSize");
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
        const resolvedS3Options = await (0, utils_2.resolveS3ConfigAndInput)(core_1.Amplify, uploadDataInput);
        abortController = new AbortController();
        isAbortSignalFromPause = false;
        resolvedS3Config = resolvedS3Options.s3Config;
        resolvedBucket = resolvedS3Options.bucket;
        resolvedIdentityId = resolvedS3Options.identityId;
        expectedBucketOwner = uploadDataOptions?.expectedBucketOwner;
        const { inputType, objectKey } = (0, utils_2.validateStorageOperationInput)(uploadDataInput, resolvedIdentityId);
        const { contentDisposition, contentEncoding, contentType = 'application/octet-stream', metadata, preventOverwrite, onProgress, } = uploadDataOptions ?? {};
        finalKey = objectKey;
        // Resolve "key" specific options
        if (inputType === constants_1.STORAGE_INPUT_KEY) {
            const accessLevel = uploadDataOptions
                ?.accessLevel;
            resolvedKeyPrefix = resolvedS3Options.keyPrefix;
            finalKey = resolvedKeyPrefix + objectKey;
            resolvedAccessLevel = resolveAccessLevel(accessLevel);
        }
        const optionsHash = (await (0, crc32_1.calculateContentCRC32)(JSON.stringify(uploadDataOptions))).checksum;
        if (!inProgressUpload) {
            const { uploadId, cachedParts, finalCrc32 } = await (0, initialUpload_1.loadOrCreateMultipartUpload)({
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
            ? (0, uploadCache_1.getUploadsCacheKey)({
                file: data instanceof File ? data : undefined,
                accessLevel: resolvedAccessLevel,
                contentType: uploadDataOptions?.contentType,
                bucket: resolvedBucket,
                size,
                key: objectKey,
                optionsHash,
            })
            : undefined;
        const dataChunker = (0, getDataChunker_1.getDataChunker)(data, size);
        const completedPartNumberSet = new Set(inProgressUpload.completedParts.map(({ PartNumber }) => PartNumber));
        const onPartUploadCompletion = (partNumber, eTag, crc32) => {
            inProgressUpload?.completedParts.push({
                PartNumber: partNumber,
                ETag: eTag,
                // TODO: crc32 can always be added once RN also has an implementation
                ...(crc32 ? { ChecksumCRC32: crc32 } : {}),
            });
        };
        const concurrentUploadsProgressTracker = (0, progressTracker_1.getConcurrentUploadsProgressTracker)({
            size,
            onProgress,
        });
        const concurrentUploadPartExecutors = [];
        for (let index = 0; index < constants_1.DEFAULT_QUEUE_SIZE; index++) {
            concurrentUploadPartExecutors.push((0, uploadPartExecutor_1.uploadPartExecutor)({
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
        const { ETag: eTag } = await (0, s3data_1.completeMultipartUpload)({
            ...resolvedS3Config,
            abortSignal: abortController.signal,
            userAgentValue: (0, userAgent_1.getStorageUserAgentValue)(utils_1.StorageAction.UploadData),
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
            const { ContentLength: uploadedObjectSize } = await (0, s3data_1.headObject)(resolvedS3Config, {
                Bucket: resolvedBucket,
                Key: finalKey,
                ExpectedBucketOwner: expectedBucketOwner,
            });
            if (uploadedObjectSize && uploadedObjectSize !== size) {
                throw new StorageError_1.StorageError({
                    name: 'Error',
                    message: `Upload failed. Expected object size ${size}, but got ${uploadedObjectSize}.`,
                });
            }
        }
        if (resumableUploadsCache && uploadCacheKey) {
            await (0, uploadCache_1.removeCachedUpload)(resumableUploadsCache, uploadCacheKey);
        }
        const result = {
            eTag,
            contentType,
            metadata,
        };
        return inputType === constants_1.STORAGE_INPUT_KEY
            ? { key: objectKey, ...result }
            : { path: objectKey, ...result };
    };
    const startUploadWithResumability = () => startUpload()
        .then(resolveCallback)
        .catch(error => {
        const abortSignal = abortController?.signal;
        if (abortSignal?.aborted && isAbortSignalFromPause) {
            utils_3.logger.debug('upload paused.');
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
                await (0, uploadCache_1.removeCachedUpload)(resumableUploadsCache, uploadCacheKey);
            }
            // 3. clear multipart upload on server side.
            await (0, s3data_1.abortMultipartUpload)(resolvedS3Config, {
                Bucket: resolvedBucket,
                Key: finalKey,
                UploadId: inProgressUpload?.uploadId,
                ExpectedBucketOwner: expectedBucketOwner,
            });
        };
        cancelUpload().catch(e => {
            utils_3.logger.debug('error when cancelling upload task.', e);
        });
        rejectCallback(
        // Internal error that should not be exposed to the users. They should use isCancelError() to check if
        // the error is caused by cancel().
        new CanceledError_1.CanceledError(message ? { message } : undefined));
    };
    return {
        multipartUploadJob,
        onPause,
        onResume,
        onCancel,
    };
};
exports.getMultipartUploadHandlers = getMultipartUploadHandlers;
const resolveAccessLevel = (accessLevel) => accessLevel ??
    core_1.Amplify.libraryOptions.Storage?.S3?.defaultAccessLevel ??
    constants_1.DEFAULT_ACCESS_LEVEL;
const validateCompletedParts = (completedParts, size) => {
    const partsExpected = Math.ceil(size / (0, calculatePartSize_1.calculatePartSize)(size));
    const validPartCount = completedParts.length === partsExpected;
    const sorted = sortUploadParts(completedParts);
    const validPartNumbers = sorted.every((part, index) => part.PartNumber === index + 1);
    if (!validPartCount || !validPartNumbers) {
        throw new IntegrityError_1.IntegrityError();
    }
};
const sortUploadParts = (parts) => {
    return [...parts].sort((partA, partB) => partA.PartNumber - partB.PartNumber);
};
//# sourceMappingURL=uploadHandlers.js.map
