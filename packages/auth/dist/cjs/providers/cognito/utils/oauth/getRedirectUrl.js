'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedirectUrl = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const constants_1 = require("../../../../errors/constants");
/** @internal */
function getRedirectUrl(redirects, preferredRedirectUrl) {
    if (preferredRedirectUrl) {
        const redirectUrl = redirects?.find(redirect => redirect === preferredRedirectUrl);
        if (!redirectUrl) {
            throw constants_1.invalidPreferredRedirectUrlException;
        }
        return redirectUrl;
    }
    else {
        const redirectUrlFromTheSameOrigin = redirects?.find(isSameOriginAndPathName) ??
            redirects?.find(isTheSameDomain);
        const redirectUrlFromDifferentOrigin = redirects?.find(isHttps) ?? redirects?.find(isHttp);
        if (redirectUrlFromTheSameOrigin) {
            return redirectUrlFromTheSameOrigin;
        }
        else if (redirectUrlFromDifferentOrigin) {
            throw constants_1.invalidOriginException;
        }
        throw constants_1.invalidRedirectException;
    }
}
exports.getRedirectUrl = getRedirectUrl;
// origin + pathname => https://example.com/app
const isSameOriginAndPathName = (redirect) => redirect.startsWith(
// eslint-disable-next-line no-constant-binary-expression
String(window.location.origin + window.location.pathname ?? '/'));
// domain => outlook.live.com, github.com
const isTheSameDomain = (redirect) => redirect.includes(String(window.location.hostname));
const isHttp = (redirect) => redirect.startsWith('http://');
const isHttps = (redirect) => redirect.startsWith('https://');
//# sourceMappingURL=getRedirectUrl.js.map
