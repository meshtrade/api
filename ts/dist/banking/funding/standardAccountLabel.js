/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStandardPeachAccountLabelString = getStandardPeachAccountLabelString;
const standardAccountLabels_pb_1 = require("./standardAccountLabels_pb");
/**
 * Returns a human-readable string representation for a StandardPeachAccountLabel.
 * @param label The enum member to convert to a string.
 * @returns A string representation of the label.
 */
function getStandardPeachAccountLabelString(label) {
    switch (label) {
        case standardAccountLabels_pb_1.StandardPeachAccountLabel.PEACH_FEE_ACCOUNT_STANDARD_LABEL:
            return "Peach Fee";
        case standardAccountLabels_pb_1.StandardPeachAccountLabel.PEACH_SETTLEMENT_ACCOUNT_STANDARD_LABEL:
            return "Peach Settlement";
        case standardAccountLabels_pb_1.StandardPeachAccountLabel.PEACH_FLOAT_ACCOUNT_STANDARD_LABEL:
            return "Peach Float";
        default:
            // This default case helps ensure that all enum values are handled.
            // If a new label is added to the enum without being added here,
            // this will cause a compile-time error.
            return `Unknown Label`;
    }
}
