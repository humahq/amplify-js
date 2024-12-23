import { ModelInstanceMetadata, PersistentModel } from '@aws-amplify/datastore';
export interface CommonSQLiteDatabase {
    init(): Promise<void>;
    createSchema(statements: string[]): Promise<void>;
    clear(): Promise<void>;
    get<T extends PersistentModel>(statement: string, params: (string | number)[]): Promise<T>;
    getAll<T extends PersistentModel>(statement: string, params: (string | number)[]): Promise<T[]>;
    save(statement: string, params: (string | number)[]): Promise<void>;
    batchQuery<T = any>(queryParameterizedStatement: Set<ParameterizedStatement>): Promise<T[]>;
    batchSave(saveParameterizedStatements: Set<ParameterizedStatement>, deleteParameterizedStatements?: Set<ParameterizedStatement>): Promise<void>;
    selectAndDelete<T = any>(queryParameterizedStatement: ParameterizedStatement, deleteParameterizedStatement: ParameterizedStatement): Promise<T[]>;
}
export type ParameterizedStatement = [string, any[]];
export type ModelInstanceMetadataWithId = ModelInstanceMetadata & {
    id: string;
};
