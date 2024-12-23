import { AmplifyUrl, AmplifyUrlSearchParams } from '@aws-amplify/core/internals/utils';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const protocol = 'wss://';
const standardDomainPattern = /^https:\/\/\w{26}\.appsync-api\.\w{2}(?:(?:-\w{2,})+)-\d\.amazonaws.com(?:\.cn)?\/graphql$/i;
const eventDomainPattern = /^https:\/\/\w{26}\.\w+-api\.\w{2}(?:(?:-\w{2,})+)-\d\.amazonaws.com(?:\.cn)?\/event$/i;
const customDomainPath = '/realtime';
const isCustomDomain = (url) => {
    return url.match(standardDomainPattern) === null;
};
const isEventDomain = (url) => url.match(eventDomainPattern) !== null;
const getRealtimeEndpointUrl = (appSyncGraphqlEndpoint) => {
    let realtimeEndpoint = appSyncGraphqlEndpoint ?? '';
    if (isEventDomain(realtimeEndpoint)) {
        realtimeEndpoint = realtimeEndpoint
            .concat(customDomainPath)
            .replace('ddpg-api', 'grt-gamma')
            .replace('appsync-api', 'appsync-realtime-api');
    }
    else if (isCustomDomain(realtimeEndpoint)) {
        realtimeEndpoint = realtimeEndpoint.concat(customDomainPath);
    }
    else {
        realtimeEndpoint = realtimeEndpoint
            .replace('appsync-api', 'appsync-realtime-api')
            .replace('gogi-beta', 'grt-beta')
            .replace('ddpg-api', 'grt-gamma');
    }
    realtimeEndpoint = realtimeEndpoint
        .replace('https://', protocol)
        .replace('http://', 'ws://');
    return new AmplifyUrl(realtimeEndpoint);
};
/**
 * Strips out `Authorization` header if present
 */
const extractNonAuthHeaders = (headers) => {
    if (!headers) {
        return {};
    }
    if ('Authorization' in headers) {
        const { Authorization: _, ...nonAuthHeaders } = headers;
        return nonAuthHeaders;
    }
    return headers;
};
/**
 *
 * @param headers - http headers
 * @returns uri-encoded query parameters derived from custom headers
 */
const queryParamsFromCustomHeaders = (headers) => {
    const nonAuthHeaders = extractNonAuthHeaders(headers);
    const params = new AmplifyUrlSearchParams();
    Object.entries(nonAuthHeaders).forEach(([k, v]) => {
        params.append(k, v);
    });
    return params;
};
/**
 * Normalizes AppSync realtime endpoint URL
 *
 * @param appSyncGraphqlEndpoint - AppSync endpointUri from config
 * @param urlParams - URLSearchParams
 * @returns fully resolved string realtime endpoint URL
 */
const realtimeUrlWithQueryString = (appSyncGraphqlEndpoint, urlParams) => {
    const realtimeEndpointUrl = getRealtimeEndpointUrl(appSyncGraphqlEndpoint);
    // preserves any query params a customer might manually set in the configuration
    const existingParams = new AmplifyUrlSearchParams(realtimeEndpointUrl.search);
    for (const [k, v] of urlParams.entries()) {
        existingParams.append(k, v);
    }
    realtimeEndpointUrl.search = existingParams.toString();
    return realtimeEndpointUrl.toString();
};
// TODO: move to separate file?
const additionalHeadersFromOptions = async (options) => {
    const { appSyncGraphqlEndpoint, query, libraryConfigHeaders = () => ({}), additionalHeaders = {}, authToken, } = options;
    let additionalCustomHeaders = {};
    const _libraryConfigHeaders = await libraryConfigHeaders();
    if (typeof additionalHeaders === 'function') {
        const requestOptions = {
            url: appSyncGraphqlEndpoint || '',
            queryString: query || '',
        };
        additionalCustomHeaders = await additionalHeaders(requestOptions);
    }
    else {
        additionalCustomHeaders = additionalHeaders;
    }
    // if an authorization header is set, have the explicit, operation-level authToken take precedence
    if (authToken) {
        additionalCustomHeaders = {
            ...additionalCustomHeaders,
            Authorization: authToken,
        };
    }
    return {
        additionalCustomHeaders,
        libraryConfigHeaders: _libraryConfigHeaders,
    };
};

export { additionalHeadersFromOptions, getRealtimeEndpointUrl, isCustomDomain, queryParamsFromCustomHeaders, realtimeUrlWithQueryString };
//# sourceMappingURL=appsyncUrl.mjs.map
