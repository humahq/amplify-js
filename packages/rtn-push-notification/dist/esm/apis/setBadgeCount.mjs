import { nativeModule } from '../nativeModule.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const setBadgeCount = (count) => nativeModule.setBadgeCount?.(count);

export { setBadgeCount };
//# sourceMappingURL=setBadgeCount.mjs.map
