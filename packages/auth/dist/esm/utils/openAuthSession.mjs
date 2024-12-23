// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const openAuthSession = async (url) => {
    if (!window?.location) {
        return;
    }
    // enforce HTTPS
    window.location.href = url.replace('http://', 'https://');
};

export { openAuthSession };
//# sourceMappingURL=openAuthSession.mjs.map
