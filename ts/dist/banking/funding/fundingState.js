/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToFundingState = stringToFundingState;
exports.fundingStateToString = fundingStateToString;
const funding_pb_1 = require("./funding_pb");
const fundingStateToStringMapping = {
    [funding_pb_1.FundingState.UNDEFINED_FUNDING_ORDER_STATE]: "-",
    [funding_pb_1.FundingState.PENDING_CONFIRMATION_FUNDING_ORDER_STATE]: "Pending Confirmation",
    [funding_pb_1.FundingState.AWAITING_APPROVAL_FUNDING_ORDER_STATE]: "Awaiting Approval",
    [funding_pb_1.FundingState.SETTLEMENT_IN_PROGRESS_FUNDING_ORDER_STATE]: "Settlement in Progress",
    [funding_pb_1.FundingState.CANCELLED_FUNDING_ORDER_STATE]: "Cancelled",
    [funding_pb_1.FundingState.FAILED_FUNDING_ORDER_STATE]: "Failed",
    [funding_pb_1.FundingState.SETTLED_FUNDING_ORDER_STATE]: "Settled",
    [funding_pb_1.FundingState.UNDER_INVESTIGATION_FUNDING_ORDER_STATE]: "Under Investigation",
};
const fundingStateStringToState = {};
for (const [key, value] of Object.entries(fundingStateToStringMapping)) {
    fundingStateStringToState[value] = Number(key);
}
class UnsupportedFundingOrderStringError extends Error {
    constructor(fundingStateString) {
        const message = `Unsupported FundingState string: ${fundingStateString}`;
        super(message);
        this.fundingStateString = fundingStateString;
    }
}
/**
 * Converts a custom string representation of a FundingState to a FundingState enum instance.
 * @param {string} fundingStateString - The custom string representation of the funding order state to convert.
 * @returns {FundingState} The funding order state.
 */
function stringToFundingState(fundingStateString) {
    if (fundingStateString in fundingStateStringToState) {
        return fundingStateStringToState[fundingStateString];
    }
    else {
        throw new UnsupportedFundingOrderStringError(fundingStateString);
    }
}
class UnsupportedFundingStateError extends Error {
    constructor(fundingState) {
        const message = `Unsupported FundingState: ${fundingState}`;
        super(message);
        this.fundingState = fundingState;
    }
}
/**
 * Converts a FundingState enum instance to a custom string representation.
 * @param {FundingState} fundingState - The funding order state to convert.
 * @returns {string} The custom string representation of the funding order state.
 */
function fundingStateToString(fundingState) {
    if (fundingState in fundingStateToStringMapping) {
        return fundingStateToStringMapping[fundingState];
    }
    else {
        throw new UnsupportedFundingStateError(fundingState);
    }
}
