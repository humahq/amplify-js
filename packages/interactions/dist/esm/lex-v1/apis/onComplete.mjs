import { resolveBotConfig } from '../utils/resolveBotConfig.mjs';
import { lexProvider } from '../AWSLexProvider.mjs';
import { assertValidationError } from '../../errors/assertValidationError.mjs';
import { InteractionsValidationErrorCode } from '../../errors/validation.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const onComplete = (input) => {
    const { botName, callback } = input;
    const botConfig = resolveBotConfig(botName);
    assertValidationError(!!botConfig, InteractionsValidationErrorCode.NoBotConfig, `Bot ${botName} does not exist.`);
    lexProvider.onComplete(botConfig, callback);
};

export { onComplete };
//# sourceMappingURL=onComplete.mjs.map
