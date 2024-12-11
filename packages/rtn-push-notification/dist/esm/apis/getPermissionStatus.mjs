import { nativeModule } from '../nativeModule.mjs';
import 'lodash/isEmpty.js';
import { normalizeNativePermissionStatus } from '../utils/normalizeNativePermissionStatus.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const getPermissionStatus = async () => normalizeNativePermissionStatus(await nativeModule.getPermissionStatus());

export { getPermissionStatus };
//# sourceMappingURL=getPermissionStatus.mjs.map
