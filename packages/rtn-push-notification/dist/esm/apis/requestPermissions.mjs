import { nativeModule } from '../nativeModule.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const requestPermissions = async ({ alert = true, badge = true, sound = true } = {
    alert: true,
    badge: true,
    sound: true,
}) => nativeModule.requestPermissions({
    alert,
    badge,
    sound,
});

export { requestPermissions };
//# sourceMappingURL=requestPermissions.mjs.map
