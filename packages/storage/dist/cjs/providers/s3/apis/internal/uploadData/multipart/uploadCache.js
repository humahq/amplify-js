'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCachedUpload = exports.cacheMultipartUpload = exports.getUploadsCacheKey = exports.findCachedUploadParts = void 0;
const constants_1 = require("../../../../utils/constants");
const s3data_1 = require("../../../../utils/client/s3data");
const utils_1 = require("../../../../../../utils");
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
    await resumableUploadsCache.setItem(constants_1.UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
    try {
        const { Parts = [] } = await (0, s3data_1.listParts)(s3Config, {
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
        utils_1.logger.debug('failed to list cached parts, removing cached upload.');
        await (0, exports.removeCachedUpload)(resumableUploadsCache, cacheKey);
        return null;
    }
};
exports.findCachedUploadParts = findCachedUploadParts;
const listCachedUploadTasks = async (resumableUploadsCache) => {
    try {
        return JSON.parse((await resumableUploadsCache.getItem(constants_1.UPLOADS_STORAGE_KEY)) ?? '{}');
    }
    catch (e) {
        utils_1.logger.debug('failed to parse cached uploads record.');
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
exports.getUploadsCacheKey = getUploadsCacheKey;
const cacheMultipartUpload = async (resumableUploadsCache, cacheKey, fileMetadata) => {
    const cachedUploads = await listCachedUploadTasks(resumableUploadsCache);
    cachedUploads[cacheKey] = {
        ...fileMetadata,
        lastTouched: Date.now(),
    };
    await resumableUploadsCache.setItem(constants_1.UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
};
exports.cacheMultipartUpload = cacheMultipartUpload;
const removeCachedUpload = async (resumableUploadsCache, cacheKey) => {
    const cachedUploads = await listCachedUploadTasks(resumableUploadsCache);
    delete cachedUploads[cacheKey];
    await resumableUploadsCache.setItem(constants_1.UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
};
exports.removeCachedUpload = removeCachedUpload;
//# sourceMappingURL=uploadCache.js.map
