'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAuthTokensWithoutDedupe = exports.refreshAuthTokens = exports.DefaultTokenStore = exports.TokenOrchestrator = exports.cognitoUserPoolsTokenProvider = exports.DefaultIdentityIdStore = exports.CognitoAWSCredentialsAndIdentityIdProvider = exports.cognitoCredentialsProvider = exports.autoSignIn = exports.fetchDevices = exports.forgetDevice = exports.rememberDevice = exports.deleteUser = exports.deleteUserAttributes = exports.sendUserAttributeVerificationCode = exports.signOut = exports.fetchUserAttributes = exports.signInWithRedirect = exports.confirmUserAttribute = exports.getCurrentUser = exports.updateUserAttribute = exports.updateUserAttributes = exports.setUpTOTP = exports.updatePassword = exports.verifyTOTPSetup = exports.fetchMFAPreference = exports.updateMFAPreference = exports.confirmSignIn = exports.confirmSignUp = exports.resendSignUpCode = exports.signIn = exports.confirmResetPassword = exports.resetPassword = exports.signUp = void 0;
var signUp_1 = require("./apis/signUp");
Object.defineProperty(exports, "signUp", { enumerable: true, get: function () { return signUp_1.signUp; } });
var resetPassword_1 = require("./apis/resetPassword");
Object.defineProperty(exports, "resetPassword", { enumerable: true, get: function () { return resetPassword_1.resetPassword; } });
var confirmResetPassword_1 = require("./apis/confirmResetPassword");
Object.defineProperty(exports, "confirmResetPassword", { enumerable: true, get: function () { return confirmResetPassword_1.confirmResetPassword; } });
var signIn_1 = require("./apis/signIn");
Object.defineProperty(exports, "signIn", { enumerable: true, get: function () { return signIn_1.signIn; } });
var resendSignUpCode_1 = require("./apis/resendSignUpCode");
Object.defineProperty(exports, "resendSignUpCode", { enumerable: true, get: function () { return resendSignUpCode_1.resendSignUpCode; } });
var confirmSignUp_1 = require("./apis/confirmSignUp");
Object.defineProperty(exports, "confirmSignUp", { enumerable: true, get: function () { return confirmSignUp_1.confirmSignUp; } });
var confirmSignIn_1 = require("./apis/confirmSignIn");
Object.defineProperty(exports, "confirmSignIn", { enumerable: true, get: function () { return confirmSignIn_1.confirmSignIn; } });
var updateMFAPreference_1 = require("./apis/updateMFAPreference");
Object.defineProperty(exports, "updateMFAPreference", { enumerable: true, get: function () { return updateMFAPreference_1.updateMFAPreference; } });
var fetchMFAPreference_1 = require("./apis/fetchMFAPreference");
Object.defineProperty(exports, "fetchMFAPreference", { enumerable: true, get: function () { return fetchMFAPreference_1.fetchMFAPreference; } });
var verifyTOTPSetup_1 = require("./apis/verifyTOTPSetup");
Object.defineProperty(exports, "verifyTOTPSetup", { enumerable: true, get: function () { return verifyTOTPSetup_1.verifyTOTPSetup; } });
var updatePassword_1 = require("./apis/updatePassword");
Object.defineProperty(exports, "updatePassword", { enumerable: true, get: function () { return updatePassword_1.updatePassword; } });
var setUpTOTP_1 = require("./apis/setUpTOTP");
Object.defineProperty(exports, "setUpTOTP", { enumerable: true, get: function () { return setUpTOTP_1.setUpTOTP; } });
var updateUserAttributes_1 = require("./apis/updateUserAttributes");
Object.defineProperty(exports, "updateUserAttributes", { enumerable: true, get: function () { return updateUserAttributes_1.updateUserAttributes; } });
var updateUserAttribute_1 = require("./apis/updateUserAttribute");
Object.defineProperty(exports, "updateUserAttribute", { enumerable: true, get: function () { return updateUserAttribute_1.updateUserAttribute; } });
var getCurrentUser_1 = require("./apis/getCurrentUser");
Object.defineProperty(exports, "getCurrentUser", { enumerable: true, get: function () { return getCurrentUser_1.getCurrentUser; } });
var confirmUserAttribute_1 = require("./apis/confirmUserAttribute");
Object.defineProperty(exports, "confirmUserAttribute", { enumerable: true, get: function () { return confirmUserAttribute_1.confirmUserAttribute; } });
var signInWithRedirect_1 = require("./apis/signInWithRedirect");
Object.defineProperty(exports, "signInWithRedirect", { enumerable: true, get: function () { return signInWithRedirect_1.signInWithRedirect; } });
var fetchUserAttributes_1 = require("./apis/fetchUserAttributes");
Object.defineProperty(exports, "fetchUserAttributes", { enumerable: true, get: function () { return fetchUserAttributes_1.fetchUserAttributes; } });
var signOut_1 = require("./apis/signOut");
Object.defineProperty(exports, "signOut", { enumerable: true, get: function () { return signOut_1.signOut; } });
var sendUserAttributeVerificationCode_1 = require("./apis/sendUserAttributeVerificationCode");
Object.defineProperty(exports, "sendUserAttributeVerificationCode", { enumerable: true, get: function () { return sendUserAttributeVerificationCode_1.sendUserAttributeVerificationCode; } });
var deleteUserAttributes_1 = require("./apis/deleteUserAttributes");
Object.defineProperty(exports, "deleteUserAttributes", { enumerable: true, get: function () { return deleteUserAttributes_1.deleteUserAttributes; } });
var deleteUser_1 = require("./apis/deleteUser");
Object.defineProperty(exports, "deleteUser", { enumerable: true, get: function () { return deleteUser_1.deleteUser; } });
var rememberDevice_1 = require("./apis/rememberDevice");
Object.defineProperty(exports, "rememberDevice", { enumerable: true, get: function () { return rememberDevice_1.rememberDevice; } });
var forgetDevice_1 = require("./apis/forgetDevice");
Object.defineProperty(exports, "forgetDevice", { enumerable: true, get: function () { return forgetDevice_1.forgetDevice; } });
var fetchDevices_1 = require("./apis/fetchDevices");
Object.defineProperty(exports, "fetchDevices", { enumerable: true, get: function () { return fetchDevices_1.fetchDevices; } });
var autoSignIn_1 = require("./apis/autoSignIn");
Object.defineProperty(exports, "autoSignIn", { enumerable: true, get: function () { return autoSignIn_1.autoSignIn; } });
var credentialsProvider_1 = require("./credentialsProvider");
Object.defineProperty(exports, "cognitoCredentialsProvider", { enumerable: true, get: function () { return credentialsProvider_1.cognitoCredentialsProvider; } });
Object.defineProperty(exports, "CognitoAWSCredentialsAndIdentityIdProvider", { enumerable: true, get: function () { return credentialsProvider_1.CognitoAWSCredentialsAndIdentityIdProvider; } });
Object.defineProperty(exports, "DefaultIdentityIdStore", { enumerable: true, get: function () { return credentialsProvider_1.DefaultIdentityIdStore; } });
var tokenProvider_1 = require("./tokenProvider");
Object.defineProperty(exports, "cognitoUserPoolsTokenProvider", { enumerable: true, get: function () { return tokenProvider_1.cognitoUserPoolsTokenProvider; } });
Object.defineProperty(exports, "TokenOrchestrator", { enumerable: true, get: function () { return tokenProvider_1.TokenOrchestrator; } });
Object.defineProperty(exports, "DefaultTokenStore", { enumerable: true, get: function () { return tokenProvider_1.DefaultTokenStore; } });
Object.defineProperty(exports, "refreshAuthTokens", { enumerable: true, get: function () { return tokenProvider_1.refreshAuthTokens; } });
Object.defineProperty(exports, "refreshAuthTokensWithoutDedupe", { enumerable: true, get: function () { return tokenProvider_1.refreshAuthTokensWithoutDedupe; } });
//# sourceMappingURL=index.js.map
