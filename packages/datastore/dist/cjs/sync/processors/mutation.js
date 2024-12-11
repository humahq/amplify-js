'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationProcessor = exports.safeJitteredBackoff = void 0;
const internals_1 = require("@aws-amplify/api/internals");
const utils_1 = require("@aws-amplify/core/internals/utils");
const rxjs_1 = require("rxjs");
const core_1 = require("@aws-amplify/core");
const types_1 = require("../../types");
const util_1 = require("../../util");
const utils_2 = require("../utils");
const errorMaps_1 = require("./errorMaps");
const MAX_ATTEMPTS = 10;
const logger = new core_1.ConsoleLogger('DataStore');
class MutationProcessor {
    constructor(schema, storage, userClasses, outbox, modelInstanceCreator, _MutationEvent, amplifyConfig = {}, authModeStrategy, errorHandler, conflictHandler, amplifyContext) {
        this.schema = schema;
        this.storage = storage;
        this.userClasses = userClasses;
        this.outbox = outbox;
        this.modelInstanceCreator = modelInstanceCreator;
        this._MutationEvent = _MutationEvent;
        this.amplifyConfig = amplifyConfig;
        this.authModeStrategy = authModeStrategy;
        this.errorHandler = errorHandler;
        this.conflictHandler = conflictHandler;
        this.amplifyContext = amplifyContext;
        this.typeQuery = new WeakMap();
        this.processing = false;
        this.runningProcesses = new utils_1.BackgroundProcessManager();
        this.amplifyContext.InternalAPI =
            this.amplifyContext.InternalAPI || internals_1.InternalAPI;
        this.generateQueries();
    }
    generateQueries() {
        Object.values(this.schema.namespaces).forEach(namespace => {
            Object.values(namespace.models)
                .filter(({ syncable }) => syncable)
                .forEach(model => {
                const [createMutation] = (0, utils_2.buildGraphQLOperation)(namespace, model, 'CREATE');
                const [updateMutation] = (0, utils_2.buildGraphQLOperation)(namespace, model, 'UPDATE');
                const [deleteMutation] = (0, utils_2.buildGraphQLOperation)(namespace, model, 'DELETE');
                this.typeQuery.set(model, [
                    createMutation,
                    updateMutation,
                    deleteMutation,
                ]);
            });
        });
    }
    isReady() {
        return this.observer !== undefined;
    }
    start() {
        this.runningProcesses = new utils_1.BackgroundProcessManager();
        const observable = new rxjs_1.Observable(observer => {
            this.observer = observer;
            try {
                this.resume();
            }
            catch (error) {
                logger.error('mutations processor start error', error);
                throw error;
            }
            return this.runningProcesses.addCleaner(async () => {
                // The observer has unsubscribed and/or `stop()` has been called.
                this.removeObserver();
                this.pause();
            });
        });
        return observable;
    }
    async stop() {
        this.removeObserver();
        await this.runningProcesses.close();
        await this.runningProcesses.open();
    }
    removeObserver() {
        this.observer?.complete?.();
        this.observer = undefined;
    }
    async resume() {
        if (this.runningProcesses.isOpen) {
            await this.runningProcesses.add(async (onTerminate) => {
                if (this.processing ||
                    !this.isReady() ||
                    !this.runningProcesses.isOpen) {
                    return;
                }
                this.processing = true;
                let head;
                const namespaceName = util_1.USER;
                // start to drain outbox
                while (this.processing &&
                    this.runningProcesses.isOpen &&
                    (head = await this.outbox.peek(this.storage)) !== undefined) {
                    const { model, operation, data, condition } = head;
                    const modelConstructor = this.userClasses[model];
                    let result = undefined;
                    let opName = undefined;
                    let modelDefinition = undefined;
                    try {
                        const modelAuthModes = await (0, utils_2.getModelAuthModes)({
                            authModeStrategy: this.authModeStrategy,
                            defaultAuthMode: this.amplifyConfig.aws_appsync_authenticationType,
                            modelName: model,
                            schema: this.schema,
                        });
                        const operationAuthModes = modelAuthModes[operation.toUpperCase()];
                        let authModeAttempts = 0;
                        const authModeRetry = async () => {
                            try {
                                logger.debug(`Attempting mutation with authMode: ${operationAuthModes[authModeAttempts]}`);
                                const response = await this.jitteredRetry(namespaceName, model, operation, data, condition, modelConstructor, this._MutationEvent, head, operationAuthModes[authModeAttempts], onTerminate);
                                logger.debug(`Mutation sent successfully with authMode: ${operationAuthModes[authModeAttempts]}`);
                                return response;
                            }
                            catch (error) {
                                authModeAttempts++;
                                if (authModeAttempts >= operationAuthModes.length) {
                                    logger.debug(`Mutation failed with authMode: ${operationAuthModes[authModeAttempts - 1]}`);
                                    try {
                                        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                                        await this.errorHandler({
                                            recoverySuggestion: 'Ensure app code is up to date, auth directives exist and are correct on each model, and that server-side data has not been invalidated by a schema change. If the problem persists, search for or create an issue: https://github.com/aws-amplify/amplify-js/issues',
                                            localModel: null,
                                            message: error.message,
                                            model: modelConstructor.name,
                                            operation: opName,
                                            errorType: (0, errorMaps_1.getMutationErrorType)(error),
                                            process: types_1.ProcessName.sync,
                                            remoteModel: null,
                                            cause: error,
                                        });
                                    }
                                    catch (e) {
                                        logger.error('Mutation error handler failed with:', e);
                                    }
                                    throw error;
                                }
                                logger.debug(`Mutation failed with authMode: ${operationAuthModes[authModeAttempts - 1]}. Retrying with authMode: ${operationAuthModes[authModeAttempts]}`);
                                return authModeRetry();
                            }
                        };
                        [result, opName, modelDefinition] = await authModeRetry();
                    }
                    catch (error) {
                        if (error.message === 'Offline' ||
                            error.message === 'RetryMutation') {
                            continue;
                        }
                    }
                    if (result === undefined) {
                        logger.debug('done retrying');
                        await this.storage.runExclusive(async (storage) => {
                            await this.outbox.dequeue(storage);
                        });
                        continue;
                    }
                    const record = result.data[opName];
                    let hasMore = false;
                    await this.storage.runExclusive(async (storage) => {
                        // using runExclusive to prevent possible race condition
                        // when another record gets enqueued between dequeue and peek
                        await this.outbox.dequeue(storage, record, operation);
                        hasMore = (await this.outbox.peek(storage)) !== undefined;
                    });
                    this.observer?.next?.({
                        operation,
                        modelDefinition,
                        model: record,
                        hasMore,
                    });
                }
                // pauses itself
                this.pause();
            }, 'mutation resume loop');
        }
    }
    async jitteredRetry(namespaceName, model, operation, data, condition, modelConstructor, MutationEventCtor, mutationEvent, authMode, onTerminate) {
        return (0, utils_1.retry)(async (retriedModel, retriedOperation, retriedData, retriedCondition, retriedModelConstructor, retiredMutationEventCtor, retiredMutationEvent) => {
            const [query, variables, graphQLCondition, opName, modelDefinition] = this.createQueryVariables(namespaceName, retriedModel, retriedOperation, retriedData, retriedCondition);
            const authToken = await (0, utils_2.getTokenForCustomAuth)(authMode, this.amplifyConfig);
            const tryWith = {
                query,
                variables,
                authMode,
                authToken,
            };
            let attempt = 0;
            const opType = this.opTypeFromTransformerOperation(retriedOperation);
            const customUserAgentDetails = {
                category: utils_1.Category.DataStore,
                action: utils_1.DataStoreAction.GraphQl,
            };
            do {
                try {
                    const result = (await this.amplifyContext.InternalAPI.graphql(tryWith, undefined, customUserAgentDetails));
                    // Use `as any` because TypeScript doesn't seem to like passing tuples
                    // through generic params.
                    return [result, opName, modelDefinition];
                }
                catch (err) {
                    if (err.errors && err.errors.length > 0) {
                        const [error] = err.errors;
                        const { originalError: { code = null } = {} } = error;
                        if (error.errorType === 'Unauthorized') {
                            throw new utils_1.NonRetryableError('Unauthorized');
                        }
                        if (error.message === 'Network Error' ||
                            code === 'ERR_NETWORK' // refers to axios timeout error caused by device's bad network condition
                        ) {
                            if (!this.processing) {
                                throw new utils_1.NonRetryableError('Offline');
                            }
                            // TODO: Check errors on different env (react-native or other browsers)
                            throw new Error('Network Error');
                        }
                        if (error.errorType === 'ConflictUnhandled') {
                            // TODO: add on ConflictConditionalCheck error query last from server
                            attempt++;
                            let retryWith;
                            if (attempt > MAX_ATTEMPTS) {
                                retryWith = types_1.DISCARD;
                            }
                            else {
                                try {
                                    retryWith = await this.conflictHandler({
                                        modelConstructor: retriedModelConstructor,
                                        localModel: this.modelInstanceCreator(retriedModelConstructor, variables.input),
                                        remoteModel: this.modelInstanceCreator(retriedModelConstructor, error.data),
                                        operation: opType,
                                        attempts: attempt,
                                    });
                                }
                                catch (caughtErr) {
                                    logger.warn('conflict trycatch', caughtErr);
                                    continue;
                                }
                            }
                            if (retryWith === types_1.DISCARD) {
                                // Query latest from server and notify merger
                                const [[, builtOpName, builtQuery]] = (0, utils_2.buildGraphQLOperation)(this.schema.namespaces[namespaceName], modelDefinition, 'GET');
                                const newAuthToken = await (0, utils_2.getTokenForCustomAuth)(authMode, this.amplifyConfig);
                                const serverData = (await this.amplifyContext.InternalAPI.graphql({
                                    query: builtQuery,
                                    variables: { id: variables.input.id },
                                    authMode,
                                    authToken: newAuthToken,
                                }, undefined, customUserAgentDetails));
                                // onTerminate cancel graphql()
                                return [serverData, builtOpName, modelDefinition];
                            }
                            const namespace = this.schema.namespaces[namespaceName];
                            // convert retry with to tryWith
                            const updatedMutation = (0, utils_2.createMutationInstanceFromModelOperation)(namespace.relationships, modelDefinition, opType, retriedModelConstructor, retryWith, graphQLCondition, retiredMutationEventCtor, this.modelInstanceCreator, retiredMutationEvent.id);
                            await this.storage.save(updatedMutation);
                            throw new utils_1.NonRetryableError('RetryMutation');
                        }
                        else {
                            try {
                                this.errorHandler({
                                    recoverySuggestion: 'Ensure app code is up to date, auth directives exist and are correct on each model, and that server-side data has not been invalidated by a schema change. If the problem persists, search for or create an issue: https://github.com/aws-amplify/amplify-js/issues',
                                    localModel: variables.input,
                                    message: error.message,
                                    operation: retriedOperation,
                                    errorType: (0, errorMaps_1.getMutationErrorType)(error),
                                    errorInfo: error.errorInfo,
                                    process: types_1.ProcessName.mutate,
                                    cause: error,
                                    remoteModel: error.data
                                        ? this.modelInstanceCreator(retriedModelConstructor, error.data)
                                        : null,
                                });
                            }
                            catch (caughtErr) {
                                logger.warn('Mutation error handler failed with:', caughtErr);
                            }
                            finally {
                                // Return empty tuple, dequeues the mutation
                                // eslint-disable-next-line no-unsafe-finally
                                return error.data
                                    ? [
                                        { data: { [opName]: error.data } },
                                        opName,
                                        modelDefinition,
                                    ]
                                    : [];
                            }
                        }
                    }
                    else {
                        // Catch-all for client-side errors that don't come back in the `GraphQLError` format.
                        // These errors should not be retried.
                        throw new utils_1.NonRetryableError(err);
                    }
                }
                // eslint-disable-next-line no-unmodified-loop-condition
            } while (tryWith);
        }, [
            model,
            operation,
            data,
            condition,
            modelConstructor,
            MutationEventCtor,
            mutationEvent,
        ], exports.safeJitteredBackoff, onTerminate);
    }
    createQueryVariables(namespaceName, model, operation, data, condition) {
        const modelDefinition = this.schema.namespaces[namespaceName].models[model];
        const { primaryKey } = this.schema.namespaces[namespaceName].keys[model];
        const auth = modelDefinition.attributes?.find(a => a.type === 'auth');
        const ownerFields = auth?.properties?.rules
            .map(rule => rule.ownerField)
            .filter(f => f) || ['owner'];
        const queriesTuples = this.typeQuery.get(modelDefinition);
        const [, opName, query] = queriesTuples.find(([transformerMutationType]) => transformerMutationType === operation);
        const { _version, ...parsedData } = JSON.parse(data);
        // include all the fields that comprise a custom PK if one is specified
        const deleteInput = {};
        if (primaryKey && primaryKey.length) {
            for (const pkField of primaryKey) {
                deleteInput[pkField] = parsedData[pkField];
            }
        }
        else {
            deleteInput[util_1.ID] = parsedData.id;
        }
        let mutationInput;
        if (operation === utils_2.TransformerMutationType.DELETE) {
            // For DELETE mutations, only the key(s) are included in the input
            mutationInput = deleteInput;
        }
        else {
            // Otherwise, we construct the mutation input with the following logic
            mutationInput = {};
            const modelFields = Object.values(modelDefinition.fields);
            for (const { name, type, association, isReadOnly } of modelFields) {
                // omit readonly fields. cloud storage doesn't need them and won't take them!
                if (isReadOnly) {
                    continue;
                }
                // omit owner fields if it's `null`. cloud storage doesn't allow it.
                if (ownerFields.includes(name) && parsedData[name] === null) {
                    continue;
                }
                // model fields should be stripped out from the input
                if ((0, types_1.isModelFieldType)(type)) {
                    // except for belongs to relations - we need to replace them with the correct foreign key(s)
                    if ((0, types_1.isTargetNameAssociation)(association) &&
                        association.connectionType === 'BELONGS_TO') {
                        const targetNames = (0, util_1.extractTargetNamesFromSrc)(association);
                        if (targetNames) {
                            // instead of including the connected model itself, we add its key(s) to the mutation input
                            for (const targetName of targetNames) {
                                mutationInput[targetName] = parsedData[targetName];
                            }
                        }
                    }
                    continue;
                }
                // scalar fields / non-model types
                if (operation === utils_2.TransformerMutationType.UPDATE) {
                    if (!Object.prototype.hasOwnProperty.call(parsedData, name)) {
                        // for update mutations - strip out a field if it's unchanged
                        continue;
                    }
                }
                // all other fields are added to the input object
                mutationInput[name] = parsedData[name];
            }
        }
        // Build mutation variables input object
        const input = {
            ...mutationInput,
            _version,
        };
        const graphQLCondition = JSON.parse(condition);
        const variables = {
            input,
            ...(operation === utils_2.TransformerMutationType.CREATE
                ? {}
                : {
                    condition: Object.keys(graphQLCondition).length > 0
                        ? graphQLCondition
                        : null,
                }),
        };
        return [query, variables, graphQLCondition, opName, modelDefinition];
    }
    opTypeFromTransformerOperation(operation) {
        switch (operation) {
            case utils_2.TransformerMutationType.CREATE:
                return types_1.OpType.INSERT;
            case utils_2.TransformerMutationType.DELETE:
                return types_1.OpType.DELETE;
            case utils_2.TransformerMutationType.UPDATE:
                return types_1.OpType.UPDATE;
            case utils_2.TransformerMutationType.GET: // Intentionally blank
                break;
            default:
                throw new Error(`Invalid operation ${operation}`);
        }
        // because it makes TS happy ...
        return undefined;
    }
    pause() {
        this.processing = false;
    }
}
exports.MutationProcessor = MutationProcessor;
const MAX_RETRY_DELAY_MS = 5 * 60 * 1000;
const originalJitteredBackoff = (0, utils_1.jitteredBackoff)(MAX_RETRY_DELAY_MS);
/**
 * @private
 * Internal use of Amplify only.
 *
 * Wraps the jittered backoff calculation to retry Network Errors indefinitely.
 * Backs off according to original jittered retry logic until the original retry
 * logic hits its max. After this occurs, if the error is a Network Error, we
 * ignore the attempt count and return MAX_RETRY_DELAY_MS to retry forever (until
 * the request succeeds).
 *
 * @param attempt ignored
 * @param _args ignored
 * @param error tested to see if `.message` is 'Network Error'
 * @returns number | false :
 */
const safeJitteredBackoff = (attempt, _args, error) => {
    const attemptResult = originalJitteredBackoff(attempt);
    // If this is the last attempt and it is a network error, we retry indefinitively every 5 minutes
    if (attemptResult === false &&
        (error || {}).message === 'Network Error') {
        return MAX_RETRY_DELAY_MS;
    }
    return attemptResult;
};
exports.safeJitteredBackoff = safeJitteredBackoff;
//# sourceMappingURL=mutation.js.map
