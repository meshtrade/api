/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allFeeCategories = exports.allFeeStates = void 0;
exports.feeStateToString = feeStateToString;
exports.stringToFeeState = stringToFeeState;
exports.feeCategoryToString = feeCategoryToString;
exports.stringToFeeCategory = stringToFeeCategory;
const fee_pb_1 = require("./fee_pb");
// ---- FEE STATE ----
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
// ---- FEE CATEGORY ----
// Get all fee category as enum values
exports.allFeeCategories = Object.values(fee_pb_1.Category).filter((value) => typeof value === "number");
// Define explicit mappings between FeeCategory enums and custom string representations
const feeCategoryToStringMapping = {
    [fee_pb_1.Category.UNDEFINED_CATEGORY]: "-",
    [fee_pb_1.Category.LISTING_CATEGORY]: "Listing",
    [fee_pb_1.Category.PRIMARY_MARKET_SETTLEMENT_CATEGORY]: "Primary Market Settlement",
    [fee_pb_1.Category.TOKENISATION_CATEGORY]: "Tokenisation",
    [fee_pb_1.Category.AUM_CATEGORY]: "AUM",
};
// Reverse mapping from string to FeeCategory enum
const stringToFeeCategoryMapping = {};
for (const [key, value] of Object.entries(feeCategoryToStringMapping)) {
    stringToFeeCategoryMapping[value] = Number(key);
}
class UnsupportedFeeCategoryError extends Error {
    constructor(feeCategory) {
        const message = `Unsupported FeeCategory: ${feeCategory}`;
        super(message);
        this.feeCategory = feeCategory;
    }
}
/**
 * Converts a FeeCategory enum instance to a custom string representation.
 * @param {FeeCategory} feeCategory - The fee category to convert.
 * @returns {string} The custom string representation of the fee category.
 */
function feeCategoryToString(feeCategory) {
    if (feeCategory in feeCategoryToStringMapping) {
        return feeCategoryToStringMapping[feeCategory];
    }
    else {
        throw new UnsupportedFeeCategoryError(feeCategory);
    }
}
class UnsupportedFeeCategoryStringError extends Error {
    constructor(feeCategoryStr) {
        const message = `Unsupported fee category string: ${feeCategoryStr}`;
        super(message);
        this.feeCategoryStr = feeCategoryStr;
    }
}
/**
 * Converts a custom string representation to a FeeCategory enum instance.
 * @param {string} feeCategoryStr - The custom string representation of the fee category.
 * @returns {FeeCategory} The corresponding FeeCategory enum instance.
 */
function stringToFeeCategory(feeCategoryStr) {
    if (feeCategoryStr in stringToFeeCategoryMapping) {
        return stringToFeeCategoryMapping[feeCategoryStr];
    }
    else {
        throw new UnsupportedFeeCategoryStringError(feeCategoryStr);
    }
}
