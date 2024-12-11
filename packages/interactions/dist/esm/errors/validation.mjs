// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var InteractionsValidationErrorCode;
(function (InteractionsValidationErrorCode) {
    InteractionsValidationErrorCode["NoBotConfig"] = "NoBotConfig";
})(InteractionsValidationErrorCode || (InteractionsValidationErrorCode = {}));
const validationErrorMap = {
    [InteractionsValidationErrorCode.NoBotConfig]: {
        message: 'Missing configuration for the bot',
    },
};

export { InteractionsValidationErrorCode, validationErrorMap };
//# sourceMappingURL=validation.mjs.map
