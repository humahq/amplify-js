import { AmplifyError } from '@aws-amplify/core/internals/utils';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class PushNotificationError extends AmplifyError {
    constructor(params) {
        super(params);
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = PushNotificationError;
        Object.setPrototypeOf(this, PushNotificationError.prototype);
    }
}

export { PushNotificationError };
//# sourceMappingURL=PushNotificationError.mjs.map
