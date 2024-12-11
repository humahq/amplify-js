(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@aws-amplify/core"), require("@aws-amplify/datastore"), require("react-native-sqlite-storage"));
	else if(typeof define === 'function' && define.amd)
		define("aws-amplify-datastore-storage-adapter", ["@aws-amplify/core", "@aws-amplify/datastore", "react-native-sqlite-storage"], factory);
	else if(typeof exports === 'object')
		exports["aws-amplify-datastore-storage-adapter"] = factory(require("@aws-amplify/core"), require("@aws-amplify/datastore"), require("react-native-sqlite-storage"));
	else
		root["aws-amplify-datastore-storage-adapter"] = factory(root["@aws-amplify/core"], root["@aws-amplify/datastore"], root["react-native-sqlite-storage"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__aws_amplify_core__, __WEBPACK_EXTERNAL_MODULE__aws_amplify_datastore__, __WEBPACK_EXTERNAL_MODULE_react_native_sqlite_storage__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@aws-amplify/core":
/*!************************************!*\
  !*** external "@aws-amplify/core" ***!
  \************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__aws_amplify_core__;

/***/ }),

/***/ "@aws-amplify/datastore":
/*!*****************************************!*\
  !*** external "@aws-amplify/datastore" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__aws_amplify_datastore__;

/***/ }),

/***/ "react-native-sqlite-storage":
/*!**********************************************!*\
  !*** external "react-native-sqlite-storage" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_native_sqlite_storage__;

/***/ }),

/***/ "./dist/esm/SQLiteAdapter/SQLiteAdapter.mjs":
/*!**************************************************!*\
  !*** ./dist/esm/SQLiteAdapter/SQLiteAdapter.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SQLiteAdapter)
/* harmony export */ });
/* harmony import */ var _common_CommonSQLiteAdapter_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/CommonSQLiteAdapter.mjs */ "./dist/esm/common/CommonSQLiteAdapter.mjs");
/* harmony import */ var _SQLiteDatabase_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SQLiteDatabase.mjs */ "./dist/esm/SQLiteAdapter/SQLiteDatabase.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const SQLiteAdapter = new _common_CommonSQLiteAdapter_mjs__WEBPACK_IMPORTED_MODULE_0__.CommonSQLiteAdapter(new _SQLiteDatabase_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]());


//# sourceMappingURL=SQLiteAdapter.mjs.map


/***/ }),

/***/ "./dist/esm/SQLiteAdapter/SQLiteDatabase.mjs":
/*!***************************************************!*\
  !*** ./dist/esm/SQLiteAdapter/SQLiteDatabase.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SQLiteDatabase)
/* harmony export */ });
/* harmony import */ var react_native_sqlite_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-native-sqlite-storage */ "react-native-sqlite-storage");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _common_constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/constants.mjs */ "./dist/esm/common/constants.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleLogger('SQLiteDatabase');
react_native_sqlite_storage__WEBPACK_IMPORTED_MODULE_0__.enablePromise(true);
if (_aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleLogger.LOG_LEVEL === 'DEBUG') {
    react_native_sqlite_storage__WEBPACK_IMPORTED_MODULE_0__.DEBUG(true);
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
            this.db = await react_native_sqlite_storage__WEBPACK_IMPORTED_MODULE_0__.openDatabase({
                name: _common_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.DB_NAME,
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
        await react_native_sqlite_storage__WEBPACK_IMPORTED_MODULE_0__.deleteDatabase({ name: _common_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.DB_NAME, location: 'default' });
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


//# sourceMappingURL=SQLiteDatabase.mjs.map


/***/ }),

/***/ "./dist/esm/common/CommonSQLiteAdapter.mjs":
/*!*************************************************!*\
  !*** ./dist/esm/common/CommonSQLiteAdapter.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommonSQLiteAdapter: () => (/* binding */ CommonSQLiteAdapter)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/datastore */ "@aws-amplify/datastore");
