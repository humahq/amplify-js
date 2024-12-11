'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.nativeModule = void 0;
const react_native_1 = require("react-native");
const constants_1 = require("./constants");
exports.nativeModule = react_native_1.NativeModules.AmplifyRTNWebBrowser
    ? react_native_1.NativeModules.AmplifyRTNWebBrowser
    : new Proxy({}, {
        get() {
            throw new Error(constants_1.LINKING_ERROR);
        },
    });
//# sourceMappingURL=nativeModule.js.map
