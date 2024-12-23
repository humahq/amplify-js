'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_ENDPOINT = exports.NO_AUTH_TOKEN_HEADER = exports.NO_SIGNED_IN_USER = exports.NO_VALID_AUTH_TOKEN = exports.NO_VALID_CREDENTIALS = exports.NO_API_KEY = void 0;
const types_1 = require("../../types");
exports.NO_API_KEY = {
    name: 'NoApiKey',
    // ideal: No API key configured.
    message: types_1.GraphQLAuthError.NO_API_KEY,
    recoverySuggestion: 'The API request was made with `authMode: "apiKey"` but no API Key was passed into `Amplify.configure()`. Review if your API key is passed into the `Amplify.configure()` function.',
};
exports.NO_VALID_CREDENTIALS = {
    name: 'NoCredentials',
    // ideal: No auth credentials available.
    message: types_1.GraphQLAuthError.NO_CREDENTIALS,
    recoverySuggestion: `The API request was made with \`authMode: "iam"\` but no authentication credentials are available.

If you intended to make a request using an authenticated role, review if your user is signed in before making the request.

If you intend to make a request using an unauthenticated role or also known as "guest access", verify if "Auth.Cognito.allowGuestAccess" is set to "true" in the \`Amplify.configure()\` function.`,
};
exports.NO_VALID_AUTH_TOKEN = {
    name: 'NoValidAuthTokens',
    // ideal: No valid JWT auth token provided to make the API request..
    message: types_1.GraphQLAuthError.NO_FEDERATED_JWT,
    recoverySuggestion: 'If you intended to make an authenticated API request, review if the current user is signed in.',
};
exports.NO_SIGNED_IN_USER = {
    name: 'NoSignedUser',
    // ideal: Couldn't retrieve authentication credentials to make the API request.
    message: types_1.GraphQLAuthError.NO_CURRENT_USER,
    recoverySuggestion: 'Review the underlying exception field for more details. If you intended to make an authenticated API request, review if the current user is signed in.',
};
exports.NO_AUTH_TOKEN_HEADER = {
    name: 'NoAuthorizationHeader',
    // ideal: Authorization header not specified.
    message: types_1.GraphQLAuthError.NO_AUTH_TOKEN,
    recoverySuggestion: 'The API request was made with `authMode: "lambda"` but no `authToken` is set. Review if a valid authToken is passed into the request options or in the `Amplify.configure()` function.',
};
exports.NO_ENDPOINT = {
    name: 'NoEndpoint',
    message: 'No GraphQL endpoint configured in `Amplify.configure()`.',
    recoverySuggestion: 'Review if the GraphQL API endpoint is set in the `Amplify.configure()` function.',
};
//# sourceMappingURL=constants.js.map
