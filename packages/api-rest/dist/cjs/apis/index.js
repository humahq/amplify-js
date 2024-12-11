'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.head = exports.del = exports.put = exports.post = exports.get = void 0;
const core_1 = require("@aws-amplify/core");
const publicApis_1 = require("./common/publicApis");
/**
 * GET HTTP request
 * @param {GetInput} input - Input for GET operation
 * @returns {GetOperation} Operation for GET request
 * @throws - {@link RestApiError}
 * @example
 * Send a GET request
 * ```js
 * import { get, isCancelError } from '@aws-amplify/api';
 *
 * const { body } = await get({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     body, // Optional, JSON object or FormData
 *     queryParams, // Optional, A map of query strings
 *   }
 * }).response;
 * const data = await body.json();
 * ```
 * @example
 * Cancel a GET request
 *
 * ```js
 * import { get, isCancelError } from '@aws-amplify/api';
 *
 * const { response, cancel } = get({apiName, path, options});
 * cancel(message);
 * try {
 *   await response;
 * } catch (e) {
 *   if (isCancelError(e)) {
 *    // handle request cancellation
 *   }
 *   //...
 * }
 * ```
 */
const get = (input) => (0, publicApis_1.get)(core_1.Amplify, input);
exports.get = get;
/**
 * POST HTTP request
 * @param {PostInput} input - Input for POST operation
 * @returns {PostOperation} Operation for POST request
 * @throws - {@link RestApiError}
 * @example
 * Send a POST request
 * ```js
 * import { post, isCancelError } from '@aws-amplify/api';
 *
 * const { body } = await post({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     body, // Optional, JSON object or FormData
 *     queryParams, // Optional, A map of query strings
 *   }
 * }).response;
 * const data = await body.json();
 * ```
 * @example
 * Cancel a POST request
 *
 * ```js
 * import { post, isCancelError } from '@aws-amplify/api';
 *
 * const { response, cancel } = post({apiName, path, options});
 * cancel(message);
 * try {
 *   await response;
 * } catch (e) {
 *   if (isCancelError(e)) {
 *    // handle request cancellation
 *   }
 *   //...
 * }
 * ```
 */
const post = (input) => (0, publicApis_1.post)(core_1.Amplify, input);
exports.post = post;
/**
 * PUT HTTP request
 * @param {PutInput} input - Input for PUT operation
 * @returns {PutOperation} Operation for PUT request
 * @throws - {@link RestApiError}
 * @example
 * Send a PUT request
 * ```js
 * import { put, isCancelError } from '@aws-amplify/api';
 *
 * const { body } = await put({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     body, // Optional, JSON object or FormData
 *     queryParams, // Optional, A map of query strings
 *   }
 * }).response;
 * const data = await body.json();
 * ```
 * @example
 * Cancel a PUT request
 * ```js
 * import { put, isCancelError } from '@aws-amplify/api';
 *
 * const { response, cancel } = put({apiName, path, options});
 * cancel(message);
 * try {
 *  await response;
 * } catch (e) {
 *   if (isCancelError(e)) {
 *     // handle request cancellation
 *   }
 * //...
 * }
 * ```
 */
const put = (input) => (0, publicApis_1.put)(core_1.Amplify, input);
exports.put = put;
/**
 * DELETE HTTP request
 * @param {DeleteInput} input - Input for DELETE operation
 * @returns {DeleteOperation} Operation for DELETE request
 * @throws - {@link RestApiError}
 * @example
 * Send a DELETE request
 * ```js
 * import { del } from '@aws-amplify/api';
 *
 * const { statusCode } = await del({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     queryParams, // Optional, A map of query strings
 *   }
 * }).response;
 * ```
 */
const del = (input) => (0, publicApis_1.del)(core_1.Amplify, input);
exports.del = del;
/**
 * HEAD HTTP request
 * @param {HeadInput} input - Input for HEAD operation
 * @returns {HeadOperation} Operation for HEAD request
 * @throws - {@link RestApiError}
 * @example
 * Send a HEAD request
 * ```js
 * import { head, isCancelError } from '@aws-amplify/api';
 *
 * const { headers, statusCode } = await head({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     queryParams, // Optional, A map of query strings
 *   }
 * }),response;
 * ```
 *
 */
const head = (input) => (0, publicApis_1.head)(core_1.Amplify, input);
exports.head = head;
/**
 * PATCH HTTP request
 * @param {PatchInput} input - Input for PATCH operation
 * @returns {PatchOperation} Operation for PATCH request
 * @throws - {@link RestApiError}
 * @example
 * Send a PATCH request
 * ```js
 * import { patch } from '@aws-amplify/api';
 *
 * const { body } = await patch({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     body, // Optional, JSON object or FormData
 *     queryParams, // Optional, A map of query strings
 *   }
 * }).response;
 * const data = await body.json();
 * ```
 *
 * @example
 * Cancel a PATCH request
 * ```js
 * import { patch, isCancelError } from '@aws-amplify/api';
 *
 * const { response, cancel } = patch({apiName, path, options});
 * cancel(message);
 * try {
 *  await response;
 * } catch (e) {
 *  if (isCancelError(e)) {
 *   // handle request cancellation
 *  }
 * //...
 * }
 * ```
 */
const patch = (input) => (0, publicApis_1.patch)(core_1.Amplify, input);
exports.patch = patch;
//# sourceMappingURL=index.js.map
