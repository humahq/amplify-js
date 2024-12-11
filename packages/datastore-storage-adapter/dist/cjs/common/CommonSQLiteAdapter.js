'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonSQLiteAdapter = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const core_1 = require("@aws-amplify/core");
const datastore_1 = require("@aws-amplify/datastore");
const SQLiteUtils_1 = require("../common/SQLiteUtils");
const { traverseModel, validatePredicate, isModelConstructor } = datastore_1.utils;
const logger = new core_1.ConsoleLogger('DataStore');
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
            const statements = (0, SQLiteUtils_1.generateSchemaStatements)(this.schema);
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
        const [queryStatement, params] = (0, SQLiteUtils_1.queryByIdStatement)(model.id, tableName);
        const fromDB = await this.db.get(queryStatement, params);
        if (condition && fromDB) {
            const predicates = datastore_1.ModelPredicateCreator.getPredicates(condition);
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
            const [queryStatementForRestItem, paramsForRestItem] = (0, SQLiteUtils_1.queryByIdStatement)(id, modelName);
            const fromDBForRestItem = await this.db.get(queryStatementForRestItem, paramsForRestItem);
            const opType = fromDBForRestItem === undefined ? datastore_1.OpType.INSERT : datastore_1.OpType.UPDATE;
            const saveStatement = fromDBForRestItem
                ? (0, SQLiteUtils_1.modelUpdateStatement)(instance, modelName)
                : (0, SQLiteUtils_1.modelInsertStatement)(instance, modelName);
            if (id === model.id || opType === datastore_1.OpType.INSERT) {
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
        const predicates = predicate && datastore_1.ModelPredicateCreator.getPredicates(predicate);
        const sortPredicates = pagination &&
            pagination.sort &&
            datastore_1.ModelSortPredicateCreator.getPredicates(pagination.sort);
        const limit = pagination && pagination.limit;
        const page = limit && pagination.page;
        const queryById = predicates && this.idFromPredicate(predicates);
        const records = (await (async () => {
            if (queryById) {
                const record = await this.getById(tableName, queryById);
                return record ? [record] : [];
            }
            const [queryStatement, params] = (0, SQLiteUtils_1.queryAllStatement)(tableName, predicates, sortPredicates, limit, page);
            return this.db.getAll(queryStatement, params);
        })());
        return this.load(namespaceName, modelConstructor.name, records);
    }
    async getById(tableName, id) {
        const [queryStatement, params] = (0, SQLiteUtils_1.queryByIdStatement)(id, tableName);
        const record = await this.db.get(queryStatement, params);
        return record;
    }
    idFromPredicate(predicates) {
        const { predicates: predicateObjs } = predicates;
        const idPredicate = predicateObjs.length === 1 &&
            predicateObjs.find(p => (0, datastore_1.isPredicateObj)(p) && p.field === 'id' && p.operator === 'eq');
        return idPredicate && idPredicate.operand;
    }
    async queryOne(modelConstructor, firstOrLast = datastore_1.QueryOne.FIRST) {
        const { name: tableName } = modelConstructor;
        const [queryStatement, params] = (0, SQLiteUtils_1.queryOneStatement)(firstOrLast, tableName);
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
            const predicates = condition && datastore_1.ModelPredicateCreator.getPredicates(condition);
            const queryStatement = (0, SQLiteUtils_1.queryAllStatement)(tableName, predicates);
            const deleteStatement = (0, SQLiteUtils_1.deleteByPredicateStatement)(tableName, predicates);
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
                const [queryStatement, params] = (0, SQLiteUtils_1.queryByIdStatement)(model.id, tableName);
                const fromDB = await this.db.get(queryStatement, params);
                if (fromDB === undefined) {
                    const msg = 'Model instance not found in storage';
                    logger.warn(msg, { model });
                    return [[model], []];
                }
                const predicates = datastore_1.ModelPredicateCreator.getPredicates(condition);
                const { predicates: predicateObjs, type } = predicates;
                const isValid = validatePredicate(fromDB, type, predicateObjs);
                if (!isValid) {
                    const msg = 'Conditional update failed';
                    logger.error(msg, { model: fromDB, condition: predicateObjs });
                    throw new Error(msg);
                }
                const [deleteStatement, deleteParams] = (0, SQLiteUtils_1.deleteByIdStatement)(model.id, tableName);
                await this.db.save(deleteStatement, deleteParams);
                return [[model], [model]];
            }
            else {
                const [deleteStatement, params] = (0, SQLiteUtils_1.deleteByIdStatement)(model.id, tableName);
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
                const deleteStatement = (0, SQLiteUtils_1.deleteByIdStatement)(instance.id, tableName);
                deleteStatements.add(deleteStatement);
                result.push([item, datastore_1.OpType.DELETE]);
            }
            else {
                // query statements for the saves at first
                const queryStatement = (0, SQLiteUtils_1.queryByIdStatement)(id, tableName);
                queryStatements.add(queryStatement);
                // combination of insert and update items
                itemsToSave.push(instance);
            }
        }
        // returns the query results for each of the save items
        const queryResponses = await this.db.batchQuery(queryStatements);
        queryResponses.forEach((response, idx) => {
            if (response === undefined) {
                const insertStatement = (0, SQLiteUtils_1.modelInsertStatement)(itemsToSave[idx], tableName);
                saveStatements.add(insertStatement);
                result.push([itemsToSave[idx], datastore_1.OpType.INSERT]);
            }
            else {
                const updateStatement = (0, SQLiteUtils_1.modelUpdateStatement)(itemsToSave[idx], tableName);
                saveStatements.add(updateStatement);
                result.push([itemsToSave[idx], datastore_1.OpType.UPDATE]);
            }
        });
        // perform all of the insert/update/delete operations in a single transaction
        await this.db.batchSave(saveStatements, deleteStatements);
        return result;
    }
}
exports.CommonSQLiteAdapter = CommonSQLiteAdapter;
//# sourceMappingURL=CommonSQLiteAdapter.js.map
