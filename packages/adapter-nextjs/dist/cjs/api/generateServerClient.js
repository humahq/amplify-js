'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateServerClientUsingReqRes = exports.generateServerClientUsingCookies = void 0;
const internals_1 = require("@aws-amplify/api/internals");
const server_1 = require("aws-amplify/api/server");
const adapter_core_1 = require("@aws-amplify/core/internals/adapter-core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const createServerRunnerForAPI_1 = require("./createServerRunnerForAPI");
/**
 * Generates an API client that can be used inside a Next.js Server Component with Dynamic Rendering
 *
 * @example
 * import { cookies } from "next/headers"
 *
 * const client = generateServerClientUsingCookies({ cookies });
 * const result = await client.graphql({ query: listPosts });
 */
function generateServerClientUsingCookies({ config, cookies, authMode, authToken, }) {
    if (typeof cookies !== 'function') {
        throw new adapter_core_1.AmplifyServerContextError({
            message: 'generateServerClientUsingCookies is only compatible with the `cookies` Dynamic Function available in Server Components.',
            // TODO: link to docs
            recoverySuggestion: 'use `generateServerClient` inside of `runWithAmplifyServerContext` with the `request` object.',
        });
    }
    const { runWithAmplifyServerContext, resourcesConfig } = (0, createServerRunnerForAPI_1.createServerRunnerForAPI)({ config });
    // This function reference gets passed down to InternalGraphQLAPI.ts.graphql
    // where this._graphql is passed in as the `fn` argument
    // causing it to always get invoked inside `runWithAmplifyServerContext`
    const getAmplify = (fn) => runWithAmplifyServerContext({
        nextServerContext: { cookies },
        operation: contextSpec => fn((0, adapter_core_1.getAmplifyServerContext)(contextSpec).amplify),
    });
    return (0, internals_1.generateClientWithAmplifyInstance)({
        amplify: getAmplify,
        config: resourcesConfig,
        authMode,
        authToken,
    });
}
exports.generateServerClientUsingCookies = generateServerClientUsingCookies;
/**
 * Generates an API client that can be used with both Pages Router and App Router
 *
 * @example
 * import config from './amplifyconfiguration.json';
 * import { listPosts } from './graphql/queries';
 *
 * const client = generateServerClientUsingReqRes({ config });
 *
 * const result = await runWithAmplifyServerContext({
 *   nextServerContext: { request, response },
 *   operation: (contextSpec) => client.graphql(contextSpec, {
 *     query: listPosts,
 *   }),
 * });
 */
function generateServerClientUsingReqRes({ config, authMode, authToken }) {
    const amplifyConfig = (0, utils_1.parseAmplifyConfig)(config);
    return (0, server_1.generateClient)({
        config: amplifyConfig,
        authMode,
        authToken,
    });
}
exports.generateServerClientUsingReqRes = generateServerClientUsingReqRes;
//# sourceMappingURL=generateServerClient.js.map
