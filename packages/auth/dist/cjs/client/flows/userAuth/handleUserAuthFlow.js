'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserAuthFlow = void 0;
const utils_1 = require("@aws-amplify/core/internals/utils");
const userContextData_1 = require("../../../providers/cognito/utils/userContextData");
const cognitoIdentityProvider_1 = require("../../../foundation/factories/serviceClients/cognitoIdentityProvider");
const factories_1 = require("../../../providers/cognito/factories");
const parsers_1 = require("../../../foundation/parsers");
const utils_2 = require("../../../utils");
const handlePasswordSRP_1 = require("../shared/handlePasswordSRP");
const assertValidationError_1 = require("../../../errors/utils/assertValidationError");
const validation_1 = require("../../../errors/types/validation");
const signInHelpers_1 = require("../../../providers/cognito/utils/signInHelpers");
/**
 * Handles user authentication flow with configurable challenge preferences.
 * Supports AuthFactorType challenges through the USER_AUTH flow.
 *
 * @param {HandleUserAuthFlowInput} params - Authentication flow parameters
 * @param {string} params.username - The username for authentication
 * @param {Record<string, string>} [params.clientMetadata] - Optional metadata to pass to authentication service
 * @param {CognitoUserPoolConfig} params.config - Cognito User Pool configuration
 * @param {AuthTokenOrchestrator} params.tokenOrchestrator - Manages authentication tokens and device tracking
 * @param {AuthFactorType} [params.preferredChallenge] - Optional preferred authentication method
 * @param {string} [params.password] - Required when preferredChallenge is 'PASSWORD' or 'PASSWORD_SRP'
 *
 * @returns {Promise<InitiateAuthCommandOutput>} The authentication response from Cognito
 */
async function handleUserAuthFlow({ username, clientMetadata, config, tokenOrchestrator, preferredChallenge, password, session, }) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    const UserContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const authParameters = { USERNAME: username };
    if (preferredChallenge) {
        if (preferredChallenge === 'PASSWORD_SRP') {
            (0, assertValidationError_1.assertValidationError)(!!password, validation_1.AuthValidationErrorCode.EmptySignInPassword);
            return (0, handlePasswordSRP_1.handlePasswordSRP)({
                username,
                password,
                clientMetadata,
                config,
                tokenOrchestrator,
                authFlow: 'USER_AUTH',
                preferredChallenge,
            });
        }
        if (preferredChallenge === 'PASSWORD') {
            (0, assertValidationError_1.assertValidationError)(!!password, validation_1.AuthValidationErrorCode.EmptySignInPassword);
            authParameters.PASSWORD = password;
        }
        authParameters.PREFERRED_CHALLENGE = preferredChallenge;
    }
    const jsonReq = {
        AuthFlow: 'USER_AUTH',
        AuthParameters: authParameters,
        ClientMetadata: clientMetadata,
        ClientId: userPoolClientId,
        UserContextData,
    };
    if (session) {
        jsonReq.Session = session;
    }
    const initiateAuth = (0, cognitoIdentityProvider_1.createInitiateAuthClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const response = await initiateAuth({
        region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
        userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.SignIn),
    }, jsonReq);
    // Set the active username immediately after successful authentication attempt
    // If a user starts a new sign-in while another sign-in is incomplete,
    // this ensures we're tracking the correct user for subsequent auth challenges.
    (0, signInHelpers_1.setActiveSignInUsername)(username);
    return response;
}
exports.handleUserAuthFlow = handleUserAuthFlow;
//# sourceMappingURL=handleUserAuthFlow.js.map
