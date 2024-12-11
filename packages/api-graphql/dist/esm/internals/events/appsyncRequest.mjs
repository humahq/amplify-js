import { AmplifyUrl, getAmplifyUserAgent } from '@aws-amplify/core/internals/utils';
import { post } from '@aws-amplify/api-rest/internals';
import '../../utils/resolveConfig.mjs';
import { resolveLibraryOptions } from '../../utils/resolveLibraryOptions.mjs';
import { repackageUnauthorizedError } from '../../utils/errors/repackageAuthError.mjs';
import { headerBasedAuth } from '../graphqlAuth.mjs';
import { isGraphQLResponseWithErrors } from '../utils/runtimeTypeGuards/isGraphQLResponseWithErrors.mjs';

const USER_AGENT_HEADER = 'x-amz-user-agent';
// This is effectively a copy of InternalGraphQLAPI.ts._graphql(...)
// Our existing unit tests are tightly coupled to the implementation, so i was unable to refactor
// and extend _graphql() without having to change a bunch of tests as well... which in turn reduces confidence
// that this feature will _not affect_ GQL behavior.
async function appsyncRequest(amplify, options, additionalHeaders = {}, abortController, customUserAgentDetails) {
    const { region, appSyncGraphqlEndpoint: endpoint, authenticationType: authMode, query, variables, } = options;
    if (!endpoint) {
        throw new Error('No endpoint');
    }
    const { withCredentials } = resolveLibraryOptions(amplify);
    const headers = await requestHeaders(amplify, options, additionalHeaders, customUserAgentDetails);
    const body = {
        channel: query,
        events: variables,
    };
    const signingServiceInfo = ['apiKey', 'none'].includes(authMode)
        ? undefined
        : {
            service: 'appsync',
            region,
        };
    const { body: responseBody } = await post(amplify, {
        url: new AmplifyUrl(endpoint),
        options: {
            headers,
            body,
            signingServiceInfo,
            withCredentials,
        },
        abortController,
    });
    const response = await responseBody.json();
    if (isGraphQLResponseWithErrors(response)) {
        throw repackageUnauthorizedError(response);
    }
    return response;
}
/**
 * Computes all the necessary HTTP headers for the request based on:
 * 1. Operation-level header options
 * 2. Amplify.configure custom headers
 * 3. AuthZ headers for explicit auth mode specified for operation ?? default auth mode in config
 *
 * @returns HTTP request headers key/value
 */
async function requestHeaders(amplify, options, additionalHeaders, customUserAgentDetails) {
    const { apiKey, appSyncGraphqlEndpoint: endpoint, authenticationType: authMode, query, variables, authToken, } = options;
    const { headers: customHeadersFn } = resolveLibraryOptions(amplify);
    let additionalCustomHeaders;
    if (typeof additionalHeaders === 'function') {
        const requestOptions = {
            method: 'POST',
            url: new AmplifyUrl(endpoint).toString(),
            queryString: query,
        };
        additionalCustomHeaders = await additionalHeaders(requestOptions);
    }
    else {
        additionalCustomHeaders = additionalHeaders;
    }
    // if an authorization header is set, have the operation-level authToken take precedence
    if (authToken) {
        additionalCustomHeaders = {
            ...additionalCustomHeaders,
            Authorization: authToken,
        };
    }
    const authHeaders = await headerBasedAuth(amplify, authMode, apiKey, additionalCustomHeaders);
    const customHeaders = customHeadersFn &&
        (await customHeadersFn({
            query,
            variables: variables,
        }));
    const headers = {
        ...authHeaders,
        // Custom headers included in Amplify configuration options:
        ...customHeaders,
        // Custom headers from individual requests or API client configuration:
        ...additionalCustomHeaders,
        // User agent headers:
        [USER_AGENT_HEADER]: getAmplifyUserAgent(customUserAgentDetails),
    };
    return headers;
}

export { appsyncRequest };
//# sourceMappingURL=appsyncRequest.mjs.map