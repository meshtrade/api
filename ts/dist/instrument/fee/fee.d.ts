import { State as FeeState } from "./fee_pb";
export declare const allFeeStates: FeeState[];
/**
 * Converts a FeeState enum instance to a custom string representation.
 * @param {FeeState} feeState - The fee state to convert.
 * @returns {string} The custom string representation of the fee state.
 */
export declare function feeStateToString(feeState: FeeState): string;
/**
 * Converts a custom string representation to a FeeState enum instance.
 * @param {string} feeStateStr - The custom string representation of the fee state.
 * @returns {FeeState} The corresponding FeeState enum instance.
 */
export declare function stringToFeeState(feeStateStr: string): FeeState;
