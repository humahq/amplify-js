'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerRunner = void 0;
const utils_1 = require("@aws-amplify/core/internals/utils");
const utils_2 = require("./utils");
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
    const amplifyConfig = (0, utils_1.parseAmplifyConfig)(config);
    return {
        runWithAmplifyServerContext: (0, utils_2.createRunWithAmplifyServerContext)({
            config: amplifyConfig,
        }),
    };
};
exports.createServerRunner = createServerRunner;
//# sourceMappingURL=createServerRunner.js.map
