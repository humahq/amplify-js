import { Signer } from '@aws-amplify/core/internals/utils';
import { fetchAuthSession } from '@aws-amplify/core';
import { MqttOverWS } from './MqttOverWS.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const SERVICE_NAME = 'iotdevicegateway';
class AWSIoT extends MqttOverWS {
    constructor(options = {}) {
        super(options);
    }
    get region() {
        return this.options?.region;
    }
    get endpoint() {
        return (async () => {
            const { endpoint } = this.options;
            const serviceInfo = {
                service: SERVICE_NAME,
                region: this.region,
            };
            const session = await fetchAuthSession();
            if (!session.credentials) {
                throw new Error('No auth session credentials');
            }
            const { accessKeyId: access_key, secretAccessKey: secret_key, sessionToken: session_token, } = session.credentials;
            const result = Signer.signUrl(endpoint, { access_key, secret_key, session_token }, serviceInfo);
            return result;
        })();
    }
}

export { AWSIoT };
//# sourceMappingURL=AWSIot.mjs.map
