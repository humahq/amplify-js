'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetCredentialsForIdentityClient = void 0;
const clients_1 = require("../../../../clients");
const internal_1 = require("../../../../clients/internal");
const Platform_1 = require("../../../../Platform");
const constants_1 = require("./constants");
const handler_1 = require("./handler");
const serde_1 = require("./serde");
const createGetCredentialsForIdentityClient = (config) => (0, internal_1.composeServiceApi)(handler_1.cognitoIdentityTransferHandler, (0, serde_1.createClientSerializer)('GetCredentialsForIdentity'), getCredentialsForIdentityDeserializer, {
    ...constants_1.DEFAULT_SERVICE_CLIENT_API_CONFIG,
    ...config,
    userAgentValue: (0, Platform_1.getAmplifyUserAgent)(),
});
exports.createGetCredentialsForIdentityClient = createGetCredentialsForIdentityClient;
const getCredentialsForIdentityDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = await (0, clients_1.parseJsonError)(response);
        throw error;
    }
    else {
        const body = await (0, clients_1.parseJsonBody)(response);
        return {
            IdentityId: body.IdentityId,
            Credentials: deserializeCredentials(body.Credentials),
            $metadata: (0, clients_1.parseMetadata)(response),
        };
    }
};
const deserializeCredentials = ({ Expiration, ...rest } = {}) => ({
    ...rest,
    Expiration: Expiration && new Date(Expiration * 1000),
});
//# sourceMappingURL=createGetCredentialsForIdentityClient.js.map