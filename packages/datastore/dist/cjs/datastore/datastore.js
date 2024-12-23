'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = exports.initSchema = exports.DataStoreClass = exports.AsyncCollection = exports.AsyncItem = exports.getAttachment = exports.attached = exports.syncClasses = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const internals_1 = require("@aws-amplify/api/internals");
const core_1 = require("@aws-amplify/core");
const immer_1 = require("immer");
const utils_1 = require("@aws-amplify/core/internals/utils");
const rxjs_1 = require("rxjs");
const authModeStrategies_1 = require("../authModeStrategies");
const predicates_1 = require("../predicates");
const storage_1 = require("../storage/storage");
const relationship_1 = require("../storage/relationship");
const sync_1 = require("../sync");
const types_1 = require("../types");
const util_1 = require("../util");
const next_1 = require("../predicates/next");
const utils_2 = require("../sync/utils");
const utils_3 = require("./utils");
(0, immer_1.setAutoFreeze)(true);
(0, immer_1.enablePatches)();
const logger = new core_1.ConsoleLogger('DataStore');
const ulid = (0, util_1.monotonicUlidFactory)(Date.now());
const SETTING_SCHEMA_VERSION = 'schemaVersion';
let schema;
const modelNamespaceMap = new WeakMap();
/**
 * Stores data for crafting the correct update mutation input for a model.
 *
 * - `Patch[]` - array of changed fields and metadata.
 * - `PersistentModel` - the source model, used for diffing object-type fields.
 */
const modelPatchesMap = new WeakMap();
const getModelDefinition = (modelConstructor) => {
    const namespace = modelNamespaceMap.get(modelConstructor);
    const definition = namespace
        ? schema.namespaces[namespace].models[modelConstructor.name]
        : undefined;
    return definition;
};
/**
 * Determines whether the given object is a Model Constructor that DataStore can
 * safely use to construct objects and discover related metadata.
 *
 * @param obj The object to test.
 */
const isValidModelConstructor = (obj) => {
    return (0, util_1.isModelConstructor)(obj) && modelNamespaceMap.has(obj);
};
const namespaceResolver = modelConstructor => {
    const resolver = modelNamespaceMap.get(modelConstructor);
    if (!resolver) {
        throw new Error(`Namespace Resolver for '${modelConstructor.name}' not found! This is probably a bug in '@amplify-js/datastore'.`);
    }
    return resolver;
};
/**
 * Creates a predicate without any conditions that can be passed to customer
 * code to have conditions added to it.
 *
 * For example, in this query:
 *
 * ```ts
 * await DataStore.query(
 * 	Model,
 * 	item => item.field.eq('value')
 * );
 * ```
 *
 * `buildSeedPredicate(Model)` is used to create `item`, which is passed to the
 * predicate function, which in turn uses that "seed" predicate (`item`) to build
 * a predicate tree.
 *
 * @param modelConstructor The model the predicate will query.
 */
const buildSeedPredicate = (modelConstructor) => {
    if (!modelConstructor)
        throw new Error('Missing modelConstructor');
    const modelSchema = getModelDefinition(modelConstructor);
    if (!modelSchema)
        throw new Error('Missing modelSchema');
    const pks = (0, util_1.extractPrimaryKeyFieldNames)(modelSchema);
    if (!pks)
        throw new Error('Could not determine PK');
    return (0, next_1.recursivePredicateFor)({
        builder: modelConstructor,
        schema: modelSchema,
        pkField: pks,
    });
};
let userClasses;
let dataStoreClasses;
let storageClasses;
/**
 * Maps a model to its related models for memoization/immutability.
 */
const modelInstanceAssociationsMap = new WeakMap();
/**
 * Describes whether and to what a model is attached for lazy loading purposes.
 */
var ModelAttachment;
(function (ModelAttachment) {
    /**
     * Model doesn't lazy load from any data source.
     *
     * Related entity properties provided at instantiation are returned
     * via the respective lazy interfaces when their properties are invoked.
     */
    ModelAttachment["Detached"] = "Detached";
    /**
     * Model lazy loads from the global DataStore.
     */
    ModelAttachment["DataStore"] = "DataStore";
    /**
     * Demonstrative. Not yet implemented.
     */
    ModelAttachment["API"] = "API";
})(ModelAttachment || (ModelAttachment = {}));
/**
 * Tells us which data source a model is attached to (lazy loads from).
 *
 * If `Deatched`, the model's lazy properties will only ever return properties
 * from memory provided at construction time.
 */
const attachedModelInstances = new WeakMap();
/**
 * Registers a model instance against a data source (DataStore, API, or
 * Detached/None).
 *
 * The API option is demonstrative. Lazy loading against API is not yet
 * implemented.
 *
 * @param result A model instance or array of instances
 * @param attachment A ModelAttachment data source
 * @returns passes the `result` back through after attachment
 */
function attached(result, attachment) {
    if (Array.isArray(result)) {
        result.map(record => attached(record, attachment));
    }
    else {
        result && attachedModelInstances.set(result, attachment);
    }
    return result;
}
exports.attached = attached;
/**
 * Determines what source a model instance should lazy load from.
 *
 * If the instace was never explicitly registered, it is detached by default.
 *
 * @param instance A model instance
 */
const getAttachment = (instance) => {
    return attachedModelInstances.has(instance)
        ? attachedModelInstances.get(instance)
        : ModelAttachment.Detached;
};
exports.getAttachment = getAttachment;
const initSchema = (userSchema) => {
    if (schema !== undefined) {
        console.warn('The schema has already been initialized');
        return userClasses;
    }
    logger.log('validating schema', { schema: userSchema });
    checkSchemaCodegenVersion(userSchema.codegenVersion);
    const internalUserNamespace = {
        name: util_1.USER,
        ...userSchema,
    };
    logger.log('DataStore', 'Init models');
    userClasses = createTypeClasses(internalUserNamespace);
    logger.log('DataStore', 'Models initialized');
    const dataStoreNamespace = getNamespace();
    const storageNamespace = storage_1.ExclusiveStorage.getNamespace();
    const syncNamespace = sync_1.SyncEngine.getNamespace();
    dataStoreClasses = createTypeClasses(dataStoreNamespace);
    storageClasses = createTypeClasses(storageNamespace);
    exports.syncClasses = createTypeClasses(syncNamespace);
    schema = {
        namespaces: {
            [dataStoreNamespace.name]: dataStoreNamespace,
            [internalUserNamespace.name]: internalUserNamespace,
            [storageNamespace.name]: storageNamespace,
            [syncNamespace.name]: syncNamespace,
        },
        version: userSchema.version,
        codegenVersion: userSchema.codegenVersion,
    };
    Object.keys(schema.namespaces).forEach(namespace => {
        const [relations, keys] = (0, util_1.establishRelationAndKeys)(schema.namespaces[namespace]);
        schema.namespaces[namespace].relationships = relations;
        schema.namespaces[namespace].keys = keys;
        const modelAssociations = new Map();
        Object.values(schema.namespaces[namespace].models).forEach(model => {
            const connectedModels = [];
            Object.values(model.fields)
                .filter(field => field.association &&
                field.association.connectionType === 'BELONGS_TO' &&
                field.type.model !== model.name)
                .forEach(field => connectedModels.push(field.type.model));
            modelAssociations.set(model.name, connectedModels);
            // Precompute model info (such as pk fields) so that downstream schema consumers
            // (such as predicate builders) don't have to reach back into "DataStore" space
            // to go looking for it.
            Object.values(model.fields).forEach(field => {
                const relatedModel = userClasses[field.type.model];
                if ((0, util_1.isModelConstructor)(relatedModel)) {
                    Object.defineProperty(field.type, 'modelConstructor', {
                        get: () => {
                            const relatedModelDefinition = getModelDefinition(relatedModel);
                            if (!relatedModelDefinition)
                                throw new Error(`Could not find model definition for ${relatedModel.name}`);
                            return {
                                builder: relatedModel,
                                schema: relatedModelDefinition,
                                pkField: (0, util_1.extractPrimaryKeyFieldNames)(relatedModelDefinition),
                            };
                        },
                    });
                }
            });
            // compatibility with legacy/pre-PK codegen for lazy loading to inject
            // index fields into the model definition.
            // definition.cloudFields = { ...definition.fields };
            const { indexes } = schema.namespaces[namespace].relationships[model.name];
            const indexFields = new Set();
            for (const index of indexes) {
                for (const indexField of index[1]) {
                    indexFields.add(indexField);
                }
            }
            model.allFields = {
                ...Object.fromEntries([...indexFields.values()].map(name => [
                    name,
                    {
                        name,
                        type: 'ID',
                        isArray: false,
                    },
                ])),
                ...model.fields,
            };
        });
        const result = new Map();
        let count = 1000;
        // eslint-disable-next-line no-constant-binary-expression
        while (count > 0) {
            if (modelAssociations.size === 0) {
                break;
            }
            count--;
            if (count === 0) {
                throw new Error('Models are not topologically sortable. Please verify your schema.');
            }
            for (const modelName of Array.from(modelAssociations.keys())) {
                const parents = modelAssociations.get(modelName);
                if (parents?.every(x => result.has(x))) {
                    result.set(modelName, parents);
                }
            }
            Array.from(result.keys()).forEach(x => modelAssociations.delete(x));
        }
        schema.namespaces[namespace].modelTopologicalOrdering = result;
    });
    return userClasses;
};
exports.initSchema = initSchema;
/**
 * Throws an exception if the schema has *not* been initialized
 * by `initSchema()`.
 *
 * **To be called before trying to access schema.**
 *
 * Currently this only needs to be called in `start()` and `clear()` because
 * all other functions will call start first.
 */
