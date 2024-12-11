'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interactions = void 0;
const apis_1 = require("./apis");
/**
 * @deprecated recommend to migrate to AWS Lex V2 instead
 * */
exports.Interactions = {
    send: apis_1.send,
    onComplete: apis_1.onComplete,
};
//# sourceMappingURL=index.js.map
