'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.onComplete = void 0;
const utils_1 = require("../utils");
const AWSLexProvider_1 = require("../AWSLexProvider");
const errors_1 = require("../../errors");
const onComplete = (input) => {
    const { botName, callback } = input;
    const botConfig = (0, utils_1.resolveBotConfig)(botName);
    (0, errors_1.assertValidationError)(!!botConfig, errors_1.InteractionsValidationErrorCode.NoBotConfig, `Bot ${botName} does not exist.`);
    AWSLexProvider_1.lexProvider.onComplete(botConfig, callback);
};
exports.onComplete = onComplete;
//# sourceMappingURL=onComplete.js.map
