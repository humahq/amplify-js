import { resolveBotConfig } from '../utils/resolveBotConfig.mjs';
import { lexProvider } from '../AWSLexProvider.mjs';
import { assertValidationError } from '../../errors/assertValidationError.mjs';
import { InteractionsValidationErrorCode } from '../../errors/validation.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const send = async (input) => {
    const { botName, message } = input;
    const botConfig = resolveBotConfig(botName);
    assertValidationError(!!botConfig, InteractionsValidationErrorCode.NoBotConfig, `Bot ${botName} does not exist.`);
    return lexProvider.sendMessage(botConfig, message);
};

export { send };
//# sourceMappingURL=send.mjs.map
