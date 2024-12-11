import { parseAmplifyConfig } from '@aws-amplify/core/internals/utils';
import { createRunWithAmplifyServerContext } from '../utils/createRunWithAmplifyServerContext.mjs';
import 'aws-jwt-verify';
import 'aws-jwt-verify/error';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createServerRunnerForAPI = ({ config, }) => {
    const amplifyConfig = parseAmplifyConfig(config);
    return {
        runWithAmplifyServerContext: createRunWithAmplifyServerContext({
            config: amplifyConfig,
        }),
        resourcesConfig: amplifyConfig,
    };
};

export { createServerRunnerForAPI };
//# sourceMappingURL=createServerRunnerForAPI.mjs.map
