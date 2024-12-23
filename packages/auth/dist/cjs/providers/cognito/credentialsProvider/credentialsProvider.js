'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoAWSCredentialsAndIdentityIdProvider = void 0;
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const AuthError_1 = require("../../../errors/AuthError");
const parsers_1 = require("../../../foundation/parsers");
const types_1 = require("../utils/types");
const factories_1 = require("../factories");
const IdentityIdProvider_1 = require("./IdentityIdProvider");
const utils_2 = require("./utils");
const logger = new core_1.ConsoleLogger('CognitoCredentialsProvider');
const CREDENTIALS_TTL = 50 * 60 * 1000; // 50 min, can be modified on config if required in the future
class CognitoAWSCredentialsAndIdentityIdProvider {
    constructor(identityIdStore) {
        this._nextCredentialsRefresh = 0;
        this._identityIdStore = identityIdStore;
    }
    async clearCredentialsAndIdentityId() {
        logger.debug('Clearing out credentials and identityId');
        this._credentialsAndIdentityId = undefined;
        await this._identityIdStore.clearIdentityId();
    }
    async clearCredentials() {
        logger.debug('Clearing out in-memory credentials');
        this._credentialsAndIdentityId = undefined;
    }
    async getCredentialsAndIdentityId(getCredentialsOptions) {
        const isAuthenticated = getCredentialsOptions.authenticated;
        const { tokens } = getCredentialsOptions;
        const { authConfig } = getCredentialsOptions;
        try {
            (0, utils_1.assertIdentityPoolIdConfig)(authConfig?.Cognito);
        }
        catch {
            // No identity pool configured, skipping
            return;
        }
        if (!isAuthenticated && !authConfig.Cognito.allowGuestAccess) {
            // TODO(V6): return partial result like Native platforms
            return;
        }
        const { forceRefresh } = getCredentialsOptions;
        const tokenHasChanged = this.hasTokenChanged(tokens);
        const identityId = await (0, IdentityIdProvider_1.cognitoIdentityIdProvider)({
            tokens,
            authConfig: authConfig.Cognito,
            identityIdStore: this._identityIdStore,
        });
        // Clear cached credentials when forceRefresh is true OR the cache token has changed
        if (forceRefresh || tokenHasChanged) {
            this.clearCredentials();
        }
        if (!isAuthenticated) {
            return this.getGuestCredentials(identityId, authConfig.Cognito);
        }
        else {
            (0, types_1.assertIdTokenInAuthTokens)(tokens);
            return this.credsForOIDCTokens(authConfig.Cognito, tokens, identityId);
        }
    }
    async getGuestCredentials(identityId, authConfig) {
        // Return existing in-memory cached credentials only if it exists, is not past it's lifetime and is unauthenticated credentials
        if (this._credentialsAndIdentityId &&
            !this.isPastTTL() &&
            this._credentialsAndIdentityId.isAuthenticatedCreds === false) {
            logger.info('returning stored credentials as they neither past TTL nor expired.');
            return this._credentialsAndIdentityId;
        }
        // Clear to discard if any authenticated credentials are set and start with a clean slate
        this.clearCredentials();
        const region = (0, parsers_1.getRegionFromIdentityPoolId)(authConfig.identityPoolId);
        const getCredentialsForIdentity = (0, core_1.createGetCredentialsForIdentityClient)({
            endpointResolver: (0, factories_1.createCognitoIdentityPoolEndpointResolver)({
                endpointOverride: authConfig.identityPoolEndpoint,
            }),
        });
        // use identityId to obtain guest credentials
        // save credentials in-memory
        // No logins params should be passed for guest creds:
        // https://docs.aws.amazon.com/cognitoidentity/latest/APIReference/API_GetCredentialsForIdentity.html
        const clientResult = await getCredentialsForIdentity({ region }, {
            IdentityId: identityId,
        });
        if (clientResult.Credentials &&
            clientResult.Credentials.AccessKeyId &&
            clientResult.Credentials.SecretKey) {
            this._nextCredentialsRefresh = new Date().getTime() + CREDENTIALS_TTL;
            const res = {
                credentials: {
                    accessKeyId: clientResult.Credentials.AccessKeyId,
                    secretAccessKey: clientResult.Credentials.SecretKey,
                    sessionToken: clientResult.Credentials.SessionToken,
                    expiration: clientResult.Credentials.Expiration,
                },
                identityId,
            };
            const identityIdRes = clientResult.IdentityId;
            if (identityIdRes) {
                res.identityId = identityIdRes;
                this._identityIdStore.storeIdentityId({
                    id: identityIdRes,
                    type: 'guest',
                });
            }
            this._credentialsAndIdentityId = {
                ...res,
                isAuthenticatedCreds: false,
            };
            return res;
        }
        else {
            throw new AuthError_1.AuthError({
                name: 'CredentialsNotFoundException',
                message: `Cognito did not respond with either Credentials, AccessKeyId or SecretKey.`,
            });
        }
    }
    async credsForOIDCTokens(authConfig, authTokens, identityId) {
        if (this._credentialsAndIdentityId &&
            !this.isPastTTL() &&
            this._credentialsAndIdentityId.isAuthenticatedCreds === true) {
            logger.debug('returning stored credentials as they neither past TTL nor expired.');
            return this._credentialsAndIdentityId;
        }
        // Clear to discard if any unauthenticated credentials are set and start with a clean slate
        this.clearCredentials();
        const logins = authTokens.idToken
            ? (0, utils_2.formLoginsMap)(authTokens.idToken.toString())
            : {};
        const region = (0, parsers_1.getRegionFromIdentityPoolId)(authConfig.identityPoolId);
        const getCredentialsForIdentity = (0, core_1.createGetCredentialsForIdentityClient)({
            endpointResolver: (0, factories_1.createCognitoIdentityPoolEndpointResolver)({
                endpointOverride: authConfig.identityPoolEndpoint,
            }),
        });
        const clientResult = await getCredentialsForIdentity({ region }, {
            IdentityId: identityId,
            Logins: logins,
        });
        if (clientResult.Credentials &&
            clientResult.Credentials.AccessKeyId &&
            clientResult.Credentials.SecretKey) {
            const res = {
                credentials: {
                    accessKeyId: clientResult.Credentials.AccessKeyId,
                    secretAccessKey: clientResult.Credentials.SecretKey,
                    sessionToken: clientResult.Credentials.SessionToken,
                    expiration: clientResult.Credentials.Expiration,
                },
                identityId,
            };
            // Store the credentials in-memory along with the expiration
            this._credentialsAndIdentityId = {
                ...res,
                isAuthenticatedCreds: true,
                associatedIdToken: authTokens.idToken?.toString(),
            };
            this._nextCredentialsRefresh = new Date().getTime() + CREDENTIALS_TTL;
            const identityIdRes = clientResult.IdentityId;
            if (identityIdRes) {
                res.identityId = identityIdRes;
                this._identityIdStore.storeIdentityId({
                    id: identityIdRes,
                    type: 'primary',
                });
            }
            return res;
        }
        else {
            throw new AuthError_1.AuthError({
                name: 'CredentialsException',
                message: `Cognito did not respond with either Credentials, AccessKeyId or SecretKey.`,
            });
        }
    }
    isPastTTL() {
        return this._nextCredentialsRefresh === undefined
            ? true
            : this._nextCredentialsRefresh <= Date.now();
    }
    hasTokenChanged(tokens) {
        return (!!tokens &&
            !!this._credentialsAndIdentityId?.associatedIdToken &&
            tokens.idToken?.toString() !==
                this._credentialsAndIdentityId.associatedIdToken);
    }
}
exports.CognitoAWSCredentialsAndIdentityIdProvider = CognitoAWSCredentialsAndIdentityIdProvider;
//# sourceMappingURL=credentialsProvider.js.map
