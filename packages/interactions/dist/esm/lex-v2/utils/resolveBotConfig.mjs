import { Amplify } from '@aws-amplify/core';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const resolveBotConfig = (botName) => {
    const { [botName]: botConfig = undefined } = Amplify.getConfig().Interactions?.LexV2 ?? {};
    if (botConfig !== undefined) {
        return { ...botConfig, name: botName };
    }
};

export { resolveBotConfig };
//# sourceMappingURL=resolveBotConfig.mjs.map
