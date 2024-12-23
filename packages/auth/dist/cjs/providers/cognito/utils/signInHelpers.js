'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMFAChallenge = exports.getActiveSignInUsername = exports.setActiveSignInUsername = exports.retryOnResourceNotFoundException = exports.getNewDeviceMetadata = exports.assertUserNotAuthenticated = exports.getAllowedMfaSetupTypes = exports.parseMFATypes = exports.getMFATypes = exports.getMFAType = exports.mapMfaType = exports.handleChallengeName = exports.createAttributes = exports.parseAttributes = exports.getSignInResultFromError = exports.getTOTPSetupDetails = exports.getSignInResult = exports.handlePasswordVerifierChallenge = exports.handleCustomSRPAuthFlow = exports.handleCustomAuthFlowWithoutSRP = exports.handleUserSRPAuthFlow = exports.handleUserPasswordAuthFlow = exports.handleCompleteNewPasswordChallenge = exports.handleSelectMFATypeChallenge = exports.handleMFASetupChallenge = exports.handleCustomChallenge = void 0;
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const AuthError_1 = require("../../../errors/AuthError");
const errors_1 = require("../types/errors");
const AuthErrorStrings_1 = require("../../../common/AuthErrorStrings");
const validation_1 = require("../../../errors/types/validation");
const assertValidationError_1 = require("../../../errors/utils/assertValidationError");
const constants_1 = require("../../../errors/constants");
const getCurrentUser_1 = require("../apis/getCurrentUser");
const utils_2 = require("../../../utils");
const cognitoIdentityProvider_1 = require("../../../foundation/factories/serviceClients/cognitoIdentityProvider");
const factories_1 = require("../factories");
const parsers_1 = require("../../../foundation/parsers");
const handleWebAuthnSignInResult_1 = require("../../../client/flows/userAuth/handleWebAuthnSignInResult");
const handlePasswordSRP_1 = require("../../../client/flows/shared/handlePasswordSRP");
const handleSelectChallenge_1 = require("../../../client/flows/userAuth/handleSelectChallenge");
const handleSelectChallengeWithPassword_1 = require("../../../client/flows/userAuth/handleSelectChallengeWithPassword");
const handleSelectChallengeWithPasswordSRP_1 = require("../../../client/flows/userAuth/handleSelectChallengeWithPasswordSRP");
const store_1 = require("../../../client/utils/store");
const types_1 = require("./types");
const srp_1 = require("./srp");
const BigInteger_1 = require("./srp/BigInteger");
const userContextData_1 = require("./userContextData");
const USER_ATTRIBUTES = 'userAttributes.';
async function handleCustomChallenge({ challengeResponse, clientMetadata, session, username, config, tokenOrchestrator, }) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    const challengeResponses = {
        USERNAME: username,
        ANSWER: challengeResponse,
    };
    const deviceMetadata = await tokenOrchestrator?.getDeviceMetadata(username);
    if (deviceMetadata && deviceMetadata.deviceKey) {
        challengeResponses.DEVICE_KEY = deviceMetadata.deviceKey;
    }
    const UserContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const jsonReq = {
        ChallengeName: 'CUSTOM_CHALLENGE',
        ChallengeResponses: challengeResponses,
        Session: session,
        ClientMetadata: clientMetadata,
        ClientId: userPoolClientId,
        UserContextData,
    };
    const respondToAuthChallenge = (0, cognitoIdentityProvider_1.createRespondToAuthChallengeClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const response = await respondToAuthChallenge({
        region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
        userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.ConfirmSignIn),
    }, jsonReq);
    if (response.ChallengeName === 'DEVICE_SRP_AUTH') {
        return handleDeviceSRPAuth({
            username,
            config,
            clientMetadata,
            session: response.Session,
            tokenOrchestrator,
        });
    }
    return response;
}
exports.handleCustomChallenge = handleCustomChallenge;
async function handleMFASetupChallenge({ challengeResponse, username, clientMetadata, session, deviceName, config, }) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    if (challengeResponse === 'EMAIL') {
        return {
            ChallengeName: 'MFA_SETUP',
            Session: session,
            ChallengeParameters: {
                MFAS_CAN_SETUP: '["EMAIL_OTP"]',
            },
            $metadata: {},
        };
    }
    if (challengeResponse === 'TOTP') {
        return {
            ChallengeName: 'MFA_SETUP',
            Session: session,
            ChallengeParameters: {
                MFAS_CAN_SETUP: '["SOFTWARE_TOKEN_MFA"]',
            },
            $metadata: {},
        };
    }
    const challengeResponses = {
        USERNAME: username,
    };
    const isTOTPCode = /^\d+$/.test(challengeResponse);
    if (isTOTPCode) {
        const verifySoftwareToken = (0, cognitoIdentityProvider_1.createVerifySoftwareTokenClient)({
            endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
                endpointOverride: userPoolEndpoint,
            }),
        });
        const { Session } = await verifySoftwareToken({
            region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
            userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.ConfirmSignIn),
        }, {
            UserCode: challengeResponse,
            Session: session,
            FriendlyDeviceName: deviceName,
        });
        store_1.signInStore.dispatch({
            type: 'SET_SIGN_IN_SESSION',
            value: Session,
        });
        const jsonReq = {
            ChallengeName: 'MFA_SETUP',
            ChallengeResponses: challengeResponses,
            Session,
            ClientMetadata: clientMetadata,
            ClientId: userPoolClientId,
        };
        const respondToAuthChallenge = (0, cognitoIdentityProvider_1.createRespondToAuthChallengeClient)({
            endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
                endpointOverride: userPoolEndpoint,
            }),
        });
        return respondToAuthChallenge({
            region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
            userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.ConfirmSignIn),
        }, jsonReq);
    }
    const isEmail = challengeResponse.includes('@');
    if (isEmail) {
        challengeResponses.EMAIL = challengeResponse;
        const jsonReq = {
            ChallengeName: 'MFA_SETUP',
            ChallengeResponses: challengeResponses,
            Session: session,
            ClientMetadata: clientMetadata,
            ClientId: userPoolClientId,
        };
        const respondToAuthChallenge = (0, cognitoIdentityProvider_1.createRespondToAuthChallengeClient)({
            endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
                endpointOverride: userPoolEndpoint,
            }),
        });
        return respondToAuthChallenge({
            region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
            userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.ConfirmSignIn),
        }, jsonReq);
    }
    throw new AuthError_1.AuthError({
        name: AuthErrorStrings_1.AuthErrorCodes.SignInException,
        message: `Cannot proceed with MFA setup using challengeResponse: ${challengeResponse}`,
        recoverySuggestion: 'Try passing "EMAIL", "TOTP", a valid email, or OTP code as the challengeResponse.',
    });
}
exports.handleMFASetupChallenge = handleMFASetupChallenge;
async function handleSelectMFATypeChallenge({ challengeResponse, username, clientMetadata, session, config, }) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    (0, assertValidationError_1.assertValidationError)(challengeResponse === 'TOTP' ||
        challengeResponse === 'SMS' ||
        challengeResponse === 'EMAIL', validation_1.AuthValidationErrorCode.IncorrectMFAMethod);
    const challengeResponses = {
        USERNAME: username,
        ANSWER: mapMfaType(challengeResponse),
    };
    const UserContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const jsonReq = {
        ChallengeName: 'SELECT_MFA_TYPE',
        ChallengeResponses: challengeResponses,
        Session: session,
        ClientMetadata: clientMetadata,
        ClientId: userPoolClientId,
        UserContextData,
    };
    const respondToAuthChallenge = (0, cognitoIdentityProvider_1.createRespondToAuthChallengeClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    return respondToAuthChallenge({
        region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
        userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.ConfirmSignIn),
    }, jsonReq);
}
exports.handleSelectMFATypeChallenge = handleSelectMFATypeChallenge;
async function handleCompleteNewPasswordChallenge({ challengeResponse, clientMetadata, session, username, requiredAttributes, config, }) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    const challengeResponses = {
        ...createAttributes(requiredAttributes),
        NEW_PASSWORD: challengeResponse,
        USERNAME: username,
    };
    const UserContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const jsonReq = {
        ChallengeName: 'NEW_PASSWORD_REQUIRED',
        ChallengeResponses: challengeResponses,
        ClientMetadata: clientMetadata,
        Session: session,
        ClientId: userPoolClientId,
        UserContextData,
    };
    const respondToAuthChallenge = (0, cognitoIdentityProvider_1.createRespondToAuthChallengeClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    return respondToAuthChallenge({
        region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
        userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.ConfirmSignIn),
    }, jsonReq);
}
exports.handleCompleteNewPasswordChallenge = handleCompleteNewPasswordChallenge;
async function handleUserPasswordAuthFlow(username, password, clientMetadata, config, tokenOrchestrator) {
    const { userPoolClientId, userPoolId, userPoolEndpoint } = config;
    const authParameters = {
        USERNAME: username,
        PASSWORD: password,
    };
    const deviceMetadata = await tokenOrchestrator.getDeviceMetadata(username);
    if (deviceMetadata && deviceMetadata.deviceKey) {
        authParameters.DEVICE_KEY = deviceMetadata.deviceKey;
    }
    const UserContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const jsonReq = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: authParameters,
        ClientMetadata: clientMetadata,
        ClientId: userPoolClientId,
        UserContextData,
    };
    const initiateAuth = (0, cognitoIdentityProvider_1.createInitiateAuthClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const response = await initiateAuth({
        region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
        userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.SignIn),
    }, jsonReq);
    const activeUsername = response.ChallengeParameters?.USERNAME ??
        response.ChallengeParameters?.USER_ID_FOR_SRP ??
        username;
    setActiveSignInUsername(activeUsername);
    if (response.ChallengeName === 'DEVICE_SRP_AUTH')
        return handleDeviceSRPAuth({
            username: activeUsername,
            config,
            clientMetadata,
            session: response.Session,
            tokenOrchestrator,
        });
    return response;
}
exports.handleUserPasswordAuthFlow = handleUserPasswordAuthFlow;
async function handleUserSRPAuthFlow(username, password, clientMetadata, config, tokenOrchestrator) {
    return (0, handlePasswordSRP_1.handlePasswordSRP)({
        username,
        password,
        clientMetadata,
        config,
        tokenOrchestrator,
        authFlow: 'USER_SRP_AUTH',
    });
}
exports.handleUserSRPAuthFlow = handleUserSRPAuthFlow;
async function handleCustomAuthFlowWithoutSRP(username, clientMetadata, config, tokenOrchestrator) {
    const { userPoolClientId, userPoolId, userPoolEndpoint } = config;
    const authParameters = {
        USERNAME: username,
    };
    const deviceMetadata = await tokenOrchestrator.getDeviceMetadata(username);
    if (deviceMetadata && deviceMetadata.deviceKey) {
        authParameters.DEVICE_KEY = deviceMetadata.deviceKey;
    }
    const UserContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const jsonReq = {
        AuthFlow: 'CUSTOM_AUTH',
        AuthParameters: authParameters,
        ClientMetadata: clientMetadata,
        ClientId: userPoolClientId,
        UserContextData,
    };
    const initiateAuth = (0, cognitoIdentityProvider_1.createInitiateAuthClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const response = await initiateAuth({
        region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
        userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.SignIn),
    }, jsonReq);
    const activeUsername = response.ChallengeParameters?.USERNAME ?? username;
    setActiveSignInUsername(activeUsername);
    if (response.ChallengeName === 'DEVICE_SRP_AUTH')
        return handleDeviceSRPAuth({
            username: activeUsername,
            config,
            clientMetadata,
            session: response.Session,
            tokenOrchestrator,
        });
    return response;
}
exports.handleCustomAuthFlowWithoutSRP = handleCustomAuthFlowWithoutSRP;
async function handleCustomSRPAuthFlow(username, password, clientMetadata, config, tokenOrchestrator) {
    (0, utils_1.assertTokenProviderConfig)(config);
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    const userPoolName = userPoolId?.split('_')[1] || '';
    const authenticationHelper = await (0, srp_1.getAuthenticationHelper)(userPoolName);
    const authParameters = {
        USERNAME: username,
        SRP_A: authenticationHelper.A.toString(16),
        CHALLENGE_NAME: 'SRP_A',
    };
    const UserContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const jsonReq = {
        AuthFlow: 'CUSTOM_AUTH',
        AuthParameters: authParameters,
        ClientMetadata: clientMetadata,
        ClientId: userPoolClientId,
        UserContextData,
    };
    const initiateAuth = (0, cognitoIdentityProvider_1.createInitiateAuthClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const { ChallengeParameters: challengeParameters, Session: session } = await initiateAuth({
        region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
        userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.SignIn),
    }, jsonReq);
    const activeUsername = challengeParameters?.USERNAME ?? username;
    setActiveSignInUsername(activeUsername);
    return retryOnResourceNotFoundException(handlePasswordVerifierChallenge, [
        password,
        challengeParameters,
        clientMetadata,
        session,
        authenticationHelper,
        config,
        tokenOrchestrator,
    ], activeUsername, tokenOrchestrator);
}
exports.handleCustomSRPAuthFlow = handleCustomSRPAuthFlow;
async function handleDeviceSRPAuth({ username, config, clientMetadata, session, tokenOrchestrator, }) {
    const { userPoolId, userPoolEndpoint } = config;
    const clientId = config.userPoolClientId;
    const deviceMetadata = await tokenOrchestrator?.getDeviceMetadata(username);
    (0, types_1.assertDeviceMetadata)(deviceMetadata);
    const authenticationHelper = await (0, srp_1.getAuthenticationHelper)(deviceMetadata.deviceGroupKey);
    const challengeResponses = {
        USERNAME: username,
        SRP_A: authenticationHelper.A.toString(16),
        DEVICE_KEY: deviceMetadata.deviceKey,
    };
    const jsonReqResponseChallenge = {
        ChallengeName: 'DEVICE_SRP_AUTH',
        ClientId: clientId,
        ChallengeResponses: challengeResponses,
        ClientMetadata: clientMetadata,
        Session: session,
    };
    const respondToAuthChallenge = (0, cognitoIdentityProvider_1.createRespondToAuthChallengeClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const { ChallengeParameters: respondedChallengeParameters, Session } = await respondToAuthChallenge({ region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId) }, jsonReqResponseChallenge);
    return handleDevicePasswordVerifier(username, respondedChallengeParameters, clientMetadata, Session, authenticationHelper, config, tokenOrchestrator);
}
async function handleDevicePasswordVerifier(username, challengeParameters, clientMetadata, session, authenticationHelper, { userPoolId, userPoolClientId, userPoolEndpoint }, tokenOrchestrator) {
    const deviceMetadata = await tokenOrchestrator?.getDeviceMetadata(username);
    (0, types_1.assertDeviceMetadata)(deviceMetadata);
    const serverBValue = new BigInteger_1.BigInteger(challengeParameters?.SRP_B, 16);
    const salt = new BigInteger_1.BigInteger(challengeParameters?.SALT, 16);
    const { deviceKey } = deviceMetadata;
    const { deviceGroupKey } = deviceMetadata;
    const hkdf = await authenticationHelper.getPasswordAuthenticationKey({
        username: deviceMetadata.deviceKey,
        password: deviceMetadata.randomPassword,
        serverBValue,
        salt,
    });
    const dateNow = (0, srp_1.getNowString)();
    const challengeResponses = {
        USERNAME: challengeParameters?.USERNAME ?? username,
        PASSWORD_CLAIM_SECRET_BLOCK: challengeParameters?.SECRET_BLOCK,
        TIMESTAMP: dateNow,
        PASSWORD_CLAIM_SIGNATURE: (0, srp_1.getSignatureString)({
            username: deviceKey,
            userPoolName: deviceGroupKey,
            challengeParameters,
            dateNow,
            hkdf,
        }),
        DEVICE_KEY: deviceKey,
    };
    const UserContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const jsonReqResponseChallenge = {
        ChallengeName: 'DEVICE_PASSWORD_VERIFIER',
        ClientId: userPoolClientId,
        ChallengeResponses: challengeResponses,
        Session: session,
        ClientMetadata: clientMetadata,
        UserContextData,
    };
    const respondToAuthChallenge = (0, cognitoIdentityProvider_1.createRespondToAuthChallengeClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    return respondToAuthChallenge({ region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId) }, jsonReqResponseChallenge);
}
async function handlePasswordVerifierChallenge(password, challengeParameters, clientMetadata, session, authenticationHelper, config, tokenOrchestrator) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    const userPoolName = userPoolId?.split('_')[1] || '';
    const serverBValue = new BigInteger_1.BigInteger(challengeParameters?.SRP_B, 16);
    const salt = new BigInteger_1.BigInteger(challengeParameters?.SALT, 16);
    const username = challengeParameters?.USER_ID_FOR_SRP;
    if (!username)
        throw new AuthError_1.AuthError({
            name: 'EmptyUserIdForSRPException',
            message: 'USER_ID_FOR_SRP was not found in challengeParameters',
        });
    const hkdf = await authenticationHelper.getPasswordAuthenticationKey({
        username,
        password,
        serverBValue,
        salt,
    });
    const dateNow = (0, srp_1.getNowString)();
    const challengeResponses = {
        USERNAME: username,
        PASSWORD_CLAIM_SECRET_BLOCK: challengeParameters?.SECRET_BLOCK,
        TIMESTAMP: dateNow,
        PASSWORD_CLAIM_SIGNATURE: (0, srp_1.getSignatureString)({
            username,
            userPoolName,
            challengeParameters,
            dateNow,
            hkdf,
        }),
    };
    const deviceMetadata = await tokenOrchestrator.getDeviceMetadata(username);
    if (deviceMetadata && deviceMetadata.deviceKey) {
        challengeResponses.DEVICE_KEY = deviceMetadata.deviceKey;
    }
    const UserContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const jsonReqResponseChallenge = {
        ChallengeName: 'PASSWORD_VERIFIER',
        ChallengeResponses: challengeResponses,
        ClientMetadata: clientMetadata,
        Session: session,
        ClientId: userPoolClientId,
        UserContextData,
    };
    const respondToAuthChallenge = (0, cognitoIdentityProvider_1.createRespondToAuthChallengeClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const response = await respondToAuthChallenge({ region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId) }, jsonReqResponseChallenge);
    if (response.ChallengeName === 'DEVICE_SRP_AUTH')
        return handleDeviceSRPAuth({
            username,
            config,
            clientMetadata,
            session: response.Session,
            tokenOrchestrator,
        });
    return response;
}
exports.handlePasswordVerifierChallenge = handlePasswordVerifierChallenge;
async function getSignInResult(params) {
    const { challengeName, challengeParameters, availableChallenges } = params;
    const authConfig = core_1.Amplify.getConfig().Auth?.Cognito;
    (0, utils_1.assertTokenProviderConfig)(authConfig);
    switch (challengeName) {
        case 'CUSTOM_CHALLENGE':
            return {
                isSignedIn: false,
                nextStep: {
                    signInStep: 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE',
                    additionalInfo: challengeParameters,
                },
            };
        case 'MFA_SETUP': {
            const { signInSession, username } = store_1.signInStore.getState();
            const mfaSetupTypes = getMFATypes(parseMFATypes(challengeParameters.MFAS_CAN_SETUP)) || [];
            const allowedMfaSetupTypes = getAllowedMfaSetupTypes(mfaSetupTypes);
            const isTotpMfaSetupAvailable = allowedMfaSetupTypes.includes('TOTP');
            const isEmailMfaSetupAvailable = allowedMfaSetupTypes.includes('EMAIL');
            if (isTotpMfaSetupAvailable && isEmailMfaSetupAvailable) {
                return {
                    isSignedIn: false,
                    nextStep: {
                        signInStep: 'CONTINUE_SIGN_IN_WITH_MFA_SETUP_SELECTION',
                        allowedMFATypes: allowedMfaSetupTypes,
                    },
                };
            }
            if (isEmailMfaSetupAvailable) {
                return {
                    isSignedIn: false,
                    nextStep: {
                        signInStep: 'CONTINUE_SIGN_IN_WITH_EMAIL_SETUP',
                    },
                };
            }
            if (isTotpMfaSetupAvailable) {
                const associateSoftwareToken = (0, cognitoIdentityProvider_1.createAssociateSoftwareTokenClient)({
                    endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
                        endpointOverride: authConfig.userPoolEndpoint,
                    }),
                });
                const { Session, SecretCode: secretCode } = await associateSoftwareToken({ region: (0, parsers_1.getRegionFromUserPoolId)(authConfig.userPoolId) }, {
                    Session: signInSession,
                });
                store_1.signInStore.dispatch({
                    type: 'SET_SIGN_IN_SESSION',
                    value: Session,
                });
                return {
                    isSignedIn: false,
                    nextStep: {
                        signInStep: 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP',
                        totpSetupDetails: getTOTPSetupDetails(secretCode, username),
                    },
                };
            }
            throw new AuthError_1.AuthError({
                name: AuthErrorStrings_1.AuthErrorCodes.SignInException,
                message: `Cannot initiate MFA setup from available types: ${mfaSetupTypes}`,
            });
        }
        case 'NEW_PASSWORD_REQUIRED':
            return {
                isSignedIn: false,
                nextStep: {
                    signInStep: 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED',
                    missingAttributes: parseAttributes(challengeParameters.requiredAttributes),
                },
            };
        case 'SELECT_MFA_TYPE':
            return {
                isSignedIn: false,
                nextStep: {
                    signInStep: 'CONTINUE_SIGN_IN_WITH_MFA_SELECTION',
                    allowedMFATypes: getMFATypes(parseMFATypes(challengeParameters.MFAS_CAN_CHOOSE)),
                },
            };
        case 'SMS_OTP':
        case 'SMS_MFA':
            return {
                isSignedIn: false,
                nextStep: {
                    signInStep: 'CONFIRM_SIGN_IN_WITH_SMS_CODE',
                    codeDeliveryDetails: {
                        deliveryMedium: challengeParameters.CODE_DELIVERY_DELIVERY_MEDIUM,
                        destination: challengeParameters.CODE_DELIVERY_DESTINATION,
                    },
                },
            };
        case 'SOFTWARE_TOKEN_MFA':
            return {
                isSignedIn: false,
                nextStep: {
                    signInStep: 'CONFIRM_SIGN_IN_WITH_TOTP_CODE',
                },
            };
        case 'EMAIL_OTP':
            return {
                isSignedIn: false,
                nextStep: {
                    signInStep: 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE',
                    codeDeliveryDetails: {
                        deliveryMedium: challengeParameters.CODE_DELIVERY_DELIVERY_MEDIUM,
                        destination: challengeParameters.CODE_DELIVERY_DESTINATION,
                    },
                },
            };
        case 'WEB_AUTHN':
            return (0, handleWebAuthnSignInResult_1.handleWebAuthnSignInResult)(challengeParameters);
        case 'PASSWORD':
        case 'PASSWORD_SRP':
            return {
                isSignedIn: false,
                nextStep: {
                    signInStep: 'CONFIRM_SIGN_IN_WITH_PASSWORD',
                },
            };
        case 'SELECT_CHALLENGE':
            return {
                isSignedIn: false,
                nextStep: {
                    signInStep: 'CONTINUE_SIGN_IN_WITH_FIRST_FACTOR_SELECTION',
                    availableChallenges,
                },
            };
    }
    // TODO: remove this error message for production apps
    throw new AuthError_1.AuthError({
        name: AuthErrorStrings_1.AuthErrorCodes.SignInException,
        message: 'An error occurred during the sign in process. ' +
            `${challengeName} challengeName returned by the underlying service was not addressed.`,
    });
}
exports.getSignInResult = getSignInResult;
function getTOTPSetupDetails(secretCode, username) {
    return {
        sharedSecret: secretCode,
        getSetupUri: (appName, accountName) => {
            const totpUri = `otpauth://totp/${appName}:${accountName ?? username}?secret=${secretCode}&issuer=${appName}`;
            return new utils_1.AmplifyUrl(totpUri);
        },
    };
}
exports.getTOTPSetupDetails = getTOTPSetupDetails;
function getSignInResultFromError(errorName) {
    if (errorName === errors_1.InitiateAuthException.PasswordResetRequiredException) {
        return {
            isSignedIn: false,
            nextStep: { signInStep: 'RESET_PASSWORD' },
        };
    }
    else if (errorName === errors_1.InitiateAuthException.UserNotConfirmedException) {
        return {
            isSignedIn: false,
            nextStep: { signInStep: 'CONFIRM_SIGN_UP' },
        };
    }
}
exports.getSignInResultFromError = getSignInResultFromError;
function parseAttributes(attributes) {
    if (!attributes)
        return [];
    const parsedAttributes = JSON.parse(attributes).map(att => att.includes(USER_ATTRIBUTES) ? att.replace(USER_ATTRIBUTES, '') : att);
    return parsedAttributes;
}
exports.parseAttributes = parseAttributes;
function createAttributes(attributes) {
    if (!attributes)
        return {};
    const newAttributes = {};
    Object.entries(attributes).forEach(([key, value]) => {
        if (value)
            newAttributes[`${USER_ATTRIBUTES}${key}`] = value;
    });
    return newAttributes;
}
exports.createAttributes = createAttributes;
async function handleChallengeName(username, challengeName, session, challengeResponse, config, tokenOrchestrator, clientMetadata, options) {
    const userAttributes = options?.userAttributes;
    const deviceName = options?.friendlyDeviceName;
    switch (challengeName) {
        case 'WEB_AUTHN':
        case 'SELECT_CHALLENGE':
            if (challengeResponse === 'PASSWORD_SRP' ||
                challengeResponse === 'PASSWORD') {
                return {
                    ChallengeName: challengeResponse,
                    Session: session,
                    $metadata: {},
                };
            }
            return (0, handleSelectChallenge_1.initiateSelectedChallenge)({
                username,
                session,
                selectedChallenge: challengeResponse,
                config,
                clientMetadata,
            });
        case 'SELECT_MFA_TYPE':
            return handleSelectMFATypeChallenge({
                challengeResponse,
                clientMetadata,
                session,
                username,
                config,
            });
        case 'MFA_SETUP':
            return handleMFASetupChallenge({
                challengeResponse,
                clientMetadata,
                session,
                username,
                deviceName,
                config,
            });
        case 'NEW_PASSWORD_REQUIRED':
            return handleCompleteNewPasswordChallenge({
                challengeResponse,
                clientMetadata,
                session,
                username,
                requiredAttributes: userAttributes,
                config,
            });
        case 'CUSTOM_CHALLENGE':
            return retryOnResourceNotFoundException(handleCustomChallenge, [
                {
                    challengeResponse,
                    clientMetadata,
                    session,
                    username,
                    config,
                    tokenOrchestrator,
                },
            ], username, tokenOrchestrator);
        case 'SMS_MFA':
        case 'SOFTWARE_TOKEN_MFA':
        case 'SMS_OTP':
        case 'EMAIL_OTP':
            return handleMFAChallenge({
                challengeName,
                challengeResponse,
                clientMetadata,
                session,
                username,
                config,
            });
        case 'PASSWORD':
            return (0, handleSelectChallengeWithPassword_1.handleSelectChallengeWithPassword)(username, challengeResponse, clientMetadata, config, session);
        case 'PASSWORD_SRP':
            return (0, handleSelectChallengeWithPasswordSRP_1.handleSelectChallengeWithPasswordSRP)(username, challengeResponse, // This is the actual password
            clientMetadata, config, session, tokenOrchestrator);
    }
    // TODO: remove this error message for production apps
    throw new AuthError_1.AuthError({
        name: AuthErrorStrings_1.AuthErrorCodes.SignInException,
        message: `An error occurred during the sign in process.
		${challengeName} challengeName returned by the underlying service was not addressed.`,
    });
}
exports.handleChallengeName = handleChallengeName;
function mapMfaType(mfa) {
    let mfaType = 'SMS_MFA';
    if (mfa === 'TOTP')
        mfaType = 'SOFTWARE_TOKEN_MFA';
    if (mfa === 'EMAIL')
        mfaType = 'EMAIL_OTP';
    return mfaType;
}
exports.mapMfaType = mapMfaType;
function getMFAType(type) {
    if (type === 'SMS_MFA')
        return 'SMS';
    if (type === 'SOFTWARE_TOKEN_MFA')
        return 'TOTP';
    if (type === 'EMAIL_OTP')
        return 'EMAIL';
    // TODO: log warning for unknown MFA type
}
exports.getMFAType = getMFAType;
function getMFATypes(types) {
    if (!types)
        return undefined;
    return types.map(getMFAType).filter(Boolean);
}
exports.getMFATypes = getMFATypes;
function parseMFATypes(mfa) {
    if (!mfa)
        return [];
    return JSON.parse(mfa);
}
exports.parseMFATypes = parseMFATypes;
function getAllowedMfaSetupTypes(availableMfaSetupTypes) {
    return availableMfaSetupTypes.filter(authMfaType => authMfaType === 'EMAIL' || authMfaType === 'TOTP');
}
exports.getAllowedMfaSetupTypes = getAllowedMfaSetupTypes;
async function assertUserNotAuthenticated() {
    let authUser;
    try {
        authUser = await (0, getCurrentUser_1.getCurrentUser)();
    }
    catch (error) { }
    if (authUser && authUser.userId && authUser.username) {
        throw new AuthError_1.AuthError({
            name: constants_1.USER_ALREADY_AUTHENTICATED_EXCEPTION,
            message: 'There is already a signed in user.',
            recoverySuggestion: 'Call signOut before calling signIn again.',
        });
    }
}
exports.assertUserNotAuthenticated = assertUserNotAuthenticated;
/**
 * This function is used to kick off the device management flow.
 *
 * If an error is thrown while generating a hash device or calling the `ConfirmDevice`
 * client, then this API will ignore the error and return undefined. Otherwise the authentication
 * flow will not complete and the user won't be able to be signed in.
 *
 * @returns DeviceMetadata | undefined
 */