/* harmony import */ var _SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SQLiteUtils.mjs */ "./dist/esm/common/SQLiteUtils.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const { traverseModel, validatePredicate, isModelConstructor } = _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.utils;
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('DataStore');
class CommonSQLiteAdapter {
    constructor(db) {
        this.db = db;
    }
    async setUp(theSchema, namespaceResolver, modelInstanceCreator, getModelConstructorByModelName) {
        if (!this.initPromise) {
            this.initPromise = new Promise((_resolve, _reject) => {
                this.resolve = _resolve;
                this.reject = _reject;
            });
        }
        else {
            await this.initPromise;
            return;
        }
        this.schema = theSchema;
        this.namespaceResolver = namespaceResolver;
        this.modelInstanceCreator = modelInstanceCreator;
        this.getModelConstructorByModelName = getModelConstructorByModelName;
        try {
            const usesCPKCodegen = Object.values(this.schema.namespaces.user.models).some(model => Object.values(model.fields).some(field => 
            // eslint-disable-next-line no-prototype-builtins
            field.association?.hasOwnProperty('targetNames')));
            if (usesCPKCodegen) {
                logger.error('The SQLite adapter does not support schemas using custom primary key. Set `graphQLTransformer.respectPrimaryKeyAttributesOnConnectionField in `amplify/cli.json` to false to disable custom primary key. To regenerate your API, add or remove an empty newline to your GraphQL schema (to change the computed hash) then run `amplify push`.');
            }
            await this.db.init();
            const statements = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.generateSchemaStatements)(this.schema);
            await this.db.createSchema(statements);
            this.resolve();
        }
        catch (error) {
            this.reject(error);
        }
    }
    async clear() {
        await this.db.clear();
        this.initPromise = undefined;
    }
    async save(model, condition) {
        const modelConstructor = Object.getPrototypeOf(model)
            .constructor;
        const { name: tableName } = modelConstructor;
        const connectedModels = traverseModel(modelConstructor.name, model, this.schema.namespaces[this.namespaceResolver(modelConstructor)], this.modelInstanceCreator, this.getModelConstructorByModelName);
        const connectionStoreNames = Object.values(connectedModels).map(({ modelName, item, instance }) => {
            return { modelName, item, instance };
        });
        const [queryStatement, params] = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.queryByIdStatement)(model.id, tableName);
        const fromDB = await this.db.get(queryStatement, params);
        if (condition && fromDB) {
            const predicates = _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.ModelPredicateCreator.getPredicates(condition);
            const { predicates: predicateObjs, type } = predicates;
            const isValid = validatePredicate(fromDB, type, predicateObjs);
            if (!isValid) {
                const msg = 'Conditional update failed';
                logger.error(msg, { model: fromDB, condition: predicateObjs });
                throw new Error(msg);
            }
        }
        const result = [];
        const saveStatements = new Set();
        for await (const resItem of connectionStoreNames) {
            const { modelName, item, instance } = resItem;
            const { id } = item;
            const [queryStatementForRestItem, paramsForRestItem] = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.queryByIdStatement)(id, modelName);
            const fromDBForRestItem = await this.db.get(queryStatementForRestItem, paramsForRestItem);
            const opType = fromDBForRestItem === undefined ? _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.OpType.INSERT : _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.OpType.UPDATE;
            const saveStatement = fromDBForRestItem
                ? (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.modelUpdateStatement)(instance, modelName)
                : (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.modelInsertStatement)(instance, modelName);
            if (id === model.id || opType === _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.OpType.INSERT) {
                saveStatements.add(saveStatement);
                result.push([instance, opType]);
            }
        }
        await this.db.batchSave(saveStatements);
        return result;
    }
    async load(namespaceName, srcModelName, records) {
        const namespace = this.schema.namespaces[namespaceName];
        const relations = namespace.relationships[srcModelName].relationTypes;
        const connectionTableNames = relations.map(({ modelName }) => modelName);
        const modelConstructor = this.getModelConstructorByModelName(namespaceName, srcModelName);
        if (connectionTableNames.length === 0) {
            return records.map(record => this.modelInstanceCreator(modelConstructor, record));
        }
        // Remove related-model fields. They're all `null` in the database,
        // and any that happen to be required will result in a false validation
        // error when DataStore attempts to initialize with `null`.
        // These fields aren't actually needed here. DataStore will use the FK's
        // from the schema model.
        return records.map(record => {
            for (const r of relations) {
                delete record[r.fieldName];
            }
            return this.modelInstanceCreator(modelConstructor, record);
        });
    }
    async query(modelConstructor, predicate, pagination) {
        const { name: tableName } = modelConstructor;
        const namespaceName = this.namespaceResolver(modelConstructor);
        const predicates = predicate && _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.ModelPredicateCreator.getPredicates(predicate);
        const sortPredicates = pagination &&
            pagination.sort &&
            _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.ModelSortPredicateCreator.getPredicates(pagination.sort);
        const limit = pagination && pagination.limit;
        const page = limit && pagination.page;
        const queryById = predicates && this.idFromPredicate(predicates);
        const records = (await (async () => {
            if (queryById) {
                const record = await this.getById(tableName, queryById);
                return record ? [record] : [];
            }
            const [queryStatement, params] = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.queryAllStatement)(tableName, predicates, sortPredicates, limit, page);
            return this.db.getAll(queryStatement, params);
        })());
        return this.load(namespaceName, modelConstructor.name, records);
    }
    async getById(tableName, id) {
        const [queryStatement, params] = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.queryByIdStatement)(id, tableName);
        const record = await this.db.get(queryStatement, params);
        return record;
    }
    idFromPredicate(predicates) {
        const { predicates: predicateObjs } = predicates;
        const idPredicate = predicateObjs.length === 1 &&
            predicateObjs.find(p => (0,_aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.isPredicateObj)(p) && p.field === 'id' && p.operator === 'eq');
        return idPredicate && idPredicate.operand;
    }
    async queryOne(modelConstructor, firstOrLast = _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.QueryOne.FIRST) {
        const { name: tableName } = modelConstructor;
        const [queryStatement, params] = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.queryOneStatement)(firstOrLast, tableName);
        const result = await this.db.get(queryStatement, params);
        const modelInstance = result && this.modelInstanceCreator(modelConstructor, result);
        return modelInstance;
    }
    // Currently does not cascade
    // TODO: use FKs in relations and have `ON DELETE CASCADE` set
    // For Has Many and Has One relations to have SQL handle cascades automatically
    async delete(modelOrModelConstructor, condition) {
        if (isModelConstructor(modelOrModelConstructor)) {
            const modelConstructor = modelOrModelConstructor;
            const namespaceName = this.namespaceResolver(modelConstructor);
            const { name: tableName } = modelConstructor;
            const predicates = condition && _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.ModelPredicateCreator.getPredicates(condition);
            const queryStatement = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.queryAllStatement)(tableName, predicates);
            const deleteStatement = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.deleteByPredicateStatement)(tableName, predicates);
            const models = await this.db.selectAndDelete(queryStatement, deleteStatement);
            const modelInstances = await this.load(namespaceName, modelConstructor.name, models);
            return [modelInstances, modelInstances];
        }
        else {
            const model = modelOrModelConstructor;
            const modelConstructor = Object.getPrototypeOf(model)
                .constructor;
            const { name: tableName } = modelConstructor;
            if (condition) {
                const [queryStatement, params] = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.queryByIdStatement)(model.id, tableName);
                const fromDB = await this.db.get(queryStatement, params);
                if (fromDB === undefined) {
                    const msg = 'Model instance not found in storage';
                    logger.warn(msg, { model });
                    return [[model], []];
                }
                const predicates = _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.ModelPredicateCreator.getPredicates(condition);
                const { predicates: predicateObjs, type } = predicates;
                const isValid = validatePredicate(fromDB, type, predicateObjs);
                if (!isValid) {
                    const msg = 'Conditional update failed';
                    logger.error(msg, { model: fromDB, condition: predicateObjs });
                    throw new Error(msg);
                }
                const [deleteStatement, deleteParams] = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.deleteByIdStatement)(model.id, tableName);
                await this.db.save(deleteStatement, deleteParams);
                return [[model], [model]];
            }
            else {
                const [deleteStatement, params] = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.deleteByIdStatement)(model.id, tableName);
                await this.db.save(deleteStatement, params);
                return [[model], [model]];
            }
        }
    }
    async batchSave(modelConstructor, items) {
        const { name: tableName } = modelConstructor;
        const result = [];
        const itemsToSave = [];
        // To determine whether an item should result in an insert or update operation
        // We first need to query the local DB on the item id
        const queryStatements = new Set();
        // Deletes don't need to be queried first, because if the item doesn't exist,
        // the delete operation will be a no-op
        const deleteStatements = new Set();
        const saveStatements = new Set();
        for (const item of items) {
            const connectedModels = traverseModel(modelConstructor.name, this.modelInstanceCreator(modelConstructor, item), this.schema.namespaces[this.namespaceResolver(modelConstructor)], this.modelInstanceCreator, this.getModelConstructorByModelName);
            const { id, _deleted } = item;
            const { instance } = connectedModels.find(({ instance: connectedModelInstance }) => connectedModelInstance.id === id);
            if (_deleted) {
                // create the delete statements right away
                const deleteStatement = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.deleteByIdStatement)(instance.id, tableName);
                deleteStatements.add(deleteStatement);
                result.push([item, _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.OpType.DELETE]);
            }
            else {
                // query statements for the saves at first
                const queryStatement = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.queryByIdStatement)(id, tableName);
                queryStatements.add(queryStatement);
                // combination of insert and update items
                itemsToSave.push(instance);
            }
        }
        // returns the query results for each of the save items
        const queryResponses = await this.db.batchQuery(queryStatements);
        queryResponses.forEach((response, idx) => {
            if (response === undefined) {
                const insertStatement = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.modelInsertStatement)(itemsToSave[idx], tableName);
                saveStatements.add(insertStatement);
                result.push([itemsToSave[idx], _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.OpType.INSERT]);
            }
            else {
                const updateStatement = (0,_SQLiteUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.modelUpdateStatement)(itemsToSave[idx], tableName);
                saveStatements.add(updateStatement);
                result.push([itemsToSave[idx], _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_1__.OpType.UPDATE]);
            }
        });
        // perform all of the insert/update/delete operations in a single transaction
        await this.db.batchSave(saveStatements, deleteStatements);
        return result;
    }
}


