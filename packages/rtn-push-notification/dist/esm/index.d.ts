export { PushNotificationMessage, PushNotificationPermissionStatus, PushNotificationPermissions, } from './types';
declare const module: {
    addMessageEventListener: (event: string, listener: (message: import("./types").PushNotificationMessage | null, completionHandlerId?: string | undefined) => void) => import("react-native").EmitterSubscription;
    addTokenEventListener: (event: string, listener: (token: string) => void) => import("react-native").EmitterSubscription;
    completeNotification: (completionHandlerId: string) => void;
    getBadgeCount: () => void | Promise<number | null>;
    getConstants: () => {
        NativeEvent: {
            BACKGROUND_MESSAGE_RECEIVED?: string | undefined;
            FOREGROUND_MESSAGE_RECEIVED: string;
            LAUNCH_NOTIFICATION_OPENED: string;
            NOTIFICATION_OPENED: string;
            TOKEN_RECEIVED: string;
        };
        NativeHeadlessTaskKey?: string | undefined;
    };
    getLaunchNotification: () => Promise<import("./types").PushNotificationMessage | null>;
    getPermissionStatus: () => Promise<import("./types").PushNotificationPermissionStatus>;
    registerHeadlessTask: (task: (message: import("./types").PushNotificationMessage | null) => Promise<void>) => void;
    requestPermissions: ({ alert, badge, sound }?: import("./types").PushNotificationPermissions) => Promise<boolean>;
    setBadgeCount: (count: number) => void;
};
export type PushNotificationModule = typeof module;
export { module };
