'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenValidator = void 0;
const isValidCognitoToken_1 = require("./isValidCognitoToken");
/**
 * Creates a validator object for validating methods in a KeyValueStorage.
 */
const createTokenValidator = ({ userPoolId, userPoolClientId: clientId, }) => {
    return {
        // validate access, id tokens
        getItem: async (key, value) => {
            const tokenType = key.includes('.accessToken')
                ? 'access'
                : key.includes('.idToken')
                    ? 'id'
                    : null;
            if (!tokenType)
                return true;
            if (!userPoolId || !clientId)
                return false;
            return (0, isValidCognitoToken_1.isValidCognitoToken)({
                clientId,
                userPoolId,
                tokenType,
                token: value,
            });
        },
    };
};
exports.createTokenValidator = createTokenValidator;
//# sourceMappingURL=createTokenValidator.js.map
