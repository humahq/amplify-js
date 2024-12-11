'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.unGzipBase64AsJson = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const utils_1 = require("./utils");
const unGzipBase64AsJson = async (gzipBase64) => {
    if (typeof gzipBase64 === 'undefined')
        return undefined;
    try {
        const decodedArrayBuffer = (0, utils_1.base64ToArrayBuffer)(gzipBase64);
        const objString = await (0, utils_1.gzipDecompressToString)(decodedArrayBuffer);
        return JSON.parse(objString);
    }
    catch (error) {
        return Promise.reject(new Error('unable to decode and decompress ' + error));
    }
};
exports.unGzipBase64AsJson = unGzipBase64AsJson;
//# sourceMappingURL=commonUtils.js.map
