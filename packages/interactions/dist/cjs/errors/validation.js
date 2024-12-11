'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorMap = exports.InteractionsValidationErrorCode = void 0;
var InteractionsValidationErrorCode;
(function (InteractionsValidationErrorCode) {
    InteractionsValidationErrorCode["NoBotConfig"] = "NoBotConfig";
})(InteractionsValidationErrorCode = exports.InteractionsValidationErrorCode || (exports.InteractionsValidationErrorCode = {}));
exports.validationErrorMap = {
    [InteractionsValidationErrorCode.NoBotConfig]: {
        message: 'Missing configuration for the bot',
    },
};
//# sourceMappingURL=validation.js.map
