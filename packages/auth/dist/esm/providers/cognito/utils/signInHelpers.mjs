import { Amplify } from '@aws-amplify/core';
import { AuthAction, assertTokenProviderConfig, AmplifyUrl, base64Encoder, getDeviceName } from '@aws-amplify/core/internals/utils';
import { AuthError } from '../../../errors/AuthError.mjs';
import { InitiateAuthException } from '../types/errors.mjs';
import { AuthErrorCodes } from '../../../common/AuthErrorStrings.mjs';
import { AuthValidationErrorCode } from '../../../errors/types/validation.mjs';
import { assertValidationError } from '../../../errors/utils/assertValidationError.mjs';
import { USER_ALREADY_AUTHENTICATED_EXCEPTION } from '../../../errors/constants.mjs';
import { getCurrentUser } from '../apis/getCurrentUser.mjs';
import { getAuthUserAgentValue } from '../../../utils/getAuthUserAgentValue.mjs';
import { createInitiateAuthClient } from '../../../foundation/factories/serviceClients/cognitoIdentityProvider/createInitiateAuthClient.mjs';
import '@aws-amplify/core/internals/aws-client-utils/composers';
import '../../../foundation/factories/serviceClients/cognitoIdentityProvider/shared/handler/cognitoUserPoolTransferHandler.mjs';
import '@aws-amplify/core/internals/aws-client-utils';
import '../../../foundation/factories/serviceClients/cognitoIdentityProvider/constants.mjs';
import { createRespondToAuthChallengeClient } from '../../../foundation/factories/serviceClients/cognitoIdentityProvider/createRespondToAuthChallengeClient.mjs';
import { createVerifySoftwareTokenClient } from '../../../foundation/factories/serviceClients/cognitoIdentityProvider/createVerifySoftwareTokenClient.mjs';
import { createAssociateSoftwareTokenClient } from '../../../foundation/factories/serviceClients/cognitoIdentityProvider/createAssociateSoftwareTokenClient.mjs';
import { createConfirmDeviceClient } from '../../../foundation/factories/serviceClients/cognitoIdentityProvider/createConfirmDeviceClient.mjs';
import { createCognitoUserPoolEndpointResolver } from '../factories/createCognitoUserPoolEndpointResolver.mjs';
import { getRegionFromUserPoolId } from '../../../foundation/parsers/regionParsers.mjs';
import { handleWebAuthnSignInResult } from '../../../client/flows/userAuth/handleWebAuthnSignInResult.mjs';
import { handlePasswordSRP } from '../../../client/flows/shared/handlePasswordSRP.mjs';
import { initiateSelectedChallenge } from '../../../client/flows/userAuth/handleSelectChallenge.mjs';
import { handleSelectChallengeWithPassword } from '../../../client/flows/userAuth/handleSelectChallengeWithPassword.mjs';
import { handleSelectChallengeWithPasswordSRP } from '../../../client/flows/userAuth/handleSelectChallengeWithPasswordSRP.mjs';
import '../../../client/utils/store/autoSignInStore.mjs';
import { signInStore } from '../../../client/utils/store/signInStore.mjs';
import { assertDeviceMetadata } from './types.mjs';
import { getAuthenticationHelper } from './srp/getAuthenticationHelper.mjs';
import { getBytesFromHex } from './srp/getBytesFromHex.mjs';
import { getNowString } from './srp/getNowString.mjs';
import { getSignatureString } from './srp/getSignatureString.mjs';
import BigInteger from './srp/BigInteger/BigInteger.mjs';
import { getUserContextData } from './userContextData.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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
    const UserContextData = getUserContextData({
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
    const respondToAuthChallenge = createRespondToAuthChallengeClient({
        endpointResolver: createCognitoUserPoolEndpointResolver({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const response = await respondToAuthChallenge({
        region: getRegionFromUserPoolId(userPoolId),
        userAgentValue: getAuthUserAgentValue(AuthAction.ConfirmSignIn),
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
        const verifySoftwareToken = createVerifySoftwareTokenClient({
            endpointResolver: createCognitoUserPoolEndpointResolver({
                endpointOverride: userPoolEndpoint,
            }),
        });
        const { Session } = await verifySoftwareToken({
            region: getRegionFromUserPoolId(userPoolId),
            userAgentValue: getAuthUserAgentValue(AuthAction.ConfirmSignIn),
        }, {
            UserCode: challengeResponse,
            Session: session,
            FriendlyDeviceName: deviceName,
        });
        signInStore.dispatch({
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
        const respondToAuthChallenge = createRespondToAuthChallengeClient({
            endpointResolver: createCognitoUserPoolEndpointResolver({
                endpointOverride: userPoolEndpoint,
            }),
        });
        return respondToAuthChallenge({
            region: getRegionFromUserPoolId(userPoolId),
            userAgentValue: getAuthUserAgentValue(AuthAction.ConfirmSignIn),
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
        const respondToAuthChallenge = createRespondToAuthChallengeClient({
            endpointResolver: createCognitoUserPoolEndpointResolver({
                endpointOverride: userPoolEndpoint,
            }),
        });
        return respondToAuthChallenge({
            region: getRegionFromUserPoolId(userPoolId),
            userAgentValue: getAuthUserAgentValue(AuthAction.ConfirmSignIn),
        }, jsonReq);
    }
    throw new AuthError({
        name: AuthErrorCodes.SignInException,
        message: `Cannot proceed with MFA setup using challengeResponse: ${challengeResponse}`,
        recoverySuggestion: 'Try passing "EMAIL", "TOTP", a valid email, or OTP code as the challengeResponse.',
    });
}
async function handleSelectMFATypeChallenge({ challengeResponse, username, clientMetadata, session, config, }) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    assertValidationError(challengeResponse === 'TOTP' ||
        challengeResponse === 'SMS' ||
        challengeResponse === 'EMAIL', AuthValidationErrorCode.IncorrectMFAMethod);
    const challengeResponses = {
        USERNAME: username,
        ANSWER: mapMfaType(challengeResponse),
    };
    const UserContextData = getUserContextData({
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
    const respondToAuthChallenge = createRespondToAuthChallengeClient({
        endpointResolver: createCognitoUserPoolEndpointResolver({
            endpointOverride: userPoolEndpoint,
        }),
    });
    return respondToAuthChallenge({
        region: getRegionFromUserPoolId(userPoolId),
        userAgentValue: getAuthUserAgentValue(AuthAction.ConfirmSignIn),
    }, jsonReq);
}
async function handleCompleteNewPasswordChallenge({ challengeResponse, clientMetadata, session, username, requiredAttributes, config, }) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    const challengeResponses = {
        ...createAttributes(requiredAttributes),
        NEW_PASSWORD: challengeResponse,
        USERNAME: username,
    };
    const UserContextData = getUserContextData({
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
    const respondToAuthChallenge = createRespondToAuthChallengeClient({
        endpointResolver: createCognitoUserPoolEndpointResolver({
            endpointOverride: userPoolEndpoint,
        }),
    });
    return respondToAuthChallenge({
        region: getRegionFromUserPoolId(userPoolId),
        userAgentValue: getAuthUserAgentValue(AuthAction.ConfirmSignIn),
    }, jsonReq);
}
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
    const UserContextData = getUserContextData({
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
    const initiateAuth = createInitiateAuthClient({
        endpointResolver: createCognitoUserPoolEndpointResolver({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const response = await initiateAuth({
        region: getRegionFromUserPoolId(userPoolId),
        userAgentValue: getAuthUserAgentValue(AuthAction.SignIn),
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
async function handleUserSRPAuthFlow(username, password, clientMetadata, config, tokenOrchestrator) {
    return handlePasswordSRP({
        username,
        password,
        clientMetadata,
        config,
        tokenOrchestrator,
        authFlow: 'USER_SRP_AUTH',
    });
}
async function handleCustomAuthFlowWithoutSRP(username, clientMetadata, config, tokenOrchestrator) {
    const { userPoolClientId, userPoolId, userPoolEndpoint } = config;
    const authParameters = {
        USERNAME: username,
    };
    const deviceMetadata = await tokenOrchestrator.getDeviceMetadata(username);
    if (deviceMetadata && deviceMetadata.deviceKey) {
        authParameters.DEVICE_KEY = deviceMetadata.deviceKey;
    }
    const UserContextData = getUserContextData({
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
    const initiateAuth = createInitiateAuthClient({
        endpointResolver: createCognitoUserPoolEndpointResolver({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const response = await initiateAuth({
        region: getRegionFromUserPoolId(userPoolId),
        userAgentValue: getAuthUserAgentValue(AuthAction.SignIn),
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
async function handleCustomSRPAuthFlow(username, password, clientMetadata, config, tokenOrchestrator) {
    assertTokenProviderConfig(config);
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    const userPoolName = userPoolId?.split('_')[1] || '';
    const authenticationHelper = await getAuthenticationHelper(userPoolName);
    const authParameters = {
        USERNAME: username,
        SRP_A: authenticationHelper.A.toString(16),
        CHALLENGE_NAME: 'SRP_A',
    };
    const UserContextData = getUserContextData({
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
    const initiateAuth = createInitiateAuthClient({
        endpointResolver: createCognitoUserPoolEndpointResolver({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const { ChallengeParameters: challengeParameters, Session: session } = await initiateAuth({
        region: getRegionFromUserPoolId(userPoolId),
        userAgentValue: getAuthUserAgentValue(AuthAction.SignIn),
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
async function handleDeviceSRPAuth({ username, config, clientMetadata, session, tokenOrchestrator, }) {
    const { userPoolId, userPoolEndpoint } = config;
    const clientId = config.userPoolClientId;
    const deviceMetadata = await tokenOrchestrator?.getDeviceMetadata(username);
    assertDeviceMetadata(deviceMetadata);
    const authenticationHelper = await getAuthenticationHelper(deviceMetadata.deviceGroupKey);
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
    const respondToAuthChallenge = createRespondToAuthChallengeClient({
        endpointResolver: createCognitoUserPoolEndpointResolver({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const { ChallengeParameters: respondedChallengeParameters, Session } = await respondToAuthChallenge({ region: getRegionFromUserPoolId(userPoolId) }, jsonReqResponseChallenge);
    return handleDevicePasswordVerifier(username, respondedChallengeParameters, clientMetadata, Session, authenticationHelper, config, tokenOrchestrator);
}
async function handleDevicePasswordVerifier(username, challengeParameters, clientMetadata, session, authenticationHelper, { userPoolId, userPoolClientId, userPoolEndpoint }, tokenOrchestrator) {
    const deviceMetadata = await tokenOrchestrator?.getDeviceMetadata(username);
    assertDeviceMetadata(deviceMetadata);
    const serverBValue = new BigInteger(challengeParameters?.SRP_B, 16);
    const salt = new BigInteger(challengeParameters?.SALT, 16);
    const { deviceKey } = deviceMetadata;
    const { deviceGroupKey } = deviceMetadata;
    const hkdf = await authenticationHelper.getPasswordAuthenticationKey({
        username: deviceMetadata.deviceKey,
        password: deviceMetadata.randomPassword,
        serverBValue,
        salt,
    });
    const dateNow = getNowString();
    const challengeResponses = {
        USERNAME: challengeParameters?.USERNAME ?? username,
        PASSWORD_CLAIM_SECRET_BLOCK: challengeParameters?.SECRET_BLOCK,
        TIMESTAMP: dateNow,
        PASSWORD_CLAIM_SIGNATURE: getSignatureString({
            username: deviceKey,
            userPoolName: deviceGroupKey,
            challengeParameters,
            dateNow,
            hkdf,
        }),
        DEVICE_KEY: deviceKey,
    };
    const UserContextData = getUserContextData({
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
    const respondToAuthChallenge = createRespondToAuthChallengeClient({
        endpointResolver: createCognitoUserPoolEndpointResolver({
            endpointOverride: userPoolEndpoint,
        }),
    });
    return respondToAuthChallenge({ region: getRegionFromUserPoolId(userPoolId) }, jsonReqResponseChallenge);
}
async function handlePasswordVerifierChallenge(password, challengeParameters, clientMetadata, session, authenticationHelper, config, tokenOrchestrator) {
    const { userPoolId, userPoolClientId, userPoolEndpoint } = config;
    const userPoolName = userPoolId?.split('_')[1] || '';
    const serverBValue = new BigInteger(challengeParameters?.SRP_B, 16);
    const salt = new BigInteger(challengeParameters?.SALT, 16);
    const username = challengeParameters?.USER_ID_FOR_SRP;
    if (!username)
        throw new AuthError({
            name: 'EmptyUserIdForSRPException',
            message: 'USER_ID_FOR_SRP was not found in challengeParameters',
        });
    const hkdf = await authenticationHelper.getPasswordAuthenticationKey({
        username,
        password,
        serverBValue,
        salt,
    });
    const dateNow = getNowString();
    const challengeResponses = {
        USERNAME: username,
        PASSWORD_CLAIM_SECRET_BLOCK: challengeParameters?.SECRET_BLOCK,
        TIMESTAMP: dateNow,
        PASSWORD_CLAIM_SIGNATURE: getSignatureString({
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
    const UserContextData = getUserContextData({
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
    const respondToAuthChallenge = createRespondToAuthChallengeClient({
        endpointResolver: createCognitoUserPoolEndpointResolver({
            endpointOverride: userPoolEndpoint,
        }),
    });
    const response = await respondToAuthChallenge({ region: getRegionFromUserPoolId(userPoolId) }, jsonReqResponseChallenge);
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
async function getSignInResult(params) {
    const { challengeName, challengeParameters, availableChallenges } = params;
    const authConfig = Amplify.getConfig().Auth?.Cognito;
    assertTokenProviderConfig(authConfig);
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
            const { signInSession, username } = signInStore.getState();
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
                const associateSoftwareToken = createAssociateSoftwareTokenClient({
                    endpointResolver: createCognitoUserPoolEndpointResolver({
                        endpointOverride: authConfig.userPoolEndpoint,
                    }),
                });
                const { Session, SecretCode: secretCode } = await associateSoftwareToken({ region: getRegionFromUserPoolId(authConfig.userPoolId) }, {
                    Session: signInSession,
                });
                signInStore.dispatch({
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
            throw new AuthError({
                name: AuthErrorCodes.SignInException,
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
            return handleWebAuthnSignInResult(challengeParameters);
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
    throw new AuthError({
        name: AuthErrorCodes.SignInException,
        message: 'An error occurred during the sign in process. ' +
            `${challengeName} challengeName returned by the underlying service was not addressed.`,
    });
}
function getTOTPSetupDetails(secretCode, username) {
    return {
        sharedSecret: secretCode,
        getSetupUri: (appName, accountName) => {
            const totpUri = `otpauth://totp/${appName}:${accountName ?? username}?secret=${secretCode}&issuer=${appName}`;
            return new AmplifyUrl(totpUri);
        },
    };
}
function getSignInResultFromError(errorName) {
    if (errorName === InitiateAuthException.PasswordResetRequiredException) {
        return {
            isSignedIn: false,
            nextStep: { signInStep: 'RESET_PASSWORD' },
        };
    }
    else if (errorName === InitiateAuthException.UserNotConfirmedException) {
        return {
            isSignedIn: false,
            nextStep: { signInStep: 'CONFIRM_SIGN_UP' },
        };
    }
}
function parseAttributes(attributes) {
    if (!attributes)
        return [];
    const parsedAttributes = JSON.parse(attributes).map(att => att.includes(USER_ATTRIBUTES) ? att.replace(USER_ATTRIBUTES, '') : att);
    return parsedAttributes;
}
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
            return initiateSelectedChallenge({
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
            return handleSelectChallengeWithPassword(username, challengeResponse, clientMetadata, config, session);
        case 'PASSWORD_SRP':
            return handleSelectChallengeWithPasswordSRP(username, challengeResponse, // This is the actual password
            clientMetadata, config, session, tokenOrchestrator);
    }
    // TODO: remove this error message for production apps
    throw new AuthError({
        name: AuthErrorCodes.SignInException,
        message: `An error occurred during the sign in process.
		${challengeName} challengeName returned by the underlying service was not addressed.`,
    });
}
function mapMfaType(mfa) {
    let mfaType = 'SMS_MFA';
    if (mfa === 'TOTP')
        mfaType = 'SOFTWARE_TOKEN_MFA';
    if (mfa === 'EMAIL')
        mfaType = 'EMAIL_OTP';
    return mfaType;
}
function getMFAType(type) {
    if (type === 'SMS_MFA')
        return 'SMS';
    if (type === 'SOFTWARE_TOKEN_MFA')
        return 'TOTP';
    if (type === 'EMAIL_OTP')
        return 'EMAIL';
    // TODO: log warning for unknown MFA type
}
function getMFATypes(types) {
    if (!types)
        return undefined;
    return types.map(getMFAType).filter(Boolean);
}
function parseMFATypes(mfa) {
    if (!mfa)
        return [];
    return JSON.parse(mfa);
}
function getAllowedMfaSetupTypes(availableMfaSetupTypes) {
    return availableMfaSetupTypes.filter(authMfaType => authMfaType === 'EMAIL' || authMfaType === 'TOTP');
}
async function assertUserNotAuthenticated() {
    let authUser;
    try {
        authUser = await getCurrentUser();
    }
    catch (error) { }
    if (authUser && authUser.userId && authUser.username) {
        throw new AuthError({
            name: USER_ALREADY_AUTHENTICATED_EXCEPTION,
            message: 'There is already a signed in user.',
            recoverySuggestion: 'Call signOut before calling signIn again.',
        });
    }
}
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
    const authenticationHelper = await getAuthenticationHelper(userPoolName);
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
        Salt: base64Encoder.convert(getBytesFromHex(authenticationHelper.getSaltToHashDevices())),
        PasswordVerifier: base64Encoder.convert(getBytesFromHex(authenticationHelper.getVerifierDevices())),
    };
    const randomPassword = authenticationHelper.getRandomPassword();
    try {
        const confirmDevice = createConfirmDeviceClient({
            endpointResolver: createCognitoUserPoolEndpointResolver({
                endpointOverride: userPoolEndpoint,
            }),
        });
        await confirmDevice({ region: getRegionFromUserPoolId(userPoolId) }, {
            AccessToken: accessToken,
            DeviceName: await getDeviceName(),
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
        if (error instanceof AuthError &&
            error.name === 'ResourceNotFoundException' &&
            error.message.includes('Device does not exist.')) {
            await tokenOrchestrator.clearDeviceMetadata(username);
            return func(...args);
        }
        throw error;
    }
}
function setActiveSignInUsername(username) {
    const { dispatch } = signInStore;
    dispatch({ type: 'SET_USERNAME', value: username });
}
function getActiveSignInUsername(username) {
    const state = signInStore.getState();
    return state.username ?? username;
}
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
    const userContextData = getUserContextData({
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
    const respondToAuthChallenge = createRespondToAuthChallengeClient({
        endpointResolver: createCognitoUserPoolEndpointResolver({
            endpointOverride: userPoolEndpoint,
        }),
    });
    return respondToAuthChallenge({
        region: getRegionFromUserPoolId(userPoolId),
        userAgentValue: getAuthUserAgentValue(AuthAction.ConfirmSignIn),
    }, jsonReq);
}

export { assertUserNotAuthenticated, createAttributes, getActiveSignInUsername, getAllowedMfaSetupTypes, getMFAType, getMFATypes, getNewDeviceMetadata, getSignInResult, getSignInResultFromError, getTOTPSetupDetails, handleChallengeName, handleCompleteNewPasswordChallenge, handleCustomAuthFlowWithoutSRP, handleCustomChallenge, handleCustomSRPAuthFlow, handleMFAChallenge, handleMFASetupChallenge, handlePasswordVerifierChallenge, handleSelectMFATypeChallenge, handleUserPasswordAuthFlow, handleUserSRPAuthFlow, mapMfaType, parseAttributes, parseMFATypes, retryOnResourceNotFoundException, setActiveSignInUsername };
//# sourceMappingURL=signInHelpers.mjs.map