async function getNewDeviceMetadata({ userPoolId, userPoolEndpoint, newDeviceMetadata, accessToken, }) {
    if (!newDeviceMetadata)
        return undefined;
    const userPoolName = userPoolId.split('_')[1] || '';
    const authenticationHelper = await (0, srp_1.getAuthenticationHelper)(userPoolName);
    const deviceKey = newDeviceMetadata?.DeviceKey;
    const deviceGroupKey = newDeviceMetadata?.DeviceGroupKey;
    try {
        await authenticationHelper.generateHashDevice(deviceGroupKey ?? '', deviceKey ?? '');
    }
    catch (errGenHash) {
        // TODO: log error here
        return undefined;
    }
    const deviceSecretVerifierConfig = {
        Salt: utils_1.base64Encoder.convert((0, srp_1.getBytesFromHex)(authenticationHelper.getSaltToHashDevices())),
        PasswordVerifier: utils_1.base64Encoder.convert((0, srp_1.getBytesFromHex)(authenticationHelper.getVerifierDevices())),
    };
    const randomPassword = authenticationHelper.getRandomPassword();
    try {
        const confirmDevice = (0, cognitoIdentityProvider_1.createConfirmDeviceClient)({
            endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
                endpointOverride: userPoolEndpoint,
            }),
        });
        await confirmDevice({ region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId) }, {
            AccessToken: accessToken,
            DeviceName: await (0, utils_1.getDeviceName)(),
            DeviceKey: newDeviceMetadata?.DeviceKey,
            DeviceSecretVerifierConfig: deviceSecretVerifierConfig,
        });
        return {
            deviceKey,
            deviceGroupKey,
            randomPassword,
        };
    }
    catch (error) {
        // TODO: log error here
        return undefined;
    }
}
exports.getNewDeviceMetadata = getNewDeviceMetadata;
/**
 * It will retry the function if the error is a `ResourceNotFoundException` and
 * will clean the device keys stored in the storage mechanism.
 *
 */
