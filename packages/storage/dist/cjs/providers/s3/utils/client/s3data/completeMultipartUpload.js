'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeMultipartUpload = void 0;
const aws_client_utils_1 = require("@aws-amplify/core/internals/aws-client-utils");
const utils_1 = require("@aws-amplify/core/internals/utils");
const composers_1 = require("@aws-amplify/core/internals/aws-client-utils/composers");
const utils_2 = require("../utils");
const validateObjectUrl_1 = require("../../validateObjectUrl");
const validateMultipartUploadXML_1 = require("../../validateMultipartUploadXML");
const base_1 = require("./base");
const INVALID_PARAMETER_ERROR_MSG = 'Invalid parameter for ComplteMultipartUpload API';
const completeMultipartUploadSerializer = async (input, endpoint) => {
    const headers = {
        'content-type': 'application/xml',
        ...(0, utils_2.assignStringVariables)({
            'x-amz-checksum-crc32': input.ChecksumCRC32,
            'x-amz-expected-bucket-owner': input.ExpectedBucketOwner,
            'If-None-Match': input.IfNoneMatch,
        }),
    };
    const url = new utils_1.AmplifyUrl(endpoint.url.toString());
    (0, utils_2.validateS3RequiredParameter)(!!input.Key, 'Key');
    url.pathname = (0, utils_2.serializePathnameObjectKey)(url, input.Key);
    (0, utils_2.validateS3RequiredParameter)(!!input.UploadId, 'UploadId');
    url.search = new utils_1.AmplifyUrlSearchParams({
        uploadId: input.UploadId,
    }).toString();
    (0, utils_2.validateS3RequiredParameter)(!!input.MultipartUpload, 'MultipartUpload');
    (0, validateObjectUrl_1.validateObjectUrl)({
        bucketName: input.Bucket,
        key: input.Key,
        objectURL: url,
    });
    const xml = serializeCompletedMultipartUpload(input.MultipartUpload);
    (0, validateMultipartUploadXML_1.validateMultipartUploadXML)(input.MultipartUpload, xml);
    return {
        method: 'POST',
        headers,
        url,
        body: '<?xml version="1.0" encoding="UTF-8"?>' + xml,
    };
};
const serializeCompletedMultipartUpload = (input) => {
    if (!input.Parts?.length) {
        throw new Error(`${INVALID_PARAMETER_ERROR_MSG}: ${input}`);
    }
    return `<CompleteMultipartUpload xmlns="http://s3.amazonaws.com/doc/2006-03-01/">${input.Parts.map(serializeCompletedPartList).join('')}</CompleteMultipartUpload>`;
};
const serializeCompletedPartList = (input) => {
    if (!input.ETag || input.PartNumber == null) {
        throw new Error(`${INVALID_PARAMETER_ERROR_MSG}: ${input}`);
    }
    const eTag = `<ETag>${input.ETag}</ETag>`;
    const partNumber = `<PartNumber>${input.PartNumber}</PartNumber>`;
    const checksumCRC32 = input.ChecksumCRC32
        ? `<ChecksumCRC32>${input.ChecksumCRC32}</ChecksumCRC32>`
        : '';
    return `<Part>${eTag}${partNumber}${checksumCRC32}</Part>`;
};
/**
 * Parse CompleteMultipartUpload API response payload, which may be empty or error indicating internal
 * server error, even when the status code is 200.
 *
 * Ref: https://docs.aws.amazon.com/AmazonS3/latest/API/API_CompleteMultipartUpload.html#API_CompleteMultipartUpload_Example_4
 */
const parseXmlBodyOrThrow = async (response) => {
    const parsed = await (0, utils_2.parseXmlBody)(response); // Handles empty body case
    if (parsed.Code !== undefined && parsed.Message !== undefined) {
        const error = (await (0, base_1.parseXmlError)({
            ...response,
            statusCode: 500, // To workaround the >=300 status code check common to other APIs.
        }));
        throw (0, utils_2.buildStorageServiceError)(error, response.statusCode);
    }
    return parsed;
};
const completeMultipartUploadDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = (await (0, base_1.parseXmlError)(response));
        throw (0, utils_2.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        const parsed = await parseXmlBodyOrThrow(response);
        const contents = (0, utils_2.map)(parsed, {
            ETag: 'ETag',
            Key: 'Key',
            Location: 'Location',
        });
        return {
            $metadata: (0, aws_client_utils_1.parseMetadata)(response),
            ...contents,
        };
    }
};
// CompleteMultiPartUpload API returns 200 status code with empty body or error message.
// This indicates internal server error after the response has been sent to the client.
// Ref: https://docs.aws.amazon.com/AmazonS3/latest/API/API_CompleteMultipartUpload.html#API_CompleteMultipartUpload_Example_4
const retryWhenErrorWith200StatusCode = async (response, error, middlewareContext) => {
    if (!response) {
        return { retryable: false };
    }
    if (response.statusCode === 200) {
        if (!response.body) {
            return { retryable: true };
        }
        const parsed = await (0, utils_2.parseXmlBody)(response);
        if (parsed.Code !== undefined && parsed.Message !== undefined) {
            return { retryable: true };
        }
        return { retryable: false };
    }
    return (0, base_1.retryDecider)(response, error, middlewareContext);
};
exports.completeMultipartUpload = (0, composers_1.composeServiceApi)(utils_2.s3TransferHandler, completeMultipartUploadSerializer, completeMultipartUploadDeserializer, {
    ...base_1.defaultConfig,
    responseType: 'text',
    retryDecider: retryWhenErrorWith200StatusCode,
});
//# sourceMappingURL=completeMultipartUpload.js.map
