import { CognitoUserPoolConfig } from '@aws-amplify/core';
import { ClientMetadata, ConfirmSignInOptions } from '../types';
import { AuthSignInOutput } from '../../../types';
import { AuthMFAType, AuthTOTPSetupDetails, AuthUserAttributes } from '../../../types/models';
import { AuthTokenOrchestrator, DeviceMetadata } from '../tokenProvider/types';
import { ChallengeName, ChallengeParameters, CognitoMFAType, InitiateAuthCommandOutput, NewDeviceMetadataType, RespondToAuthChallengeCommandOutput } from '../../../foundation/factories/serviceClients/cognitoIdentityProvider/types';
import { AuthenticationHelper } from './srp/AuthenticationHelper';
interface HandleAuthChallengeRequest {
    challengeResponse: string;
    username: string;
    clientMetadata?: ClientMetadata;
    session?: string;
    deviceName?: string;
    requiredAttributes?: AuthUserAttributes;
    config: CognitoUserPoolConfig;
}
export declare function handleCustomChallenge({ challengeResponse, clientMetadata, session, username, config, tokenOrchestrator, }: HandleAuthChallengeRequest & {
    tokenOrchestrator: AuthTokenOrchestrator;
}): Promise<RespondToAuthChallengeCommandOutput>;
export declare function handleMFASetupChallenge({ challengeResponse, username, clientMetadata, session, deviceName, config, }: HandleAuthChallengeRequest): Promise<RespondToAuthChallengeCommandOutput>;
export declare function handleSelectMFATypeChallenge({ challengeResponse, username, clientMetadata, session, config, }: HandleAuthChallengeRequest): Promise<RespondToAuthChallengeCommandOutput>;
export declare function handleCompleteNewPasswordChallenge({ challengeResponse, clientMetadata, session, username, requiredAttributes, config, }: HandleAuthChallengeRequest): Promise<RespondToAuthChallengeCommandOutput>;
export declare function handleUserPasswordAuthFlow(username: string, password: string, clientMetadata: ClientMetadata | undefined, config: CognitoUserPoolConfig, tokenOrchestrator: AuthTokenOrchestrator): Promise<InitiateAuthCommandOutput>;
export declare function handleUserSRPAuthFlow(username: string, password: string, clientMetadata: ClientMetadata | undefined, config: CognitoUserPoolConfig, tokenOrchestrator: AuthTokenOrchestrator): Promise<RespondToAuthChallengeCommandOutput>;
export declare function handleCustomAuthFlowWithoutSRP(username: string, clientMetadata: ClientMetadata | undefined, config: CognitoUserPoolConfig, tokenOrchestrator: AuthTokenOrchestrator): Promise<InitiateAuthCommandOutput>;
export declare function handleCustomSRPAuthFlow(username: string, password: string, clientMetadata: ClientMetadata | undefined, config: CognitoUserPoolConfig, tokenOrchestrator: AuthTokenOrchestrator): Promise<RespondToAuthChallengeCommandOutput>;
export declare function handlePasswordVerifierChallenge(password: string, challengeParameters: ChallengeParameters, clientMetadata: ClientMetadata | undefined, session: string | undefined, authenticationHelper: AuthenticationHelper, config: CognitoUserPoolConfig, tokenOrchestrator: AuthTokenOrchestrator): Promise<RespondToAuthChallengeCommandOutput>;
export declare function getSignInResult(params: {
    challengeName: ChallengeName;
    challengeParameters: ChallengeParameters;
    availableChallenges?: ChallengeName[];
}): Promise<AuthSignInOutput>;
export declare function getTOTPSetupDetails(secretCode: string, username?: string): AuthTOTPSetupDetails;
export declare function getSignInResultFromError(errorName: string): AuthSignInOutput | undefined;
export declare function parseAttributes(attributes: string | undefined): string[];
export declare function createAttributes(attributes?: AuthUserAttributes): Record<string, string>;
export declare function handleChallengeName(username: string, challengeName: ChallengeName, session: string, challengeResponse: string, config: CognitoUserPoolConfig, tokenOrchestrator: AuthTokenOrchestrator, clientMetadata?: ClientMetadata, options?: ConfirmSignInOptions): Promise<RespondToAuthChallengeCommandOutput>;
export declare function mapMfaType(mfa: string): CognitoMFAType;
export declare function getMFAType(type?: string): AuthMFAType | undefined;
export declare function getMFATypes(types?: string[]): AuthMFAType[] | undefined;
export declare function parseMFATypes(mfa?: string): CognitoMFAType[];
export declare function getAllowedMfaSetupTypes(availableMfaSetupTypes: AuthMFAType[]): AuthMFAType[];
export declare function assertUserNotAuthenticated(): Promise<void>;
/**
 * This function is used to kick off the device management flow.
 *
 * If an error is thrown while generating a hash device or calling the `ConfirmDevice`
 * client, then this API will ignore the error and return undefined. Otherwise the authentication
 * flow will not complete and the user won't be able to be signed in.
 *
 * @returns DeviceMetadata | undefined
 */
export declare function getNewDeviceMetadata({ userPoolId, userPoolEndpoint, newDeviceMetadata, accessToken, }: {
    userPoolId: string;
    userPoolEndpoint: string | undefined;
    newDeviceMetadata?: NewDeviceMetadataType;
    accessToken?: string;
}): Promise<DeviceMetadata | undefined>;
/**
 * It will retry the function if the error is a `ResourceNotFoundException` and
 * will clean the device keys stored in the storage mechanism.
 *
 */
export declare function retryOnResourceNotFoundException<F extends (...args: any[]) => any>(func: F, args: Parameters<F>, username: string, tokenOrchestrator: AuthTokenOrchestrator): Promise<ReturnType<F>>;
export declare function setActiveSignInUsername(username: string): void;
export declare function getActiveSignInUsername(username: string): string;
export declare function handleMFAChallenge({ challengeName, challengeResponse, clientMetadata, session, username, config, }: HandleAuthChallengeRequest & {
    challengeName: Extract<ChallengeName, 'EMAIL_OTP' | 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' | 'SMS_OTP'>;
}): Promise<RespondToAuthChallengeCommandOutput>;
export {};
