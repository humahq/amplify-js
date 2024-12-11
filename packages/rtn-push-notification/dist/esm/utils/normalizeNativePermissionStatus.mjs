// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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

export { normalizeNativePermissionStatus };
//# sourceMappingURL=normalizeNativePermissionStatus.mjs.map
