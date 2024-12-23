import { OperationTypeNode } from 'graphql';
import { Observable } from 'rxjs';
import { AmplifyClassV6 } from '@aws-amplify/core';
import { CustomUserAgentDetails } from '@aws-amplify/core/internals/utils';
import { CustomHeaders } from '@aws-amplify/data-schema/runtime';
import { GraphQLOperation, GraphQLOptions, GraphQLResult } from '../types';
/**
 * Export Cloud Logic APIs
 */
export declare class InternalGraphQLAPIClass {
    /**
     * @private
     */
    private appSyncRealTime;
    private _api;
    getModuleName(): string;
    /**
     * to get the operation type
     * @param operation
     */
    getGraphqlOperationType(operation: GraphQLOperation): OperationTypeNode;
    /**
     * Executes a GraphQL operation
     *
     * @param options - GraphQL Options
     * @param [additionalHeaders] - headers to merge in after any `libraryConfigHeaders` set in the config
     * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
     */
    graphql<T = any>(amplify: AmplifyClassV6 | ((fn: (amplify: any) => Promise<any>) => Promise<AmplifyClassV6>), { query: paramQuery, variables, authMode, authToken }: GraphQLOptions, additionalHeaders?: CustomHeaders, customUserAgentDetails?: CustomUserAgentDetails): Observable<GraphQLResult<T>> | Promise<GraphQLResult<T>>;
    private _graphql;
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param {any} error - Any error
     * @return {boolean} - A boolean indicating if the error was from an api request cancellation
     */
    isCancelError(error: any): boolean;
    /**
     * Cancels an inflight request. Only applicable for graphql queries and mutations
     * @param {any} request - request to cancel
     * @returns - A boolean indicating if the request was cancelled
     */
    cancel(request: Promise<any>, message?: string): boolean;
    private _graphqlSubscribe;
}
export declare const InternalGraphQLAPI: InternalGraphQLAPIClass;
