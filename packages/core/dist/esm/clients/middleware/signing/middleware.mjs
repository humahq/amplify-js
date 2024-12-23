import { signRequest } from './signer/signatureV4/signRequest.mjs';
import '@aws-crypto/sha256-js';
import '@smithy/util-hex-encoding';
import { getSkewCorrectedDate } from './utils/getSkewCorrectedDate.mjs';
import { getUpdatedSystemClockOffset } from './utils/getUpdatedSystemClockOffset.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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
            signingDate: getSkewCorrectedDate(currentSystemClockOffset),
            signingRegion: region,
            signingService: service,
            uriEscapePath,
        };
        const signedRequest = await signRequest(request, signRequestOptions);
        const response = await next(signedRequest);
        // Update system clock offset if response contains date header, regardless of the status code.
        // non-2xx response will still be returned from next handler instead of thrown, because it's
        // only thrown by the retry middleware.
        const dateString = getDateHeader(response);
        if (dateString) {
            currentSystemClockOffset = getUpdatedSystemClockOffset(Date.parse(dateString), currentSystemClockOffset);
        }
        return response;
    };
};
const getDateHeader = ({ headers } = {}) => headers?.date ?? headers?.Date ?? headers?.['x-amz-date'];

export { signingMiddlewareFactory };
//# sourceMappingURL=middleware.mjs.map
