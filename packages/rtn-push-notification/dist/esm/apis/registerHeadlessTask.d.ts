import { PushNotificationMessage } from '../types';
export declare const registerHeadlessTask: (task: (message: PushNotificationMessage | null) => Promise<void>) => void;
