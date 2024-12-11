import { PushNotificationPermissions } from '../types';
export declare const requestPermissions: ({ alert, badge, sound }?: PushNotificationPermissions) => Promise<boolean>;
