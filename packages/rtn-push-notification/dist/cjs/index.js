'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.module = void 0;
const apis_1 = require("./apis");
const module$1 = {
    addMessageEventListener: apis_1.addMessageEventListener,
    addTokenEventListener: apis_1.addTokenEventListener,
    completeNotification: apis_1.completeNotification,
    getBadgeCount: apis_1.getBadgeCount,
    getConstants: apis_1.getConstants,
    getLaunchNotification: apis_1.getLaunchNotification,
    getPermissionStatus: apis_1.getPermissionStatus,
    registerHeadlessTask: apis_1.registerHeadlessTask,
    requestPermissions: apis_1.requestPermissions,
    setBadgeCount: apis_1.setBadgeCount,
};
exports.module = module$1;
//# sourceMappingURL=index.js.map
