'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveBotConfig = void 0;
const core_1 = require("@aws-amplify/core");
const resolveBotConfig = (botName) => {
    const { [botName]: botConfig = undefined } = core_1.Amplify.getConfig().Interactions?.LexV2 ?? {};
    if (botConfig !== undefined) {
        return { ...botConfig, name: botName };
    }
};
exports.resolveBotConfig = resolveBotConfig;
//# sourceMappingURL=resolveBotConfig.js.map
