'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithUserAuth = void 0;
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const validation_1 = require("../../../errors/types/validation");
const assertValidationError_1 = require("../../../errors/utils/assertValidationError");
const assertServiceError_1 = require("../../../errors/utils/assertServiceError");
const signInHelpers_1 = require("../utils/signInHelpers");
const store_1 = require("../../../client/utils/store");
const cacheTokens_1 = require("../tokenProvider/cacheTokens");
const dispatchSignedInHubEvent_1 = require("../utils/dispatchSignedInHubEvent");
const tokenProvider_1 = require("../tokenProvider");
const handleUserAuthFlow_1 = require("../../../client/flows/userAuth/handleUserAuthFlow");
const autoSignIn_1 = require("./autoSignIn");
/**
 * Signs a user in through a registered email or phone number without a password by by receiving and entering an OTP.
 *
 * @param input - The SignInWithUserAuthInput object
 * @returns SignInWithUserAuthOutput
 * @throws service: {@link InitiateAuthException }, {@link RespondToAuthChallengeException } - Cognito service errors
 * thrown during the sign-in process.
 * @throws validation: {@link AuthValidationErrorCode  } - Validation errors thrown when either username or password -- needs to change
 *  are not defined.
 * @throws AuthTokenConfigException - Thrown when the token provider config is invalid.
 */
async function signInWithUserAuth(input) {
    const { username, password, options } = input;
    const authConfig = core_1.Amplify.getConfig().Auth?.Cognito;
    const signInDetails = {
        loginId: username,
        authFlowType: 'USER_AUTH',
    };
    (0, utils_1.assertTokenProviderConfig)(authConfig);
    const clientMetaData = options?.clientMetadata;
    const preferredChallenge = options?.preferredChallenge;
    (0, assertValidationError_1.assertValidationError)(!!username, validation_1.AuthValidationErrorCode.EmptySignInUsername);
    try {
        const handleUserAuthFlowInput = {
            username,
            config: authConfig,
            tokenOrchestrator: tokenProvider_1.tokenOrchestrator,
            clientMetadata: clientMetaData,
            preferredChallenge,
            password,
        };
        const autoSignInStoreState = store_1.autoSignInStore.getState();
        if (autoSignInStoreState.active &&
            autoSignInStoreState.username === username) {
            handleUserAuthFlowInput.session = autoSignInStoreState.session;
        }
        const response = await (0, handleUserAuthFlow_1.handleUserAuthFlow)(handleUserAuthFlowInput);
        const activeUsername = (0, signInHelpers_1.getActiveSignInUsername)(username);
        (0, store_1.setActiveSignInState)({
            signInSession: response.Session,
            username: activeUsername,
            challengeName: response.ChallengeName,
            signInDetails,
        });
        if (response.AuthenticationResult) {
            (0, store_1.cleanActiveSignInState)();
            await (0, cacheTokens_1.cacheCognitoTokens)({
                username: activeUsername,
                ...response.AuthenticationResult,
                NewDeviceMetadata: await (0, signInHelpers_1.getNewDeviceMetadata)({
                    userPoolId: authConfig.userPoolId,
                    userPoolEndpoint: authConfig.userPoolEndpoint,
                    newDeviceMetadata: response.AuthenticationResult.NewDeviceMetadata,
                    accessToken: response.AuthenticationResult.AccessToken,
                }),
                signInDetails,
            });
            await (0, dispatchSignedInHubEvent_1.dispatchSignedInHubEvent)();
            (0, autoSignIn_1.resetAutoSignIn)();
            return {
                isSignedIn: true,
                nextStep: { signInStep: 'DONE' },
            };
        }
        return (0, signInHelpers_1.getSignInResult)({
            challengeName: response.ChallengeName,
            challengeParameters: response.ChallengeParameters,
            availableChallenges: 'AvailableChallenges' in response
                ? response.AvailableChallenges
                : undefined,
        });
    }
    catch (error) {
        (0, store_1.cleanActiveSignInState)();
        (0, autoSignIn_1.resetAutoSignIn)();
        (0, assertServiceError_1.assertServiceError)(error);
        const result = (0, signInHelpers_1.getSignInResultFromError)(error.name);
        if (result)
            return result;
        throw error;
    }
}
exports.signInWithUserAuth = signInWithUserAuth;
//# sourceMappingURL=signInWithUserAuth.js.map
