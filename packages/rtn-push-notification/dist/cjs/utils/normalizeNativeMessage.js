'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeNativeMessage = void 0;
const tslib_1 = require("tslib");
const isEmpty_js_1 = tslib_1.__importDefault(require("lodash/isEmpty.js"));
/**
 * @internal
 */
const normalizeNativeMessage = (nativeMessage) => {
    let normalized;
    if (isApnsMessage(nativeMessage)) {
        normalized = normalizeApnsMessage(nativeMessage);
    }
    else if (isFcmMessage(nativeMessage)) {
        normalized = normalizeFcmMessage(nativeMessage);
    }
    else {
        return null;
    }
    const { body, imageUrl, title, action, options, data } = normalized;
    return {
        body,
        data,
        imageUrl,
        title,
        ...action,
        ...options,
    };
};
exports.normalizeNativeMessage = normalizeNativeMessage;
const normalizeApnsMessage = (apnsMessage) => {
    const { aps, data } = apnsMessage;
    const { body, title } = aps.alert ?? {};
    const action = getApnsAction(data?.pinpoint) ?? {};
    const imageUrl = data?.['media-url'];
    const options = getApnsOptions(apnsMessage);
    return { body, imageUrl, title, action, options, data };
};
const normalizeFcmMessage = (fcmMessage) => {
    const { body, imageUrl, rawData: data, title } = fcmMessage;
    const action = getFcmAction(fcmMessage.action) ?? {};
    const options = getFcmOptions(fcmMessage);
    return { body, imageUrl, title, action, options, data };
};
const getApnsAction = (action) => {
    if (action?.deeplink) {
        return { deeplinkUrl: action.deeplink };
    }
};
const getFcmAction = (action) => {
    if (action?.url) {
        return { goToUrl: action.url };
    }
    if (action?.deeplink) {
        return { deeplinkUrl: action.deeplink };
    }
};
const getApnsOptions = ({ aps, }) => {
    const { subtitle } = aps.alert ?? {};
    const apnsOptions = { ...(subtitle && { subtitle }) };
    return { ...(!(0, isEmpty_js_1.default)(apnsOptions) && { apnsOptions }) };
};
const getFcmOptions = ({ channelId = '', messageId = '', senderId = '', sendTime = new Date().getTime(), }) => {
    const fcmOptions = {
        channelId,
        messageId,
        senderId,
        sendTime: new Date(sendTime),
    };
    return { ...(!(0, isEmpty_js_1.default)(fcmOptions) && { fcmOptions }) };
};
const isApnsMessage = (nativeMessage) => !!nativeMessage?.aps;
const isFcmMessage = (nativeMessage) => !!nativeMessage?.rawData;
//# sourceMappingURL=normalizeNativeMessage.js.map
