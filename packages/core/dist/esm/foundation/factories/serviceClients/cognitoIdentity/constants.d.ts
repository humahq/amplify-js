/**
 * The service name used to sign requests if the API requires authentication.
 */
export declare const COGNITO_IDENTITY_SERVICE_NAME = "cognito-identity";
export declare const DEFAULT_SERVICE_CLIENT_API_CONFIG: {
    service: string;
    retryDecider: (response?: import("../../../../clients").HttpResponse | undefined, error?: unknown) => Promise<import("../../../../clients").RetryDeciderOutput>;
    computeDelay: (attempt: number) => number;
    cache: string;
};
