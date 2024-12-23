import { retryMiddlewareFactory } from '../middleware/retry/middleware.mjs';
import '../../utils/getClientInfo/getClientInfo.mjs';
import '../../utils/retry/retry.mjs';
import '../../types/errors.mjs';
import { userAgentMiddlewareFactory } from '../middleware/userAgent/middleware.mjs';
import { composeTransferHandler } from '../internal/composeTransferHandler.mjs';
import { fetchTransferHandler } from './fetch.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const unauthenticatedHandler = composeTransferHandler(fetchTransferHandler, [userAgentMiddlewareFactory, retryMiddlewareFactory]);

export { unauthenticatedHandler };
//# sourceMappingURL=unauthenticated.mjs.map
