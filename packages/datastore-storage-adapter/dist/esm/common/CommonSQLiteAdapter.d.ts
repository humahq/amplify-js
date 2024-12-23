import { InternalSchema, ModelInstanceCreator, ModelPredicate, NAMESPACES, NamespaceResolver, OpType, PaginationInput, PersistentModel, PersistentModelConstructor, QueryOne, StorageAdapter } from '@aws-amplify/datastore';
import { CommonSQLiteDatabase, ModelInstanceMetadataWithId } from './types';
export declare class CommonSQLiteAdapter implements StorageAdapter {
    private schema;
    private namespaceResolver;
    private modelInstanceCreator;
    private getModelConstructorByModelName;
    private db;
    private initPromise;
    private resolve;
    private reject;
    constructor(db: CommonSQLiteDatabase);
    setUp(theSchema: InternalSchema, namespaceResolver: NamespaceResolver, modelInstanceCreator: ModelInstanceCreator, getModelConstructorByModelName: (namsespaceName: NAMESPACES, modelName: string) => PersistentModelConstructor<any>): Promise<void>;
    clear(): Promise<void>;
    save<T extends PersistentModel>(model: T, condition?: ModelPredicate<T>): Promise<[T, OpType.INSERT | OpType.UPDATE][]>;
    private load;
    query<T extends PersistentModel>(modelConstructor: PersistentModelConstructor<T>, predicate?: ModelPredicate<T>, pagination?: PaginationInput<T>): Promise<T[]>;
    private getById;
    private idFromPredicate;
    queryOne<T extends PersistentModel>(modelConstructor: PersistentModelConstructor<T>, firstOrLast?: QueryOne): Promise<T | undefined>;
    delete<T extends PersistentModel>(modelOrModelConstructor: T | PersistentModelConstructor<T>, condition?: ModelPredicate<T>): Promise<[T[], T[]]>;
    batchSave<T extends PersistentModel>(modelConstructor: PersistentModelConstructor<any>, items: ModelInstanceMetadataWithId[]): Promise<[T, OpType][]>;
}
