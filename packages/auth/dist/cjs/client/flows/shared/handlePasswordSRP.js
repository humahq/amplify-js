'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePasswordSRP = void 0;
const utils_1 = require("@aws-amplify/core/internals/utils");
const userContextData_1 = require("../../../providers/cognito/utils/userContextData");
const srp_1 = require("../../../providers/cognito/utils/srp");
const signInHelpers_1 = require("../../../providers/cognito/utils/signInHelpers");
const cognitoIdentityProvider_1 = require("../../../foundation/factories/serviceClients/cognitoIdentityProvider");
const factories_1 = require("../../../providers/cognito/factories");
const parsers_1 = require("../../../foundation/parsers");
const utils_2 = require("../../../utils");
/**
 * Handles the Password SRP (Secure Remote Password) authentication flow.
 * This function can be used with both USER_SRP_AUTH and USER_AUTH flows.
 *
 * @param {Object} params - The parameters for the Password SRP authentication
 * @param {string} params.username - The username for authentication
 * @param {string} params.password - The user's password
 * @param {ClientMetadata} [params.clientMetadata] - Optional metadata to be sent with auth requests
 * @param {CognitoUserPoolConfig} params.config - Cognito User Pool configuration
 * @param {AuthTokenOrchestrator} params.tokenOrchestrator - Token orchestrator for managing auth tokens
 * @param {AuthFlowType} params.authFlow - The type of authentication flow ('USER_SRP_AUTH' or 'USER_AUTH')
 * @param {AuthFactorType} [params.preferredChallenge] - Optional preferred challenge type when using USER_AUTH flow
 *
 * @returns {Promise<RespondToAuthChallengeCommandOutput>} The authentication response
 */
async function handlePasswordSRP({ username, password, clientMetadata, config, tokenOrchestrator, authFlow, preferredChallenge, }) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    const userPoolName = userPoolId?.split('_')[1] || '';
    const authenticationHelper = await (0, srp_1.getAuthenticationHelper)(userPoolName);
    const authParameters = {
        USERNAME: username,
        SRP_A: authenticationHelper.A.toString(16),
    };
    if (authFlow === 'USER_AUTH' && preferredChallenge) {
        authParameters.PREFERRED_CHALLENGE = preferredChallenge;
    }
    const UserContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const jsonReq = {
        AuthFlow: authFlow,
        AuthParameters: authParameters,
        ClientMetadata: clientMetadata,
        ClientId: userPoolClientId,
        UserContextData,
    };
    const initiateAuth = (0, cognitoIdentityProvider_1.createInitiateAuthClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const resp = await initiateAuth({
        region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
        userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.SignIn),
    }, jsonReq);
    const { ChallengeParameters: challengeParameters, Session: session } = resp;
    const activeUsername = challengeParameters?.USERNAME ?? username;
    (0, signInHelpers_1.setActiveSignInUsername)(activeUsername);
    if (resp.ChallengeName === 'PASSWORD_VERIFIER') {
        return (0, signInHelpers_1.retryOnResourceNotFoundException)(signInHelpers_1.handlePasswordVerifierChallenge, [
            password,
            challengeParameters,
            clientMetadata,
            session,
            authenticationHelper,
            config,
            tokenOrchestrator,
        ], activeUsername, tokenOrchestrator);
    }
    return resp;
}
exports.handlePasswordSRP = handlePasswordSRP;
//# sourceMappingURL=handlePasswordSRP.js.map