const checkSchemaInitialized = () => {
    if (schema === undefined) {
        const message = 'Schema is not initialized. DataStore will not function as expected. This could happen if you have multiple versions of DataStore installed. Please see https://docs.amplify.aws/lib/troubleshooting/upgrading/q/platform/js/#check-for-duplicate-versions';
        logger.error(message);
        throw new Error(message);
    }
};
/**
 * Throws an exception if the schema is using a codegen version that is not supported.
 *
 * Set the supported version by setting majorVersion and minorVersion
 * This functions similar to ^ version range.
 * The tested codegenVersion major version must exactly match the set majorVersion
 * The tested codegenVersion minor version must be gt or equal to the set minorVersion
 * Example: For a min supported version of 5.4.0 set majorVersion = 5 and minorVersion = 4
 *
 * This regex will not work when setting a supported range with minor version
 * of 2 or more digits.
 * i.e. minorVersion = 10 will not work
 * The regex will work for testing a codegenVersion with multi digit minor
 * versions as long as the minimum minorVersion is single digit.
 * i.e. codegenVersion = 5.30.1, majorVersion = 5, minorVersion = 4 PASSES
 *
 * @param codegenVersion schema codegenVersion
 */
const checkSchemaCodegenVersion = (codegenVersion) => {
    const majorVersion = 3;
    const minorVersion = 2;
    let isValid = false;
    try {
        const versionParts = codegenVersion.split('.');
        const [major, minor] = versionParts;
        isValid = Number(major) === majorVersion && Number(minor) >= minorVersion;
    }
    catch (err) {
        console.log(`Error parsing codegen version: ${codegenVersion}\n${err}`);
    }
    if (!isValid) {
        const message = `Models were generated with an unsupported version of codegen. Codegen artifacts are from ${codegenVersion || 'an unknown version'}, whereas ^${majorVersion}.${minorVersion}.0 is required. ` +
            "Update to the latest CLI and run 'amplify codegen models'.";
        logger.error(message);
        throw new Error(message);
    }
};
const createTypeClasses = namespace => {
    const classes = {};
    Object.entries(namespace.models).forEach(([modelName, modelDefinition]) => {
        const clazz = createModelClass(modelDefinition);
        classes[modelName] = clazz;
        modelNamespaceMap.set(clazz, namespace.name);
    });
    Object.entries(namespace.nonModels || {}).forEach(([typeName, typeDefinition]) => {
        const clazz = createNonModelClass(typeDefinition);
        classes[typeName] = clazz;
    });
    return classes;
};
/**
 * Collection of instantiated models to allow storage of metadata apart from
 * the model visible to the consuming app -- in case the app doesn't have
 * metadata fields (_version, _deleted, etc.) exposed on the model itself.
 */
