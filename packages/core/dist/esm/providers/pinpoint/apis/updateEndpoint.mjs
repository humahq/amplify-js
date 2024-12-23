import { getClientInfo } from '../../../utils/getClientInfo/getClientInfo.mjs';
import '../../../utils/retry/retry.mjs';
import '../../../types/errors.mjs';
import '@aws-crypto/sha256-js';
import '@smithy/util-hex-encoding';
import '../../../errors/errorHelpers.mjs';
import '../../../awsClients/pinpoint/base.mjs';
import '../../../awsClients/pinpoint/errorHelpers.mjs';
import { updateEndpoint as updateEndpoint$1 } from '../../../awsClients/pinpoint/updateEndpoint.mjs';
import { amplifyUuid } from '../../../utils/amplifyUuid/index.mjs';
import { cacheEndpointId } from '../utils/cacheEndpointId.mjs';
import { createEndpointId, clearCreatedEndpointId } from '../utils/createEndpointId.mjs';
import { getEndpointId } from '../utils/getEndpointId.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
const updateEndpoint = async ({ address, appId, category, channelType, credentials, identityId, optOut, region, userAttributes, userId, userProfile, userAgentValue, }) => {
    const endpointId = await getEndpointId(appId, category);
    // only generate a new endpoint id if one was not found in cache
    const createdEndpointId = !endpointId
        ? createEndpointId(appId, category)
        : undefined;
    const { customProperties, demographic, email, location, metrics, name, plan, } = userProfile ?? {};
    // only automatically populate the endpoint with client info and identity id upon endpoint creation to
    // avoid overwriting the endpoint with these values every time the endpoint is updated
    const demographicsFromClientInfo = {};
    const resolvedUserId = createdEndpointId ? (userId ?? identityId) : userId;
    if (createdEndpointId) {
        const clientInfo = getClientInfo();
        demographicsFromClientInfo.appVersion = clientInfo.appVersion;
        demographicsFromClientInfo.make = clientInfo.make;
        demographicsFromClientInfo.model = clientInfo.model;
        demographicsFromClientInfo.modelVersion = clientInfo.version;
        demographicsFromClientInfo.platform = clientInfo.platform;
    }
    const mergedDemographic = {
        ...demographicsFromClientInfo,
        ...demographic,
    };
    const attributes = {
        ...(email && { email: [email] }),
        ...(name && { name: [name] }),
        ...(plan && { plan: [plan] }),
        ...customProperties,
    };
    const shouldAddDemographics = createdEndpointId || demographic;
    const shouldAddAttributes = email || customProperties || name || plan;
    const shouldAddUser = resolvedUserId || userAttributes;
    const input = {
        ApplicationId: appId,
        EndpointId: endpointId ?? createdEndpointId,
        EndpointRequest: {
            RequestId: amplifyUuid(),
            EffectiveDate: new Date().toISOString(),
            ChannelType: channelType,
            Address: address,
            ...(shouldAddAttributes && { Attributes: attributes }),
            ...(shouldAddDemographics && {
                Demographic: {
                    AppVersion: mergedDemographic.appVersion,
                    Locale: mergedDemographic.locale,
                    Make: mergedDemographic.make,
                    Model: mergedDemographic.model,
                    ModelVersion: mergedDemographic.modelVersion,
                    Platform: mergedDemographic.platform,
                    PlatformVersion: mergedDemographic.platformVersion,
                    Timezone: mergedDemographic.timezone,
                },
            }),
            ...(location && {
                Location: {
                    City: location.city,
                    Country: location.country,
                    Latitude: location.latitude,
                    Longitude: location.longitude,
                    PostalCode: location.postalCode,
                    Region: location.region,
                },
            }),
            Metrics: metrics,
            OptOut: optOut,
            ...(shouldAddUser && {
                User: {
                    UserId: resolvedUserId,
                    UserAttributes: userAttributes,
                },
            }),
        },
    };
    try {
        await updateEndpoint$1({ credentials, region, userAgentValue }, input);
        // if we had to create an endpoint id, we need to now cache it
        if (createdEndpointId) {
            await cacheEndpointId(appId, category, createdEndpointId);
        }
    }
    finally {
        // at this point, we completely reset the behavior so even if the update was unsuccessful
        // we can just start over with a newly created endpoint id
        if (createdEndpointId) {
            clearCreatedEndpointId(appId, category);
        }
    }
};

export { updateEndpoint };
//# sourceMappingURL=updateEndpoint.mjs.map
