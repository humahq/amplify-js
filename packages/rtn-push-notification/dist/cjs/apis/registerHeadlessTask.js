'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHeadlessTask = void 0;
const react_native_1 = require("react-native");
const utils_1 = require("../utils");
const getConstants_1 = require("./getConstants");
const registerHeadlessTask = (task) => {
    const { NativeHeadlessTaskKey } = (0, getConstants_1.getConstants)();
    if (NativeHeadlessTaskKey) {
        react_native_1.AppRegistry.registerHeadlessTask(NativeHeadlessTaskKey, () => async (nativeMessage) => {
            await task((0, utils_1.normalizeNativeMessage)(nativeMessage));
        });
    }
};
exports.registerHeadlessTask = registerHeadlessTask;
//# sourceMappingURL=registerHeadlessTask.js.map
