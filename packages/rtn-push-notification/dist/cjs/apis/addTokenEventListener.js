'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTokenEventListener = void 0;
const nativeModule_1 = require("../nativeModule");
const addTokenEventListener = (event, listener) => nativeModule_1.nativeEventEmitter.addListener(event, ({ token }) => {
    listener(token);
});
exports.addTokenEventListener = addTokenEventListener;
//# sourceMappingURL=addTokenEventListener.js.map
