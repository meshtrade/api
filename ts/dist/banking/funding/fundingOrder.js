/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllFundingOrderStates = exports.FundingOrderStatusReason = void 0;
const fundingState_1 = require("./fundingState");
const funding_pb_1 = require("./funding_pb");
var FundingOrderStatusReason;
(function (FundingOrderStatusReason) {
    FundingOrderStatusReason["FundingOrderApproved"] = "Funding Approved";
    FundingOrderStatusReason["FundingOrderRetried"] = "Funding Order Retried";
    FundingOrderStatusReason["FundingOrderCancelled"] = "Funding Order Cancelled";
})(FundingOrderStatusReason || (exports.FundingOrderStatusReason = FundingOrderStatusReason = {}));
exports.AllFundingOrderStates = [
    (0, fundingState_1.fundingStateToString)(funding_pb_1.FundingState.AWAITING_APPROVAL_FUNDING_ORDER_STATE),
    (0, fundingState_1.fundingStateToString)(funding_pb_1.FundingState.SETTLEMENT_IN_PROGRESS_FUNDING_ORDER_STATE),
    (0, fundingState_1.fundingStateToString)(funding_pb_1.FundingState.CANCELLED_FUNDING_ORDER_STATE),
    (0, fundingState_1.fundingStateToString)(funding_pb_1.FundingState.SETTLED_FUNDING_ORDER_STATE),
    (0, fundingState_1.fundingStateToString)(funding_pb_1.FundingState.FAILED_FUNDING_ORDER_STATE),
    (0, fundingState_1.fundingStateToString)(funding_pb_1.FundingState.UNDER_INVESTIGATION_FUNDING_ORDER_STATE),
];
