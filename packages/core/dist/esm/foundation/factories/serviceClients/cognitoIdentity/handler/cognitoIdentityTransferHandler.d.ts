import { HttpRequest, HttpResponse } from '../../../../../clients';
/**
 * A Cognito Identity-specific transfer handler that does NOT sign requests, and
 * disables caching.
 *
 * @internal
 */
export declare const cognitoIdentityTransferHandler: (request: HttpRequest, options: Record<string, unknown> & import("../../../../../clients").UserAgentOptions & import("../../../../../clients").RetryOptions<HttpResponse> & import("../../../../../clients").HttpTransferOptions) => Promise<HttpResponse>;
