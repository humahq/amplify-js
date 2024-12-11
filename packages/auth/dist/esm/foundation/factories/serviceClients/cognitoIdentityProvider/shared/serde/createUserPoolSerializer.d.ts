import { Endpoint, HttpRequest } from '@aws-amplify/core/internals/aws-client-utils';
type ClientOperation = 'SignUp' | 'ConfirmSignUp' | 'ForgotPassword' | 'ConfirmForgotPassword' | 'InitiateAuth' | 'RespondToAuthChallenge' | 'ResendConfirmationCode' | 'VerifySoftwareToken' | 'AssociateSoftwareToken' | 'SetUserMFAPreference' | 'GetUser' | 'ChangePassword' | 'ConfirmDevice' | 'ForgetDevice' | 'DeleteUser' | 'GetUserAttributeVerificationCode' | 'GlobalSignOut' | 'UpdateUserAttributes' | 'VerifyUserAttribute' | 'DeleteUserAttributes' | 'UpdateDeviceStatus' | 'ListDevices' | 'RevokeToken' | 'StartWebAuthnRegistration' | 'CompleteWebAuthnRegistration' | 'ListWebAuthnCredentials' | 'DeleteWebAuthnCredential';
export declare const createUserPoolSerializer: <Input>(operation: ClientOperation) => (input: Input, endpoint: Endpoint) => HttpRequest;
export {};