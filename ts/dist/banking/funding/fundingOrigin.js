/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToFundingOrigin = stringToFundingOrigin;
exports.fundingOriginToString = fundingOriginToString;
const funding_pb_1 = require("./funding_pb");
const fundingOriginToStringMapping = {
    [funding_pb_1.FundingOrigin.UNDEFINED_FUNDING_ORIGIN]: "-",
    [funding_pb_1.FundingOrigin.DIRECT_EFT]: "Direct EFT",
    [funding_pb_1.FundingOrigin.PEACH_PAYMENT]: "Peach Payment",
    [funding_pb_1.FundingOrigin.PEACH_SETTLEMENT]: "Peach Settlement",
};
const fundingOriginStringToState = {};
for (const [key, value] of Object.entries(fundingOriginToStringMapping)) {
    fundingOriginStringToState[value] = Number(key);
}
class UnsupportedFundingOriginStringError extends Error {
    constructor(fundingOriginString) {
        const message = `Unsupported FundingOrigin string: ${fundingOriginString}`;
        super(message);
        this.fundingOriginString = fundingOriginString;
    }
}
function stringToFundingOrigin(fundingOriginString) {
    if (fundingOriginString in fundingOriginStringToState) {
        return fundingOriginStringToState[fundingOriginString];
    }
    else {
        throw new UnsupportedFundingOriginStringError(fundingOriginString);
    }
}
class UnsupportedFundingOriginError extends Error {
    constructor(fundingOrigin) {
        const message = `Unsupported FundingOrigin: ${fundingOrigin}`;
        super(message);
        this.fundingOrigin = fundingOrigin;
    }
}
function fundingOriginToString(fundingOrigin) {
    if (fundingOrigin in fundingOriginToStringMapping) {
        return fundingOriginToStringMapping[fundingOrigin];
    }
    else {
        throw new UnsupportedFundingOriginError(fundingOrigin);
    }
}
