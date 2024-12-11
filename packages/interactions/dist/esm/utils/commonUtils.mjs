import { base64ToArrayBuffer, gzipDecompressToString } from './utils.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const unGzipBase64AsJson = async (gzipBase64) => {
    if (typeof gzipBase64 === 'undefined')
        return undefined;
    try {
        const decodedArrayBuffer = base64ToArrayBuffer(gzipBase64);
        const objString = await gzipDecompressToString(decodedArrayBuffer);
        return JSON.parse(objString);
    }
    catch (error) {
        return Promise.reject(new Error('unable to decode and decompress ' + error));
    }
};

export { unGzipBase64AsJson };
//# sourceMappingURL=commonUtils.mjs.map
