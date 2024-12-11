import '../../../../types/errors.mjs';
import '../../../../errors/errorHelpers.mjs';
import { jitteredBackoff } from '../../../../clients/middleware/retry/jitteredBackoff.mjs';
import { getRetryDecider } from '../../../../clients/middleware/retry/defaultRetryDecider.mjs';
import '@aws-crypto/sha256-js';
import '@smithy/util-hex-encoding';
import { parseJsonError } from '../../../../clients/serde/json.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * The service name used to sign requests if the API requires authentication.
 */
const COGNITO_IDENTITY_SERVICE_NAME = 'cognito-identity';
const DEFAULT_SERVICE_CLIENT_API_CONFIG = {
    service: COGNITO_IDENTITY_SERVICE_NAME,
    retryDecider: getRetryDecider(parseJsonError),
    computeDelay: jitteredBackoff,
    cache: 'no-store',
};

export { COGNITO_IDENTITY_SERVICE_NAME, DEFAULT_SERVICE_CLIENT_API_CONFIG };
//# sourceMappingURL=constants.mjs.map
