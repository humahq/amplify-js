'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const utils_1 = require("../utils");
const AWSLexProvider_1 = require("../AWSLexProvider");
const errors_1 = require("../../errors");
const send = async (input) => {
    const { botName, message } = input;
    const botConfig = (0, utils_1.resolveBotConfig)(botName);
    (0, errors_1.assertValidationError)(!!botConfig, errors_1.InteractionsValidationErrorCode.NoBotConfig, `Bot ${botName} does not exist.`);
    return AWSLexProvider_1.lexProvider.sendMessage(botConfig, message);
};
exports.send = send;
//# sourceMappingURL=send.js.map
