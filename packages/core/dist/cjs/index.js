'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceWorker = exports.ConsoleLogger = exports.I18n = exports.Cache = exports.sharedInMemoryStorage = exports.sessionStorage = exports.defaultStorage = exports.CookieStorage = exports.cognitoIdentityPoolEndpointResolver = exports.createGetIdClient = exports.createGetCredentialsForIdentityClient = exports.clearCredentials = exports.AmplifyClassV6 = exports.fetchAuthSession = exports.Amplify = exports.decodeJWT = exports.Hub = void 0;
/*
This file maps top-level exports from `@aws-amplify/core`. These are intended to be potentially customer-facing exports.
*/
// Hub exports
var Hub_1 = require("./Hub");
Object.defineProperty(exports, "Hub", { enumerable: true, get: function () { return Hub_1.Hub; } });
var utils_1 = require("./singleton/Auth/utils");
Object.defineProperty(exports, "decodeJWT", { enumerable: true, get: function () { return utils_1.decodeJWT; } });
var singleton_1 = require("./singleton");
Object.defineProperty(exports, "Amplify", { enumerable: true, get: function () { return singleton_1.Amplify; } });
Object.defineProperty(exports, "fetchAuthSession", { enumerable: true, get: function () { return singleton_1.fetchAuthSession; } });
Object.defineProperty(exports, "AmplifyClassV6", { enumerable: true, get: function () { return singleton_1.AmplifyClass; } });
Object.defineProperty(exports, "clearCredentials", { enumerable: true, get: function () { return singleton_1.clearCredentials; } });
// Cognito Identity service client factories
var cognitoIdentity_1 = require("./foundation/factories/serviceClients/cognitoIdentity");
Object.defineProperty(exports, "createGetCredentialsForIdentityClient", { enumerable: true, get: function () { return cognitoIdentity_1.createGetCredentialsForIdentityClient; } });
Object.defineProperty(exports, "createGetIdClient", { enumerable: true, get: function () { return cognitoIdentity_1.createGetIdClient; } });
Object.defineProperty(exports, "cognitoIdentityPoolEndpointResolver", { enumerable: true, get: function () { return cognitoIdentity_1.cognitoIdentityPoolEndpointResolver; } });
// Storage helpers
var storage_1 = require("./storage");
Object.defineProperty(exports, "CookieStorage", { enumerable: true, get: function () { return storage_1.CookieStorage; } });
Object.defineProperty(exports, "defaultStorage", { enumerable: true, get: function () { return storage_1.defaultStorage; } });
Object.defineProperty(exports, "sessionStorage", { enumerable: true, get: function () { return storage_1.sessionStorage; } });
Object.defineProperty(exports, "sharedInMemoryStorage", { enumerable: true, get: function () { return storage_1.sharedInMemoryStorage; } });
// Cache exports
var Cache_1 = require("./Cache");
Object.defineProperty(exports, "Cache", { enumerable: true, get: function () { return Cache_1.Cache; } });
// Internationalization utilities
var I18n_1 = require("./I18n");
Object.defineProperty(exports, "I18n", { enumerable: true, get: function () { return I18n_1.I18n; } });
// Logging utilities
var Logger_1 = require("./Logger");
Object.defineProperty(exports, "ConsoleLogger", { enumerable: true, get: function () { return Logger_1.ConsoleLogger; } });
// Service worker
var ServiceWorker_1 = require("./ServiceWorker");
Object.defineProperty(exports, "ServiceWorker", { enumerable: true, get: function () { return ServiceWorker_1.ServiceWorker; } });
//# sourceMappingURL=index.js.map
