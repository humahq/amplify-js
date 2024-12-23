import { parse, print } from 'graphql';
import { catchError } from 'rxjs';
import { AmplifyUrl, getAmplifyUserAgent } from '@aws-amplify/core/internals/utils';
import { isCancelError } from '@aws-amplify/api-rest';
import { post, cancel, updateRequestToBeCancellable } from '@aws-amplify/api-rest/internals';
import { AWSAppSyncRealTimeProvider } from '../Providers/AWSAppSyncRealTimeProvider/index.mjs';
import { resolveConfig } from '../utils/resolveConfig.mjs';
import { resolveLibraryOptions } from '../utils/resolveLibraryOptions.mjs';
import { repackageUnauthorizedError } from '../utils/errors/repackageAuthError.mjs';
import { NO_ENDPOINT } from '../utils/errors/constants.mjs';
import { GraphQLApiError } from '../utils/errors/GraphQLApiError.mjs';
import '../utils/errors/validation.mjs';
import { createGraphQLResultWithError } from '../utils/errors/createGraphQLResultWithError.mjs';
import { isGraphQLResponseWithErrors } from './utils/runtimeTypeGuards/isGraphQLResponseWithErrors.mjs';
import { headerBasedAuth } from './graphqlAuth.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const USER_AGENT_HEADER = 'x-amz-user-agent';
const isAmplifyInstance = (amplify) => {
    return typeof amplify !== 'function';
};
/**
 * Export Cloud Logic APIs
 */
