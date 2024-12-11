import { V6ClientSSRCookies, V6ClientSSRRequest } from '@aws-amplify/api-graphql';
import { GraphQLAuthMode } from '@aws-amplify/core/internals/utils';
import { NextServer } from '../types';
interface CookiesClientParams {
    cookies: NextServer.ServerComponentContext['cookies'];
    config: NextServer.CreateServerRunnerInput['config'];
    authMode?: GraphQLAuthMode;
    authToken?: string;
}
interface ReqClientParams {
    config: NextServer.CreateServerRunnerInput['config'];
    authMode?: GraphQLAuthMode;
    authToken?: string;
}
/**
 * Generates an API client that can be used inside a Next.js Server Component with Dynamic Rendering
 *
 * @example
 * import { cookies } from "next/headers"
 *
 * const client = generateServerClientUsingCookies({ cookies });
 * const result = await client.graphql({ query: listPosts });
 */
export declare function generateServerClientUsingCookies<T extends Record<any, any> = never>({ config, cookies, authMode, authToken, }: CookiesClientParams): V6ClientSSRCookies<T>;
/**
 * Generates an API client that can be used with both Pages Router and App Router
 *
 * @example
 * import config from './amplifyconfiguration.json';
 * import { listPosts } from './graphql/queries';
 *
 * const client = generateServerClientUsingReqRes({ config });
 *
 * const result = await runWithAmplifyServerContext({
 *   nextServerContext: { request, response },
 *   operation: (contextSpec) => client.graphql(contextSpec, {
 *     query: listPosts,
 *   }),
 * });
 */
export declare function generateServerClientUsingReqRes<T extends Record<any, any> = never>({ config, authMode, authToken }: ReqClientParams): V6ClientSSRRequest<T>;
export {};
