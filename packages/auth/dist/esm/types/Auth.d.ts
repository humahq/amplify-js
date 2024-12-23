export declare enum AuthErrorTypes {
    NoConfig = "noConfig",
    MissingAuthConfig = "missingAuthConfig",
    EmptyUsername = "emptyUsername",
    InvalidUsername = "invalidUsername",
    EmptyPassword = "emptyPassword",
    EmptyCode = "emptyCode",
    SignUpError = "signUpError",
    NoMFA = "noMFA",
    InvalidMFA = "invalidMFA",
    EmptyChallengeResponse = "emptyChallengeResponse",
    NoUserSession = "noUserSession",
    Default = "default",
    DeviceConfig = "deviceConfig",
    NetworkError = "networkError",
    AutoSignInError = "autoSignInError",
    OAuthSignInError = "oauthSignInError"
}
export type AuthErrorMessages = {
    [key in AuthErrorTypes]: AuthErrorMessage;
};
export interface AuthErrorMessage {
    message: string;
    log?: string;
}
