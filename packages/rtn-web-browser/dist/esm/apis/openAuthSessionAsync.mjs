import { Platform, AppState, Linking } from 'react-native';
import { nativeModule } from '../nativeModule.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
let appStateListener;
let redirectListener;
const openAuthSessionAsync = async (url, redirectUrls, prefersEphemeralSession) => {
    // enforce HTTPS
    const httpsUrl = url.replace('http://', 'https://');
    if (Platform.OS === 'ios') {
        return openAuthSessionIOS(httpsUrl, redirectUrls, prefersEphemeralSession);
    }
    if (Platform.OS === 'android') {
        return openAuthSessionAndroid(httpsUrl, redirectUrls);
    }
};
const openAuthSessionIOS = async (url, redirectUrls, prefersEphemeralSession = false) => {
    const redirectUrl = redirectUrls.find(
    // take the first non-web url as the deeplink
    item => !item.startsWith('https://') && !item.startsWith('http://'));
    return nativeModule.openAuthSessionAsync(url, redirectUrl, prefersEphemeralSession);
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
            nativeModule.openAuthSessionAsync(url),
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
    let previousState = AppState.currentState;
    appStateListener = AppState.addEventListener('change', nextAppState => {
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
    redirectListener = Linking.addEventListener('url', event => {
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

export { openAuthSessionAsync };
//# sourceMappingURL=openAuthSessionAsync.mjs.map
