import { AppRegistry } from 'react-native';
import { normalizeNativeMessage } from '../utils/normalizeNativeMessage.mjs';
import { getConstants } from './getConstants.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const registerHeadlessTask = (task) => {
    const { NativeHeadlessTaskKey } = getConstants();
    if (NativeHeadlessTaskKey) {
        AppRegistry.registerHeadlessTask(NativeHeadlessTaskKey, () => async (nativeMessage) => {
            await task(normalizeNativeMessage(nativeMessage));
        });
    }
};

export { registerHeadlessTask };
//# sourceMappingURL=registerHeadlessTask.mjs.map
