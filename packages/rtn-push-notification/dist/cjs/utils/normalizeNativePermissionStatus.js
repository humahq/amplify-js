'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeNativePermissionStatus = void 0;
/**
 * @internal
 */
const normalizeNativePermissionStatus = (nativeStatus) => {
    switch (nativeStatus) {
        case 'ShouldRequest':
            return 'shouldRequest';
        case 'NotDetermined':
        case 'ShouldExplainThenRequest':
            return 'shouldExplainThenRequest';
        case 'Authorized':
        case 'Granted':
            return 'granted';
        case 'Denied':
            return 'denied';
    }
};
exports.normalizeNativePermissionStatus = normalizeNativePermissionStatus;
//# sourceMappingURL=normalizeNativePermissionStatus.js.map
