import { nativeEventEmitter } from '../nativeModule.mjs';
import { normalizeNativeMessage } from '../utils/normalizeNativeMessage.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const addMessageEventListener = (event, listener) => nativeEventEmitter.addListener(event, (nativeMessage) => {
    listener(normalizeNativeMessage(nativeMessage), nativeMessage.completionHandlerId);
});

export { addMessageEventListener };
//# sourceMappingURL=addMessageEventListener.mjs.map
