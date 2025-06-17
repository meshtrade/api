import { FundingState } from "./funding_pb";

const fundingStateToStringMapping: {
  [key in FundingState]: string;
} = {
  [FundingState.UNDEFINED_FUNDING_ORDER_STATE]: "-",
  [FundingState.PENDING_CONFIRMATION_FUNDING_ORDER_STATE]:
    "Pending Confirmation",
  [FundingState.AWAITING_APPROVAL_FUNDING_ORDER_STATE]: "Awaiting Approval",
  [FundingState.SETTLEMENT_IN_PROGRESS_FUNDING_ORDER_STATE]:
    "Settlement in Progress",
  [FundingState.CANCELLED_FUNDING_ORDER_STATE]: "Cancelled",
  [FundingState.FAILED_FUNDING_ORDER_STATE]: "Failed",
  [FundingState.SETTLED_FUNDING_ORDER_STATE]: "Settled",
  [FundingState.UNDER_INVESTIGATION_FUNDING_ORDER_STATE]: "Under Investigation",
};

const fundingStateStringToState: Record<string, FundingState> = {};
for (const [key, value] of Object.entries(fundingStateToStringMapping)) {
  fundingStateStringToState[value] = Number(key);
}

class UnsupportedFundingOrderStringError extends Error {
  fundingStateString: string;

  constructor(fundingStateString: string) {
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
export function stringToFundingState(fundingStateString: string): FundingState {
  if (fundingStateString in fundingStateStringToState) {
    return fundingStateStringToState[fundingStateString];
  } else {
    throw new UnsupportedFundingOrderStringError(fundingStateString);
  }
}

class UnsupportedFundingStateError extends Error {
  fundingState: FundingState;

  constructor(fundingState: FundingState) {
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
export function fundingStateToString(fundingState: FundingState): string {
  if (fundingState in fundingStateToStringMapping) {
    return fundingStateToStringMapping[fundingState];
  } else {
    throw new UnsupportedFundingStateError(fundingState);
  }
}
