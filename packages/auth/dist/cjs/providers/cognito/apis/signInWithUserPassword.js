'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithUserPassword = void 0;
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const validation_1 = require("../../../errors/types/validation");
const assertServiceError_1 = require("../../../errors/utils/assertServiceError");
const assertValidationError_1 = require("../../../errors/utils/assertValidationError");
const signInHelpers_1 = require("../utils/signInHelpers");
const store_1 = require("../../../client/utils/store");
const cacheTokens_1 = require("../tokenProvider/cacheTokens");
const tokenProvider_1 = require("../tokenProvider");
const dispatchSignedInHubEvent_1 = require("../utils/dispatchSignedInHubEvent");
const autoSignIn_1 = require("./autoSignIn");
/**
 * Signs a user in using USER_PASSWORD_AUTH AuthFlowType
 *
 * @param input - The SignInWithUserPasswordInput object
 * @returns SignInWithUserPasswordOutput
 * @throws service: {@link InitiateAuthException } - Cognito service error thrown during the sign-in process.
 * @throws validation: {@link AuthValidationErrorCode  } - Validation errors thrown when either username or password
 *  are not defined.
 * @throws AuthTokenConfigException - Thrown when the token provider config is invalid.
 */
async function signInWithUserPassword(input) {
    const { username, password, options } = input;
    const authConfig = core_1.Amplify.getConfig().Auth?.Cognito;
    const signInDetails = {
        loginId: username,
        authFlowType: 'USER_PASSWORD_AUTH',
    };
    (0, utils_1.assertTokenProviderConfig)(authConfig);
    const metadata = options?.clientMetadata;
    (0, assertValidationError_1.assertValidationError)(!!username, validation_1.AuthValidationErrorCode.EmptySignInUsername);
    (0, assertValidationError_1.assertValidationError)(!!password, validation_1.AuthValidationErrorCode.EmptySignInPassword);
    try {
        const { ChallengeName: retiredChallengeName, ChallengeParameters: retriedChallengeParameters, AuthenticationResult, Session, } = await (0, signInHelpers_1.retryOnResourceNotFoundException)(signInHelpers_1.handleUserPasswordAuthFlow, [username, password, metadata, authConfig, tokenProvider_1.tokenOrchestrator], username, tokenProvider_1.tokenOrchestrator);
        const activeUsername = (0, signInHelpers_1.getActiveSignInUsername)(username);
        // sets up local state used during the sign-in process
        (0, store_1.setActiveSignInState)({
            signInSession: Session,
            username: activeUsername,
            challengeName: retiredChallengeName,
            signInDetails,
        });
        if (AuthenticationResult) {
            (0, store_1.cleanActiveSignInState)();
            await (0, cacheTokens_1.cacheCognitoTokens)({
                ...AuthenticationResult,
                username: activeUsername,
                NewDeviceMetadata: await (0, signInHelpers_1.getNewDeviceMetadata)({
                    userPoolId: authConfig.userPoolId,
                    userPoolEndpoint: authConfig.userPoolEndpoint,
                    newDeviceMetadata: AuthenticationResult.NewDeviceMetadata,
                    accessToken: AuthenticationResult.AccessToken,
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
            challengeName: retiredChallengeName,
            challengeParameters: retriedChallengeParameters,
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
exports.signInWithUserPassword = signInWithUserPassword;
//# sourceMappingURL=signInWithUserPassword.js.map
