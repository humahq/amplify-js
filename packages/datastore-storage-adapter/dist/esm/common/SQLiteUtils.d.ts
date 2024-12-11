import { GraphQLScalarType, InternalSchema, PersistentModel, PredicatesGroup, SchemaModel, SortPredicatesGroup } from '@aws-amplify/datastore';
import { ParameterizedStatement } from './types';
export declare function getSQLiteType(scalar: keyof Omit<typeof GraphQLScalarType, 'getJSType' | 'getValidationFunction' | 'getSQLiteType'>): 'TEXT' | 'INTEGER' | 'REAL' | 'BLOB';
export declare function generateSchemaStatements(schema: InternalSchema): string[];
export declare const implicitAuthFieldsForModel: (model: SchemaModel) => string[];
export declare function modelCreateTableStatement(model: SchemaModel, userModel?: boolean): string;
export declare function modelInsertStatement(model: PersistentModel, tableName: string): ParameterizedStatement;
export declare function modelUpdateStatement(model: PersistentModel, tableName: string): ParameterizedStatement;
export declare function queryByIdStatement(id: string, tableName: string): ParameterizedStatement;
declare const comparisonOperatorMap: {
    eq: string;
    ne: string;
    le: string;
    lt: string;
    ge: string;
    gt: string;
};
declare const logicalOperatorMap: {
    beginsWith: string;
    contains: string;
    notContains: string;
    between: string;
};
export declare const whereConditionFromPredicateObject: ({ field, operator, operand, }: {
    field: string;
    operator: keyof typeof logicalOperatorMap | keyof typeof comparisonOperatorMap;
    operand: any;
}) => ParameterizedStatement;
export declare function whereClauseFromPredicate<T extends PersistentModel>(predicate: PredicatesGroup<T>): ParameterizedStatement;
export declare function orderByClauseFromSort<T extends PersistentModel>(sortPredicate?: SortPredicatesGroup<T>): string;
export declare function limitClauseFromPagination(limit: number, page?: number): ParameterizedStatement;
export declare function queryAllStatement<T extends PersistentModel>(tableName: string, predicate?: PredicatesGroup<T>, sort?: SortPredicatesGroup<T>, limit?: number, page?: number): ParameterizedStatement;
export declare function queryOneStatement(firstOrLast: any, tableName: string): ParameterizedStatement;
export declare function deleteByIdStatement(id: string, tableName: string): ParameterizedStatement;
export declare function deleteByPredicateStatement<T extends PersistentModel>(tableName: string, predicate?: PredicatesGroup<T>): ParameterizedStatement;
export {};
