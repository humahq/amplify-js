import { Endpoint, HttpResponse } from '@aws-amplify/core/internals/aws-client-utils';
import type { ListCallerAccessGrantsCommandInput, ListCallerAccessGrantsCommandOutput } from './types';
export type ListCallerAccessGrantsInput = Pick<ListCallerAccessGrantsCommandInput, 'AccountId' | 'AllowedByApplication' | 'GrantScope' | 'NextToken' | 'MaxResults'>;
export type ListCallerAccessGrantsOutput = ListCallerAccessGrantsCommandOutput;
export declare const listCallerAccessGrants: (config: {
    responseType?: "blob" | "text" | undefined;
    service?: string | undefined;
    endpointResolver?: (((options: import("@aws-amplify/core/internals/aws-client-utils").EndpointResolverOptions, input?: any) => Endpoint) & ((options: import("./base").S3EndpointResolverOptions, apiInput: {
        AccountId: string;
    }) => {
        url: URL;
    })) | undefined;
    retryDecider?: (((response?: HttpResponse | undefined, error?: unknown, middlewareContext?: import("@aws-amplify/core/internals/aws-client-utils").MiddlewareContext | undefined) => Promise<import("@aws-amplify/core/internals/aws-client-utils").RetryDeciderOutput>) & import("../utils/createRetryDecider").RetryDecider) | undefined;
    computeDelay?: ((attempt: number) => number) | undefined;
    userAgentValue?: string | undefined;
    uriEscapePath?: boolean | undefined;
} & {
    credentials: import("@aws-amplify/core/internals/aws-client-utils").Credentials | ((options?: import("@aws-amplify/core/internals/aws-client-utils").CredentialsProviderOptions | undefined) => Promise<import("@aws-amplify/core/internals/aws-client-utils").Credentials>);
    region: string;
    onDownloadProgress?: ((event: import("../../../../..").TransferProgressEvent) => void) | undefined;
    onUploadProgress?: ((event: import("../../../../..").TransferProgressEvent) => void) | undefined;
    abortSignal?: AbortSignal | undefined;
    customEndpoint?: string | undefined;
    userAgentHeader?: string | undefined;
    maxAttempts?: number | undefined;
}, input: ListCallerAccessGrantsInput) => Promise<ListCallerAccessGrantsCommandOutput>;