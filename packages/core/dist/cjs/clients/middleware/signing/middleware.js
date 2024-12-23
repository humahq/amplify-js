'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.signingMiddlewareFactory = void 0;
const signatureV4_1 = require("./signer/signatureV4");
const getSkewCorrectedDate_1 = require("./utils/getSkewCorrectedDate");
const getUpdatedSystemClockOffset_1 = require("./utils/getUpdatedSystemClockOffset");
/**
 * Middleware that SigV4 signs request with AWS credentials, and correct system clock offset.
 * This middleware is expected to be placed after retry middleware.
 */
const signingMiddlewareFactory = ({ credentials, region, service, uriEscapePath = true, }) => {
    let currentSystemClockOffset;
    return (next, context) => async function signingMiddleware(request) {
        currentSystemClockOffset = currentSystemClockOffset ?? 0;
        const signRequestOptions = {
            credentials: typeof credentials === 'function'
                ? await credentials({
                    forceRefresh: !!context?.isCredentialsExpired,
                })
                : credentials,
            signingDate: (0, getSkewCorrectedDate_1.getSkewCorrectedDate)(currentSystemClockOffset),
            signingRegion: region,
            signingService: service,
            uriEscapePath,
        };
        const signedRequest = await (0, signatureV4_1.signRequest)(request, signRequestOptions);
        const response = await next(signedRequest);
        // Update system clock offset if response contains date header, regardless of the status code.
        // non-2xx response will still be returned from next handler instead of thrown, because it's
        // only thrown by the retry middleware.
        const dateString = getDateHeader(response);
        if (dateString) {
            currentSystemClockOffset = (0, getUpdatedSystemClockOffset_1.getUpdatedSystemClockOffset)(Date.parse(dateString), currentSystemClockOffset);
        }
        return response;
    };
};
exports.signingMiddlewareFactory = signingMiddlewareFactory;
const getDateHeader = ({ headers } = {}) => headers?.date ?? headers?.Date ?? headers?.['x-amz-date'];
//# sourceMappingURL=middleware.js.map
