import { assertValidationError } from '../errors/utils/assertValidationError.mjs';
import { StorageValidationErrorCode } from '../errors/types/validation.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const resolvePrefix = ({ accessLevel, targetIdentityId, }) => {
    if (accessLevel === 'private') {
        assertValidationError(!!targetIdentityId, StorageValidationErrorCode.NoIdentityId);
        return `private/${targetIdentityId}/`;
    }
    else if (accessLevel === 'protected') {
        assertValidationError(!!targetIdentityId, StorageValidationErrorCode.NoIdentityId);
        return `protected/${targetIdentityId}/`;
    }
    else {
        return 'public/';
    }
};

export { resolvePrefix };
//# sourceMappingURL=resolvePrefix.mjs.map
