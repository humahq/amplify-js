import { ConsoleLogger } from '@aws-amplify/core';
import { deleteAsync, documentDirectory } from 'expo-file-system';
import { openDatabase } from 'expo-sqlite';
import { DB_NAME } from '../common/constants.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new ConsoleLogger('ExpoSQLiteDatabase');
/*

Note:
ExpoSQLite transaction error callbacks require returning a boolean value to indicate whether the
error was handled or not. Returning a true value indicates the error was handled and does not
rollback the whole transaction.

*/
class ExpoSQLiteDatabase {
    async init() {
        // only open database once.
        if (!this.db) {
            // As per expo docs version, description and size arguments are ignored,
            // but are accepted by the function for compatibility with the WebSQL specification.
            // Hence, we do not need those arguments.
            this.db = openDatabase(DB_NAME);
        }
    }
    createSchema(statements) {
        return this.executeStatements(statements);
    }
    async clear() {
        try {
            logger.debug('Clearing database');
            await this.closeDB();
            // delete database is not supported by expo-sqlite.
            // Database file needs to be deleted using deleteAsync from expo-file-system
            await deleteAsync(`${documentDirectory}SQLite/${DB_NAME}`);
            logger.debug('Database cleared');
        }
        catch (error) {
            logger.warn('Error clearing the database.', error);
            // open database if it was closed earlier and this.db was set to undefined.
            this.init();
        }
    }
    async get(statement, params) {
        const results = await this.getAll(statement, params);
        return results[0];
    }
    getAll(statement, params) {
        return new Promise((resolve, reject) => {
            this.db.readTransaction(transaction => {
                transaction.executeSql(statement, params, (_, result) => {
                    resolve(result.rows._array || []);
                }, (_, error) => {
                    reject(error);
                    logger.warn(error);
                    return true;
                });
            });
        });
    }
    save(statement, params) {
        return new Promise((resolve, reject) => {
            this.db.transaction(transaction => {
                transaction.executeSql(statement, params, () => {
                    resolve(null);
                }, (_, error) => {
                    reject(error);
                    logger.warn(error);
                    return true;
                });
            });
        });
    }
    batchQuery(queryParameterizedStatements = new Set()) {
        return new Promise((resolve, reject) => {
            const resolveTransaction = resolve;
            const rejectTransaction = reject;
            this.db.transaction(async (transaction) => {
                try {
                    const results = await Promise.all([...queryParameterizedStatements].map(([statement, params]) => new Promise((_resolve, _reject) => {
                        transaction.executeSql(statement, params, (_, result) => {
                            _resolve(result.rows._array[0]);
                        }, (_, error) => {
                            _reject(error);
                            logger.warn(error);
                            return true;
                        });
                    })));
                    resolveTransaction(results);
                }
                catch (error) {
                    rejectTransaction(error);
                    logger.warn(error);
                }
            });
        });
    }
    batchSave(saveParameterizedStatements = new Set(), deleteParameterizedStatements) {
        return new Promise((resolve, reject) => {
            const resolveTransaction = resolve;
            const rejectTransaction = reject;
            this.db.transaction(async (transaction) => {
                try {
                    // await for all sql statements promises to resolve
                    await Promise.all([...saveParameterizedStatements].map(([statement, params]) => new Promise((_resolve, _reject) => {
                        transaction.executeSql(statement, params, () => {
                            _resolve(null);
                        }, (_, error) => {
                            _reject(error);
                            logger.warn(error);
                            return true;
                        });
                    })));
                    if (deleteParameterizedStatements) {
                        await Promise.all([...deleteParameterizedStatements].map(([statement, params]) => new Promise((_resolve, _reject) => {
                            transaction.executeSql(statement, params, () => {
                                _resolve(null);
                            }, (_, error) => {
                                _reject(error);
                                logger.warn(error);
                                return true;
                            });
                        })));
                    }
                    resolveTransaction(null);
                }
                catch (error) {
                    rejectTransaction(error);
                    logger.warn(error);
                }
            });
        });
    }
    selectAndDelete(queryParameterizedStatement, deleteParameterizedStatement) {
        const [queryStatement, queryParams] = queryParameterizedStatement;
        const [deleteStatement, deleteParams] = deleteParameterizedStatement;
        return new Promise((resolve, reject) => {
            const resolveTransaction = resolve;
            const rejectTransaction = reject;
            this.db.transaction(async (transaction) => {
                try {
                    const result = await new Promise((_resolve, _reject) => {
                        transaction.executeSql(queryStatement, queryParams, (_, sqlResult) => {
                            _resolve(sqlResult.rows._array || []);
                        }, (_, error) => {
                            _reject(error);
                            logger.warn(error);
                            return true;
                        });
                    });
                    await new Promise((_resolve, _reject) => {
                        transaction.executeSql(deleteStatement, deleteParams, () => {
                            _resolve(null);
                        }, (_, error) => {
                            _reject(error);
                            logger.warn(error);
                            return true;
                        });
                    });
                    resolveTransaction(result);
                }
                catch (error) {
                    rejectTransaction(error);
                    logger.warn(error);
                }
            });
        });
    }
    executeStatements(statements) {
        return new Promise((resolve, reject) => {
            const resolveTransaction = resolve;
            const rejectTransaction = reject;
            this.db.transaction(async (transaction) => {
                try {
                    await Promise.all(statements.map(statement => new Promise((_resolve, _reject) => {
                        transaction.executeSql(statement, [], () => {
                            _resolve(null);
                        }, (_, error) => {
                            _reject(error);
                            return true;
                        });
                    })));
                    resolveTransaction(null);
                }
                catch (error) {
                    rejectTransaction(error);
                    logger.warn(error);
                }
            });
        });
    }
    async closeDB() {
        if (this.db) {
            logger.debug('Closing Database');
            // closing database is not supported by expo-sqlite.
            // Workaround is to access the private db variable and call the close() method.
            await this.db._db.close();
            logger.debug('Database closed');
            this.db = undefined;
        }
    }
}

export { ExpoSQLiteDatabase as default };
//# sourceMappingURL=ExpoSQLiteDatabase.mjs.map
