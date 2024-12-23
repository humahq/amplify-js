import { Hub, AMPLIFY_SYMBOL } from '../Hub/index.mjs';
import '../utils/getClientInfo/getClientInfo.mjs';
import '../utils/retry/retry.mjs';
import { deepFreeze } from '../utils/deepFreeze.mjs';
import '../parseAWSExports.mjs';
import { ADD_OAUTH_LISTENER } from './constants.mjs';
import 'uuid';
import { parseAmplifyConfig } from '../utils/parseAmplifyConfig.mjs';
import '../types/errors.mjs';
import '../errors/errorHelpers.mjs';
import './Auth/utils/errorHelpers.mjs';
import { AuthClass } from './Auth/index.mjs';
import '@aws-crypto/sha256-js';
import '@smithy/util-hex-encoding';
import '../Platform/index.mjs';
import '../Platform/types.mjs';
import '../BackgroundProcessManager/types.mjs';
import '../Reachability/Reachability.mjs';
import '../utils/sessionListener/index.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class AmplifyClass {
    constructor() {
        this.oAuthListener = undefined;
        this.resourcesConfig = {};
        this.libraryOptions = {};
        this.Auth = new AuthClass();
    }
    /**
     * Configures Amplify for use with your back-end resources.
     *
     * @remarks
     * This API does not perform any merging of either `resourcesConfig` or `libraryOptions`. The most recently
     * provided values will be used after configuration.
     *
     * @remarks
     * `configure` can be used to specify additional library options where available for supported categories.
     *
     * @param resourceConfig - Back-end resource configuration. Typically provided via the `aws-exports.js` file.
     * @param libraryOptions - Additional options for customizing the behavior of the library.
     */
    configure(resourcesConfig, libraryOptions) {
        const resolvedResourceConfig = parseAmplifyConfig(resourcesConfig);
        this.resourcesConfig = resolvedResourceConfig;
        if (libraryOptions) {
            this.libraryOptions = libraryOptions;
        }
        // Make resource config immutable
        this.resourcesConfig = deepFreeze(this.resourcesConfig);
        this.Auth.configure(this.resourcesConfig.Auth, this.libraryOptions.Auth);
        Hub.dispatch('core', {
            event: 'configure',
            data: this.resourcesConfig,
        }, 'Configure', AMPLIFY_SYMBOL);
        this.notifyOAuthListener();
    }
    /**
     * Provides access to the current back-end resource configuration for the Library.
     *
     * @returns Returns the immutable back-end resource configuration.
     */
    getConfig() {
        return this.resourcesConfig;
    }
    /** @internal */
    [ADD_OAUTH_LISTENER](listener) {
        if (this.resourcesConfig.Auth?.Cognito.loginWith?.oauth) {
            // when Amplify has been configured with a valid OAuth config while adding the listener, run it directly
            listener(this.resourcesConfig.Auth?.Cognito);
        }
        else {
            // otherwise register the listener and run it later when Amplify gets configured with a valid oauth config
            this.oAuthListener = listener;
        }
    }
    notifyOAuthListener() {
        if (!this.resourcesConfig.Auth?.Cognito.loginWith?.oauth ||
            !this.oAuthListener) {
            return;
        }
        this.oAuthListener(this.resourcesConfig.Auth?.Cognito);
        // the listener should only be notified once with a valid oauth config
        this.oAuthListener = undefined;
    }
}
/**
 * The `Amplify` utility is used to configure the library.
 *
 * @remarks
 * `Amplify` orchestrates cross-category communication within the library.
 */
const Amplify = new AmplifyClass();

export { Amplify, AmplifyClass };
//# sourceMappingURL=Amplify.mjs.map
