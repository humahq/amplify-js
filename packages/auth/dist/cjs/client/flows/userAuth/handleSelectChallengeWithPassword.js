'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSelectChallengeWithPassword = void 0;
const utils_1 = require("@aws-amplify/core/internals/utils");
const cognitoIdentityProvider_1 = require("../../../foundation/factories/serviceClients/cognitoIdentityProvider");
const factories_1 = require("../../../providers/cognito/factories");
const parsers_1 = require("../../../foundation/parsers");
const utils_2 = require("../../../utils");
const userContextData_1 = require("../../../providers/cognito/utils/userContextData");
const signInHelpers_1 = require("../../../providers/cognito/utils/signInHelpers");
/**
 * Handles the SELECT_CHALLENGE response specifically for Password authentication.
 * This function combines the SELECT_CHALLENGE flow with standard password authentication.
 *
 * @param {string} username - The username for authentication
 * @param {string} password - The user's password
 * @param {ClientMetadata} [clientMetadata] - Optional metadata to be sent with auth requests
 * @param {CognitoUserPoolConfig} config - Cognito User Pool configuration
 * @param {string} session - The current authentication session token
 *
 * @returns {Promise<RespondToAuthChallengeCommandOutput>} The challenge response
 */
async function handleSelectChallengeWithPassword(username, password, clientMetadata, config, session) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    const authParameters = {
        ANSWER: 'PASSWORD',
        USERNAME: username,
        PASSWORD: password,
    };
    const userContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const respondToAuthChallenge = (0, cognitoIdentityProvider_1.createRespondToAuthChallengeClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const response = await respondToAuthChallenge({
        region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
        userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.ConfirmSignIn),
    }, {
        ChallengeName: 'SELECT_CHALLENGE',
        ChallengeResponses: authParameters,
        ClientId: userPoolClientId,
        ClientMetadata: clientMetadata,
        Session: session,
        UserContextData: userContextData,
    });
    const activeUsername = response.ChallengeParameters?.USERNAME ?? username;
    (0, signInHelpers_1.setActiveSignInUsername)(activeUsername);
    return response;
}
exports.handleSelectChallengeWithPassword = handleSelectChallengeWithPassword;
//# sourceMappingURL=handleSelectChallengeWithPassword.js.map