'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmSignIn = void 0;
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const store_1 = require("../../../client/utils/store");
const AuthError_1 = require("../../../errors/AuthError");
const signInHelpers_1 = require("../utils/signInHelpers");
const assertServiceError_1 = require("../../../errors/utils/assertServiceError");
const assertValidationError_1 = require("../../../errors/utils/assertValidationError");
const validation_1 = require("../../../errors/types/validation");
const AuthErrorStrings_1 = require("../../../common/AuthErrorStrings");
const cacheTokens_1 = require("../tokenProvider/cacheTokens");
const tokenProvider_1 = require("../tokenProvider");
const dispatchSignedInHubEvent_1 = require("../utils/dispatchSignedInHubEvent");
/**
 * Continues or completes the sign in process when required by the initial call to `signIn`.
 *
 * @param input -  The ConfirmSignInInput object
 * @returns ConfirmSignInOutput
 * @throws  -{@link VerifySoftwareTokenException }:
 * Thrown due to an invalid MFA token.
 * @throws  -{@link RespondToAuthChallengeException }:
 * Thrown due to an invalid auth challenge response.
 * @throws  -{@link AssociateSoftwareTokenException}:
 * Thrown due to a service error during the MFA setup process.
 * @throws  -{@link AuthValidationErrorCode }:
 * Thrown when `challengeResponse` is not defined.
 * @throws AuthTokenConfigException - Thrown when the token provider config is invalid.
 */
async function confirmSignIn(input) {
    const { challengeResponse, options } = input;
    const { username, challengeName, signInSession, signInDetails } = store_1.signInStore.getState();
    const authConfig = core_1.Amplify.getConfig().Auth?.Cognito;
    (0, utils_1.assertTokenProviderConfig)(authConfig);
    const clientMetaData = options?.clientMetadata;
    (0, assertValidationError_1.assertValidationError)(!!challengeResponse, validation_1.AuthValidationErrorCode.EmptyChallengeResponse);
    if (!username || !challengeName || !signInSession)
        // TODO: remove this error message for production apps
        throw new AuthError_1.AuthError({
            name: AuthErrorStrings_1.AuthErrorCodes.SignInException,
            message: `
			An error occurred during the sign in process.

			This most likely occurred due to:
			1. signIn was not called before confirmSignIn.
			2. signIn threw an exception.
			3. page was refreshed during the sign in flow.
			`,
            recoverySuggestion: 'Make sure a successful call to signIn is made before calling confirmSignIn' +
                'and that the page is not refreshed until the sign in process is done.',
        });
    try {
        const { Session, ChallengeName: handledChallengeName, AuthenticationResult, ChallengeParameters: handledChallengeParameters, } = await (0, signInHelpers_1.handleChallengeName)(username, challengeName, signInSession, challengeResponse, authConfig, tokenProvider_1.tokenOrchestrator, clientMetaData, options);
        // sets up local state used during the sign-in process
        (0, store_1.setActiveSignInState)({
            signInSession: Session,
            username,
            challengeName: handledChallengeName,
            signInDetails,
        });
        if (AuthenticationResult) {
            (0, store_1.cleanActiveSignInState)();
            await (0, cacheTokens_1.cacheCognitoTokens)({
                username,
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
            challengeName: handledChallengeName,
            challengeParameters: handledChallengeParameters,
        });
    }
    catch (error) {
        (0, assertServiceError_1.assertServiceError)(error);
        const result = (0, signInHelpers_1.getSignInResultFromError)(error.name);
        if (result)
            return result;
        throw error;
    }
}
exports.confirmSignIn = confirmSignIn;
//# sourceMappingURL=confirmSignIn.js.map
