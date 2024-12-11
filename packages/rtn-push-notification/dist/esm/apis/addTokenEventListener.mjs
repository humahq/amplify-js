import { nativeEventEmitter } from '../nativeModule.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const addTokenEventListener = (event, listener) => nativeEventEmitter.addListener(event, ({ token }) => {
    listener(token);
});

export { addTokenEventListener };
//# sourceMappingURL=addTokenEventListener.mjs.map
