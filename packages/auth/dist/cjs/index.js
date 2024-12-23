'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWebAuthnCredential = exports.listWebAuthnCredentials = exports.associateWebAuthnCredential = exports.decodeJWT = exports.fetchAuthSession = exports.AuthError = exports.autoSignIn = exports.fetchDevices = exports.forgetDevice = exports.rememberDevice = exports.deleteUser = exports.deleteUserAttributes = exports.sendUserAttributeVerificationCode = exports.signOut = exports.fetchUserAttributes = exports.signInWithRedirect = exports.confirmUserAttribute = exports.getCurrentUser = exports.updateUserAttribute = exports.updateUserAttributes = exports.setUpTOTP = exports.updatePassword = exports.verifyTOTPSetup = exports.fetchMFAPreference = exports.updateMFAPreference = exports.confirmSignIn = exports.confirmSignUp = exports.resendSignUpCode = exports.signIn = exports.confirmResetPassword = exports.resetPassword = exports.signUp = void 0;
// Default provider APIs, types & enums
var cognito_1 = require("./providers/cognito");
Object.defineProperty(exports, "signUp", { enumerable: true, get: function () { return cognito_1.signUp; } });
Object.defineProperty(exports, "resetPassword", { enumerable: true, get: function () { return cognito_1.resetPassword; } });
Object.defineProperty(exports, "confirmResetPassword", { enumerable: true, get: function () { return cognito_1.confirmResetPassword; } });
Object.defineProperty(exports, "signIn", { enumerable: true, get: function () { return cognito_1.signIn; } });
Object.defineProperty(exports, "resendSignUpCode", { enumerable: true, get: function () { return cognito_1.resendSignUpCode; } });
Object.defineProperty(exports, "confirmSignUp", { enumerable: true, get: function () { return cognito_1.confirmSignUp; } });
Object.defineProperty(exports, "confirmSignIn", { enumerable: true, get: function () { return cognito_1.confirmSignIn; } });
Object.defineProperty(exports, "updateMFAPreference", { enumerable: true, get: function () { return cognito_1.updateMFAPreference; } });
Object.defineProperty(exports, "fetchMFAPreference", { enumerable: true, get: function () { return cognito_1.fetchMFAPreference; } });
Object.defineProperty(exports, "verifyTOTPSetup", { enumerable: true, get: function () { return cognito_1.verifyTOTPSetup; } });
Object.defineProperty(exports, "updatePassword", { enumerable: true, get: function () { return cognito_1.updatePassword; } });
Object.defineProperty(exports, "setUpTOTP", { enumerable: true, get: function () { return cognito_1.setUpTOTP; } });
Object.defineProperty(exports, "updateUserAttributes", { enumerable: true, get: function () { return cognito_1.updateUserAttributes; } });
Object.defineProperty(exports, "updateUserAttribute", { enumerable: true, get: function () { return cognito_1.updateUserAttribute; } });
Object.defineProperty(exports, "getCurrentUser", { enumerable: true, get: function () { return cognito_1.getCurrentUser; } });
Object.defineProperty(exports, "confirmUserAttribute", { enumerable: true, get: function () { return cognito_1.confirmUserAttribute; } });
Object.defineProperty(exports, "signInWithRedirect", { enumerable: true, get: function () { return cognito_1.signInWithRedirect; } });
Object.defineProperty(exports, "fetchUserAttributes", { enumerable: true, get: function () { return cognito_1.fetchUserAttributes; } });
Object.defineProperty(exports, "signOut", { enumerable: true, get: function () { return cognito_1.signOut; } });
Object.defineProperty(exports, "sendUserAttributeVerificationCode", { enumerable: true, get: function () { return cognito_1.sendUserAttributeVerificationCode; } });
Object.defineProperty(exports, "deleteUserAttributes", { enumerable: true, get: function () { return cognito_1.deleteUserAttributes; } });
Object.defineProperty(exports, "deleteUser", { enumerable: true, get: function () { return cognito_1.deleteUser; } });
Object.defineProperty(exports, "rememberDevice", { enumerable: true, get: function () { return cognito_1.rememberDevice; } });
Object.defineProperty(exports, "forgetDevice", { enumerable: true, get: function () { return cognito_1.forgetDevice; } });
Object.defineProperty(exports, "fetchDevices", { enumerable: true, get: function () { return cognito_1.fetchDevices; } });
Object.defineProperty(exports, "autoSignIn", { enumerable: true, get: function () { return cognito_1.autoSignIn; } });
var AuthError_1 = require("./errors/AuthError");
Object.defineProperty(exports, "AuthError", { enumerable: true, get: function () { return AuthError_1.AuthError; } });
var core_1 = require("@aws-amplify/core");
Object.defineProperty(exports, "fetchAuthSession", { enumerable: true, get: function () { return core_1.fetchAuthSession; } });
Object.defineProperty(exports, "decodeJWT", { enumerable: true, get: function () { return core_1.decodeJWT; } });
var apis_1 = require("./client/apis");
Object.defineProperty(exports, "associateWebAuthnCredential", { enumerable: true, get: function () { return apis_1.associateWebAuthnCredential; } });
var apis_2 = require("./client/apis");
Object.defineProperty(exports, "listWebAuthnCredentials", { enumerable: true, get: function () { return apis_2.listWebAuthnCredentials; } });
Object.defineProperty(exports, "deleteWebAuthnCredential", { enumerable: true, get: function () { return apis_2.deleteWebAuthnCredential; } });
//# sourceMappingURL=index.js.map
