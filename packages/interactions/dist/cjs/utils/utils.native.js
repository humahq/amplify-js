'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.gzipDecompressToString = exports.base64ToArrayBuffer = exports.convert = void 0;
const base_64_1 = require("base-64");
const pako_1 = require("pako");
const convert = async (stream) => {
    if (!(stream instanceof Blob)) {
        return Promise.reject(new Error('Invalid content type'));
    }
    return new Promise((resolve, reject) => {
        try {
            const fileReaderInstance = new FileReader();
            fileReaderInstance.readAsDataURL(stream);
            fileReaderInstance.onload = async () => {
                const blobURL = fileReaderInstance.result;
                const base64Blob = blobURL.split(/,(.*)/s)[1];
                const decodedArrayBuffer = (0, exports.base64ToArrayBuffer)(base64Blob);
                resolve(decodedArrayBuffer);
            };
        }
        catch (error) {
            reject(new Error('unable to convert blob to arrayBuffer: ' + error));
        }
    });
};
exports.convert = convert;
const base64ToArrayBuffer = (base64) => {
    const binaryString = (0, base_64_1.decode)(base64);
    return Uint8Array.from(binaryString, c => c.charCodeAt(0));
};
exports.base64ToArrayBuffer = base64ToArrayBuffer;
const gzipDecompressToString = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const result = (0, pako_1.ungzip)(data, { to: 'string' });
            resolve(result);
        }
        catch (error) {
            reject(new Error('unable to decompress' + error));
        }
    });
};
exports.gzipDecompressToString = gzipDecompressToString;
//# sourceMappingURL=utils.native.js.map
