import { AuthUserAttributeKey, AuthUserAttributes } from './models';
/**
 * Base type for service options.
 */
export type AuthServiceOptions = Record<string, unknown>;
/**
 * The optional parameters for the Sign Up process.
 *
 * @remarks
 * Particular services may require some of these parameters.
 */
export interface AuthSignUpOptions<UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey> {
    userAttributes: AuthUserAttributes<UserAttributeKey>;
}
export type SignInWithWebUIOptions<ServiceOptions> = ServiceOptions;
