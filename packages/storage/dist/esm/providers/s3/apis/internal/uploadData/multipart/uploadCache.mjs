import { UPLOADS_STORAGE_KEY } from '../../../../utils/constants.mjs';
import '../../../../utils/client/s3data/base.mjs';
import '../../../../utils/client/s3data/getObject.mjs';
import '../../../../utils/client/s3data/listObjectsV2.mjs';
import '../../../../utils/client/s3data/putObject.mjs';
import '../../../../utils/client/s3data/createMultipartUpload.mjs';
import '../../../../utils/client/s3data/uploadPart.mjs';
import '../../../../utils/client/s3data/completeMultipartUpload.mjs';
import { listParts } from '../../../../utils/client/s3data/listParts.mjs';
import '../../../../utils/client/s3data/abortMultipartUpload.mjs';
import '../../../../utils/client/s3data/copyObject.mjs';
import '../../../../utils/client/s3data/headObject.mjs';
import '../../../../utils/client/s3data/deleteObject.mjs';
import '../../../../../../errors/types/validation.mjs';
import '@aws-amplify/core/internals/utils';
import { logger } from '../../../../../../utils/logger.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const ONE_HOUR = 1000 * 60 * 60;
/**
 * Find the cached multipart upload id and get the parts that have been uploaded
 * with ListParts API. If the cached upload is expired(1 hour), return null.
 */
const findCachedUploadParts = async ({ resumableUploadsCache, cacheKey, s3Config, bucket, finalKey, }) => {
    const cachedUploads = await listCachedUploadTasks(resumableUploadsCache);
    if (!cachedUploads[cacheKey] ||
        cachedUploads[cacheKey].lastTouched < Date.now() - ONE_HOUR // Uploads are cached for 1 hour
    ) {
        return null;
    }
    const cachedUpload = cachedUploads[cacheKey];
    cachedUpload.lastTouched = Date.now();
    await resumableUploadsCache.setItem(UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
    try {
        const { Parts = [] } = await listParts(s3Config, {
            Bucket: bucket,
            Key: finalKey,
            UploadId: cachedUpload.uploadId,
        });
        return {
            parts: Parts,
            uploadId: cachedUpload.uploadId,
            finalCrc32: cachedUpload.finalCrc32,
        };
    }
    catch (e) {
        logger.debug('failed to list cached parts, removing cached upload.');
        await removeCachedUpload(resumableUploadsCache, cacheKey);
        return null;
    }
};
const listCachedUploadTasks = async (resumableUploadsCache) => {
    try {
        return JSON.parse((await resumableUploadsCache.getItem(UPLOADS_STORAGE_KEY)) ?? '{}');
    }
    catch (e) {
        logger.debug('failed to parse cached uploads record.');
        return {};
    }
};
/**
 * Get the cache key of a multipart upload. Data source cached by different: size, content type, bucket, access level,
 * key. If the data source is a File instance, the upload is additionally indexed by file name and last modified time.
 * So the library always created a new multipart upload if the file is modified.
 */
const getUploadsCacheKey = ({ file, size, contentType, bucket, accessLevel, key, optionsHash, }) => {
    let levelStr;
    const resolvedContentType = contentType ?? file?.type ?? 'application/octet-stream';
    // If no access level is defined, we're using custom gen2 access rules
    if (accessLevel === undefined) {
        levelStr = 'custom';
    }
    else {
        levelStr = accessLevel === 'guest' ? 'public' : accessLevel;
    }
    const baseId = `${optionsHash}_${size}_${resolvedContentType}_${bucket}_${levelStr}_${key}`;
    if (file) {
        return `${file.name}_${file.lastModified}_${baseId}`;
    }
    else {
        return baseId;
    }
};
const cacheMultipartUpload = async (resumableUploadsCache, cacheKey, fileMetadata) => {
    const cachedUploads = await listCachedUploadTasks(resumableUploadsCache);
    cachedUploads[cacheKey] = {
        ...fileMetadata,
        lastTouched: Date.now(),
    };
    await resumableUploadsCache.setItem(UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
};
const removeCachedUpload = async (resumableUploadsCache, cacheKey) => {
    const cachedUploads = await listCachedUploadTasks(resumableUploadsCache);
    delete cachedUploads[cacheKey];
    await resumableUploadsCache.setItem(UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
};

export { cacheMultipartUpload, findCachedUploadParts, getUploadsCacheKey, removeCachedUpload };
//# sourceMappingURL=uploadCache.mjs.map
