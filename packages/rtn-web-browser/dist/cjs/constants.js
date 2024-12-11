'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.LINKING_ERROR = exports.PACKAGE_NAME = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const react_native_1 = require("react-native");
// General
exports.PACKAGE_NAME = '@aws-amplify/rtn-web-browser';
exports.LINKING_ERROR = `The ${exports.PACKAGE_NAME} package doesn't seem to be linked. Make sure: \n\n` +
    react_native_1.Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo Go\n';
//# sourceMappingURL=constants.js.map
