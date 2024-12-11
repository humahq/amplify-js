import { EmitterSubscription } from 'react-native';
import { PushNotificationMessage } from '../types';
export declare const addMessageEventListener: (event: string, listener: (message: PushNotificationMessage | null, completionHandlerId?: string) => void) => EmitterSubscription;
