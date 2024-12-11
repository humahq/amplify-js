import { Amplify } from '@aws-amplify/core';
import { assertTokenProviderConfig } from '@aws-amplify/core/internals/utils';
import '../../../client/utils/store/autoSignInStore.mjs';
import { signInStore, setActiveSignInState, cleanActiveSignInState } from '../../../client/utils/store/signInStore.mjs';
import { AuthError } from '../../../errors/AuthError.mjs';
import { handleChallengeName, getNewDeviceMetadata, getSignInResult, getSignInResultFromError } from '../utils/signInHelpers.mjs';
import { assertServiceError } from '../../../errors/utils/assertServiceError.mjs';
import { assertValidationError } from '../../../errors/utils/assertValidationError.mjs';
import { AuthValidationErrorCode } from '../../../errors/types/validation.mjs';
import { AuthErrorCodes } from '../../../common/AuthErrorStrings.mjs';
import { cacheCognitoTokens } from '../tokenProvider/cacheTokens.mjs';
import '../utils/refreshAuthTokens.mjs';
import '../tokenProvider/errorHelpers.mjs';
import '../utils/types.mjs';
import { tokenOrchestrator } from '../tokenProvider/tokenProvider.mjs';
import { dispatchSignedInHubEvent } from '../utils/dispatchSignedInHubEvent.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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
    const { username, challengeName, signInSession, signInDetails } = signInStore.getState();
    const authConfig = Amplify.getConfig().Auth?.Cognito;
    assertTokenProviderConfig(authConfig);
    const clientMetaData = options?.clientMetadata;
    assertValidationError(!!challengeResponse, AuthValidationErrorCode.EmptyChallengeResponse);
    if (!username || !challengeName || !signInSession)
        // TODO: remove this error message for production apps
        throw new AuthError({
            name: AuthErrorCodes.SignInException,
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
        const { Session, ChallengeName: handledChallengeName, AuthenticationResult, ChallengeParameters: handledChallengeParameters, } = await handleChallengeName(username, challengeName, signInSession, challengeResponse, authConfig, tokenOrchestrator, clientMetaData, options);
        // sets up local state used during the sign-in process
        setActiveSignInState({
            signInSession: Session,
            username,
            challengeName: handledChallengeName,
            signInDetails,
        });
        if (AuthenticationResult) {
            cleanActiveSignInState();
            await cacheCognitoTokens({
                username,
                ...AuthenticationResult,
                NewDeviceMetadata: await getNewDeviceMetadata({
                    userPoolId: authConfig.userPoolId,
                    userPoolEndpoint: authConfig.userPoolEndpoint,
                    newDeviceMetadata: AuthenticationResult.NewDeviceMetadata,
                    accessToken: AuthenticationResult.AccessToken,
                }),
                signInDetails,
            });
            await dispatchSignedInHubEvent();
            return {
                isSignedIn: true,
                nextStep: { signInStep: 'DONE' },
            };
        }
        return getSignInResult({
            challengeName: handledChallengeName,
            challengeParameters: handledChallengeParameters,
        });
    }
    catch (error) {
        assertServiceError(error);
        const result = getSignInResultFromError(error.name);
        if (result)
            return result;
        throw error;
    }
}

export { confirmSignIn };
//# sourceMappingURL=confirmSignIn.mjs.map
