'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebAuthnSignInResult = void 0;
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const AuthErrorStrings_1 = require("../../../common/AuthErrorStrings");
const cognitoIdentityProvider_1 = require("../../../foundation/factories/serviceClients/cognitoIdentityProvider");
const parsers_1 = require("../../../foundation/parsers");
const factories_1 = require("../../../providers/cognito/factories");
const cacheTokens_1 = require("../../../providers/cognito/tokenProvider/cacheTokens");
const dispatchSignedInHubEvent_1 = require("../../../providers/cognito/utils/dispatchSignedInHubEvent");
const signInHelpers_1 = require("../../../providers/cognito/utils/signInHelpers");
const store_1 = require("../../../client/utils/store");
const utils_2 = require("../../../utils");
const passkey_1 = require("../../utils/passkey");
const errors_1 = require("../../utils/passkey/errors");
const AuthError_1 = require("../../../errors/AuthError");
async function handleWebAuthnSignInResult(challengeParameters) {
    const authConfig = core_1.Amplify.getConfig().Auth?.Cognito;
    (0, utils_1.assertTokenProviderConfig)(authConfig);
    const { username, signInSession, signInDetails, challengeName } = store_1.signInStore.getState();
    if (challengeName !== 'WEB_AUTHN' || !username) {
        throw new AuthError_1.AuthError({
            name: AuthErrorStrings_1.AuthErrorCodes.SignInException,
            message: 'Unable to proceed due to invalid sign in state.',
        });
    }
    const { CREDENTIAL_REQUEST_OPTIONS: credentialRequestOptions } = challengeParameters;
    (0, errors_1.assertPasskeyError)(!!credentialRequestOptions, errors_1.PasskeyErrorCode.InvalidPasskeyAuthenticationOptions);
    const cred = await (0, passkey_1.getPasskey)(JSON.parse(credentialRequestOptions));
    const respondToAuthChallenge = (0, cognitoIdentityProvider_1.createRespondToAuthChallengeClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: authConfig.userPoolEndpoint,
        }),
    });
    const { ChallengeName: nextChallengeName, ChallengeParameters: nextChallengeParameters, AuthenticationResult: authenticationResult, Session: nextSession, } = await respondToAuthChallenge({
        region: (0, parsers_1.getRegionFromUserPoolId)(authConfig.userPoolId),
        userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.ConfirmSignIn),
    }, {
        ChallengeName: 'WEB_AUTHN',
        ChallengeResponses: {
            USERNAME: username,
            CREDENTIAL: JSON.stringify(cred),
        },
        ClientId: authConfig.userPoolClientId,
        Session: signInSession,
    });
    (0, store_1.setActiveSignInState)({
        signInSession: nextSession,
        username,
        challengeName: nextChallengeName,
        signInDetails,
    });
    if (authenticationResult) {
        await (0, cacheTokens_1.cacheCognitoTokens)({
            ...authenticationResult,
            username,
            NewDeviceMetadata: await (0, signInHelpers_1.getNewDeviceMetadata)({
                userPoolId: authConfig.userPoolId,
                userPoolEndpoint: authConfig.userPoolEndpoint,
                newDeviceMetadata: authenticationResult.NewDeviceMetadata,
                accessToken: authenticationResult.AccessToken,
            }),
            signInDetails,
        });
        (0, store_1.cleanActiveSignInState)();
        await (0, dispatchSignedInHubEvent_1.dispatchSignedInHubEvent)();
        return {
            isSignedIn: true,
            nextStep: { signInStep: 'DONE' },
        };
    }
    if (nextChallengeName === 'WEB_AUTHN') {
        throw new AuthError_1.AuthError({
            name: AuthErrorStrings_1.AuthErrorCodes.SignInException,
            message: 'Sequential WEB_AUTHN challenges returned from underlying service cannot be handled.',
        });
    }
    return (0, signInHelpers_1.getSignInResult)({
        challengeName: nextChallengeName,
        challengeParameters: nextChallengeParameters,
    });
}
exports.handleWebAuthnSignInResult = handleWebAuthnSignInResult;
//# sourceMappingURL=handleWebAuthnSignInResult.js.map
