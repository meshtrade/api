/* eslint-disable */
// @ts-nocheck
import { FundingState } from "./funding_pb";
/**
 * Converts a custom string representation of a FundingState to a FundingState enum instance.
 * @param {string} fundingStateString - The custom string representation of the funding order state to convert.
 * @returns {FundingState} The funding order state.
 */
export declare function stringToFundingState(fundingStateString: string): FundingState;
/**
 * Converts a FundingState enum instance to a custom string representation.
 * @param {FundingState} fundingState - The funding order state to convert.
 * @returns {string} The custom string representation of the funding order state.
 */
export declare function fundingStateToString(fundingState: FundingState): string;
