'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerRunnerForAPI = void 0;
const utils_1 = require("@aws-amplify/core/internals/utils");
const utils_2 = require("../utils");
const createServerRunnerForAPI = ({ config, }) => {
    const amplifyConfig = (0, utils_1.parseAmplifyConfig)(config);
    return {
        runWithAmplifyServerContext: (0, utils_2.createRunWithAmplifyServerContext)({
            config: amplifyConfig,
        }),
        resourcesConfig: amplifyConfig,
    };
};
exports.createServerRunnerForAPI = createServerRunnerForAPI;
//# sourceMappingURL=createServerRunnerForAPI.js.map
