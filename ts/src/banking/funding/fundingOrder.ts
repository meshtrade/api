import { fundingStateToString } from "./fundingState";
import { FundingState } from "./funding_pb";

export enum FundingOrderStatusReason {
  FundingOrderApproved = "Funding Approved",
  FundingOrderRetried = "Funding Order Retried",
  FundingOrderCancelled = "Funding Order Cancelled",
}

export const AllFundingOrderStates: string[] = [
  fundingStateToString(FundingState.AWAITING_APPROVAL_FUNDING_ORDER_STATE),
  fundingStateToString(FundingState.SETTLEMENT_IN_PROGRESS_FUNDING_ORDER_STATE),
  fundingStateToString(FundingState.CANCELLED_FUNDING_ORDER_STATE),
  fundingStateToString(FundingState.SETTLED_FUNDING_ORDER_STATE),
  fundingStateToString(FundingState.FAILED_FUNDING_ORDER_STATE),
  fundingStateToString(FundingState.UNDER_INVESTIGATION_FUNDING_ORDER_STATE),
];
