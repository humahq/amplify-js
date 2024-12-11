import { sharedInMemoryStorage } from '@aws-amplify/core';
import { createKeyValueStorageFromCookieStorageAdapter, createAWSCredentialsAndIdentityIdProvider, createUserPoolsTokenProvider, runWithAmplifyServerContext } from 'aws-amplify/adapter-core';
import { createTokenValidator } from './createTokenValidator.mjs';
import { createCookieStorageAdapterFromNextServerContext } from './createCookieStorageAdapterFromNextServerContext.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createRunWithAmplifyServerContext = ({ config: resourcesConfig, }) => {
    const runWithAmplifyServerContext$1 = async ({ nextServerContext, operation }) => {
        // When the Auth config is presented, attempt to create a Amplify server
        // context with token and credentials provider.
        if (resourcesConfig.Auth) {
            const keyValueStorage = 
            // When `null` is passed as the value of `nextServerContext`, opt-in
            // unauthenticated role (primarily for static rendering). It's
            // safe to use the singleton `MemoryKeyValueStorage` here, as the
            // static rendering uses the same unauthenticated role cross-sever.
            nextServerContext === null
                ? sharedInMemoryStorage
                : createKeyValueStorageFromCookieStorageAdapter(createCookieStorageAdapterFromNextServerContext(nextServerContext), createTokenValidator({
                    userPoolId: resourcesConfig?.Auth.Cognito?.userPoolId,
                    userPoolClientId: resourcesConfig?.Auth.Cognito?.userPoolClientId,
                }));
            const credentialsProvider = createAWSCredentialsAndIdentityIdProvider(resourcesConfig.Auth, keyValueStorage);
            const tokenProvider = createUserPoolsTokenProvider(resourcesConfig.Auth, keyValueStorage);
            return runWithAmplifyServerContext(resourcesConfig, {
                Auth: { credentialsProvider, tokenProvider },
            }, operation);
        }
        // Otherwise it may be the case that auth is not used, e.g. API key.
        // Omitting the `Auth` in the second parameter.
        return runWithAmplifyServerContext(resourcesConfig, {}, operation);
    };
    return runWithAmplifyServerContext$1;
};

export { createRunWithAmplifyServerContext };
//# sourceMappingURL=createRunWithAmplifyServerContext.mjs.map
