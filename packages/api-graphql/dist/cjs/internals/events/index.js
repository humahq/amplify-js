'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeAll = exports.post = exports.connect = void 0;
const core_1 = require("@aws-amplify/core");
const AWSAppSyncEventsProvider_1 = require("../../Providers/AWSAppSyncEventsProvider");
const appsyncRequest_1 = require("./appsyncRequest");
const utils_1 = require("./utils");
/**
 * @experimental API may change in future versions
 *
 * Establish a WebSocket connection to an Events channel
 *
 * @example
 * const channel = await events.connect("default/channel")
 *
 * channel.subscribe({
 *   next: (data) => { console.log(data) },
 *   error: (err) => { console.error(err) },
 * })
 *
 * @example // authMode override
 * const channel = await events.connect("default/channel", { authMode: "userPool" })
 *
 * @param channel - channel path; `<namespace>/<channel>`
 * @param options - request overrides: `authMode`, `authToken`
 *
 */
async function connect(channel, options) {
    const providerOptions = (0, utils_1.configure)();
    providerOptions.authenticationType = (0, utils_1.normalizeAuth)(options?.authMode, providerOptions.authenticationType);
    await AWSAppSyncEventsProvider_1.AppSyncEventProvider.connect(providerOptions);
    let _subscription;
    const sub = (observer, subOptions) => {
        const subscribeOptions = { ...providerOptions, query: channel };
        subscribeOptions.authenticationType = (0, utils_1.normalizeAuth)(subOptions?.authMode, subscribeOptions.authenticationType);
        _subscription = AWSAppSyncEventsProvider_1.AppSyncEventProvider
            .subscribe(subscribeOptions)
            .subscribe(observer);
        return _subscription;
    };
    const close = () => {
        _subscription && _subscription.unsubscribe();
    };
    return {
        subscribe: sub,
        close,
        // publish: pub,
    };
}
exports.connect = connect;
/**
 * @experimental API may change in future versions
 *
 * Publish events to a channel via HTTP request
 *
 * @example
 * await events.post("default/channel", { some: "event" })
 *
 * @example // event batching
 * await events.post("default/channel", [{ some: "event" }, { some: "event2" }])
 *
 * @example // authMode override
 * await events.post("default/channel", { some: "event" }, { authMode: "userPool" })
 *
 * @param channel - channel path; `<namespace>/<channel>`
 * @param event - JSON-serializable value or an array of values
 * @param options - request overrides: `authMode`, `authToken`
 *
 * @returns void on success
 * @throws on error
 */
async function post(channel, event, options) {
    const providerOptions = (0, utils_1.configure)();
    providerOptions.authenticationType = (0, utils_1.normalizeAuth)(options?.authMode, providerOptions.authenticationType);
    // trailing slash required in publish
    const normalizedChannelName = channel[0] === '/' ? channel : `/${channel}`;
    const publishOptions = {
        ...providerOptions,
        query: normalizedChannelName,
        variables: (0, utils_1.serializeEvents)(event),
        authToken: options?.authToken,
    };
    const abortController = new AbortController();
    const res = await (0, appsyncRequest_1.appsyncRequest)(core_1.Amplify, publishOptions, {}, abortController);
    if (res.failed?.length > 0) {
        return res.failed;
    }
}
exports.post = post;
/**
 * @experimental API may change in future versions
 *
 * Close WebSocket connection, disconnect listeners and reconnect observers
 *
 * @example
 * await events.closeAll()
 *
 * @returns void on success
 * @throws on error
 */
async function closeAll() {
    await AWSAppSyncEventsProvider_1.AppSyncEventProvider.close();
}
exports.closeAll = closeAll;
//# sourceMappingURL=index.js.map
