'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBadgeCount = void 0;
const nativeModule_1 = require("../nativeModule");
const getBadgeCount = () => nativeModule_1.nativeModule.getBadgeCount?.();
exports.getBadgeCount = getBadgeCount;
//# sourceMappingURL=getBadgeCount.js.map
