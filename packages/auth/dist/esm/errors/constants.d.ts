import { AuthError } from './AuthError';
export declare const USER_UNAUTHENTICATED_EXCEPTION = "UserUnAuthenticatedException";
export declare const USER_ALREADY_AUTHENTICATED_EXCEPTION = "UserAlreadyAuthenticatedException";
export declare const DEVICE_METADATA_NOT_FOUND_EXCEPTION = "DeviceMetadataNotFoundException";
export declare const AUTO_SIGN_IN_EXCEPTION = "AutoSignInException";
export declare const INVALID_REDIRECT_EXCEPTION = "InvalidRedirectException";
export declare const INVALID_APP_SCHEME_EXCEPTION = "InvalidAppSchemeException";
export declare const INVALID_PREFERRED_REDIRECT_EXCEPTION = "InvalidPreferredRedirectUrlException";
export declare const invalidRedirectException: AuthError;
export declare const invalidAppSchemeException: AuthError;
export declare const invalidPreferredRedirectUrlException: AuthError;
export declare const INVALID_ORIGIN_EXCEPTION = "InvalidOriginException";
export declare const invalidOriginException: AuthError;
export declare const OAUTH_SIGNOUT_EXCEPTION = "OAuthSignOutException";
export declare const TOKEN_REFRESH_EXCEPTION = "TokenRefreshException";
export declare const UNEXPECTED_SIGN_IN_INTERRUPTION_EXCEPTION = "UnexpectedSignInInterruptionException";