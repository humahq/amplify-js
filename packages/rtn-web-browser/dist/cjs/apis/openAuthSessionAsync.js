'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.openAuthSessionAsync = void 0;
const react_native_1 = require("react-native");
const nativeModule_1 = require("../nativeModule");
let appStateListener;
let redirectListener;
const openAuthSessionAsync = async (url, redirectUrls, prefersEphemeralSession) => {
    // enforce HTTPS
    const httpsUrl = url.replace('http://', 'https://');
    if (react_native_1.Platform.OS === 'ios') {
        return openAuthSessionIOS(httpsUrl, redirectUrls, prefersEphemeralSession);
    }
    if (react_native_1.Platform.OS === 'android') {
        return openAuthSessionAndroid(httpsUrl, redirectUrls);
    }
};
exports.openAuthSessionAsync = openAuthSessionAsync;
const openAuthSessionIOS = async (url, redirectUrls, prefersEphemeralSession = false) => {
    const redirectUrl = redirectUrls.find(
    // take the first non-web url as the deeplink
    item => !item.startsWith('https://') && !item.startsWith('http://'));
    return nativeModule_1.nativeModule.openAuthSessionAsync(url, redirectUrl, prefersEphemeralSession);
};
const openAuthSessionAndroid = async (url, redirectUrls) => {
    try {
        const [redirectUrl] = await Promise.all([
            Promise.race([
                // wait for app to redirect, resulting in a redirectUrl
                getRedirectPromise(redirectUrls),
                // wait for app to return some other way, resulting in null
                getAppStatePromise(),
            ]),
            // open chrome tab
            nativeModule_1.nativeModule.openAuthSessionAsync(url),
        ]);
        return redirectUrl;
    }
    finally {
        removeAppStateListener();
        removeRedirectListener();
    }
};
const getAppStatePromise = () => new Promise(resolve => {
    // remove any stray listeners before creating new ones
    removeAppStateListener();
    let previousState = react_native_1.AppState.currentState;
    appStateListener = react_native_1.AppState.addEventListener('change', nextAppState => {
        if (previousState !== 'active' && nextAppState === 'active') {
            removeAppStateListener();
            resolve(null);
        }
        previousState = nextAppState;
    });
});
const getRedirectPromise = (redirectUrls) => new Promise(resolve => {
    // remove any stray listeners before creating new ones
    removeRedirectListener();
    redirectListener = react_native_1.Linking.addEventListener('url', event => {
        if (redirectUrls.some(url => event.url.startsWith(url))) {
            resolve(event.url);
        }
    });
});
const removeAppStateListener = () => {
    appStateListener?.remove();
    appStateListener = undefined;
};
const removeRedirectListener = () => {
    redirectListener?.remove();
    redirectListener = undefined;
};
//# sourceMappingURL=openAuthSessionAsync.js.map
