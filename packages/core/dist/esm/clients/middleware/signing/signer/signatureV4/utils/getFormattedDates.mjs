// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns expected date strings to be used in signing.
 *
 * @param date JavaScript `Date` object.
 * @returns `FormattedDates` object containing the following:
 * - longDate: A date string in 'YYYYMMDDThhmmssZ' format
 * - shortDate: A date string in 'YYYYMMDD' format
 *
 * @internal
 */
const getFormattedDates = (date) => {
    const longDate = date.toISOString().replace(/[:-]|\.\d{3}/g, '');
    return {
        longDate,
        shortDate: longDate.slice(0, 8),
    };
};

export { getFormattedDates };
//# sourceMappingURL=getFormattedDates.mjs.map
