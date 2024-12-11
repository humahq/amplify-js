'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidationError = void 0;
const validation_1 = require("./validation");
const InteractionsError_1 = require("./InteractionsError");
function assertValidationError(assertion, name, message) {
    if (!assertion) {
        const { message: defaultMessage, recoverySuggestion } = validation_1.validationErrorMap[name];
        throw new InteractionsError_1.InteractionsError({
            name,
            message: message ?? defaultMessage,
            recoverySuggestion,
        });
    }
}
exports.assertValidationError = assertValidationError;
//# sourceMappingURL=assertValidationError.js.map
