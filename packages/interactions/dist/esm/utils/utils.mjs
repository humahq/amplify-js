import { gunzip, strFromU8 } from 'fflate';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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
const base64ToArrayBuffer = (base64) => {
    return Uint8Array.from(window.atob(base64), c => c.charCodeAt(0));
};
const gzipDecompressToString = async (data) => {
    return new Promise((resolve, reject) => {
        gunzip(data, (err, resp) => {
            if (err)
                reject(err);
            else
                resolve(strFromU8(resp));
        });
    });
};

export { base64ToArrayBuffer, convert, gzipDecompressToString };
//# sourceMappingURL=utils.mjs.map
