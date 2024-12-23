import { ConsoleLogger, createGetCredentialsForIdentityClient } from '@aws-amplify/core';
import { assertIdentityPoolIdConfig } from '@aws-amplify/core/internals/utils';
import { AuthError } from '../../../errors/AuthError.mjs';
import { getRegionFromIdentityPoolId } from '../../../foundation/parsers/regionParsers.mjs';
import { assertIdTokenInAuthTokens } from '../utils/types.mjs';
import '@aws-amplify/core/internals/aws-client-utils';
import { createCognitoIdentityPoolEndpointResolver } from '../factories/createCognitoIdentityPoolEndpointResolver.mjs';
import { cognitoIdentityIdProvider } from './IdentityIdProvider.mjs';
import { formLoginsMap } from './utils.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new ConsoleLogger('CognitoCredentialsProvider');
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
            assertIdentityPoolIdConfig(authConfig?.Cognito);
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
        const identityId = await cognitoIdentityIdProvider({
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
            assertIdTokenInAuthTokens(tokens);
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
        const region = getRegionFromIdentityPoolId(authConfig.identityPoolId);
        const getCredentialsForIdentity = createGetCredentialsForIdentityClient({
            endpointResolver: createCognitoIdentityPoolEndpointResolver({
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
            throw new AuthError({
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
            ? formLoginsMap(authTokens.idToken.toString())
            : {};
        const region = getRegionFromIdentityPoolId(authConfig.identityPoolId);
        const getCredentialsForIdentity = createGetCredentialsForIdentityClient({
            endpointResolver: createCognitoIdentityPoolEndpointResolver({
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
            throw new AuthError({
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

export { CognitoAWSCredentialsAndIdentityIdProvider };
//# sourceMappingURL=credentialsProvider.mjs.map
