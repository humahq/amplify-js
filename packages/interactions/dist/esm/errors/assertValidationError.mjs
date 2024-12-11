import { validationErrorMap } from './validation.mjs';
import { InteractionsError } from './InteractionsError.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function assertValidationError(assertion, name, message) {
    if (!assertion) {
        const { message: defaultMessage, recoverySuggestion } = validationErrorMap[name];
        throw new InteractionsError({
            name,
            message: message ?? defaultMessage,
            recoverySuggestion,
        });
    }
}

export { assertValidationError };
//# sourceMappingURL=assertValidationError.mjs.map
