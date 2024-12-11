import '../../../../types/errors.mjs';
import '../../../../errors/errorHelpers.mjs';
import '../../../../utils/getClientInfo/getClientInfo.mjs';
import '../../../../utils/retry/retry.mjs';
import '@aws-crypto/sha256-js';
import '@smithy/util-hex-encoding';
import { parseMetadata } from '../../../../clients/serde/responseInfo.mjs';
import { parseJsonError, parseJsonBody } from '../../../../clients/serde/json.mjs';
import { composeServiceApi } from '../../../../clients/internal/composeServiceApi.mjs';
import { getAmplifyUserAgent } from '../../../../Platform/index.mjs';
import { DEFAULT_SERVICE_CLIENT_API_CONFIG } from './constants.mjs';
import { cognitoIdentityTransferHandler } from './handler/cognitoIdentityTransferHandler.mjs';
import { createClientSerializer } from './serde/createClientSerializer.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createGetCredentialsForIdentityClient = (config) => composeServiceApi(cognitoIdentityTransferHandler, createClientSerializer('GetCredentialsForIdentity'), getCredentialsForIdentityDeserializer, {
    ...DEFAULT_SERVICE_CLIENT_API_CONFIG,
    ...config,
    userAgentValue: getAmplifyUserAgent(),
});
const getCredentialsForIdentityDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = await parseJsonError(response);
        throw error;
    }
    else {
        const body = await parseJsonBody(response);
        return {
            IdentityId: body.IdentityId,
            Credentials: deserializeCredentials(body.Credentials),
            $metadata: parseMetadata(response),
        };
    }
};
const deserializeCredentials = ({ Expiration, ...rest } = {}) => ({
    ...rest,
    Expiration: Expiration && new Date(Expiration * 1000),
});

export { createGetCredentialsForIdentityClient };
//# sourceMappingURL=createGetCredentialsForIdentityClient.mjs.map