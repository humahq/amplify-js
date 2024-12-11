// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_REST_IAM_SIGNING_SERVICE = 'execute-api';
const DEFAULT_APPSYNC_API_SERVICE = 'appsync-api';
const DEFAULT_IAM_SIGNING_REGION = 'us-east-1';
/**
 * The REST endpoints generated by API Gateway
 * @see {@link https://docs.aws.amazon.com/general/latest/gr/apigateway.html#apigateway_region_data_plane}
 */
const APIG_HOSTNAME_PATTERN = /^.+\.([a-z0-9-]+)\.([a-z0-9-]+)\.amazonaws\.com/;

export { APIG_HOSTNAME_PATTERN, DEFAULT_APPSYNC_API_SERVICE, DEFAULT_IAM_SIGNING_REGION, DEFAULT_REST_IAM_SIGNING_SERVICE };
//# sourceMappingURL=constants.mjs.map