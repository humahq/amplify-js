import { OnTokenReceived } from '../types';
/**
 * Registers a listener that will be triggered when a token is received. A token will be received:
 *   1. On every app launch, including the first install
 *   2. When a token changes (this may happen if the service invalidates the token for any reason)
 *
 * @param {OnTokenReceivedInput} input - A callback handler to be invoked with the token.
 * @returns {OnTokenReceivedOutput} - An object with a remove function to remove the listener.
 * @example
 * ```ts
 * // Register a listener
 * onTokenReceived(message => {
 *   doSomething(message);
 * });
 * ```
 * @example
 * ```ts
 * // Register multiple listeners
 * onTokenReceived(message => {
 *   doSomething(message);
 * });
 *
 * onTokenReceived(message => {
 *   doSomethingElse(message);
 * });
 * ```
 */
export declare const onTokenReceived: OnTokenReceived;
