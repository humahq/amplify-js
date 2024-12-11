import { CanceledError } from '../errors/CanceledError.mjs';
import '@aws-amplify/core/internals/utils';
import '../errors/validation.mjs';
import { parseRestApiServiceError } from './serviceError.mjs';
import { logger } from './logger.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
function createCancellableOperation(handler, abortController) {
    const isInternalPost = (targetHandler) => !!abortController;
    // For creating a cancellable operation for public REST APIs, we need to create an AbortController
    // internally. Whereas for internal POST APIs, we need to accept in the AbortController from the
    // callers.
    const publicApisAbortController = new AbortController();
    const publicApisAbortSignal = publicApisAbortController.signal;
    const internalPostAbortSignal = abortController?.signal;
    let abortReason;
    const job = async () => {
        try {
            const response = await (isInternalPost(handler)
                ? handler()
                : handler(publicApisAbortSignal));
            if (response.statusCode >= 300) {
                throw await parseRestApiServiceError(response);
            }
            return response;
        }
        catch (error) {
            const abortSignal = internalPostAbortSignal ?? publicApisAbortSignal;
            const message = abortReason ?? abortSignal.reason;
            if (error.name === 'AbortError' || abortSignal?.aborted === true) {
                const canceledError = new CanceledError({
                    ...(message && { message }),
                    underlyingError: error,
                    recoverySuggestion: 'The API request was explicitly canceled. If this is not intended, validate if you called the `cancel()` function on the API request erroneously.',
                });
                logger.debug(error);
                throw canceledError;
            }
            logger.debug(error);
            throw error;
        }
    };
    if (isInternalPost()) {
        return job();
    }
    else {
        const cancel = (abortMessage) => {
            if (publicApisAbortSignal.aborted === true) {
                return;
            }
            publicApisAbortController.abort(abortMessage);
            // If abort reason is not supported, set a scoped reasons instead. The reason property inside an
            // AbortSignal is a readonly property and trying to set it would throw an error.
            if (abortMessage && publicApisAbortSignal.reason !== abortMessage) {
                abortReason = abortMessage;
            }
        };
        return { response: job(), cancel };
    }
}

export { createCancellableOperation };
//# sourceMappingURL=createCancellableOperation.mjs.map
