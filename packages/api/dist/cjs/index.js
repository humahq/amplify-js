'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.isCancelError = exports.patch = exports.head = exports.del = exports.post = exports.put = exports.get = exports.events = exports.CONNECTION_STATE_CHANGE = exports.ConnectionState = exports.GraphQLAuthError = exports.generateClient = void 0;
var API_1 = require("./API");
Object.defineProperty(exports, "generateClient", { enumerable: true, get: function () { return API_1.generateClient; } });
var api_graphql_1 = require("@aws-amplify/api-graphql");
Object.defineProperty(exports, "GraphQLAuthError", { enumerable: true, get: function () { return api_graphql_1.GraphQLAuthError; } });
Object.defineProperty(exports, "ConnectionState", { enumerable: true, get: function () { return api_graphql_1.ConnectionState; } });
var api_graphql_2 = require("@aws-amplify/api-graphql");
Object.defineProperty(exports, "CONNECTION_STATE_CHANGE", { enumerable: true, get: function () { return api_graphql_2.CONNECTION_STATE_CHANGE; } });
Object.defineProperty(exports, "events", { enumerable: true, get: function () { return api_graphql_2.events; } });
var api_rest_1 = require("@aws-amplify/api-rest");
Object.defineProperty(exports, "get", { enumerable: true, get: function () { return api_rest_1.get; } });
Object.defineProperty(exports, "put", { enumerable: true, get: function () { return api_rest_1.put; } });
Object.defineProperty(exports, "post", { enumerable: true, get: function () { return api_rest_1.post; } });
Object.defineProperty(exports, "del", { enumerable: true, get: function () { return api_rest_1.del; } });
Object.defineProperty(exports, "head", { enumerable: true, get: function () { return api_rest_1.head; } });
Object.defineProperty(exports, "patch", { enumerable: true, get: function () { return api_rest_1.patch; } });
Object.defineProperty(exports, "isCancelError", { enumerable: true, get: function () { return api_rest_1.isCancelError; } });
var utils_1 = require("@aws-amplify/core/internals/utils");
Object.defineProperty(exports, "ApiError", { enumerable: true, get: function () { return utils_1.ApiError; } });
//# sourceMappingURL=index.js.map
