'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeNotification = void 0;
const nativeModule_1 = require("../nativeModule");
const completeNotification = (completionHandlerId) => nativeModule_1.nativeModule.completeNotification?.(completionHandlerId);
exports.completeNotification = completeNotification;
//# sourceMappingURL=completeNotification.js.map
