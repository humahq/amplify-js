import { Amplify } from '../Amplify.mjs';
import { fetchAuthSession as fetchAuthSession$1 } from './internal/fetchAuthSession.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Fetch the auth session including the tokens and credentials if they are available. By default it
 * does not refresh the auth tokens or credentials if they are loaded in storage already. You can force a refresh
 * with `{ forceRefresh: true }` input.
 *
 * @param options - Options configuring the fetch behavior.
 * @throws {@link AuthError} - Throws error when session information cannot be refreshed.
 * @returns Promise<AuthSession>
 */
const fetchAuthSession = (options) => {
    return fetchAuthSession$1(Amplify, options);
};

export { fetchAuthSession };
//# sourceMappingURL=fetchAuthSession.mjs.map
