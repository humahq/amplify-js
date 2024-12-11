import { NativeModules } from 'react-native';
import { LINKING_ERROR } from './constants.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const nativeModule = NativeModules.AmplifyRTNWebBrowser
    ? NativeModules.AmplifyRTNWebBrowser
    : new Proxy({}, {
        get() {
            throw new Error(LINKING_ERROR);
        },
    });

export { nativeModule };
//# sourceMappingURL=nativeModule.mjs.map
