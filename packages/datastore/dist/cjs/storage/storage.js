'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveStorage = void 0;
const tslib_1 = require("tslib");
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const rxjs_1 = require("rxjs");
const utils_1 = require("@aws-amplify/core/internals/utils");
const core_1 = require("@aws-amplify/core");
const predicates_1 = require("../predicates");
const types_1 = require("../types");
const util_1 = require("../util");
const utils_2 = require("../sync/utils");
const getDefaultAdapter_1 = tslib_1.__importDefault(require("./adapter/getDefaultAdapter"));
const logger = new core_1.ConsoleLogger('DataStore');
class StorageClass {
    constructor(schema, namespaceResolver, getModelConstructorByModelName, modelInstanceCreator, adapter, sessionId) {
        this.schema = schema;
        this.namespaceResolver = namespaceResolver;
        this.getModelConstructorByModelName = getModelConstructorByModelName;
        this.modelInstanceCreator = modelInstanceCreator;
        this.adapter = adapter;
        this.sessionId = sessionId;
        this.adapter = this.adapter || (0, getDefaultAdapter_1.default)();
        this.pushStream = new rxjs_1.Subject();
    }
    static getNamespace() {
        const namespace = {
            name: util_1.STORAGE,
            relationships: {},
            enums: {},
            models: {},
            nonModels: {},
        };
        return namespace;
    }
    async init() {
        if (this.initialized !== undefined) {
            await this.initialized;
            return;
        }
        logger.debug('Starting Storage');
        let resolve;
        let reject;
        this.initialized = new Promise((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        });
        this.adapter.setUp(this.schema, this.namespaceResolver, this.modelInstanceCreator, this.getModelConstructorByModelName, this.sessionId).then(resolve, reject);
        await this.initialized;
    }
    async save(model, condition, mutator, patchesTuple) {
        await this.init();
        if (!this.adapter) {
            throw new Error('Storage adapter is missing');
        }
        const result = await this.adapter.save(model, condition);
        result.forEach(r => {
            const [savedElement, opType] = r;
            // truthy when save is called by the Merger
            const syncResponse = !!mutator;
            let updateMutationInput;
            // don't attempt to calc mutation input when storage.save
            // is called by Merger, i.e., when processing an AppSync response
            if ((opType === types_1.OpType.UPDATE || opType === types_1.OpType.INSERT) &&
                !syncResponse) {
                //
                // TODO: LOOK!!!
                // the `model` used here is in effect regardless of what model
                // comes back from adapter.save().
                // Prior to fix, SQLite adapter had been returning two models
                // of different types, resulting in invalid outbox entries.
                //
                // the bug is essentially fixed in SQLite adapter.
                // leaving as-is, because it's currently unclear whether anything
                // depends on this remaining as-is.
                //
                updateMutationInput = this.getChangedFieldsInput(model, savedElement, patchesTuple);
                // // an update without changed user fields
                // => don't create mutationEvent
                if (updateMutationInput === null) {
                    return result;
                }
            }
            const element = updateMutationInput || savedElement;
            const modelConstructor = Object.getPrototypeOf(savedElement)
                .constructor;
            this.pushStream.next({
                model: modelConstructor,
                opType,
                element,
                mutator,
                condition: (condition &&
                    predicates_1.ModelPredicateCreator.getPredicates(condition, false)) ||
                    null,
                savedElement,
            });
        });
        return result;
    }
    async delete(modelOrModelConstructor, condition, mutator) {
        await this.init();
        if (!this.adapter) {
            throw new Error('Storage adapter is missing');
        }
        let models;
        let deleted;
        [models, deleted] = await this.adapter.delete(modelOrModelConstructor, condition);
        const modelConstructor = (0, util_1.isModelConstructor)(modelOrModelConstructor)
            ? modelOrModelConstructor
            : Object.getPrototypeOf(modelOrModelConstructor || {})
                .constructor;
        const namespaceName = this.namespaceResolver(modelConstructor);
        const modelDefinition = this.schema.namespaces[namespaceName].models[modelConstructor.name];
        const modelIds = new Set(models.map(model => {
            const modelId = (0, utils_2.getIdentifierValue)(modelDefinition, model);
            return modelId;
        }));
        if (!(0, util_1.isModelConstructor)(modelOrModelConstructor) &&
            !Array.isArray(deleted)) {
            deleted = [deleted];
        }
        deleted.forEach(model => {
            const resolvedModelConstructor = Object.getPrototypeOf(model)
                .constructor;
            let theCondition;
            if (!(0, util_1.isModelConstructor)(modelOrModelConstructor)) {
                const modelId = (0, utils_2.getIdentifierValue)(modelDefinition, model);
                theCondition = modelIds.has(modelId)
                    ? predicates_1.ModelPredicateCreator.getPredicates(condition, false)
                    : undefined;
            }
            this.pushStream.next({
                model: resolvedModelConstructor,
                opType: types_1.OpType.DELETE,
                element: model,
                mutator,
                condition: theCondition || null,
            });
        });
        return [models, deleted];
    }
    async query(modelConstructor, predicate, pagination) {
        await this.init();
        if (!this.adapter) {
            throw new Error('Storage adapter is missing');
        }
        return this.adapter.query(modelConstructor, predicate, pagination);
    }
    async queryOne(modelConstructor, firstOrLast = types_1.QueryOne.FIRST) {
        await this.init();
        if (!this.adapter) {
            throw new Error('Storage adapter is missing');
        }
        return this.adapter.queryOne(modelConstructor, firstOrLast);
    }
    observe(modelConstructor, predicate, skipOwn) {
        const listenToAll = !modelConstructor;
        const { predicates, type } = (predicate && predicates_1.ModelPredicateCreator.getPredicates(predicate, false)) ||
            {};
        let result = this.pushStream
            .pipe((0, rxjs_1.filter)(({ mutator }) => {
            return !skipOwn || mutator !== skipOwn;
        }))
            .pipe((0, rxjs_1.map)(({ mutator: _mutator, ...message }) => message));
        if (!listenToAll) {
            result = result.pipe((0, rxjs_1.filter)(({ model, element }) => {
                if (modelConstructor !== model) {
                    return false;
                }
                if (!!predicates && !!type) {
                    return (0, util_1.validatePredicate)(element, type, predicates);
                }
                return true;
            }));
        }
        return result;
    }
    async clear(completeObservable = true) {
        this.initialized = undefined;
        if (!this.adapter) {
            throw new Error('Storage adapter is missing');
        }
        await this.adapter.clear();
        if (completeObservable) {
            this.pushStream.complete();
        }
    }
    async batchSave(modelConstructor, items, mutator) {
        await this.init();
        if (!this.adapter) {
            throw new Error('Storage adapter is missing');
        }
        const result = await this.adapter.batchSave(modelConstructor, items);
        result.forEach(([element, opType]) => {
            this.pushStream.next({
                model: modelConstructor,
                opType,
                element,
                mutator,
                condition: null,
            });
        });
        return result;
    }
    // returns null if no user fields were changed (determined by value comparison)
    getChangedFieldsInput(model, originalElement, patchesTuple) {
        const containsPatches = patchesTuple && patchesTuple.length;
        if (!containsPatches) {
            return null;
        }
        const [patches, source] = patchesTuple;
        const updatedElement = {};
        // extract array of updated fields from patches
        const updatedFields = patches.map(patch => patch.path && patch.path[0]);
        // check model def for association and replace with targetName if exists
        const modelConstructor = Object.getPrototypeOf(model)
            .constructor;
        const namespace = this.namespaceResolver(modelConstructor);
        const { fields } = this.schema.namespaces[namespace].models[modelConstructor.name];
        const { primaryKey, compositeKeys = [] } = this.schema.namespaces[namespace].keys?.[modelConstructor.name] || {};
        // set original values for these fields
        updatedFields.forEach((field) => {
            const targetNames = (0, types_1.isTargetNameAssociation)(fields[field]?.association);
            if (Array.isArray(targetNames)) {
                // if field refers to a belongsTo relation, use the target field instead
                for (const targetName of targetNames) {
                    // check field values by value. Ignore unchanged fields
                    if (!(0, util_1.valuesEqual)(source[targetName], originalElement[targetName])) {
                        // if the field was updated to 'undefined', replace with 'null' for compatibility with JSON and GraphQL
                        updatedElement[targetName] =
                            originalElement[targetName] === undefined
                                ? null
                                : originalElement[targetName];
                        for (const fieldSet of compositeKeys) {
                            // include all of the fields that comprise the composite key
                            if (fieldSet.has(targetName)) {
                                for (const compositeField of fieldSet) {
                                    updatedElement[compositeField] =
                                        originalElement[compositeField];
                                }
                            }
                        }
                    }
                }
            }
            else {
                // Backwards compatibility pre-CPK
                // if field refers to a belongsTo relation, use the target field instead
                const key = targetNames || field;
                // check field values by value. Ignore unchanged fields
                if (!(0, util_1.valuesEqual)(source[key], originalElement[key])) {
                    // if the field was updated to 'undefined', replace with 'null' for compatibility with JSON and GraphQL
                    updatedElement[key] =
                        originalElement[key] === undefined ? null : originalElement[key];
                    for (const fieldSet of compositeKeys) {
                        // include all of the fields that comprise the composite key
                        if (fieldSet.has(key)) {
                            for (const compositeField of fieldSet) {
                                updatedElement[compositeField] =
                                    originalElement[compositeField];
                            }
                        }
                    }
                }
            }
        });
        // Exit early when there are no changes introduced in the update mutation
        if (Object.keys(updatedElement).length === 0) {
            return null;
        }
        // include field(s) from custom PK if one is specified for the model
        if (primaryKey && primaryKey.length) {
            for (const pkField of primaryKey) {
                updatedElement[pkField] = originalElement[pkField];
            }
        }
        const { id, _version, _lastChangedAt, _deleted } = originalElement;
        // For update mutations we only want to send fields with changes
        // and the required internal fields
        return {
            ...updatedElement,
            id,
            _version,
            _lastChangedAt,
            _deleted,
        };
    }
}
class ExclusiveStorage {
    constructor(schema, namespaceResolver, getModelConstructorByModelName, modelInstanceCreator, adapter, sessionId) {
        this.mutex = new utils_1.Mutex();
        this.storage = new StorageClass(schema, namespaceResolver, getModelConstructorByModelName, modelInstanceCreator, adapter, sessionId);
    }
    runExclusive(fn) {
        return this.mutex.runExclusive(fn.bind(this, this.storage));
    }
    async save(model, condition, mutator, patchesTuple) {
        return this.runExclusive(storage => storage.save(model, condition, mutator, patchesTuple));
    }
    async delete(modelOrModelConstructor, condition, mutator) {
        return this.runExclusive(storage => {
            if ((0, util_1.isModelConstructor)(modelOrModelConstructor)) {
                const modelConstructor = modelOrModelConstructor;
                return storage.delete(modelConstructor, condition, mutator);
            }
            else {
                const model = modelOrModelConstructor;
                return storage.delete(model, condition, mutator);
            }
        });
    }
    async query(modelConstructor, predicate, pagination) {
        return this.runExclusive(storage => storage.query(modelConstructor, predicate, pagination));
    }
    async queryOne(modelConstructor, firstOrLast = types_1.QueryOne.FIRST) {
        return this.runExclusive(storage => storage.queryOne(modelConstructor, firstOrLast));
    }
    static getNamespace() {
        return StorageClass.getNamespace();
    }
    observe(modelConstructor, predicate, skipOwn) {
        return this.storage.observe(modelConstructor, predicate, skipOwn);
    }
    async clear() {
        await this.runExclusive(storage => storage.clear());
    }
    batchSave(modelConstructor, items) {
        return this.storage.batchSave(modelConstructor, items);
    }
    async init() {
        return this.storage.init();
    }
}
exports.ExclusiveStorage = ExclusiveStorage;
//# sourceMappingURL=storage.js.map