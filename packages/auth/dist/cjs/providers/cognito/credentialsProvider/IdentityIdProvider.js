'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.cognitoIdentityIdProvider = void 0;
const core_1 = require("@aws-amplify/core");
const AuthError_1 = require("../../../errors/AuthError");
const parsers_1 = require("../../../foundation/parsers");
const factories_1 = require("../factories");
const utils_1 = require("./utils");
const logger = new core_1.ConsoleLogger('CognitoIdentityIdProvider');
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
                ? (0, utils_1.formLoginsMap)(tokens.idToken.toString())
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
exports.cognitoIdentityIdProvider = cognitoIdentityIdProvider;
async function generateIdentityId(logins, authConfig) {
    const identityPoolId = authConfig?.identityPoolId;
    const region = (0, parsers_1.getRegionFromIdentityPoolId)(identityPoolId);
    const getId = (0, core_1.createGetIdClient)({
        endpointResolver: (0, factories_1.createCognitoIdentityPoolEndpointResolver)({
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
        throw new AuthError_1.AuthError({
            name: 'GetIdResponseException',
            message: 'Received undefined response from getId operation',
            recoverySuggestion: 'Make sure to pass a valid identityPoolId in the configuration.',
        });
    }
    return idResult;
}
//# sourceMappingURL=IdentityIdProvider.js.map
