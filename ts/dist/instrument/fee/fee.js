/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allFeeStates = void 0;
exports.feeStateToString = feeStateToString;
exports.stringToFeeState = stringToFeeState;
const fee_pb_1 = require("./fee_pb");
// Get all fee state as enum values
exports.allFeeStates = Object.values(fee_pb_1.State).filter((value) => typeof value === "number");
// Define explicit mappings between FeeState enums and custom string representations
const feeStateToStringMapping = {
    [fee_pb_1.State.UNDEFINED_STATE]: "-",
    [fee_pb_1.State.UPCOMING_STATE]: "Upcoming",
    [fee_pb_1.State.DUE_STATE]: "Due",
    [fee_pb_1.State.PAYMENT_IN_PROGRESS_STATE]: "Payment in Progress",
    [fee_pb_1.State.PAID_STATE]: "Paid",
    [fee_pb_1.State.CANCELLED_STATE]: "Cancelled",
    [fee_pb_1.State.FAILED_STATE]: "Failed",
};
// Reverse mapping from string to FeeState enum
const stringToFeeStateMapping = {};
for (const [key, value] of Object.entries(feeStateToStringMapping)) {
    stringToFeeStateMapping[value] = Number(key);
}
class UnsupportedFeeStateError extends Error {
    constructor(feeState) {
        const message = `Unsupported FeeState: ${feeState}`;
        super(message);
        this.feeState = feeState;
    }
}
/**
 * Converts a FeeState enum instance to a custom string representation.
 * @param {FeeState} feeState - The fee state to convert.
 * @returns {string} The custom string representation of the fee state.
 */
function feeStateToString(feeState) {
    if (feeState in feeStateToStringMapping) {
        return feeStateToStringMapping[feeState];
    }
    else {
        throw new UnsupportedFeeStateError(feeState);
    }
}
class UnsupportedFeeStateStringError extends Error {
    constructor(feeStateStr) {
        const message = `Unsupported fee state string: ${feeStateStr}`;
        super(message);
        this.feeStateStr = feeStateStr;
    }
}
/**
 * Converts a custom string representation to a FeeState enum instance.
 * @param {string} feeStateStr - The custom string representation of the fee state.
 * @returns {FeeState} The corresponding FeeState enum instance.
 */
function stringToFeeState(feeStateStr) {
    if (feeStateStr in stringToFeeStateMapping) {
        return stringToFeeStateMapping[feeStateStr];
    }
    else {
        throw new UnsupportedFeeStateStringError(feeStateStr);
    }
}
