import { V6ClientSSRCookies, V6ClientSSRRequest } from '@aws-amplify/api-graphql';
export { generateServerClientUsingReqRes, generateServerClientUsingCookies, } from './generateServerClient';
type ClientUsingSSRCookies<T extends Record<any, any> = never> = V6ClientSSRCookies<T>;
type ClientUsingSSRReq<T extends Record<any, any> = never> = V6ClientSSRRequest<T>;
export { ClientUsingSSRCookies, ClientUsingSSRReq };
