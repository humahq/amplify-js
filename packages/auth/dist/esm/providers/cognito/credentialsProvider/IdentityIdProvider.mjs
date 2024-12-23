import { ConsoleLogger, createGetIdClient } from '@aws-amplify/core';
import { AuthError } from '../../../errors/AuthError.mjs';
import { getRegionFromIdentityPoolId } from '../../../foundation/parsers/regionParsers.mjs';
import '@aws-amplify/core/internals/utils';
import '@aws-amplify/core/internals/aws-client-utils';
import { createCognitoIdentityPoolEndpointResolver } from '../factories/createCognitoIdentityPoolEndpointResolver.mjs';
import { formLoginsMap } from './utils.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new ConsoleLogger('CognitoIdentityIdProvider');
/**
 * Provides a Cognito identityId
 *
 * @param tokens - The AuthTokens received after SignIn
 * @returns string
 * @throws configuration exceptions: `InvalidIdentityPoolIdException`
 *  - Auth errors that may arise from misconfiguration.
 * @throws service exceptions: {@link GetIdException }
 */
async function cognitoIdentityIdProvider({ tokens, authConfig, identityIdStore, }) {
    identityIdStore.setAuthConfig({ Cognito: authConfig });
    // will return null only if there is no identityId cached or if there is an error retrieving it
    let identityId = await identityIdStore.loadIdentityId();
    // Tokens are available so return primary identityId
    if (tokens) {
        // If there is existing primary identityId in-memory return that
        if (identityId && identityId.type === 'primary') {
            return identityId.id;
        }
        else {
            const logins = tokens.idToken
                ? formLoginsMap(tokens.idToken.toString())
                : {};
            const generatedIdentityId = await generateIdentityId(logins, authConfig);
            if (identityId && identityId.id === generatedIdentityId) {
                logger.debug(`The guest identity ${identityId.id} has become the primary identity.`);
            }
            identityId = {
                id: generatedIdentityId,
                type: 'primary',
            };
        }
    }
    else {
        // If there is existing guest identityId cached return that
        if (identityId && identityId.type === 'guest') {
            return identityId.id;
        }
        else {
            identityId = {
                id: await generateIdentityId({}, authConfig),
                type: 'guest',
            };
        }
    }
    // Store in-memory or local storage depending on guest or primary identityId
    identityIdStore.storeIdentityId(identityId);
    return identityId.id;
}
async function generateIdentityId(logins, authConfig) {
    const identityPoolId = authConfig?.identityPoolId;
    const region = getRegionFromIdentityPoolId(identityPoolId);
    const getId = createGetIdClient({
        endpointResolver: createCognitoIdentityPoolEndpointResolver({
            endpointOverride: authConfig.identityPoolEndpoint,
        }),
    });
    // IdentityId is absent so get it using IdentityPoolId with Cognito's GetId API
    const idResult = 
    // for a first-time user, this will return a brand new identity
    // for a returning user, this will retrieve the previous identity associated with the logins
    (await getId({
        region,
    }, {
        IdentityPoolId: identityPoolId,
        Logins: logins,
    })).IdentityId;
    if (!idResult) {
        throw new AuthError({
            name: 'GetIdResponseException',
            message: 'Received undefined response from getId operation',
            recoverySuggestion: 'Make sure to pass a valid identityPoolId in the configuration.',
        });
    }
    return idResult;
}

export { cognitoIdentityIdProvider };
//# sourceMappingURL=IdentityIdProvider.mjs.map
