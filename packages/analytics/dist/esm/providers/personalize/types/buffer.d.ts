import { AWSCredentials } from '@aws-amplify/core/internals/utils';
import { EventBufferConfig } from '../../../utils';
import { PersonalizeEvent } from './';
export interface PersonalizeBufferEvent {
    trackingId: string;
    sessionId?: string;
    userId?: string;
    event: PersonalizeEvent;
    timestamp: number;
}
export type PersonalizeBufferConfig = EventBufferConfig & {
    region: string;
    credentials: AWSCredentials;
    identityId?: string;
    userAgentValue?: string;
};
