import { CommonSQLiteAdapter } from '../common/CommonSQLiteAdapter.mjs';
import SQLiteDatabase from './SQLiteDatabase.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const SQLiteAdapter = new CommonSQLiteAdapter(new SQLiteDatabase());

export { SQLiteAdapter as default };
//# sourceMappingURL=SQLiteAdapter.mjs.map