async function retryOnResourceNotFoundException(func, args, username, tokenOrchestrator) {
    try {
        return await func(...args);
    }
    catch (error) {
        if (error instanceof AuthError_1.AuthError &&
            error.name === 'ResourceNotFoundException' &&
            error.message.includes('Device does not exist.')) {
            await tokenOrchestrator.clearDeviceMetadata(username);
            return func(...args);
        }
        throw error;
    }
}
exports.retryOnResourceNotFoundException = retryOnResourceNotFoundException;
function setActiveSignInUsername(username) {
    const { dispatch } = store_1.signInStore;
    dispatch({ type: 'SET_USERNAME', value: username });
}
exports.setActiveSignInUsername = setActiveSignInUsername;
function getActiveSignInUsername(username) {
    const state = store_1.signInStore.getState();
    return state.username ?? username;
}
exports.getActiveSignInUsername = getActiveSignInUsername;
async function handleMFAChallenge({ challengeName, challengeResponse, clientMetadata, session, username, config, }) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    const challengeResponses = {
        USERNAME: username,
    };
    if (challengeName === 'EMAIL_OTP') {
        challengeResponses.EMAIL_OTP_CODE = challengeResponse;
    }
    if (challengeName === 'SMS_MFA') {
        challengeResponses.SMS_MFA_CODE = challengeResponse;
    }
    if (challengeName === 'SMS_OTP') {
        challengeResponses.SMS_OTP_CODE = challengeResponse;
    }
    if (challengeName === 'SOFTWARE_TOKEN_MFA') {
        challengeResponses.SOFTWARE_TOKEN_MFA_CODE = challengeResponse;
    }
    const userContextData = (0, userContextData_1.getUserContextData)({
        username,
        userPoolId,
        userPoolClientId,
    });
    const jsonReq = {
        ChallengeName: challengeName,
        ChallengeResponses: challengeResponses,
        Session: session,
        ClientMetadata: clientMetadata,
        ClientId: userPoolClientId,
        UserContextData: userContextData,
    };
    const respondToAuthChallenge = (0, cognitoIdentityProvider_1.createRespondToAuthChallengeClient)({
        endpointResolver: (0, factories_1.createCognitoUserPoolEndpointResolver)({
            endpointOverride: userPoolEndpoint,
        }),
    });
    return respondToAuthChallenge({
        region: (0, parsers_1.getRegionFromUserPoolId)(userPoolId),
        userAgentValue: (0, utils_2.getAuthUserAgentValue)(utils_1.AuthAction.ConfirmSignIn),
    }, jsonReq);
}
exports.handleMFAChallenge = handleMFAChallenge;
//# sourceMappingURL=signInHelpers.js.map
