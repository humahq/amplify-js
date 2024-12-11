import { nativeModule } from '../nativeModule.mjs';
import { normalizeNativeMessage } from '../utils/normalizeNativeMessage.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const getLaunchNotification = async () => normalizeNativeMessage((await nativeModule.getLaunchNotification()) ?? undefined);

export { getLaunchNotification };
//# sourceMappingURL=getLaunchNotification.mjs.map