//# sourceMappingURL=CommonSQLiteAdapter.mjs.map


/***/ }),

/***/ "./dist/esm/common/SQLiteUtils.mjs":
/*!*****************************************!*\
  !*** ./dist/esm/common/SQLiteUtils.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteByIdStatement: () => (/* binding */ deleteByIdStatement),
/* harmony export */   deleteByPredicateStatement: () => (/* binding */ deleteByPredicateStatement),
/* harmony export */   generateSchemaStatements: () => (/* binding */ generateSchemaStatements),
/* harmony export */   getSQLiteType: () => (/* binding */ getSQLiteType),
/* harmony export */   implicitAuthFieldsForModel: () => (/* binding */ implicitAuthFieldsForModel),
/* harmony export */   limitClauseFromPagination: () => (/* binding */ limitClauseFromPagination),
/* harmony export */   modelCreateTableStatement: () => (/* binding */ modelCreateTableStatement),
/* harmony export */   modelInsertStatement: () => (/* binding */ modelInsertStatement),
/* harmony export */   modelUpdateStatement: () => (/* binding */ modelUpdateStatement),
/* harmony export */   orderByClauseFromSort: () => (/* binding */ orderByClauseFromSort),
/* harmony export */   queryAllStatement: () => (/* binding */ queryAllStatement),
/* harmony export */   queryByIdStatement: () => (/* binding */ queryByIdStatement),
/* harmony export */   queryOneStatement: () => (/* binding */ queryOneStatement),
/* harmony export */   whereClauseFromPredicate: () => (/* binding */ whereClauseFromPredicate),
/* harmony export */   whereConditionFromPredicateObject: () => (/* binding */ whereConditionFromPredicateObject)
/* harmony export */ });
/* harmony import */ var _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/datastore */ "@aws-amplify/datastore");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const { USER, isNonModelConstructor, isModelConstructor } = _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_0__.utils;
const keysFromModel = model => Object.keys(model)
    .map(k => `"${k}"`)
    .join(', ');