const instancesMetadata = new WeakSet();
function modelInstanceCreator(ModelConstructor, init) {
    instancesMetadata.add(init);
    return new ModelConstructor(init);
}
const validateModelFields = (modelDefinition) => (k, v) => {
    const fieldDefinition = modelDefinition.fields[k];
    if (fieldDefinition !== undefined) {
        const { type, isRequired, isArrayNullable, name, isArray } = fieldDefinition;
        const timestamps = (0, types_1.isSchemaModelWithAttributes)(modelDefinition)
            ? (0, util_1.getTimestampFields)(modelDefinition)
            : {};
        const isTimestampField = !!timestamps[name];
        if (((!isArray && isRequired) || (isArray && !isArrayNullable)) &&
            !isTimestampField &&
            (v === null || v === undefined)) {
            throw new Error(`Field ${name} is required`);
        }
        if ((0, types_1.isSchemaModelWithAttributes)(modelDefinition) &&
            !(0, util_1.isIdManaged)(modelDefinition)) {
            const keys = (0, util_1.extractPrimaryKeyFieldNames)(modelDefinition);
            if (keys.includes(k) && v === '') {
                logger.error(util_1.errorMessages.idEmptyString, { k, value: v });
                throw new Error(util_1.errorMessages.idEmptyString);
            }
        }
        if ((0, types_1.isGraphQLScalarType)(type)) {
            const jsType = types_1.GraphQLScalarType.getJSType(type);
            const validateScalar = types_1.GraphQLScalarType.getValidationFunction(type);
            if (type === 'AWSJSON') {
                if (typeof v === jsType) {
                    return;
                }
                if (typeof v === 'string') {
                    try {
                        JSON.parse(v);
                        return;
                    }
                    catch (error) {
                        throw new Error(`Field ${name} is an invalid JSON object. ${v}`);
                    }
                }
            }
            if (isArray) {
                let errorTypeText = jsType;
                if (!isRequired) {
                    errorTypeText = `${jsType} | null | undefined`;
                }
                if (!Array.isArray(v) && !isArrayNullable) {
                    throw new Error(`Field ${name} should be of type [${errorTypeText}], ${typeof v} received. ${v}`);
                }
                if (!(0, util_1.isNullOrUndefined)(v) &&
                    v.some(e => (0, util_1.isNullOrUndefined)(e) ? isRequired : typeof e !== jsType)) {
                    const elemTypes = v
                        .map(e => (e === null ? 'null' : typeof e))
                        .join(',');
                    throw new Error(`All elements in the ${name} array should be of type ${errorTypeText}, [${elemTypes}] received. ${v}`);
                }
                if (validateScalar && !(0, util_1.isNullOrUndefined)(v)) {
                    const validationStatus = v.map(e => {
                        if (!(0, util_1.isNullOrUndefined)(e)) {
                            return validateScalar(e);
                        }
                        else if ((0, util_1.isNullOrUndefined)(e) && !isRequired) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    if (!validationStatus.every(s => s)) {
                        throw new Error(`All elements in the ${name} array should be of type ${type}, validation failed for one or more elements. ${v}`);
                    }
                }
            }
            else if (!isRequired && v === undefined) ;
            else if (typeof v !== jsType && v !== null) {
                throw new Error(`Field ${name} should be of type ${jsType}, ${typeof v} received. ${v}`);
            }
            else if (!(0, util_1.isNullOrUndefined)(v) &&
                validateScalar &&
                !validateScalar(v) // TODO: why never, TS ... why ...
            ) {
                throw new Error(`Field ${name} should be of type ${type}, validation failed. ${v}`);
            }
        }
        else if ((0, types_1.isNonModelFieldType)(type)) {
            // do not check non model fields if undefined or null
            if (!(0, util_1.isNullOrUndefined)(v)) {
                const subNonModelDefinition = schema.namespaces.user.nonModels[type.nonModel];
                const modelValidator = validateModelFields(subNonModelDefinition);
                if (isArray) {
                    let errorTypeText = type.nonModel;
                    if (!isRequired) {
                        errorTypeText = `${type.nonModel} | null | undefined`;
                    }
                    if (!Array.isArray(v)) {
                        throw new Error(`Field ${name} should be of type [${errorTypeText}], ${typeof v} received. ${v}`);
                    }
                    v.forEach(item => {
                        if (((0, util_1.isNullOrUndefined)(item) && isRequired) ||
                            (typeof item !== 'object' && typeof item !== 'undefined')) {
                            throw new Error(`All elements in the ${name} array should be of type ${type.nonModel}, [${typeof item}] received. ${item}`);
                        }
                        if (!(0, util_1.isNullOrUndefined)(item)) {
                            Object.keys(subNonModelDefinition.fields).forEach(subKey => {
                                modelValidator(subKey, item[subKey]);
                            });
                        }
                    });
                }
                else {
                    if (typeof v !== 'object') {
                        throw new Error(`Field ${name} should be of type ${type.nonModel}, ${typeof v} recieved. ${v}`);
                    }
                    Object.keys(subNonModelDefinition.fields).forEach(subKey => {
                        modelValidator(subKey, v[subKey]);
                    });
                }
            }
        }
    }
};
const castInstanceType = (modelDefinition, k, v) => {
    const { isArray, type } = modelDefinition.fields[k] || {};
    // attempt to parse stringified JSON
    if (typeof v === 'string' &&
        (isArray ||
            type === 'AWSJSON' ||
            (0, types_1.isNonModelFieldType)(type) ||
            (0, types_1.isModelFieldType)(type))) {
        try {
            return JSON.parse(v);
        }
        catch {
            // if JSON is invalid, don't throw and let modelValidator handle it
        }
    }
    // cast from numeric representation of boolean to JS boolean
    if (typeof v === 'number' && type === 'Boolean') {
        return Boolean(v);
    }
    return v;
};
/**
 * Records the patches (as if against an empty object) used to initialize
 * an instance of a Model. This can be used for determining which fields to
 * send to the cloud durnig a CREATE mutation.
 */
const initPatches = new WeakMap();
/**
 * Attempts to apply type-aware, casted field values from a given `init`
 * object to the given `draft`.
 *
 * @param init The initialization object to extract field values from.
 * @param modelDefinition The definition describing the target object shape.
 * @param draft The draft to apply field values to.
 */
const initializeInstance = (init, modelDefinition, draft) => {
    const modelValidator = validateModelFields(modelDefinition);
    Object.entries(init).forEach(([k, v]) => {
        const parsedValue = castInstanceType(modelDefinition, k, v);
        modelValidator(k, parsedValue);
        draft[k] = parsedValue;
    });
};
/**
 * Updates a draft to standardize its customer-defined fields so that they are
 * consistent with the data as it would look after having been synchronized from
 * Cloud storage.
 *
 * The exceptions to this are:
 *
 * 1. Non-schema/Internal [sync] metadata fields.
 * 2. Cloud-managed fields, which are `null` until set by cloud storage.
 *
 * This function should be expanded if/when deviations between canonical Cloud
 * storage data and locally managed data are found. For now, the known areas
 * that require normalization are:
 *
 * 1. Ensuring all non-metadata fields are *defined*. (I.e., turn `undefined` -> `null`.)
 *
 * @param modelDefinition Definition for the draft. Used to discover all fields.
 * @param draft The instance draft to apply normalizations to.
 */
const normalize = (modelDefinition, draft) => {
    for (const k of Object.keys(modelDefinition.fields)) {
        if (draft[k] === undefined)
            draft[k] = null;
    }
};
const createModelClass = (modelDefinition) => {
    const clazz = class Model {
        constructor(init) {
            // we create a base instance first so we can distinguish which fields were explicitly
            // set by customer code versus those set by normalization. only those fields
            // which are explicitly set by customers should be part of create mutations.
            let patches = [];
            const baseInstance = (0, immer_1.produce)(this, (draft) => {
                initializeInstance(init, modelDefinition, draft);
                // model is initialized inside a DataStore component (e.g. by Sync Engine, Storage Engine, etc.)
                const isInternallyInitialized = instancesMetadata.has(init);
                const modelInstanceMetadata = isInternallyInitialized
                    ? init
                    : {};
                const { id: _id } = modelInstanceMetadata;
                if ((0, util_1.isIdManaged)(modelDefinition)) {
                    const isInternalModel = _id !== null && _id !== undefined;
                    const id = isInternalModel
                        ? _id
                        : modelDefinition.syncable
                            ? (0, utils_1.amplifyUuid)()
                            : ulid();
                    draft.id = id;
                }
                else if ((0, util_1.isIdOptionallyManaged)(modelDefinition)) {
                    // only auto-populate if the id was not provided
                    draft.id =
                        draft.id || (0, utils_1.amplifyUuid)();
                }
                if (!isInternallyInitialized) {
                    checkReadOnlyPropertyOnCreate(draft, modelDefinition);
                }
                const { _version, _lastChangedAt, _deleted } = modelInstanceMetadata;
                if (modelDefinition.syncable) {
                    draft._version = _version;
                    draft._lastChangedAt = _lastChangedAt;
                    draft._deleted = _deleted;
                }
            }, p => (patches = p));
            // now that we have a list of patches that encapsulate the explicit, customer-provided
            // fields, we can normalize. patches from normalization are ignored, because the changes
            // are only create to provide a consistent view of the data for fields pre/post sync
            // where possible. (not all fields can be normalized pre-sync, because they're generally
            // "cloud managed" fields, like createdAt and updatedAt.)
            const normalized = (0, immer_1.produce)(baseInstance, (draft) => {
                normalize(modelDefinition, draft);
            });
            initPatches.set(normalized, patches);
            return normalized;
        }
        static copyOf(source, fn) {
            const modelConstructor = Object.getPrototypeOf(source || {}).constructor;
            if (!isValidModelConstructor(modelConstructor)) {
                const msg = 'The source object is not a valid model';
                logger.error(msg, { source });
                throw new Error(msg);
            }
            let patches = [];
            const model = (0, immer_1.produce)(source, draft => {
                fn(draft);
                const keyNames = (0, util_1.extractPrimaryKeyFieldNames)(modelDefinition);
                // Keys are immutable
                keyNames.forEach(key => {
                    if (draft[key] !== source[key]) {
                        logger.warn(`copyOf() does not update PK fields. The '${key}' update is being ignored.`, { source });
                    }
                    draft[key] = source[key];
                });
                const modelValidator = validateModelFields(modelDefinition);
                Object.entries(draft).forEach(([k, v]) => {
                    const parsedValue = castInstanceType(modelDefinition, k, v);
                    modelValidator(k, parsedValue);
                });
                normalize(modelDefinition, draft);
            }, p => (patches = p));
            const hasExistingPatches = modelPatchesMap.has(source);
            if (patches.length || hasExistingPatches) {
                if (hasExistingPatches) {
                    const [existingPatches, existingSource] = modelPatchesMap.get(source);
                    const mergedPatches = (0, util_1.mergePatches)(existingSource, existingPatches, patches);
                    modelPatchesMap.set(model, [mergedPatches, existingSource]);
                    checkReadOnlyPropertyOnUpdate(mergedPatches, modelDefinition);
                }
                else {
                    modelPatchesMap.set(model, [patches, source]);
                    checkReadOnlyPropertyOnUpdate(patches, modelDefinition);
                }
            }
            else {
                // always register patches when performing a copyOf, even if the
                // patches list is empty. this allows `save()` to recognize when an
                // instance is the result of a `copyOf()`. without more significant
                // refactoring, this is the only way for `save()` to know which
                // diffs (patches) are relevant for `storage` to use in building
                // the list of "changed" fields for mutations.
                modelPatchesMap.set(model, [[], source]);
            }
            return attached(model, ModelAttachment.DataStore);
        }
        // "private" method (that's hidden via `Setting`) for `withSSRContext` to use
        // to gain access to `modelInstanceCreator` and `clazz` for persisting IDs from server to client.
        static fromJSON(json) {
            if (Array.isArray(json)) {
                return json.map(init => this.fromJSON(init));
            }
            const instance = modelInstanceCreator(clazz, json);
            const modelValidator = validateModelFields(modelDefinition);
            Object.entries(instance).forEach(([k, v]) => {
                modelValidator(k, v);
            });
            return attached(instance, ModelAttachment.DataStore);
        }
    };
    clazz[immer_1.immerable] = true;
    Object.defineProperty(clazz, 'name', { value: modelDefinition.name });
    // Add getters/setters for relationship fields.
    //  getter - for lazy loading
    //  setter - for FK management
    const allModelRelationships = relationship_1.ModelRelationship.allFrom({
        builder: clazz,
        schema: modelDefinition,
        pkField: (0, util_1.extractPrimaryKeyFieldNames)(modelDefinition),
    });
    for (const relationship of allModelRelationships) {
        const { field } = relationship;
        Object.defineProperty(clazz.prototype, modelDefinition.fields[field].name, {
            set(model) {
                if (!(typeof model === 'object' || typeof model === 'undefined'))
                    return;
                // if model is undefined or null, the connection should be removed
                if (model) {
                    // Avoid validation error when processing AppSync response with nested
                    // selection set. Nested entitites lack version field and can not be validated
                    // TODO: explore a more reliable method to solve this
                    if (Object.prototype.hasOwnProperty.call(model, '_version')) {
                        const modelConstructor = Object.getPrototypeOf(model || {})
                            .constructor;
                        if (!isValidModelConstructor(modelConstructor)) {
                            const msg = `Value passed to ${modelDefinition.name}.${field} is not a valid instance of a model`;
                            logger.error(msg, { model });
                            throw new Error(msg);
                        }
                        if (modelConstructor.name.toLowerCase() !==
                            relationship.remoteModelConstructor.name.toLowerCase()) {
                            const msg = `Value passed to ${modelDefinition.name}.${field} is not an instance of ${relationship.remoteModelConstructor.name}`;
                            logger.error(msg, { model });
                            throw new Error(msg);
                        }
                    }
                }
                // if the relationship can be managed automagically, set the FK's
                if (relationship.isComplete) {
                    for (let i = 0; i < relationship.localJoinFields.length; i++) {
                        this[relationship.localJoinFields[i]] =
                            model?.[relationship.remoteJoinFields[i]];
                    }
                    const instanceMemos = modelInstanceAssociationsMap.has(this)
                        ? modelInstanceAssociationsMap.get(this)
                        : modelInstanceAssociationsMap.set(this, {}).get(this);
                    instanceMemos[field] = model || undefined;
                }
            },
            get() {
                /**
                 * Bucket for holding related models instances specific to `this` instance.
                 */
                const instanceMemos = modelInstanceAssociationsMap.has(this)
                    ? modelInstanceAssociationsMap.get(this)
                    : modelInstanceAssociationsMap.set(this, {}).get(this);
                // if the memos already has a result for this field, we'll use it.
                // there is no "cache" invalidation of any kind; memos are permanent to
                // keep an immutable perception of the instance.
                if (!Object.prototype.hasOwnProperty.call(instanceMemos, field)) {
                    // before we populate the memo, we need to know where to look for relatives.
                    // today, this only supports DataStore. Models aren't managed elsewhere in Amplify.
                    if ((0, exports.getAttachment)(this) === ModelAttachment.DataStore) {
                        // when we fetch the results using a query constructed under the guidance
                        // of the relationship metadata, we DO NOT AWAIT resolution. we want to
                        // drop the promise into the memo's synchronously, eliminating the chance
                        // for a race.
                        const resultPromise = instance.query(relationship.remoteModelConstructor, base => base.and(q => {
                            return relationship.remoteJoinFields.map((joinField, index) => {
                                // TODO: anything we can use instead of `any` here?
                                return q[joinField].eq(this[relationship.localJoinFields[index]]);
                            });
                        }));
                        // results in hand, how we return them to the caller depends on the relationship type.
                        if (relationship.type === 'HAS_MANY') {
                            // collections should support async iteration, even though we don't
                            // leverage it fully [yet].
                            instanceMemos[field] = new AsyncCollection(resultPromise);
                        }
                        else {
                            // non-collections should only ever return 1 value *or nothing*.
                            // if we have more than 1 record, something's amiss. it's not our job
                            // pick a result for the customer. it's our job to say "something's wrong."
                            instanceMemos[field] = resultPromise.then(rows => {
                                if (rows.length > 1) {
                                    // should never happen for a HAS_ONE or BELONGS_TO.
                                    const err = new Error(`
									Data integrity error.
									Too many records found for a HAS_ONE/BELONGS_TO field '${modelDefinition.name}.${field}'
								`);
                                    console.error(err);
                                    throw err;
                                }
                                else {
                                    return rows[0];
                                }
                            });
                        }
                    }
                    else if ((0, exports.getAttachment)(this) === ModelAttachment.API) {
                        throw new Error('Lazy loading from API is not yet supported!');
                    }
                    else {
                        if (relationship.type === 'HAS_MANY') {
                            return new AsyncCollection([]);
                        }
                        else {
                            return Promise.resolve(undefined);
                        }
                    }
                }
                return instanceMemos[field];
            },
        });
    }
    return clazz;
};
/**
 * An eventually loaded related model instance.
 */
class AsyncItem extends Promise {
}
exports.AsyncItem = AsyncItem;
/**
 * A collection of related model instances.
 *
 * This collection can be async-iterated or turned directly into an array using `toArray()`.
 */
class AsyncCollection {
    constructor(values) {
        this.values = values;
    }
    /**
     * Facilitates async iteration.
     *
     * ```ts
     * for await (const item of collection) {
     *   handle(item)
     * }
     * ```
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
     */
    [Symbol.asyncIterator]() {
        let values;
        let index = 0;
        return {
            next: async () => {
                if (!values)
                    values = await this.values;
                if (index < values.length) {
                    const result = {
                        value: values[index],
                        done: false,
                    };
                    index++;
                    return result;
                }
                return {
                    value: null,
                    done: true,
                };
            },
        };
    }
    /**
     * Turns the collection into an array, up to the amount specified in `max` param.
     *
     * ```ts
     * const all = await collection.toArray();
     * const first100 = await collection.toArray({max: 100});
     * ```
     */
    async toArray({ max = Number.MAX_SAFE_INTEGER, } = {}) {
        const output = [];
        let i = 0;
        for await (const element of this) {
            if (i < max) {
                output.push(element);
                i++;
            }
            else {
                break;
            }
        }
        return output;
    }
}
exports.AsyncCollection = AsyncCollection;
const checkReadOnlyPropertyOnCreate = (draft, modelDefinition) => {
    const modelKeys = Object.keys(draft);
    const { fields } = modelDefinition;
    modelKeys.forEach(key => {
        if (fields[key] && fields[key].isReadOnly) {
            throw new Error(`${key} is read-only.`);
        }
    });
};
const checkReadOnlyPropertyOnUpdate = (patches, modelDefinition) => {
    const patchArray = patches.map(p => [p.path[0], p.value]);
    const { fields } = modelDefinition;
    patchArray.forEach(([key, val]) => {
        if (!val || !fields[key])
            return;
        if (fields[key].isReadOnly) {
            throw new Error(`${key} is read-only.`);
        }
    });
};
const createNonModelClass = (typeDefinition) => {
    const clazz = class Model {
        constructor(init) {
            const instance = (0, immer_1.produce)(this, (draft) => {
                initializeInstance(init, typeDefinition, draft);
            });
            return instance;
        }
    };
    clazz[immer_1.immerable] = true;
    Object.defineProperty(clazz, 'name', { value: typeDefinition.name });
    (0, util_1.registerNonModelClass)(clazz);
    return clazz;
};
function isQueryOne(obj) {
    return typeof obj === 'string';
}
function defaultConflictHandler(conflictData) {
    const { localModel, modelConstructor, remoteModel } = conflictData;
    const { _version } = remoteModel;
    return modelInstanceCreator(modelConstructor, { ...localModel, _version });
}
function defaultErrorHandler(error) {
    logger.warn(error);
}
function getModelConstructorByModelName(namespaceName, modelName) {
    let result;
    switch (namespaceName) {
        case util_1.DATASTORE:
            result = dataStoreClasses[modelName];
            break;
        case util_1.USER:
            result = userClasses[modelName];
            break;
        case util_1.SYNC:
            result = exports.syncClasses[modelName];
            break;
        case util_1.STORAGE:
            result = storageClasses[modelName];
            break;
        default:
            throw new Error(`Invalid namespace: ${namespaceName}`);
    }
    if (isValidModelConstructor(result)) {
        return result;
    }
    else {
        const msg = `Model name is not valid for namespace. modelName: ${modelName}, namespace: ${namespaceName}`;
        logger.error(msg);
        throw new Error(msg);
    }
}
/**
 * Queries the DataStore metadata tables to see if they are the expected
 * version. If not, clobbers the whole DB. If so, leaves them alone.
 * Otherwise, simply writes the schema version.
 *
 * SIDE EFFECT:
 * 1. Creates a transaction
 * 1. Updates data.
 *
 * @param storage Storage adapter containing the metadata.
 * @param version The expected schema version.
 */
async function checkSchemaVersion(storage, version) {
    const SettingCtor = dataStoreClasses.Setting;
    const modelDefinition = schema.namespaces[util_1.DATASTORE].models.Setting;
    await storage.runExclusive(async (s) => {
        const [schemaVersionSetting] = await s.query(SettingCtor, predicates_1.ModelPredicateCreator.createFromAST(modelDefinition, {
            and: { key: { eq: SETTING_SCHEMA_VERSION } },
        }), { page: 0, limit: 1 });
        if (schemaVersionSetting !== undefined &&
            schemaVersionSetting.value !== undefined) {
            const storedValue = JSON.parse(schemaVersionSetting.value);
            if (storedValue !== version) {
                await s.clear(false);
            }
        }
        else {
            await s.save(modelInstanceCreator(SettingCtor, {
                key: SETTING_SCHEMA_VERSION,
                value: JSON.stringify(version),
            }));
        }
    });
}
let syncSubscription;
function getNamespace() {
    const namespace = {
        name: util_1.DATASTORE,
        relationships: {},
        enums: {},
        nonModels: {},
        models: {
            Setting: {
                name: 'Setting',
                pluralName: 'Settings',
                syncable: false,
                fields: {
                    id: {
                        name: 'id',
                        type: 'ID',
                        isRequired: true,
                        isArray: false,
                    },
                    key: {
                        name: 'key',
                        type: 'String',
                        isRequired: true,
                        isArray: false,
                    },
                    value: {
                        name: 'value',
                        type: 'String',
                        isRequired: true,
                        isArray: false,
                    },
                },
            },
        },
    };
    return namespace;
}
var DataStoreState;
(function (DataStoreState) {
    DataStoreState["NotRunning"] = "Not Running";
    DataStoreState["Starting"] = "Starting";
    DataStoreState["Running"] = "Running";
    DataStoreState["Stopping"] = "Stopping";
    DataStoreState["Clearing"] = "Clearing";
})(DataStoreState || (DataStoreState = {}));
// TODO: How can we get rid of the non-null assertions?
// https://github.com/aws-amplify/amplify-js/pull/10477/files#r1007363485
class DataStore {
    constructor() {
        // reference to configured category instances. Used for preserving SSR context
        this.InternalAPI = internals_1.InternalAPI;
        this.Cache = core_1.Cache;
        // Non-null assertions (bang operator) have been added to most of these properties
        // to make TS happy. These properties are all expected to be set immediately after
        // construction.
        // TODO: Refactor to use proper DI if possible. If not possible, change these to
        // optionals and implement conditional checks throughout. Rinse/repeat on all
        // sync engine processors, storage engine, adapters, etc..
        this.amplifyConfig = {};
        this.syncPredicates = new WeakMap();
        // object that gets passed to descendent classes. Allows us to pass these down by reference
        this.amplifyContext = {
            InternalAPI: this.InternalAPI,
        };
        /**
         * **IMPORTANT!**
         *
         * Accumulator for background things that can **and MUST** be called when
         * DataStore stops.
         *
         * These jobs **MUST** be *idempotent promises* that resolve ONLY
         * once the intended jobs are completely finished and/or otherwise destroyed
         * and cleaned up with ZERO outstanding:
         *
         * 1. side effects (e.g., state changes)
         * 1. callbacks
         * 1. subscriptions
         * 1. calls to storage
         * 1. *etc.*
         *
         * Methods that create pending promises, subscriptions, callbacks, or any
         * type of side effect **MUST** be registered with the manager. And, a new
         * manager must be created after each `exit()`.
         *
         * Failure to comply will put DataStore into a highly unpredictable state
         * when it needs to stop or clear -- which occurs when restarting with new
         * sync expressions, during testing, and potentially during app code
         * recovery handling, etc..
         *
         * It is up to the discretion of each disposer whether to wait for job
         * completion or to cancel operations and issue failures *as long as the
         * disposer returns in a reasonable amount of time.*
         *
         * (Reasonable = *seconds*, not minutes.)
         */
        this.runningProcesses = new utils_1.BackgroundProcessManager();
        /**
         * Indicates what state DataStore is in.
         *
         * Not [yet?] used for actual state management; but for messaging
         * when errors occur, to help troubleshoot.
         */
        this.state = DataStoreState.NotRunning;
        /**
         * If not already done:
         * 1. Attaches and initializes storage.
         * 2. Loads the schema and records metadata.
         * 3. If `this.amplifyConfig.aws_appsync_graphqlEndpoint` contains a URL,
         * attaches a sync engine, starts it, and subscribes.
         */
        this.start = async () => {
            return this.runningProcesses
                .add(async () => {
                this.state = DataStoreState.Starting;
                if (this.initialized === undefined) {
                    logger.debug('Starting DataStore');
                    this.initialized = new Promise((resolve, reject) => {
                        this.initResolve = resolve;
                        this.initReject = reject;
                    });
                }
                else {
                    await this.initialized;
                    return;
                }
                this.storage = new storage_1.ExclusiveStorage(schema, namespaceResolver, getModelConstructorByModelName, modelInstanceCreator, this.storageAdapter, this.sessionId);
                await this.storage.init();
                checkSchemaInitialized();
                await checkSchemaVersion(this.storage, schema.version);
                const { aws_appsync_graphqlEndpoint } = this.amplifyConfig;
                if (aws_appsync_graphqlEndpoint) {
                    logger.debug('GraphQL endpoint available', aws_appsync_graphqlEndpoint);
                    this.syncPredicates = await this.processSyncExpressions();
                    this.sync = new sync_1.SyncEngine(schema, namespaceResolver, exports.syncClasses, userClasses, this.storage, modelInstanceCreator, this.conflictHandler, this.errorHandler, this.syncPredicates, this.amplifyConfig, this.authModeStrategy, this.amplifyContext, this.connectivityMonitor);
                    const fullSyncIntervalInMilliseconds = this.fullSyncInterval * 1000 * 60; // fullSyncInterval from param is in minutes
                    syncSubscription = this.sync
                        .start({ fullSyncInterval: fullSyncIntervalInMilliseconds })
                        .subscribe({
                        next: ({ type, data }) => {
                            /**
                             * In Node, we need to wait for queries to be synced to prevent returning empty arrays.
                             * In non-Node environments (the browser or React Native), we can begin returning data
                             * once subscriptions are in place.
                             */
                            const readyType = (0, utils_3.isNode)()
                                ? sync_1.ControlMessage.SYNC_ENGINE_SYNC_QUERIES_READY
                                : sync_1.ControlMessage.SYNC_ENGINE_STORAGE_SUBSCRIBED;
                            if (type === readyType) {
                                this.initResolve();
                            }
                            core_1.Hub.dispatch('datastore', {
                                event: type,
                                data,
                            });
                        },
                        error: err => {
                            logger.warn('Sync error', err);
                            this.initReject();
                        },
                    });
                }
                else {
                    logger.warn("Data won't be synchronized. No GraphQL endpoint configured. Did you forget `Amplify.configure(awsconfig)`?", {
                        config: this.amplifyConfig,
                    });
                    this.initResolve();
                }
                await this.initialized;
                this.state = DataStoreState.Running;
            }, 'datastore start')
                .catch(this.handleAddProcError('DataStore.start()'));
        };
        this.query = async (modelConstructor, identifierOrCriteria, paginationProducer) => {
            return this.runningProcesses
                .add(async () => {
                await this.start();
                let result;
                if (!this.storage) {
                    throw new Error('No storage to query');
                }
                // #region Input validation
                if (!isValidModelConstructor(modelConstructor)) {
                    const msg = 'Constructor is not for a valid model';
                    logger.error(msg, { modelConstructor });
                    throw new Error(msg);
                }
                if (typeof identifierOrCriteria === 'string') {
                    if (paginationProducer !== undefined) {
                        logger.warn('Pagination is ignored when querying by id');
                    }
                }
                const modelDefinition = getModelDefinition(modelConstructor);
                if (!modelDefinition) {
                    throw new Error('Invalid model definition provided!');
                }
                const pagination = this.processPagination(modelDefinition, paginationProducer);
                const keyFields = (0, util_1.extractPrimaryKeyFieldNames)(modelDefinition);
                if (isQueryOne(identifierOrCriteria)) {
                    if (keyFields.length > 1) {
                        const msg = util_1.errorMessages.queryByPkWithCompositeKeyPresent;
                        logger.error(msg, { keyFields });
                        throw new Error(msg);
                    }
                    const predicate = predicates_1.ModelPredicateCreator.createFromFlatEqualities(modelDefinition, { [keyFields[0]]: identifierOrCriteria });
                    result = await this.storage.query(modelConstructor, predicate, pagination);
                }
                else {
                    // Object is being queried using object literal syntax
                    if ((0, types_1.isIdentifierObject)(identifierOrCriteria, modelDefinition)) {
                        const predicate = predicates_1.ModelPredicateCreator.createForPk(modelDefinition, identifierOrCriteria);
                        result = await this.storage.query(modelConstructor, predicate, pagination);
                    }
                    else if (!identifierOrCriteria ||
                        (0, predicates_1.isPredicatesAll)(identifierOrCriteria)) {
                        result = await this.storage?.query(modelConstructor, undefined, pagination);
                    }
                    else {
                        const seedPredicate = (0, next_1.recursivePredicateFor)({
                            builder: modelConstructor,
                            schema: modelDefinition,
                            pkField: (0, util_1.extractPrimaryKeyFieldNames)(modelDefinition),
                        });
                        const predicate = (0, next_1.internals)(identifierOrCriteria(seedPredicate));
                        result = (await predicate.fetch(this.storage));
                        result = (0, util_1.inMemoryPagination)(result, pagination);
                    }
                }
                // #endregion
                const returnOne = isQueryOne(identifierOrCriteria) ||
                    (0, types_1.isIdentifierObject)(identifierOrCriteria, modelDefinition);
                return attached(returnOne ? result[0] : result, ModelAttachment.DataStore);
            }, 'datastore query')
                .catch(this.handleAddProcError('DataStore.query()'));
        };
        this.save = async (model, condition) => {
            return this.runningProcesses
                .add(async () => {
                await this.start();
                if (!this.storage) {
                    throw new Error('No storage to save to');
                }
                // Immer patches for constructing a correct update mutation input
                // Allows us to only include changed fields for updates
                const updatedPatchesTuple = modelPatchesMap.get(model);
                // Immer patches for initial object construction. These are used if
                // there are no `update` patches under the assumption we're performing
                // a CREATE and wish to send only explicitly specified fields to the cloud.
                const initPatchesTuple = initPatches.has(model)
                    ? [initPatches.get(model), {}]
                    : undefined;
                // favor update patches over init/create patches, because init patches
                // are ALWAYS present, whereas update patches are only present if copyOf
                // was used to create the instance.
                const patchesTuple = updatedPatchesTuple || initPatchesTuple;
                const modelConstructor = model
                    ? model.constructor
                    : undefined;
                if (!isValidModelConstructor(modelConstructor)) {
                    const msg = 'Object is not an instance of a valid model';
                    logger.error(msg, { model });
                    throw new Error(msg);
                }
                const modelDefinition = getModelDefinition(modelConstructor);
                if (!modelDefinition) {
                    throw new Error('Model Definition could not be found for model');
                }
                const modelMeta = {
                    builder: modelConstructor,
                    schema: modelDefinition,
                    pkField: (0, util_1.extractPrimaryKeyFieldNames)(modelDefinition),
                };
                await this.storage.runExclusive(async (s) => {
                    // no enforcement for HAS_MANY on save, because the ~related~ entities
                    // hold the FK in that case.
                    const nonHasManyRelationships = relationship_1.ModelRelationship.allFrom(modelMeta).filter(r => r.type === 'BELONGS_TO');
                    for (const relationship of nonHasManyRelationships) {
                        const queryObject = relationship.createRemoteQueryObject(model);
                        if (queryObject !== null) {
                            const related = await s.query(relationship.remoteModelConstructor, predicates_1.ModelPredicateCreator.createFromFlatEqualities(relationship.remoteDefinition, queryObject));
                            if (related.length === 0) {
                                throw new Error([
                                    `Data integrity error. You tried to save a ${modelDefinition.name} (${JSON.stringify(model)})`,
                                    `but the instance assigned to the "${relationship.field}" property`,
                                    `does not exist in the local database. If you're trying to create the related`,
                                    `"${relationship.remoteDefinition?.name}", you must save it independently first.`,
                                ].join(' '));
                            }
                        }
                    }
                });
                const producedCondition = condition
                    ? (0, next_1.internals)(condition((0, next_1.predicateFor)(modelMeta))).toStoragePredicate()
                    : undefined;
                const [savedModel] = await this.storage.runExclusive(async (s) => {
                    await s.save(model, producedCondition, undefined, patchesTuple);
                    return s.query(modelConstructor, predicates_1.ModelPredicateCreator.createForPk(modelDefinition, model));
                });
                return attached(savedModel, ModelAttachment.DataStore);
            }, 'datastore save')
                .catch(this.handleAddProcError('DataStore.save()'));
        };
        this.setConflictHandler = (config) => {
            const { DataStore: configDataStore } = config;
            const conflictHandlerIsDefault = () => this.conflictHandler === defaultConflictHandler;
            if (configDataStore && configDataStore.conflictHandler) {
                return configDataStore.conflictHandler;
            }
            if (conflictHandlerIsDefault() && config.conflictHandler) {
                return config.conflictHandler;
            }
            return this.conflictHandler || defaultConflictHandler;
        };
        this.setErrorHandler = (config) => {
            const { DataStore: configDataStore } = config;
            const errorHandlerIsDefault = () => this.errorHandler === defaultErrorHandler;
            if (configDataStore && configDataStore.errorHandler) {
                return configDataStore.errorHandler;
            }
            if (errorHandlerIsDefault() && config.errorHandler) {
                return config.errorHandler;
            }
            return this.errorHandler || defaultErrorHandler;
        };
        this.delete = async (modelOrConstructor, identifierOrCriteria) => {
            return this.runningProcesses
                .add(async () => {
                await this.start();
                if (!this.storage) {
                    throw new Error('No storage to delete from');
                }
                let condition;
                if (!modelOrConstructor) {
                    const msg = 'Model or Model Constructor required';
                    logger.error(msg, { modelOrConstructor });
                    throw new Error(msg);
                }
                if (isValidModelConstructor(modelOrConstructor)) {
                    const modelConstructor = modelOrConstructor;
                    if (!identifierOrCriteria) {
                        const msg = 'Id to delete or criteria required. Do you want to delete all? Pass Predicates.ALL';
                        logger.error(msg, { identifierOrCriteria });
                        throw new Error(msg);
                    }
                    const modelDefinition = getModelDefinition(modelConstructor);
                    if (!modelDefinition) {
                        throw new Error('Could not find model definition for modelConstructor.');
                    }
                    if (typeof identifierOrCriteria === 'string') {
                        const keyFields = (0, util_1.extractPrimaryKeyFieldNames)(modelDefinition);
                        if (keyFields.length > 1) {
                            const msg = util_1.errorMessages.deleteByPkWithCompositeKeyPresent;
                            logger.error(msg, { keyFields });
                            throw new Error(msg);
                        }
                        condition = predicates_1.ModelPredicateCreator.createFromFlatEqualities(modelDefinition, { [keyFields[0]]: identifierOrCriteria });
                    }
                    else {
                        if ((0, types_1.isIdentifierObject)(identifierOrCriteria, modelDefinition)) {
                            condition = predicates_1.ModelPredicateCreator.createForPk(modelDefinition, identifierOrCriteria);
                        }
                        else {
                            condition = (0, next_1.internals)(identifierOrCriteria((0, next_1.predicateFor)({
                                builder: modelConstructor,
                                schema: modelDefinition,
                                pkField: (0, util_1.extractPrimaryKeyFieldNames)(modelDefinition),
                            }))).toStoragePredicate();
                        }
                        if (!condition ||
                            !predicates_1.ModelPredicateCreator.isValidPredicate(condition)) {
                            const msg = 'Criteria required. Do you want to delete all? Pass Predicates.ALL';
                            logger.error(msg, { condition });
                            throw new Error(msg);
                        }
                    }
                    const [deleted] = await this.storage.delete(modelConstructor, condition);
                    return attached(deleted, ModelAttachment.DataStore);
                }
                else {
                    const model = modelOrConstructor;
                    const modelConstructor = Object.getPrototypeOf(model || {})
                        .constructor;
                    if (!isValidModelConstructor(modelConstructor)) {
                        const msg = 'Object is not an instance of a valid model';
                        logger.error(msg, { model });
                        throw new Error(msg);
                    }
                    const modelDefinition = getModelDefinition(modelConstructor);
                    if (!modelDefinition) {
                        throw new Error('Could not find model definition for modelConstructor.');
                    }
                    const pkPredicate = predicates_1.ModelPredicateCreator.createForPk(modelDefinition, model);
                    if (identifierOrCriteria) {
                        if (typeof identifierOrCriteria !== 'function') {
                            const msg = 'Invalid criteria';
                            logger.error(msg, { identifierOrCriteria });
                            throw new Error(msg);
                        }
                        condition = (0, next_1.internals)(identifierOrCriteria((0, next_1.predicateFor)({
                            builder: modelConstructor,
                            schema: modelDefinition,
                            pkField: (0, util_1.extractPrimaryKeyFieldNames)(modelDefinition),
                        }))).toStoragePredicate();
                    }
                    else {
                        condition = pkPredicate;
                    }
                    const [[deleted]] = await this.storage.delete(model, condition);
                    return attached(deleted, ModelAttachment.DataStore);
                }
            }, 'datastore delete')
                .catch(this.handleAddProcError('DataStore.delete()'));
        };
        this.observe = (modelOrConstructor, identifierOrCriteria) => {
            let executivePredicate;
            const modelConstructor = modelOrConstructor && isValidModelConstructor(modelOrConstructor)
                ? modelOrConstructor
                : undefined;
            if (modelOrConstructor && modelConstructor === undefined) {
                const model = modelOrConstructor;
                const resolvedModelConstructor = model && Object.getPrototypeOf(model).constructor;
                if (isValidModelConstructor(resolvedModelConstructor)) {
                    if (identifierOrCriteria) {
                        logger.warn('idOrCriteria is ignored when using a model instance', {
                            model,
                            identifierOrCriteria,
                        });
                    }
                    return this.observe(resolvedModelConstructor, model.id);
                }
                else {
                    const msg = 'The model is not an instance of a PersistentModelConstructor';
                    logger.error(msg, { model });
                    throw new Error(msg);
                }
            }
            // observe should not accept object literal syntax
            if (identifierOrCriteria &&
                modelConstructor &&
                (0, types_1.isIdentifierObject)(identifierOrCriteria, getModelDefinition(modelConstructor))) {
                const msg = util_1.errorMessages.observeWithObjectLiteral;
                logger.error(msg, { objectLiteral: identifierOrCriteria });
                throw new Error(msg);
            }
            if (identifierOrCriteria !== undefined && modelConstructor === undefined) {
                const msg = 'Cannot provide criteria without a modelConstructor';
                logger.error(msg, identifierOrCriteria);
                throw new Error(msg);
            }
            if (modelConstructor && !isValidModelConstructor(modelConstructor)) {
                const msg = 'Constructor is not for a valid model';
                logger.error(msg, { modelConstructor });
                throw new Error(msg);
            }
            if (modelConstructor && typeof identifierOrCriteria === 'string') {
                const buildIdPredicate = seed => seed.id.eq(identifierOrCriteria);
                executivePredicate = (0, next_1.internals)(buildIdPredicate(buildSeedPredicate(modelConstructor)));
            }
            else if (modelConstructor && typeof identifierOrCriteria === 'function') {
                executivePredicate = (0, next_1.internals)(identifierOrCriteria(buildSeedPredicate(modelConstructor)));
            }
            return new rxjs_1.Observable(observer => {
                let source;
                this.runningProcesses
                    .add(async () => {
                    await this.start();
                    // Filter the events returned by Storage according to namespace,
                    // append original element data, and subscribe to the observable
                    source = this.storage.observe(modelConstructor)
                        .pipe((0, rxjs_1.filter)(({ model }) => namespaceResolver(model) === util_1.USER))
                        .subscribe({
                        next: item => this.runningProcesses.isOpen &&
                            this.runningProcesses.add(async () => {
                                // the `element` doesn't necessarily contain all item details or
                                // have related records attached consistently with that of a query()
                                // result item. for consistency, we attach them here.
                                let message = item;
                                // as long as we're not dealing with a DELETE, we need to fetch a fresh
                                // item from storage to ensure it's fully populated.
                                if (item.opType !== 'DELETE') {
                                    const modelDefinition = getModelDefinition(item.model);
                                    const keyFields = (0, util_1.extractPrimaryKeyFieldNames)(modelDefinition);
                                    const primaryKeysAndValues = (0, util_1.extractPrimaryKeysAndValues)(item.element, keyFields);
                                    const freshElement = await this.query(item.model, primaryKeysAndValues);
                                    message = {
                                        ...message,
                                        element: freshElement,
                                    };
                                }
                                if (!executivePredicate ||
                                    (await executivePredicate.matches(message.element))) {
                                    observer.next(message);
                                }
                            }, 'datastore observe message handler'),
                        error: err => {
                            observer.error(err);
                        },
                        complete: () => {
                            observer.complete();
                        },
                    });
                }, 'datastore observe observable initialization')
                    .catch(this.handleAddProcError('DataStore.observe()'))
                    .catch(error => {
                    observer.error(error);
                });
                // better than no cleaner, but if the subscriber is handling the
                // complete() message async and not registering with the context,
                // this will still be problematic.
                return this.runningProcesses.addCleaner(async () => {
                    if (source) {
                        source.unsubscribe();
                    }
                }, 'DataStore.observe() cleanup');
            });
        };
        this.observeQuery = (model, criteria, options) => {
            return new rxjs_1.Observable(observer => {
                const items = new Map();
                const itemsChanged = new Map();
                let deletedItemIds = [];
                let handle;
                // let predicate: ModelPredicate<T> | undefined;
                let executivePredicate;
                /**
                 * As the name suggests, this geneates a snapshot in the form of
                 * 	`{items: T[], isSynced: boolean}`
                 * and sends it to the observer.
                 *
                 * SIDE EFFECT: The underlying generation and emission methods may touch:
                 * `items`, `itemsChanged`, and `deletedItemIds`.
                 *
                 * Refer to `generateSnapshot` and `emitSnapshot` for more details.
                 */
                const generateAndEmitSnapshot = () => {
                    const snapshot = generateSnapshot();
                    emitSnapshot(snapshot);
                };
                // a mechanism to return data after X amount of seconds OR after the
                // "limit" (itemsChanged >= this.syncPageSize) has been reached, whichever comes first
                const limitTimerRace = new util_1.DeferredCallbackResolver({
                    callback: generateAndEmitSnapshot,
                    errorHandler: observer.error,
                    maxInterval: 2000,
                });
                const { sort } = options || {};
                const sortOptions = sort ? { sort } : undefined;
                const modelDefinition = getModelDefinition(model);
                if (!modelDefinition) {
                    throw new Error('Could not find model definition.');
                }
                if (model && typeof criteria === 'function') {
                    executivePredicate = (0, next_1.internals)(criteria(buildSeedPredicate(model)));
                }
                else if ((0, predicates_1.isPredicatesAll)(criteria)) {
                    executivePredicate = undefined;
                }
                this.runningProcesses
                    .add(async () => {
                    try {
                        // first, query and return any locally-available records
                        (await this.query(model, criteria, sortOptions)).forEach(item => {
                            const itemModelDefinition = getModelDefinition(model);
                            const idOrPk = (0, utils_2.getIdentifierValue)(itemModelDefinition, item);
                            items.set(idOrPk, item);
                        });
                        // Observe the model and send a stream of updates (debounced).
                        // We need to post-filter results instead of passing criteria through
                        // to have visibility into items that move from in-set to out-of-set.
                        // We need to explicitly remove those items from the existing snapshot.
                        handle = this.observe(model).subscribe(({ element, model: observedModel, opType }) => this.runningProcesses.isOpen &&
                            this.runningProcesses.add(async () => {
                                const itemModelDefinition = getModelDefinition(observedModel);
                                const idOrPk = (0, utils_2.getIdentifierValue)(itemModelDefinition, element);
                                if (executivePredicate &&
                                    !(await executivePredicate.matches(element))) {
                                    if (opType === 'UPDATE' &&
                                        (items.has(idOrPk) || itemsChanged.has(idOrPk))) {
                                        // tracking as a "deleted item" will include the item in
                                        // page limit calculations and ensure it is removed from the
                                        // final items collection, regardless of which collection(s)
                                        // it is currently in. (I mean, it could be in both, right!?)
                                        deletedItemIds.push(idOrPk);
                                    }
                                    else {
                                        // ignore updates for irrelevant/filtered items.
                                        return;
                                    }
                                }
                                // Flag items which have been recently deleted
                                // NOTE: Merging of separate operations to the same model instance is handled upstream
                                // in the `mergePage` method within src/sync/merger.ts. The final state of a model instance
                                // depends on the LATEST record (for a given id).
                                if (opType === 'DELETE') {
                                    deletedItemIds.push(idOrPk);
                                }
                                else {
                                    itemsChanged.set(idOrPk, element);
                                }
                                const isSynced = this.sync?.getModelSyncedStatus(observedModel) ?? false;
                                const limit = itemsChanged.size - deletedItemIds.length >=
                                    this.syncPageSize;
                                if (limit || isSynced) {
                                    limitTimerRace.resolve();
                                }
                                // kicks off every subsequent race as results sync down
                                limitTimerRace.start();
                            }, 'handle observeQuery observed event'));
                        // returns a set of initial/locally-available results
                        generateAndEmitSnapshot();
                    }
                    catch (err) {
                        observer.error(err);
                    }
                }, 'datastore observequery startup')
                    .catch(this.handleAddProcError('DataStore.observeQuery()'))
                    .catch(error => {
                    observer.error(error);
                });
                /**
                 * Combines the `items`, `itemsChanged`, and `deletedItemIds` collections into
                 * a snapshot in the form of `{ items: T[], isSynced: boolean}`.
                 *
                 * SIDE EFFECT: The shared `items` collection is recreated.
                 */
                const generateSnapshot = () => {
                    const isSynced = this.sync?.getModelSyncedStatus(model) ?? false;
                    const itemsArray = [
                        ...Array.from(items.values()),
                        ...Array.from(itemsChanged.values()),
                    ];
                    items.clear();
                    itemsArray.forEach(item => {
                        const itemModelDefinition = getModelDefinition(model);
                        const idOrPk = (0, utils_2.getIdentifierValue)(itemModelDefinition, item);
                        items.set(idOrPk, item);
                    });
                    // remove deleted items from the final result set
                    deletedItemIds.forEach(idOrPk => items.delete(idOrPk));
                    const snapshot = Array.from(items.values());
                    // we sort after we merge the snapshots (items, itemsChanged)
                    // otherwise, the merge may not
                    if (options?.sort) {
                        sortItems(snapshot);
                    }
                    return {
                        items: snapshot,
                        isSynced,
                    };
                };
                /**
                 * Emits the list of items to the observer.
                 *
                 * SIDE EFFECT: `itemsChanged` and `deletedItemIds` are cleared to prepare
                 * for the next snapshot.
                 *
                 * @param snapshot The generated items data to emit.
                 */
                const emitSnapshot = (snapshot) => {
                    // send the generated snapshot to the primary subscription.
                    // NOTE: This observer's handler *could* be async ...
                    observer.next(snapshot);
                    // reset the changed items sets
                    itemsChanged.clear();
                    deletedItemIds = [];
                };
                /**
                 * Sorts an `Array` of `T` according to the sort instructions given in the
                 * original  `observeQuery()` call.
                 *
                 * @param itemsToSort A array of model type.
                 */
                const sortItems = (itemsToSort) => {
                    const sortingModelDefinition = getModelDefinition(model);
                    const pagination = this.processPagination(sortingModelDefinition, options);
                    const sortPredicates = predicates_1.ModelSortPredicateCreator.getPredicates(pagination.sort);
                    if (sortPredicates.length) {
                        const compareFn = (0, util_1.sortCompareFunction)(sortPredicates);
                        itemsToSort.sort(compareFn);
                    }
                };
                /**
                 * Force one last snapshot when the model is fully synced.
                 *
                 * This reduces latency for that last snapshot, which will otherwise
                 * wait for the configured timeout.
                 *
                 * @param payload The payload from the Hub event.
                 */
                const hubCallback = ({ payload }) => {
                    const { event, data } = payload;
                    if (event === sync_1.ControlMessage.SYNC_ENGINE_MODEL_SYNCED &&
                        data?.model?.name === model.name) {
                        generateAndEmitSnapshot();
                        hubRemove();
                    }
                };
                const hubRemove = core_1.Hub.listen('datastore', hubCallback);
                return this.runningProcesses.addCleaner(async () => {
                    if (handle) {
                        handle.unsubscribe();
                    }
                }, 'datastore observequery cleaner');
            });
        };
        this.configure = (config = {}) => {
            this.amplifyContext.InternalAPI = this.InternalAPI;
            const { DataStore: configDataStore, authModeStrategyType: configAuthModeStrategyType, maxRecordsToSync: configMaxRecordsToSync, syncPageSize: configSyncPageSize, fullSyncInterval: configFullSyncInterval, syncExpressions: configSyncExpressions, authProviders: configAuthProviders, storageAdapter: configStorageAdapter, ...configFromAmplify } = config;
            const currentAppSyncConfig = core_1.Amplify.getConfig().API?.GraphQL;
            const appSyncConfig = {
                aws_appsync_graphqlEndpoint: currentAppSyncConfig?.endpoint,
                aws_appsync_authenticationType: currentAppSyncConfig?.defaultAuthMode,
                aws_appsync_region: currentAppSyncConfig?.region,
                aws_appsync_apiKey: currentAppSyncConfig?.apiKey,
            };
            this.amplifyConfig = {
                ...this.amplifyConfig,
                ...configFromAmplify,
                ...(currentAppSyncConfig && appSyncConfig),
            };
            this.conflictHandler = this.setConflictHandler(config);
            this.errorHandler = this.setErrorHandler(config);
            const authModeStrategyType = (configDataStore && configDataStore.authModeStrategyType) ||
                configAuthModeStrategyType ||
                types_1.AuthModeStrategyType.DEFAULT;
            switch (authModeStrategyType) {
                case types_1.AuthModeStrategyType.MULTI_AUTH:
                    this.authModeStrategy = (0, authModeStrategies_1.multiAuthStrategy)(this.amplifyContext);
                    break;
                case types_1.AuthModeStrategyType.DEFAULT:
                    this.authModeStrategy = authModeStrategies_1.defaultAuthStrategy;
                    break;
                default:
                    this.authModeStrategy = authModeStrategies_1.defaultAuthStrategy;
                    break;
            }
            // store on config object, so that Sync, Subscription, and Mutation processors can have access
            this.amplifyConfig.authProviders =
                (configDataStore && configDataStore.authProviders) || configAuthProviders;
            this.syncExpressions =
                (configDataStore && configDataStore.syncExpressions) ||
                    configSyncExpressions ||
                    this.syncExpressions;
            this.maxRecordsToSync =
                (configDataStore && configDataStore.maxRecordsToSync) ||
                    configMaxRecordsToSync ||
                    this.maxRecordsToSync ||
                    10000;
            // store on config object, so that Sync, Subscription, and Mutation processors can have access
            this.amplifyConfig.maxRecordsToSync = this.maxRecordsToSync;
            this.syncPageSize =
                (configDataStore && configDataStore.syncPageSize) ||
                    configSyncPageSize ||
                    this.syncPageSize ||
                    1000;
            // store on config object, so that Sync, Subscription, and Mutation processors can have access
            this.amplifyConfig.syncPageSize = this.syncPageSize;
            this.fullSyncInterval =
                (configDataStore && configDataStore.fullSyncInterval) ||
                    configFullSyncInterval ||
                    this.fullSyncInterval ||
                    24 * 60; // 1 day
            this.storageAdapter =
                (configDataStore && configDataStore.storageAdapter) ||
                    configStorageAdapter ||
                    this.storageAdapter ||
                    undefined;
            this.sessionId = this.retrieveSessionId();
        };
    }
    getModuleName() {
        return 'DataStore';
    }
    /**
     * Builds a function to capture `BackgroundManagerNotOpenError`'s to produce friendlier,
     * more instructive errors for customers.
     *
     * @param operation The name of the operation (usually a Datastore method) the customer
     * tried to call.
     */
    handleAddProcError(operation) {
        /**
         * If the tested error is a `BackgroundManagerNotOpenError`, it will be captured
         * and replaced with a friendlier message that instructs the App Developer.
         *
         * @param err An error to test.
         */
        const handler = (err) => {
            if (err.message.startsWith('BackgroundManagerNotOpenError')) {
                throw new Error([
                    `DataStoreStateError: Tried to execute \`${operation}\` while DataStore was "${this.state}".`,
                    `This can only be done while DataStore is "Started" or "Stopped". To remedy:`,
                    'Ensure all calls to `stop()` and `clear()` have completed first.',
                    'If this is not possible, retry the operation until it succeeds.',
                ].join('\n'));
            }
            else {
                throw err;
            }
        };
        return handler;
    }
    /**
     * Clears all data from storage and removes all data, schema info, other
     * initialization details, and then stops DataStore.
     *
     * That said, reinitialization is required after clearing. This can be done
     * by explicitiliy calling `start()` or any method that implicitly starts
     * DataStore, such as `query()`, `save()`, or `delete()`.
     */
    async clear() {
        checkSchemaInitialized();
        this.state = DataStoreState.Clearing;
        await this.runningProcesses.close();
        if (this.storage === undefined) {
            // connect to storage so that it can be cleared without fully starting DataStore
            this.storage = new storage_1.ExclusiveStorage(schema, namespaceResolver, getModelConstructorByModelName, modelInstanceCreator, this.storageAdapter, this.sessionId);
            await this.storage.init();
        }
        if (syncSubscription && !syncSubscription.closed) {
            syncSubscription.unsubscribe();
        }
        if (this.sync) {
            await this.sync.stop();
        }
        await this.storage.clear();
        this.initialized = undefined; // Should re-initialize when start() is called.
        this.storage = undefined;
        this.sync = undefined;
        this.syncPredicates = new WeakMap();
        await this.runningProcesses.open();
        this.state = DataStoreState.NotRunning;
    }
    /**
     * Stops all DataStore sync activities.
     *
     * TODO: "Waits for graceful termination of
     * running queries and terminates subscriptions."
     */
    async stop() {
        this.state = DataStoreState.Stopping;
        await this.runningProcesses.close();
        if (syncSubscription && !syncSubscription.closed) {
            syncSubscription.unsubscribe();
        }
        if (this.sync) {
            await this.sync.stop();
        }
        this.initialized = undefined; // Should re-initialize when start() is called.
        this.sync = undefined;
        await this.runningProcesses.open();
        this.state = DataStoreState.NotRunning;
    }
    /**
     * Validates given pagination input from a query and creates a pagination
     * argument for use against the storage layer.
     *
     * @param modelDefinition
     * @param paginationProducer
     */
    processPagination(modelDefinition, paginationProducer) {
        let sortPredicate;
        const { limit, page, sort } = paginationProducer || {};
        if (limit === undefined && page === undefined && sort === undefined) {
            return undefined;
        }
        if (page !== undefined && limit === undefined) {
            throw new Error('Limit is required when requesting a page');
        }
        if (page !== undefined) {
            if (typeof page !== 'number') {
                throw new Error('Page should be a number');
            }
            if (page < 0) {
                throw new Error("Page can't be negative");
            }
        }
        if (limit !== undefined) {
            if (typeof limit !== 'number') {
                throw new Error('Limit should be a number');
            }
            if (limit < 0) {
                throw new Error("Limit can't be negative");
            }
        }
        if (sort) {
            sortPredicate = predicates_1.ModelSortPredicateCreator.createFromExisting(modelDefinition, sort);
        }
        return {
            limit,
            page,
            sort: sortPredicate,
        };
    }
    /**
     * Examines the configured `syncExpressions` and produces a WeakMap of
     * SchemaModel -> predicate to use during sync.
     */
    async processSyncExpressions() {
        if (!this.syncExpressions || !this.syncExpressions.length) {
            return new WeakMap();
        }
        const syncPredicates = await Promise.all(this.syncExpressions.map(async (syncExpression) => {
            const { modelConstructor, conditionProducer } = await syncExpression;
            const modelDefinition = getModelDefinition(modelConstructor);
            // conditionProducer is either a predicate, e.g. (c) => c.field.eq(1)
            // OR a function/promise that returns a predicate
            const condition = await this.unwrapPromise(conditionProducer);
            if ((0, predicates_1.isPredicatesAll)(condition)) {
                return [modelDefinition, null];
            }
            const predicate = (0, next_1.internals)(condition((0, next_1.predicateFor)({
                builder: modelConstructor,
                schema: modelDefinition,
                pkField: (0, util_1.extractPrimaryKeyFieldNames)(modelDefinition),
            }))).toStoragePredicate();
            return [modelDefinition, predicate];
        }));
        return this.weakMapFromEntries(syncPredicates);
    }
    async unwrapPromise(conditionProducer) {
        try {
            const condition = await conditionProducer();
            return condition || conditionProducer;
        }
        catch (error) {
            if (error instanceof TypeError) {
                return conditionProducer;
            }
            throw error;
        }
    }
    weakMapFromEntries(entries) {
        return entries.reduce((map, [modelDefinition, predicate]) => {
            if (map.has(modelDefinition)) {
                const { name } = modelDefinition;
                logger.warn(`You can only utilize one Sync Expression per model.
          Subsequent sync expressions for the ${name} model will be ignored.`);
                return map;
            }
            if (predicate) {
                map.set(modelDefinition, predicate);
            }
            return map;
        }, new WeakMap());
    }
    /**
     * A session ID to allow CMS to open databases against multiple apps.
     * This session ID is only expected be set by AWS Amplify Studio.
     */
    retrieveSessionId() {
        try {
            const sessionId = sessionStorage.getItem('datastoreSessionId');
            if (sessionId) {
                const { aws_appsync_graphqlEndpoint } = this.amplifyConfig;
                const appSyncUrl = aws_appsync_graphqlEndpoint.split('/')[2];
                const [appSyncId] = appSyncUrl.split('.');
                return `${sessionId}-${appSyncId}`;
            }
        }
        catch { }
        return undefined;
    }
}
exports.DataStoreClass = DataStore;
const instance = new DataStore();
exports.DataStore = instance;
instance.configure({});
core_1.Hub.listen('core', capsule => {
    if (capsule.payload.event === 'configure') {
        instance.configure({});
    }
});
//# sourceMappingURL=datastore.js.map
