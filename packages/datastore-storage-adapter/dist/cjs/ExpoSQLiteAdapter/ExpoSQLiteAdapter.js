'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const CommonSQLiteAdapter_1 = require("../common/CommonSQLiteAdapter");
const ExpoSQLiteDatabase_1 = tslib_1.__importDefault(require("./ExpoSQLiteDatabase"));
const ExpoSQLiteAdapter = new CommonSQLiteAdapter_1.CommonSQLiteAdapter(new ExpoSQLiteDatabase_1.default());
exports.default = ExpoSQLiteAdapter;
//# sourceMappingURL=ExpoSQLiteAdapter.js.map
