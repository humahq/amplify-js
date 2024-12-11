'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAuthUserAttribute = exports.toAttributeType = void 0;
/**
 * Transforms a user attributes object into an array of AttributeType objects.
 * @param attributes user attributes to be mapped to AttributeType objects.
 * @returns an array of AttributeType objects.
 */
function toAttributeType(attributes) {
    return Object.entries(attributes).map(([key, value]) => ({
        Name: key,
        Value: value,
    }));
}
exports.toAttributeType = toAttributeType;
/**
 * Transforms an array of AttributeType objects into a user attributes object.
 *
 * @param attributes - an array of AttributeType objects.
 * @returns AuthUserAttributes object.
 */
function toAuthUserAttribute(attributes) {
    const userAttributes = {};
    attributes?.forEach(attribute => {
        if (attribute.Name)
            userAttributes[attribute.Name] = attribute.Value;
    });
    return userAttributes;
}
exports.toAuthUserAttribute = toAuthUserAttribute;
//# sourceMappingURL=apiHelpers.js.map