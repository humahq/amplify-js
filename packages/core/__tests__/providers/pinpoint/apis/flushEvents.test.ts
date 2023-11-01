// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { getEventBuffer } from '../../../../src/providers/pinpoint/utils/getEventBuffer';
import { flushEvents } from '../../../../src/providers/pinpoint';
import { appId, region, credentials, identityId } from '../testUtils/data';

jest.mock('../../../../src/providers/pinpoint/utils/getEventBuffer');

describe('Pinpoint Provider API: flushEvents', () => {
	const mockGetEventBuffer = getEventBuffer as jest.Mock;
	const mockFlushAll = jest.fn();
	beforeEach(() => {
		mockGetEventBuffer.mockReturnValue({
			flushAll: mockFlushAll,
		});
	});

	afterEach(() => {
		mockFlushAll.mockReset();
		mockGetEventBuffer.mockReset();
	});

	it('invokes flushAll on pinpoint buffer', () => {
		flushEvents(appId, region, credentials, identityId);
		expect(mockGetEventBuffer).toBeCalledWith(
			expect.objectContaining({
				appId,
				region,
				credentials,
				identityId,
			})
		);
		expect(mockFlushAll).toBeCalledTimes(1);
	});
});