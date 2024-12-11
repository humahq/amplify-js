import { CommonSQLiteAdapter } from '../common/CommonSQLiteAdapter.mjs';
import ExpoSQLiteDatabase from './ExpoSQLiteDatabase.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const ExpoSQLiteAdapter = new CommonSQLiteAdapter(new ExpoSQLiteDatabase());

export { ExpoSQLiteAdapter as default };
//# sourceMappingURL=ExpoSQLiteAdapter.mjs.map
