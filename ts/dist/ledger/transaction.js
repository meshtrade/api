/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTransactionStates = void 0;
exports.transactionStateToString = transactionStateToString;
exports.stringToTransactionState = stringToTransactionState;
const transaction_pb_1 = require("./transaction_pb");
// Get all transactionStates as enum values
exports.allTransactionStates = Object.values(transaction_pb_1.TransactionState).filter((value) => typeof value === "number");
// Define explicit mappings between TransactionState enums and custom string representations
const networkToStringMapping = {
    [transaction_pb_1.TransactionState.UNDEFINED_TRANSACTION_STATE]: "-",
    [transaction_pb_1.TransactionState.DRAFT_TRANSACTION_STATE]: "Draft",
    [transaction_pb_1.TransactionState.SIGNING_IN_PROGRESS_TRANSACTION_STATE]: "Signing in Progress",
    [transaction_pb_1.TransactionState.PENDING_TRANSACTION_STATE]: "Pending",
    [transaction_pb_1.TransactionState.SUBMISSION_IN_PROGRESS_TRANSACTION_STATE]: "Submission in Progress",
    [transaction_pb_1.TransactionState.FAILED_TRANSACTION_STATE]: "Failed",
    [transaction_pb_1.TransactionState.INDETERMINATE_TRANSACTION_STATE]: "Indeterminate",
    [transaction_pb_1.TransactionState.SUCCESSFUL_TRANSACTION_STATE]: "Successful",
};
// Reverse mapping from string to TransactionState enum
const stringToTransactionStateMapping = {};
for (const [key, value] of Object.entries(networkToStringMapping)) {
    stringToTransactionStateMapping[value] = Number(key);
}
class UnsupportedTransactionStateError extends Error {
    constructor(transactionState) {
        const message = `Unsupported TransactionState: ${transactionState}`;
        super(message);
        this.transactionState = transactionState;
    }
}
/**
 * Converts a TransactionState enum instance to a custom string representation.
 * @param {TransactionState} transactionState - The transactionState to convert.
 * @returns {string} The custom string representation of the transactionState.
 */
function transactionStateToString(transactionState) {
    if (transactionState in networkToStringMapping) {
        return networkToStringMapping[transactionState];
    }
    else {
        throw new UnsupportedTransactionStateError(transactionState);
    }
}
class UnsupportedTransactionStateStringError extends Error {
    constructor(transactionStateStr) {
        const message = `Unsupported transactionState string: ${transactionStateStr}`;
        super(message);
        this.transactionStateStr = transactionStateStr;
    }
}
/**
 * Converts a custom string representation to a TransactionState enum instance.
 * @param {string} transactionStateStr - The custom string representation of the transactionState.
 * @returns {TransactionState} The corresponding TransactionState enum instance.
 */
function stringToTransactionState(transactionStateStr) {
    if (transactionStateStr in stringToTransactionStateMapping) {
        return stringToTransactionStateMapping[transactionStateStr];
    }
    else {
        throw new UnsupportedTransactionStateStringError(transactionStateStr);
    }
}
