import { parseAmplifyConfig } from '@aws-amplify/core/internals/utils';
import { createRunWithAmplifyServerContext } from './utils/createRunWithAmplifyServerContext.mjs';
import 'aws-jwt-verify';
import 'aws-jwt-verify/error';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Creates the `runWithAmplifyServerContext` function to run Amplify server side APIs in an isolated request context.
 *
 * @remarks
 * This function should be called only once; you can use the returned `runWithAmplifyServerContext` across
 * your codebase.
 *
 * @param input The input used to create the `runWithAmplifyServerContext` function.
 * @param input.config The {@link ResourcesConfig} imported from the `amplifyconfiguration.json` file or manually
 * created.
 * @returns An object that contains the `runWithAmplifyServerContext` function.
 *
 * @example
 * import { createServerRunner } from '@aws-amplify/adapter-nextjs';
 * import config from './amplifyconfiguration.json';
 *
 * export const { runWithAmplifyServerContext } = createServerRunner({ config })
 */
const createServerRunner = ({ config, }) => {
    const amplifyConfig = parseAmplifyConfig(config);
    return {
        runWithAmplifyServerContext: createRunWithAmplifyServerContext({
            config: amplifyConfig,
        }),
    };
};

export { createServerRunner };
//# sourceMappingURL=createServerRunner.mjs.map