class InternalGraphQLAPIClass {
    constructor() {
        /**
         * @private
         */
        this.appSyncRealTime = new AWSAppSyncRealTimeProvider();
        this._api = {
            post,
            cancelREST: cancel,
            isCancelErrorREST: isCancelError,
            updateRequestToBeCancellable,
        };
    }
    getModuleName() {
        return 'InternalGraphQLAPI';
    }
    /**
     * to get the operation type
     * @param operation
     */
    getGraphqlOperationType(operation) {
        const doc = parse(operation);
        const definitions = doc.definitions;
        const [{ operation: operationType }] = definitions;
        return operationType;
    }
    /**
     * Executes a GraphQL operation
     *
     * @param options - GraphQL Options
     * @param [additionalHeaders] - headers to merge in after any `libraryConfigHeaders` set in the config
     * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
     */
    graphql(amplify, { query: paramQuery, variables = {}, authMode, authToken }, additionalHeaders, customUserAgentDetails) {
        const query = typeof paramQuery === 'string'
            ? parse(paramQuery)
            : parse(print(paramQuery));
        const [operationDef = {}] = query.definitions.filter(def => def.kind === 'OperationDefinition');
        const { operation: operationType } = operationDef;
        const headers = additionalHeaders || {};
        switch (operationType) {
            case 'query':
            case 'mutation': {
                const abortController = new AbortController();
                let responsePromise;
                if (isAmplifyInstance(amplify)) {
                    responsePromise = this._graphql(amplify, { query, variables, authMode }, headers, abortController, customUserAgentDetails, authToken);
                }
                else {
                    // NOTE: this wrapper function must be await-able so the Amplify server context manager can
                    // destroy the context only after it completes
                    const wrapper = async (amplifyInstance) => {
                        const result = await this._graphql(amplifyInstance, { query, variables, authMode }, headers, abortController, customUserAgentDetails, authToken);
                        return result;
                    };
                    responsePromise = amplify(wrapper);
                }
                this._api.updateRequestToBeCancellable(responsePromise, abortController);
                return responsePromise;
            }
            case 'subscription':
                return this._graphqlSubscribe(amplify, { query, variables, authMode }, headers, customUserAgentDetails, authToken);
            default:
                throw new Error(`invalid operation type: ${operationType}`);
        }
    }
    async _graphql(amplify, { query, variables, authMode: explicitAuthMode }, additionalHeaders = {}, abortController, customUserAgentDetails, authToken) {
        const { apiKey, region, endpoint: appSyncGraphqlEndpoint, customEndpoint, customEndpointRegion, defaultAuthMode, } = resolveConfig(amplify);
        const initialAuthMode = explicitAuthMode || defaultAuthMode || 'iam';
        // identityPool is an alias for iam. TODO: remove 'iam' in v7
        const authMode = initialAuthMode === 'identityPool' ? 'iam' : initialAuthMode;
        /**
         * Retrieve library options from Amplify configuration.
         * `customHeaders` here are from the Amplify configuration options,
         * and are for non-AppSync endpoints only. These are *not* the same as
         * `additionalHeaders`, which are custom headers that are either 1)
         * included when configuring the API client or 2) passed along with
         * individual requests.
         */
        const { headers: customHeaders, withCredentials } = resolveLibraryOptions(amplify);
        /**
         * Client or request-specific custom headers that may or may not be
         * returned by a function:
         */
        let additionalCustomHeaders;
        if (typeof additionalHeaders === 'function') {
            const requestOptions = {
                method: 'POST',
                url: new AmplifyUrl(customEndpoint || appSyncGraphqlEndpoint || '').toString(),
                queryString: print(query),
            };
            additionalCustomHeaders = await additionalHeaders(requestOptions);
        }
        else {
            additionalCustomHeaders = additionalHeaders;
        }
        // if an authorization header is set, have the explicit authToken take precedence
        if (authToken) {
            additionalCustomHeaders = {
                ...additionalCustomHeaders,
                Authorization: authToken,
            };
        }
        const authHeaders = await headerBasedAuth(amplify, authMode, apiKey, additionalCustomHeaders);
        const headers = {
            ...(!customEndpoint && authHeaders),
            /**
             * Custom endpoint headers.
             * If there is both a custom endpoint and custom region present, we get the headers.
             * If there is a custom endpoint but no region, we return an empty object.
             * If neither are present, we return an empty object.
             */
            ...((customEndpoint && (customEndpointRegion ? authHeaders : {})) || {}),
            // Custom headers included in Amplify configuration options:
            ...(customHeaders &&
                (await customHeaders({
                    query: print(query),
                    variables,
                }))),
            // Custom headers from individual requests or API client configuration:
            ...additionalCustomHeaders,
            // User agent headers:
            ...(!customEndpoint && {
                [USER_AGENT_HEADER]: getAmplifyUserAgent(customUserAgentDetails),
            }),
        };
        const body = {
            query: print(query),
            variables: variables || null,
        };
        let signingServiceInfo;
        /**
         * We do not send the signing service info to the REST API under the
         * following conditions (i.e. it will not sign the request):
         *   - there is a custom endpoint but no region
         *   - the auth mode is `none`, or `apiKey`
         *   - the auth mode is a type other than the types listed below
         */
        if ((customEndpoint && !customEndpointRegion) ||
            (authMode !== 'oidc' &&
                authMode !== 'userPool' &&
                authMode !== 'iam' &&
                authMode !== 'lambda')) {
            signingServiceInfo = undefined;
        }
        else {
            signingServiceInfo = {
                service: !customEndpointRegion ? 'appsync' : 'execute-api',
                region: !customEndpointRegion ? region : customEndpointRegion,
            };
        }
        const endpoint = customEndpoint || appSyncGraphqlEndpoint;
        if (!endpoint) {
            throw createGraphQLResultWithError(new GraphQLApiError(NO_ENDPOINT));
        }
        let response;
        try {
            // 	// // See the inline doc of the REST `post()` API for possible errors to be thrown.
            // 	// // As these errors are catastrophic they should be caught and handled by GraphQL
            // 	// // API consumers.
            const { body: responseBody } = await this._api.post(amplify, {
                url: new AmplifyUrl(endpoint),
                options: {
                    headers,
                    body,
                    signingServiceInfo,
                    withCredentials,
                },
                abortController,
            });
            response = await responseBody.json();
        }
        catch (error) {
            if (this.isCancelError(error)) {
                throw error;
            }
            response = createGraphQLResultWithError(error);
        }
        if (isGraphQLResponseWithErrors(response)) {
            throw repackageUnauthorizedError(response);
        }
        return response;
    }
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param {any} error - Any error
     * @return {boolean} - A boolean indicating if the error was from an api request cancellation
     */
    isCancelError(error) {
        return this._api.isCancelErrorREST(error);
    }
    /**
     * Cancels an inflight request. Only applicable for graphql queries and mutations
     * @param {any} request - request to cancel
     * @returns - A boolean indicating if the request was cancelled
     */
    cancel(request, message) {
        return this._api.cancelREST(request, message);
    }
    _graphqlSubscribe(amplify, { query, variables, authMode: explicitAuthMode }, additionalHeaders = {}, customUserAgentDetails, authToken) {
        const config = resolveConfig(amplify);
        const initialAuthMode = explicitAuthMode || config?.defaultAuthMode || 'iam';
        // identityPool is an alias for iam. TODO: remove 'iam' in v7
        const authMode = initialAuthMode === 'identityPool' ? 'iam' : initialAuthMode;
        /**
         * Retrieve library options from Amplify configuration.
         * `libraryConfigHeaders` are from the Amplify configuration options,
         * and will not be overwritten by other custom headers. These are *not*
         * the same as `additionalHeaders`, which are custom headers that are
         * either 1)included when configuring the API client or 2) passed along
         * with individual requests.
         */
        const { headers: libraryConfigHeaders } = resolveLibraryOptions(amplify);
        return this.appSyncRealTime
            .subscribe({
            query: print(query),
            variables,
            appSyncGraphqlEndpoint: config?.endpoint,
            region: config?.region,
            authenticationType: authMode,
            apiKey: config?.apiKey,
            additionalHeaders,
            authToken,
            libraryConfigHeaders,
        }, customUserAgentDetails)
            .pipe(catchError(e => {
            if (e.errors) {
                throw repackageUnauthorizedError(e);
            }
            throw e;
        }));
    }
}
const InternalGraphQLAPI = new InternalGraphQLAPIClass();

export { InternalGraphQLAPI, InternalGraphQLAPIClass };
//# sourceMappingURL=InternalGraphQLAPI.mjs.map
