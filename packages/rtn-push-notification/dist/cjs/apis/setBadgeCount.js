'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBadgeCount = void 0;
const nativeModule_1 = require("../nativeModule");
const setBadgeCount = (count) => nativeModule_1.nativeModule.setBadgeCount?.(count);
exports.setBadgeCount = setBadgeCount;
//# sourceMappingURL=setBadgeCount.js.map