const valuesFromModel = (model) => {
    const values = Object.values(model).map(prepareValueForDML);
    const paramaterized = values.map(() => '?').join(', ');
    return [paramaterized, values];
};
const updateSet = model => {
    const values = [];
    const paramaterized = Object.entries(model)
        .filter(([k]) => k !== 'id')
        .map(([k, v]) => {
        values.push(prepareValueForDML(v));
        return `"${k}"=?`;
    })
        .join(', ');
    return [paramaterized, values];
};
function prepareValueForDML(value) {
    const scalarTypes = ['string', 'number', 'boolean'];
    const isScalarType = value === null || value === undefined || scalarTypes.includes(typeof value);
    if (isScalarType) {
        return value;
    }
    const isObjectType = typeof value === 'object' &&
        (Object.getPrototypeOf(value).constructor === Object ||
            isNonModelConstructor(Object.getPrototypeOf(value).constructor) ||
            isModelConstructor(Object.getPrototypeOf(value).constructor));
    if (Array.isArray(value) || isObjectType) {
        return JSON.stringify(value);
    }
    return `${value}`;
}
function getSQLiteType(scalar) {
    switch (scalar) {
        case 'Boolean':
        case 'Int':
        case 'AWSTimestamp':
            return 'INTEGER';
        case 'ID':
        case 'String':
        case 'AWSDate':
        case 'AWSTime':
        case 'AWSDateTime':
        case 'AWSEmail':
        case 'AWSJSON':
        case 'AWSURL':
        case 'AWSPhone':
        case 'AWSIPAddress':
            return 'TEXT';
        case 'Float':
            return 'REAL';
        default: {
            throw new Error(`unknown type ${scalar}`);
        }
    }
}
function generateSchemaStatements(schema) {
    return Object.keys(schema.namespaces).flatMap(namespaceName => {
        const namespace = schema.namespaces[namespaceName];
        const isUserModel = namespaceName === USER;
        return Object.values(namespace.models).map(model => modelCreateTableStatement(model, isUserModel));
    });
}
const implicitAuthFieldsForModel = (model) => {
    if (!model.attributes || !model.attributes.length) {
        return [];
    }
    const authRules = model.attributes.find(_aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_0__.isModelAttributeAuth);
    if (!authRules) {
        return [];
    }
    const authFieldsForModel = authRules.properties.rules
        .filter((rule) => rule.ownerField || rule.groupsField)
        .map((rule) => rule.ownerField || rule.groupsField);
    return authFieldsForModel.filter((authField) => {
        const authFieldExplicitlyDefined = Object.values(model.fields).find((f) => f.name === authField);
        return !authFieldExplicitlyDefined;
    });
};
function modelCreateTableStatement(model, userModel = false) {
    // implicitly defined auth fields, e.g., `owner`, `groupsField`, etc.
    const implicitAuthFields = implicitAuthFieldsForModel(model);
    let fields = Object.values(model.fields).reduce((acc, field) => {
        if ((0,_aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_0__.isGraphQLScalarType)(field.type)) {
            if (field.name === 'id') {
                return [...acc, '"id" PRIMARY KEY NOT NULL'];
            }
            let columnParam = `"${field.name}" ${getSQLiteType(field.type)}`;
            if (field.isRequired) {
                columnParam += ' NOT NULL';
            }
            return [...acc, `${columnParam}`];
        }
        if ((0,_aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_0__.isModelFieldType)(field.type)) {
            let columnParam = `"${field.name}" TEXT`;
            // add targetName as well as field name for BELONGS_TO relations
            if ((0,_aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_0__.isTargetNameAssociation)(field.association)) {
                // check if this field has been explicitly defined in the model
                const fkDefinedInModel = Object.values(model.fields).find((f) => f.name === field?.association?.targetName);
                // if the FK is not explicitly defined in the model, we have to add it here
                if (!fkDefinedInModel) {
                    const required = field.isRequired ? ' NOT NULL' : '';
                    columnParam += `, "${field.association.targetName}" TEXT${required}`;
                }
            }
            // ignore isRequired param for model fields, since they will not contain
            // the related data locally
            return [...acc, `${columnParam}`];
        }
        // default to TEXT
        let columnParam = `"${field.name}" TEXT`;
        if (field.isRequired) {
            columnParam += ' NOT NULL';
        }
        return [...acc, `${columnParam}`];
    }, []);
    implicitAuthFields.forEach((authField) => {
        fields.push(`${authField} TEXT`);
    });
    if (userModel) {
        fields = [
            ...fields,
            `"_version" INTEGER`,
            `"_lastChangedAt" INTEGER`,
            `"_deleted" INTEGER`,
        ];
    }
    const createTableStatement = `CREATE TABLE IF NOT EXISTS "${model.name}" (${fields.join(', ')});`;
    return createTableStatement;
}
function modelInsertStatement(model, tableName) {
    const keys = keysFromModel(model);
    const [paramaterized, values] = valuesFromModel(model);
    const insertStatement = `INSERT INTO "${tableName}" (${keys}) VALUES (${paramaterized})`;
    return [insertStatement, values];
}
function modelUpdateStatement(model, tableName) {
    const [paramaterized, values] = updateSet(model);
    const updateStatement = `UPDATE "${tableName}" SET ${paramaterized} WHERE id=?`;
    return [updateStatement, [...values, model.id]];
}
function queryByIdStatement(id, tableName) {
    return [`SELECT * FROM "${tableName}" WHERE "id" = ?`, [id]];
}
/*
    Predicates supported by DataStore:

    Strings: eq | ne | le | lt | ge | gt | contains | notContains | beginsWith | between
    Numbers: eq | ne | le | lt | ge | gt | between
    Lists: contains | notContains
*/
const comparisonOperatorMap = {
    eq: '=',
    ne: '!=',
    le: '<=',
    lt: '<',
    ge: '>=',
    gt: '>',
};
const logicalOperatorMap = {
    beginsWith: '= 1',
    contains: '> 0',
    notContains: '= 0',
    between: 'BETWEEN',
};
/**
 * If the given (operator, operand) indicate the need for a special `NULL` comparison,
 * that `WHERE` clause condition will be returned. If not special `NULL` handling is
 * needed, `null` will be returned, and the caller should construct the `WHERE`
 * clause component using the normal operator map(s) and parameterization.
 *
 * @param operator "beginsWith" | "contains" | "notContains" | "between"
 * | "eq" | "ne" | "le" | "lt" | "ge" | "gt"
 * @param operand any
 * @returns (string | null) The `WHERE` clause component or `null` if N/A.
 */
