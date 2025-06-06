/* eslint-disable */
// @ts-nocheck
import { TransactionState } from "./transaction_pb";
export declare const allTransactionStates: TransactionState[];
/**
 * Converts a TransactionState enum instance to a custom string representation.
 * @param {TransactionState} transactionState - The transactionState to convert.
 * @returns {string} The custom string representation of the transactionState.
 */
export declare function transactionStateToString(transactionState: TransactionState): string;
/**
 * Converts a custom string representation to a TransactionState enum instance.
 * @param {string} transactionStateStr - The custom string representation of the transactionState.
 * @returns {TransactionState} The corresponding TransactionState enum instance.
 */
export declare function stringToTransactionState(transactionStateStr: string): TransactionState;
