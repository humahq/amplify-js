'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessageEventListener = void 0;
const nativeModule_1 = require("../nativeModule");
const utils_1 = require("../utils");
const addMessageEventListener = (event, listener) => nativeModule_1.nativeEventEmitter.addListener(event, (nativeMessage) => {
    listener((0, utils_1.normalizeNativeMessage)(nativeMessage), nativeMessage.completionHandlerId);
});
exports.addMessageEventListener = addMessageEventListener;
//# sourceMappingURL=addMessageEventListener.js.map
