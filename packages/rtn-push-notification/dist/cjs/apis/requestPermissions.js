'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPermissions = void 0;
const nativeModule_1 = require("../nativeModule");
const requestPermissions = async ({ alert = true, badge = true, sound = true } = {
    alert: true,
    badge: true,
    sound: true,
}) => nativeModule_1.nativeModule.requestPermissions({
    alert,
    badge,
    sound,
});
exports.requestPermissions = requestPermissions;
//# sourceMappingURL=requestPermissions.js.map
