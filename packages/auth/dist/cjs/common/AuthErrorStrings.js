'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthErrorCodes = exports.AuthErrorStrings = exports.validationErrorMap = void 0;
const validation_1 = require("../errors/types/validation");
exports.validationErrorMap = {
    [validation_1.AuthValidationErrorCode.EmptyChallengeResponse]: {
        message: 'challengeResponse is required to confirmSignIn',
    },
    [validation_1.AuthValidationErrorCode.EmptyConfirmResetPasswordUsername]: {
        message: 'username is required to confirmResetPassword',
    },
    [validation_1.AuthValidationErrorCode.EmptyConfirmSignUpCode]: {
        message: 'code is required to confirmSignUp',
    },
    [validation_1.AuthValidationErrorCode.EmptyConfirmSignUpUsername]: {
        message: 'username is required to confirmSignUp',
    },
    [validation_1.AuthValidationErrorCode.EmptyConfirmResetPasswordConfirmationCode]: {
        message: 'confirmationCode is required to confirmResetPassword',
    },
    [validation_1.AuthValidationErrorCode.EmptyConfirmResetPasswordNewPassword]: {
        message: 'newPassword is required to confirmResetPassword',
    },
    [validation_1.AuthValidationErrorCode.EmptyResendSignUpCodeUsername]: {
        message: 'username is required to confirmSignUp',
    },
    [validation_1.AuthValidationErrorCode.EmptyResetPasswordUsername]: {
        message: 'username is required to resetPassword',
    },
    [validation_1.AuthValidationErrorCode.EmptySignInPassword]: {
        message: 'password is required to signIn',
    },
    [validation_1.AuthValidationErrorCode.EmptySignInUsername]: {
        message: 'username is required to signIn',
    },
    [validation_1.AuthValidationErrorCode.EmptySignUpPassword]: {
        message: 'password is required to signUp',
    },
    [validation_1.AuthValidationErrorCode.EmptySignUpUsername]: {
        message: 'username is required to signUp',
    },
    [validation_1.AuthValidationErrorCode.CustomAuthSignInPassword]: {
        message: 'A password is not needed when signing in with CUSTOM_WITHOUT_SRP',
        recoverySuggestion: 'Do not include a password in your signIn call.',
    },
    [validation_1.AuthValidationErrorCode.IncorrectMFAMethod]: {
        message: 'Incorrect MFA method was chosen. It should be either SMS, TOTP, or EMAIL',
        recoverySuggestion: 'Try to pass SMS, TOTP, or EMAIL as the challengeResponse',
    },
    [validation_1.AuthValidationErrorCode.EmptyVerifyTOTPSetupCode]: {
        message: 'code is required to verifyTotpSetup',
    },
    [validation_1.AuthValidationErrorCode.EmptyUpdatePassword]: {
        message: 'oldPassword and newPassword are required to changePassword',
    },
    [validation_1.AuthValidationErrorCode.EmptyConfirmUserAttributeCode]: {
        message: 'confirmation code is required to confirmUserAttribute',
    },
};
(function (AuthErrorStrings) {
    AuthErrorStrings["DEFAULT_MSG"] = "Authentication Error";
    AuthErrorStrings["EMPTY_EMAIL"] = "Email cannot be empty";
    AuthErrorStrings["EMPTY_PHONE"] = "Phone number cannot be empty";
    AuthErrorStrings["EMPTY_USERNAME"] = "Username cannot be empty";
    AuthErrorStrings["INVALID_USERNAME"] = "The username should either be a string or one of the sign in types";
    AuthErrorStrings["EMPTY_PASSWORD"] = "Password cannot be empty";
    AuthErrorStrings["EMPTY_CODE"] = "Confirmation code cannot be empty";
    AuthErrorStrings["SIGN_UP_ERROR"] = "Error creating account";
    AuthErrorStrings["NO_MFA"] = "No valid MFA method provided";
    AuthErrorStrings["INVALID_MFA"] = "Invalid MFA type";
    AuthErrorStrings["EMPTY_CHALLENGE"] = "Challenge response cannot be empty";
    AuthErrorStrings["NO_USER_SESSION"] = "Failed to get the session because the user is empty";
    AuthErrorStrings["NETWORK_ERROR"] = "Network Error";
    AuthErrorStrings["DEVICE_CONFIG"] = "Device tracking has not been configured in this User Pool";
    AuthErrorStrings["AUTOSIGNIN_ERROR"] = "Please use your credentials to sign in";
    AuthErrorStrings["OAUTH_ERROR"] = "Couldn't finish OAuth flow, check your User Pool HostedUI settings";
})(exports.AuthErrorStrings || (exports.AuthErrorStrings = {}));
(function (AuthErrorCodes) {
    AuthErrorCodes["SignInException"] = "SignInException";
    AuthErrorCodes["OAuthSignInError"] = "OAuthSignInException";
})(exports.AuthErrorCodes || (exports.AuthErrorCodes = {}));
//# sourceMappingURL=AuthErrorStrings.js.map
