import { PinpointProviderConfig } from '../../providers/pinpoint/types';
import { KinesisProviderConfig } from '../../providers/kinesis/types';
import { KinesisFirehoseProviderConfig } from '../../providers/kinesis-firehose/types';
import { PersonalizeProviderConfig } from '../../providers/personalize/types';
import { AtLeastOne } from '../types';
export type AnalyticsConfig = AtLeastOne<PinpointProviderConfig & KinesisProviderConfig & KinesisFirehoseProviderConfig & PersonalizeProviderConfig>;
