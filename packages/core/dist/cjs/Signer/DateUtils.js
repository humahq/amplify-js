'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Date & time utility functions to abstract the `aws-sdk` away from users.
 * (v2 => v3 modularization is a breaking change)
 *
 * @see https://github.com/aws/aws-sdk-js/blob/6edf586dcc1de7fe8fbfbbd9a0d2b1847921e6e1/lib/util.js#L262
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;
/**
 * This utility is intended to be deprecated and replaced by `signRequest` and `presignUrl` functions from
 * `clients/middleware/signing/signer/signatureV4`.
 *
 * TODO: refactor the logics here into `signRequest` and `presignUrl` functions and remove this class.
 *
 * @internal
 * @deprecated
 */
exports.DateUtils = {
    /**
     * Milliseconds to offset the date to compensate for clock skew between device & services
     */
    clockOffset: 0,
    getDateWithClockOffset() {
        if (exports.DateUtils.clockOffset) {
            return new Date(new Date().getTime() + exports.DateUtils.clockOffset);
        }
        else {
            return new Date();
        }
    },
    /**
     * @returns {number} Clock offset in milliseconds
     */
    getClockOffset() {
        return exports.DateUtils.clockOffset;
    },
    getHeaderStringFromDate(date = exports.DateUtils.getDateWithClockOffset()) {
        return date.toISOString().replace(/[:-]|\.\d{3}/g, '');
    },
    getDateFromHeaderString(header) {
        const [, year, month, day, hour, minute, second] = header.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2}).+/);
        return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second)));
    },
    isClockSkewed(serverDate) {
        // API gateway permits client calls that are off by no more than ±5 minutes
        return (Math.abs(serverDate.getTime() - exports.DateUtils.getDateWithClockOffset().getTime()) >= FIVE_MINUTES_IN_MS);
    },
    isClockSkewError(error) {
        if (!error.response || !error.response.headers) {
            return false;
        }
        const { headers } = error.response;
        return Boolean(['BadRequestException', 'InvalidSignatureException'].includes(headers['x-amzn-errortype']) &&
            (headers.date || headers.Date));
    },
    /**
     * @param {number} offset Clock offset in milliseconds
     */
    setClockOffset(offset) {
        exports.DateUtils.clockOffset = offset;
    },
};
//# sourceMappingURL=DateUtils.js.map
