'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.gzipDecompressToString = exports.base64ToArrayBuffer = exports.convert = void 0;
const fflate_1 = require("fflate");
const convert = async (stream) => {
    if (stream instanceof Blob || stream instanceof ReadableStream) {
        return new Response(stream)
            .arrayBuffer()
            .then(buffer => new Uint8Array(buffer));
    }
    else {
        return Promise.reject(new Error('Invalid content type'));
    }
};
exports.convert = convert;
const base64ToArrayBuffer = (base64) => {
    return Uint8Array.from(window.atob(base64), c => c.charCodeAt(0));
};
exports.base64ToArrayBuffer = base64ToArrayBuffer;
const gzipDecompressToString = async (data) => {
    return new Promise((resolve, reject) => {
        (0, fflate_1.gunzip)(data, (err, resp) => {
            if (err)
                reject(err);
            else
                resolve((0, fflate_1.strFromU8)(resp));
        });
    });
};
exports.gzipDecompressToString = gzipDecompressToString;
//# sourceMappingURL=utils.js.map
