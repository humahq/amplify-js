'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionsError = void 0;
const utils_1 = require("@aws-amplify/core/internals/utils");
class InteractionsError extends utils_1.AmplifyError {
    constructor(params) {
        super(params);
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = InteractionsError;
        Object.setPrototypeOf(this, InteractionsError.prototype);
    }
}
exports.InteractionsError = InteractionsError;
//# sourceMappingURL=InteractionsError.js.map
