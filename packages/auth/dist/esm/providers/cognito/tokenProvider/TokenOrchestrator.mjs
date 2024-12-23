import { Hub } from '@aws-amplify/core';
import { isBrowser, assertTokenProviderConfig, isTokenExpired, AMPLIFY_SYMBOL, AmplifyErrorCode } from '@aws-amplify/core/internals/utils';
import { assertServiceError } from '../../../errors/utils/assertServiceError.mjs';
import { AuthError } from '../../../errors/AuthError.mjs';
import { oAuthStore } from '../utils/oauth/oAuthStore.mjs';
import { addInflightPromise } from '../utils/oauth/inflightPromise.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class TokenOrchestrator {
    constructor() {
        this.waitForInflightOAuth = isBrowser()
            ? async () => {
                if (!(await oAuthStore.loadOAuthInFlight())) {
                    return;
                }
                if (this.inflightPromise) {
                    return this.inflightPromise;
                }
                // when there is valid oauth config and there is an inflight oauth flow, try
                // to block async calls that require fetching tokens before the oauth flow completes
                // e.g. getCurrentUser, fetchAuthSession etc.
                this.inflightPromise = new Promise((resolve, _reject) => {
                    addInflightPromise(resolve);
                });
                return this.inflightPromise;
            }
            : async () => {
                // no-op for non-browser environments
            };
    }
    setAuthConfig(authConfig) {
        oAuthStore.setAuthConfig(authConfig.Cognito);
        this.authConfig = authConfig;
    }
    setTokenRefresher(tokenRefresher) {
        this.tokenRefresher = tokenRefresher;
    }
    setAuthTokenStore(tokenStore) {
        this.tokenStore = tokenStore;
    }
    getTokenStore() {
        if (!this.tokenStore) {
            throw new AuthError({
                name: 'EmptyTokenStoreException',
                message: 'TokenStore not set',
            });
        }
        return this.tokenStore;
    }
    getTokenRefresher() {
        if (!this.tokenRefresher) {
            throw new AuthError({
                name: 'EmptyTokenRefresherException',
                message: 'TokenRefresher not set',
            });
        }
        return this.tokenRefresher;
    }
    async getTokens(options) {
        let tokens;
        try {
            assertTokenProviderConfig(this.authConfig?.Cognito);
        }
        catch (_err) {
            // Token provider not configured
            return null;
        }
        await this.waitForInflightOAuth();
        this.inflightPromise = undefined;
        tokens = await this.getTokenStore().loadTokens();
        const username = await this.getTokenStore().getLastAuthUser();
        if (tokens === null) {
            return null;
        }
        const idTokenExpired = !!tokens?.idToken &&
            isTokenExpired({
                expiresAt: (tokens.idToken?.payload?.exp ?? 0) * 1000,
                clockDrift: tokens.clockDrift ?? 0,
            });
        const accessTokenExpired = isTokenExpired({
            expiresAt: (tokens.accessToken?.payload?.exp ?? 0) * 1000,
            clockDrift: tokens.clockDrift ?? 0,
        });
        if (options?.forceRefresh || idTokenExpired || accessTokenExpired) {
            tokens = await this.refreshTokens({
                tokens,
                username,
            });
            if (tokens === null) {
                return null;
            }
        }
        return {
            accessToken: tokens?.accessToken,
            idToken: tokens?.idToken,
            signInDetails: tokens?.signInDetails,
        };
    }
    async refreshTokens({ tokens, username, }) {
        try {
            const { signInDetails } = tokens;
            const newTokens = await this.getTokenRefresher()({
                tokens,
                authConfig: this.authConfig,
                username,
            });
            newTokens.signInDetails = signInDetails;
            await this.setTokens({ tokens: newTokens });
            Hub.dispatch('auth', { event: 'tokenRefresh' }, 'Auth', AMPLIFY_SYMBOL);
            return newTokens;
        }
        catch (err) {
            return this.handleErrors(err);
        }
    }
    handleErrors(err) {
        assertServiceError(err);
        if (err.name !== AmplifyErrorCode.NetworkError) {
            // TODO(v6): Check errors on client
            this.clearTokens();
        }
        Hub.dispatch('auth', {
            event: 'tokenRefresh_failure',
            data: { error: err },
        }, 'Auth', AMPLIFY_SYMBOL);
        if (err.name.startsWith('NotAuthorizedException')) {
            return null;
        }
        throw err;
    }
    async setTokens({ tokens }) {
        return this.getTokenStore().storeTokens(tokens);
    }
    async clearTokens() {
        return this.getTokenStore().clearTokens();
    }
    getDeviceMetadata(username) {
        return this.getTokenStore().getDeviceMetadata(username);
    }
    clearDeviceMetadata(username) {
        return this.getTokenStore().clearDeviceMetadata(username);
    }
    setOAuthMetadata(metadata) {
        return this.getTokenStore().setOAuthMetadata(metadata);
    }
    getOAuthMetadata() {
        return this.getTokenStore().getOAuthMetadata();
    }
}

export { TokenOrchestrator };
//# sourceMappingURL=TokenOrchestrator.mjs.map
