'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithCustomAuth = void 0;
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const validation_1 = require("../../../errors/types/validation");
const assertValidationError_1 = require("../../../errors/utils/assertValidationError");
const assertServiceError_1 = require("../../../errors/utils/assertServiceError");
const signInHelpers_1 = require("../utils/signInHelpers");
const store_1 = require("../../../client/utils/store");
const cacheTokens_1 = require("../tokenProvider/cacheTokens");
const tokenProvider_1 = require("../tokenProvider");
const dispatchSignedInHubEvent_1 = require("../utils/dispatchSignedInHubEvent");
/**
 * Signs a user in using a custom authentication flow without password
 *
 * @param input -  The SignInWithCustomAuthInput object
 * @returns AuthSignInResult
 * @throws service: {@link InitiateAuthException } - Cognito service errors thrown during the sign-in process.
 * @throws validation: {@link AuthValidationErrorCode  } - Validation errors thrown when either username or password
 *  are not defined.
 * @throws SignInWithCustomAuthOutput - Thrown when the token provider config is invalid.
 */
async function signInWithCustomAuth(input) {
    const authConfig = core_1.Amplify.getConfig().Auth?.Cognito;
    (0, utils_1.assertTokenProviderConfig)(authConfig);
    const { username, password, options } = input;
    const signInDetails = {
        loginId: username,
        authFlowType: 'CUSTOM_WITHOUT_SRP',
    };
    const metadata = options?.clientMetadata;
    (0, assertValidationError_1.assertValidationError)(!!username, validation_1.AuthValidationErrorCode.EmptySignInUsername);
    (0, assertValidationError_1.assertValidationError)(!password, validation_1.AuthValidationErrorCode.CustomAuthSignInPassword);
    try {
        const { ChallengeName: retriedChallengeName, ChallengeParameters: retiredChallengeParameters, AuthenticationResult, Session, } = await (0, signInHelpers_1.retryOnResourceNotFoundException)(signInHelpers_1.handleCustomAuthFlowWithoutSRP, [username, metadata, authConfig, tokenProvider_1.tokenOrchestrator], username, tokenProvider_1.tokenOrchestrator);
        const activeUsername = (0, signInHelpers_1.getActiveSignInUsername)(username);
        // sets up local state used during the sign-in process
        (0, store_1.setActiveSignInState)({
            signInSession: Session,
            username: activeUsername,
            challengeName: retriedChallengeName,
            signInDetails,
        });
        if (AuthenticationResult) {
            (0, store_1.cleanActiveSignInState)();
            await (0, cacheTokens_1.cacheCognitoTokens)({
                username: activeUsername,
                ...AuthenticationResult,
                NewDeviceMetadata: await (0, signInHelpers_1.getNewDeviceMetadata)({
                    userPoolId: authConfig.userPoolId,
                    userPoolEndpoint: authConfig.userPoolEndpoint,
                    newDeviceMetadata: AuthenticationResult.NewDeviceMetadata,
                    accessToken: AuthenticationResult.AccessToken,
                }),
                signInDetails,
            });
            await (0, dispatchSignedInHubEvent_1.dispatchSignedInHubEvent)();
            return {
                isSignedIn: true,
                nextStep: { signInStep: 'DONE' },
            };
        }
        return (0, signInHelpers_1.getSignInResult)({
            challengeName: retriedChallengeName,
            challengeParameters: retiredChallengeParameters,
        });
    }
    catch (error) {
        (0, store_1.cleanActiveSignInState)();
        (0, assertServiceError_1.assertServiceError)(error);
        const result = (0, signInHelpers_1.getSignInResultFromError)(error.name);
        if (result)
            return result;
        throw error;
    }
}
exports.signInWithCustomAuth = signInWithCustomAuth;
//# sourceMappingURL=signInWithCustomAuth.js.map
