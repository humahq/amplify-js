import { addEventListener } from '../../../../eventListeners/eventListeners.mjs';
import { assertIsInitialized } from '../../../utils/statusHelpers.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Registers a callback that will be invoked on `messageReceived` events.
 *
 * @param {OnMessageReceivedInput} input - The input object that holds the callback handler.
 * @throws validation: {@link InAppMessagingValidationErrorCode} - Thrown when the provided parameters or library
 * configuration is incorrect, or if In App messaging hasn't been initialized.
 * @returns {OnMessageReceivedOutput} - An object that holds a remove method to stop listening to events.
 * @example
 * ```ts
 * onMessageReceived((message) => {
 *   // use the message
 *   console.log(message.id);
 * });
 * ```
 */
function onMessageReceived(input) {
    assertIsInitialized();
    return addEventListener('messageReceived', input);
}

export { onMessageReceived };
//# sourceMappingURL=onMessageReceived.mjs.map
