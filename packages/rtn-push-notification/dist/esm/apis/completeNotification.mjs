import { nativeModule } from '../nativeModule.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const completeNotification = (completionHandlerId) => nativeModule.completeNotification?.(completionHandlerId);

export { completeNotification };
//# sourceMappingURL=completeNotification.mjs.map
