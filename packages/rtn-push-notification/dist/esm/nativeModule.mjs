import { NativeModules, NativeEventEmitter } from 'react-native';
import { LINKING_ERROR } from './constants.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const nativeModule = NativeModules.AmplifyRTNPushNotification
    ? NativeModules.AmplifyRTNPushNotification
    : new Proxy({}, {
        get() {
            throw new Error(LINKING_ERROR);
        },
    });
const nativeEventEmitter = new NativeEventEmitter(nativeModule);

export { nativeEventEmitter, nativeModule };
//# sourceMappingURL=nativeModule.mjs.map
