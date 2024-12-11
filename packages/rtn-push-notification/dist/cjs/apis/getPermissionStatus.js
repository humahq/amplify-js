'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermissionStatus = void 0;
const nativeModule_1 = require("../nativeModule");
const utils_1 = require("../utils");
const getPermissionStatus = async () => (0, utils_1.normalizeNativePermissionStatus)(await nativeModule_1.nativeModule.getPermissionStatus());
exports.getPermissionStatus = getPermissionStatus;
//# sourceMappingURL=getPermissionStatus.js.map
