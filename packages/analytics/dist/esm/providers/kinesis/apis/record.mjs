import { fromUtf8 } from '@smithy/util-utf8';
import { AnalyticsAction } from '@aws-amplify/core/internals/utils';
import { ConsoleLogger } from '@aws-amplify/core';
import { getEventBuffer } from '../utils/getEventBuffer.mjs';
import { resolveConfig } from '../utils/resolveConfig.mjs';
import { resolveCredentials } from '../../../utils/resolveCredentials.mjs';
import '../../../utils/eventBuffer/EventBuffer.mjs';
import { isAnalyticsEnabled } from '../../../utils/statusHelpers.mjs';
import { getAnalyticsUserAgentString } from '../../../utils/userAgent.mjs';
import '../../../trackers/EventTracker.mjs';
import '../../../trackers/PageViewTracker.mjs';
import '../../../trackers/SessionTracker.mjs';
import '../../../errors/validation.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new ConsoleLogger('Kinesis');
/**
 * Record one analytic event and send it to Kinesis. Events will be buffered and periodically sent to
 * Kinesis.
 *
 * @param params The input object used to construct the request.
 *
 * @throws validation: {@link AnalyticsValidationErrorCode} - Thrown when the provided parameters or library
 *  configuration is incorrect.
 *
 * @example
 * ```ts
 * record({
 *     streamName: 'myKinesisStream',
 *     partitionKey: 'myPartitionKey',
 *     data: { } // The data blob to put into the record
 * });
 * ```
 * @param input - The event to record.
 *
 * @returns void
 */
const record = ({ streamName, partitionKey, data, }) => {
    if (!isAnalyticsEnabled()) {
        logger.debug('Analytics is disabled, event will not be recorded.');
        return;
    }
    const timestamp = Date.now();
    const { region, bufferSize, flushSize, flushInterval, resendLimit } = resolveConfig();
    resolveCredentials()
        .then(({ credentials, identityId }) => {
        const buffer = getEventBuffer({
            region,
            bufferSize,
            flushSize,
            flushInterval,
            credentials,
            identityId,
            resendLimit,
            userAgentValue: getAnalyticsUserAgentString(AnalyticsAction.Record),
        });
        buffer.append({
            region,
            streamName,
            partitionKey,
            event: ArrayBuffer.isView(data) ? data : fromUtf8(JSON.stringify(data)),
            timestamp,
            retryCount: 0,
        });
    })
        .catch(e => {
        // An error occured while fetching credentials or persisting the event to the buffer
        logger.warn('Failed to record event.', e);
    });
};

export { record };
//# sourceMappingURL=record.mjs.map
