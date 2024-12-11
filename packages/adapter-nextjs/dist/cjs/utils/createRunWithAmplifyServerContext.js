'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRunWithAmplifyServerContext = void 0;
const core_1 = require("@aws-amplify/core");
const adapter_core_1 = require("aws-amplify/adapter-core");
const createTokenValidator_1 = require("./createTokenValidator");
const createCookieStorageAdapterFromNextServerContext_1 = require("./createCookieStorageAdapterFromNextServerContext");
const createRunWithAmplifyServerContext = ({ config: resourcesConfig, }) => {
    const runWithAmplifyServerContext = async ({ nextServerContext, operation }) => {
        // When the Auth config is presented, attempt to create a Amplify server
        // context with token and credentials provider.
        if (resourcesConfig.Auth) {
            const keyValueStorage = 
            // When `null` is passed as the value of `nextServerContext`, opt-in
            // unauthenticated role (primarily for static rendering). It's
            // safe to use the singleton `MemoryKeyValueStorage` here, as the
            // static rendering uses the same unauthenticated role cross-sever.
            nextServerContext === null
                ? core_1.sharedInMemoryStorage
                : (0, adapter_core_1.createKeyValueStorageFromCookieStorageAdapter)((0, createCookieStorageAdapterFromNextServerContext_1.createCookieStorageAdapterFromNextServerContext)(nextServerContext), (0, createTokenValidator_1.createTokenValidator)({
                    userPoolId: resourcesConfig?.Auth.Cognito?.userPoolId,
                    userPoolClientId: resourcesConfig?.Auth.Cognito?.userPoolClientId,
                }));
            const credentialsProvider = (0, adapter_core_1.createAWSCredentialsAndIdentityIdProvider)(resourcesConfig.Auth, keyValueStorage);
            const tokenProvider = (0, adapter_core_1.createUserPoolsTokenProvider)(resourcesConfig.Auth, keyValueStorage);
            return (0, adapter_core_1.runWithAmplifyServerContext)(resourcesConfig, {
                Auth: { credentialsProvider, tokenProvider },
            }, operation);
        }
        // Otherwise it may be the case that auth is not used, e.g. API key.
        // Omitting the `Auth` in the second parameter.
        return (0, adapter_core_1.runWithAmplifyServerContext)(resourcesConfig, {}, operation);
    };
    return runWithAmplifyServerContext;
};
exports.createRunWithAmplifyServerContext = createRunWithAmplifyServerContext;
//# sourceMappingURL=createRunWithAmplifyServerContext.js.map
