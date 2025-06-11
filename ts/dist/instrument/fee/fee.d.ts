import { State as FeeState, Category as FeeCategory } from "./fee_pb";
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
export declare const allFeeCategories: FeeCategory[];
/**
 * Converts a FeeCategory enum instance to a custom string representation.
 * @param {FeeCategory} feeCategory - The fee category to convert.
 * @returns {string} The custom string representation of the fee category.
 */
export declare function feeCategoryToString(feeCategory: FeeCategory): string;
/**
 * Converts a custom string representation to a FeeCategory enum instance.
 * @param {string} feeCategoryStr - The custom string representation of the fee category.
 * @returns {FeeCategory} The corresponding FeeCategory enum instance.
 */
export declare function stringToFeeCategory(feeCategoryStr: string): FeeCategory;