function buildSpecialNullComparison(field, operator, operand) {
    if (operand === null || operand === undefined) {
        if (operator === 'eq') {
            return `"${field}" IS NULL`;
        }
        else if (operator === 'ne') {
            return `"${field}" IS NOT NULL`;
        }
    }
    // no special null handling required
    return null;
}
const whereConditionFromPredicateObject = ({ field, operator, operand, }) => {
    const specialNullClause = buildSpecialNullComparison(field, operator, operand);
    if (specialNullClause) {
        return [specialNullClause, []];
    }
    const comparisonOperator = comparisonOperatorMap[operator];
    if (comparisonOperator) {
        return [`"${field}" ${comparisonOperator} ?`, [operand]];
    }
    const logicalOperatorKey = operator;
    const logicalOperator = logicalOperatorMap[logicalOperatorKey];
    let statement;
    if (logicalOperator) {
        let rightExp = [];
        switch (logicalOperatorKey) {
            case 'between':
                rightExp = operand; // operand is a 2-tuple
                statement = [
                    `"${field}" ${logicalOperator} ${rightExp
                        .map(_ => '?')
                        .join(' AND ')}`,
                    rightExp,
                ];
                break;
            case 'beginsWith':
            case 'contains':
            case 'notContains':
                statement = [`instr("${field}", ?) ${logicalOperator}`, [operand]];
                break;
            default: {
                // Incorrect WHERE clause can result in data loss
                throw new Error('Cannot map predicate to a valid WHERE clause');
            }
        }
        return statement;
    }
};
function whereClauseFromPredicate(predicate) {
    const result = [];
    const params = [];
    recurse(predicate, result, params);
    const whereClause = `WHERE ${result.join(' ')}`;
    return [whereClause, params];
    function recurse(recursedPredicate, recursedResult = [], recursedParams = []) {
        if ((0,_aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_0__.isPredicateGroup)(recursedPredicate)) {
            const { type: groupType, predicates: groupPredicates } = recursedPredicate;
            let filterType = '';
            let isNegation = false;
            switch (groupType) {
                case 'not':
                    isNegation = true;
                    break;
                case 'and':
                    filterType = 'AND';
                    break;
                case 'or':
                    filterType = 'OR';
                    break;
                default: {
                    throw new Error(`Invalid ${groupType}`);
                }
            }
            const groupResult = [];
            for (const p of groupPredicates) {
                recurse(p, groupResult, recursedParams);
            }
            recursedResult.push(`${isNegation ? 'NOT' : ''}(${groupResult.join(` ${filterType} `)})`);
        }
        else if ((0,_aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_0__.isPredicateObj)(recursedPredicate)) {
            const [condition, conditionParams] = whereConditionFromPredicateObject(recursedPredicate);
            recursedResult.push(condition);
            recursedParams.push(...conditionParams);
        }
    }
}
const sortDirectionMap = {
    ASCENDING: 'ASC',
    DESCENDING: 'DESC',
};
function orderByClauseFromSort(sortPredicate = []) {
    const orderByParts = sortPredicate.map(({ field, sortDirection }) => `"${String(field)}" ${sortDirectionMap[sortDirection]}`);
    // We always sort by _rowid_ last
    orderByParts.push(`_rowid_ ${sortDirectionMap.ASCENDING}`);
    return `ORDER BY ${orderByParts.join(', ')}`;
}
function limitClauseFromPagination(limit, page = 0) {
    const params = [limit];
    let clause = 'LIMIT ?';
    if (page) {
        const offset = limit * page;
        params.push(offset);
        clause += ' OFFSET ?';
    }
    return [clause, params];
}
function queryAllStatement(tableName, predicate, sort, limit, page) {
    let statement = `SELECT * FROM "${tableName}"`;
    const params = [];
    if (predicate && predicate.predicates.length) {
        const [whereClause, whereParams] = whereClauseFromPredicate(predicate);
        statement += ` ${whereClause}`;
        params.push(...whereParams);
    }
    const orderByClause = orderByClauseFromSort(sort);
    statement += ` ${orderByClause}`;
    if (limit) {
        const [limitClause, limitParams] = limitClauseFromPagination(limit, page);
        statement += ` ${limitClause}`;
        params.push(...limitParams);
    }
    return [statement, params];
}
function queryOneStatement(firstOrLast, tableName) {
    if (firstOrLast === _aws_amplify_datastore__WEBPACK_IMPORTED_MODULE_0__.QueryOne.FIRST) {
        // ORDER BY rowid will no longer work as expected if a customer has
        // a field by that name in their schema. We may want to enforce it
        // as a reserved keyword in Codegen
        return [`SELECT * FROM ${tableName} ORDER BY _rowid_ LIMIT 1`, []];
    }
    else {
        return [`SELECT * FROM ${tableName} ORDER BY _rowid_ DESC LIMIT 1`, []];
    }
}
function deleteByIdStatement(id, tableName) {
    const deleteStatement = `DELETE FROM "${tableName}" WHERE "id"=?`;
    return [deleteStatement, [id]];
}
function deleteByPredicateStatement(tableName, predicate) {
    let statement = `DELETE FROM "${tableName}"`;
    const params = [];
    if (predicate && predicate.predicates.length) {
        const [whereClause, whereParams] = whereClauseFromPredicate(predicate);
        statement += ` ${whereClause}`;
        params.push(...whereParams);
    }
    return [statement, params];
}


//# sourceMappingURL=SQLiteUtils.mjs.map


/***/ }),

/***/ "./dist/esm/common/constants.mjs":
/*!***************************************!*\
  !*** ./dist/esm/common/constants.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DB_NAME: () => (/* binding */ DB_NAME)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const DB_NAME = 'AmplifyDatastore';


//# sourceMappingURL=constants.mjs.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./dist/esm/index.mjs ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SQLiteAdapter: () => (/* reexport safe */ _SQLiteAdapter_SQLiteAdapter_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _SQLiteAdapter_SQLiteAdapter_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SQLiteAdapter/SQLiteAdapter.mjs */ "./dist/esm/SQLiteAdapter/SQLiteAdapter.mjs");

//# sourceMappingURL=index.mjs.map

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=aws-amplify-datastore-storage-adapter.js.map