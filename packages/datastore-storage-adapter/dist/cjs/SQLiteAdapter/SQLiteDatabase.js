'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const react_native_sqlite_storage_1 = tslib_1.__importDefault(require("react-native-sqlite-storage"));
const core_1 = require("@aws-amplify/core");
const constants_1 = require("../common/constants");
const logger = new core_1.ConsoleLogger('SQLiteDatabase');
react_native_sqlite_storage_1.default.enablePromise(true);
if (core_1.ConsoleLogger.LOG_LEVEL === 'DEBUG') {
    react_native_sqlite_storage_1.default.DEBUG(true);
}
/*

Note:
I purposely avoided using arrow functions () => {} in this class,
Because I ran into issues with them in some of the SQLite method callbacks

Also, even though the SQLite library is promisified, certain operations
only work correctly with callbacks. Specifically, any time you need to
get the result of an `executeSql` command inside of a transaction
(see the batchQuery method below)

*/
class SQLiteDatabase {
    async init() {
        // only open database once.
        if (!this.db) {
            this.db = await react_native_sqlite_storage_1.default.openDatabase({
                name: constants_1.DB_NAME,
                location: 'default',
            });
        }
    }
    async createSchema(statements) {
        await this.executeStatements(statements);
    }
    async clear() {
        await this.closeDB();
        logger.debug('Deleting database');
        await react_native_sqlite_storage_1.default.deleteDatabase({ name: constants_1.DB_NAME, location: 'default' });
        logger.debug('Database deleted');
    }
    async get(statement, params) {
        const results = await this.getAll(statement, params);
        return results[0];
    }
    async getAll(statement, params) {
        const [resultSet] = await this.db.executeSql(statement, params);
        const result = resultSet &&
            resultSet.rows &&
            resultSet.rows.length &&
            resultSet.rows.raw &&
            resultSet.rows.raw();
        return result || [];
    }
    async save(statement, params) {
        await this.db.executeSql(statement, params);
    }
    async batchQuery(queryParameterizedStatements) {
        const results = [];
        await this.db.readTransaction(tx => {
            for (const [statement, params] of queryParameterizedStatements) {
                tx.executeSql(statement, params, (_, res) => {
                    results.push(res.rows.raw()[0]);
                }, logger.warn);
            }
        });
        return results;
    }
    async batchSave(saveParameterizedStatements, deleteParameterizedStatements) {
        await this.db.transaction(tx => {
            for (const [statement, params] of saveParameterizedStatements) {
                tx.executeSql(statement, params);
            }
        });
        if (deleteParameterizedStatements) {
            await this.db.transaction(tx => {
                for (const [statement, params] of deleteParameterizedStatements) {
                    tx.executeSql(statement, params);
                }
            });
        }
    }
    async selectAndDelete(queryParameterizedStatement, deleteParameterizedStatement) {
        let results = [];
        const [queryStatement, queryParams] = queryParameterizedStatement;
        const [deleteStatement, deleteParams] = deleteParameterizedStatement;
        await this.db.transaction(tx => {
            tx.executeSql(queryStatement, queryParams, (_, res) => {
                results = res.rows.raw();
            }, logger.warn);
            tx.executeSql(deleteStatement, deleteParams, () => {
                // no-op
            }, logger.warn);
        });
        return results;
    }
    async executeStatements(statements) {
        await this.db.transaction(tx => {
            for (const statement of statements) {
                tx.executeSql(statement);
            }
        });
    }
    async closeDB() {
        if (this.db) {
            logger.debug('Closing Database');
            await this.db.close();
            logger.debug('Database closed');
            this.db = undefined;
        }
    }
}
exports.default = SQLiteDatabase;
//# sourceMappingURL=SQLiteDatabase.js.map
