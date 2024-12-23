import type { EndpointResolverOptions, Headers } from '../../clients/types';
/**
 * @internal
 */
export declare const defaultConfig: {
    service: string;
    endpointResolver: ({ region }: EndpointResolverOptions) => {
        url: URL;
    };
    retryDecider: (response?: import("../../clients/types").HttpResponse | undefined, error?: unknown) => Promise<import("../../clients/middleware/retry").RetryDeciderOutput>;
    computeDelay: (attempt: number) => number;
    userAgentValue: string;
};
/**
 * @internal
 */
export declare const getSharedHeaders: () => Headers;
