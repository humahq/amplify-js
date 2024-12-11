import { decode } from 'base-64';
import { ungzip } from 'pako';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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
                const decodedArrayBuffer = base64ToArrayBuffer(base64Blob);
                resolve(decodedArrayBuffer);
            };
        }
        catch (error) {
            reject(new Error('unable to convert blob to arrayBuffer: ' + error));
        }
    });
};
const base64ToArrayBuffer = (base64) => {
    const binaryString = decode(base64);
    return Uint8Array.from(binaryString, c => c.charCodeAt(0));
};
const gzipDecompressToString = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const result = ungzip(data, { to: 'string' });
            resolve(result);
        }
        catch (error) {
            reject(new Error('unable to decompress' + error));
        }
    });
};

export { base64ToArrayBuffer, convert, gzipDecompressToString };
//# sourceMappingURL=utils.native.mjs.map
