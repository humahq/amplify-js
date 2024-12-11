'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLaunchNotification = void 0;
const nativeModule_1 = require("../nativeModule");
const utils_1 = require("../utils");
const getLaunchNotification = async () => (0, utils_1.normalizeNativeMessage)((await nativeModule_1.nativeModule.getLaunchNotification()) ?? undefined);
exports.getLaunchNotification = getLaunchNotification;
//# sourceMappingURL=getLaunchNotification.js.map
