'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithSRP = void 0;
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
const autoSignIn_1 = require("./autoSignIn");
/**
 * Signs a user in
 *
 * @param input - The SignInWithSRPInput object
 * @returns SignInWithSRPOutput
 * @throws service: {@link InitiateAuthException }, {@link RespondToAuthChallengeException } - Cognito service errors
 * thrown during the sign-in process.
 * @throws validation: {@link AuthValidationErrorCode  } - Validation errors thrown when either username or password
 *  are not defined.
 * @throws AuthTokenConfigException - Thrown when the token provider config is invalid.
 */
async function signInWithSRP(input) {
    const { username, password } = input;
    const authConfig = core_1.Amplify.getConfig().Auth?.Cognito;
    const signInDetails = {
        loginId: username,
        authFlowType: 'USER_SRP_AUTH',
    };
    (0, utils_1.assertTokenProviderConfig)(authConfig);
    const clientMetaData = input.options?.clientMetadata;
    (0, assertValidationError_1.assertValidationError)(!!username, validation_1.AuthValidationErrorCode.EmptySignInUsername);
    (0, assertValidationError_1.assertValidationError)(!!password, validation_1.AuthValidationErrorCode.EmptySignInPassword);
    try {
        const { ChallengeName: handledChallengeName, ChallengeParameters: handledChallengeParameters, AuthenticationResult, Session, } = await (0, signInHelpers_1.handleUserSRPAuthFlow)(username, password, clientMetaData, authConfig, tokenProvider_1.tokenOrchestrator);
        const activeUsername = (0, signInHelpers_1.getActiveSignInUsername)(username);
        // sets up local state used during the sign-in process
        (0, store_1.setActiveSignInState)({
            signInSession: Session,
            username: activeUsername,
            challengeName: handledChallengeName,
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
            (0, autoSignIn_1.resetAutoSignIn)();
            return {
                isSignedIn: true,
                nextStep: { signInStep: 'DONE' },
            };
        }
        return (0, signInHelpers_1.getSignInResult)({
            challengeName: handledChallengeName,
            challengeParameters: handledChallengeParameters,
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
exports.signInWithSRP = signInWithSRP;
//# sourceMappingURL=signInWithSRP.js.map
