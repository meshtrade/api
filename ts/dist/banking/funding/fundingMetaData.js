/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundingMetaData = fundingMetaData;
const fee_pb_1 = require("./fee_pb");
const paymentType_pb_1 = require("./paymentType_pb");
// jbjb
function fundingMetaData(fundingMetaData) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    if (fundingMetaData.getDirecteftmetadata()) {
        return new FundingMetaData({
            checkoutId: "",
            externalReference: (_b = (_a = fundingMetaData.getDirecteftmetadata()) === null || _a === void 0 ? void 0 : _a.getExternalreference()) !== null && _b !== void 0 ? _b : "",
            fee: (_d = (_c = fundingMetaData.getDirecteftmetadata()) === null || _c === void 0 ? void 0 : _c.getFee()) !== null && _d !== void 0 ? _d : new fee_pb_1.Fee(),
            paymentType: paymentType_pb_1.PaymentType.UNDEFINED_PAYMENT_TYPE,
        });
    }
    else if (fundingMetaData.getInvestecdirecteftmetadata()) {
        return new FundingMetaData({
            checkoutId: "",
            externalReference: (_f = (_e = fundingMetaData
                .getInvestecdirecteftmetadata()) === null || _e === void 0 ? void 0 : _e.getExternalreference()) !== null && _f !== void 0 ? _f : "",
            fee: (_h = (_g = fundingMetaData.getInvestecdirecteftmetadata()) === null || _g === void 0 ? void 0 : _g.getFee()) !== null && _h !== void 0 ? _h : new fee_pb_1.Fee(),
            paymentType: paymentType_pb_1.PaymentType.UNDEFINED_PAYMENT_TYPE,
        });
    }
    else if (fundingMetaData.getPeachsettlementmetadata()) {
        return new FundingMetaData({
            checkoutId: "",
            externalReference: (_k = (_j = fundingMetaData
                .getPeachsettlementmetadata()) === null || _j === void 0 ? void 0 : _j.getExternaltransactionid()) !== null && _k !== void 0 ? _k : "",
            fee: (_m = (_l = fundingMetaData.getPeachsettlementmetadata()) === null || _l === void 0 ? void 0 : _l.getFee()) !== null && _m !== void 0 ? _m : new fee_pb_1.Fee(),
            paymentType: paymentType_pb_1.PaymentType.UNDEFINED_PAYMENT_TYPE,
        });
    }
    else {
        return new FundingMetaData({
            checkoutId: (_p = (_o = fundingMetaData.getPeachpaymentmetadata()) === null || _o === void 0 ? void 0 : _o.getCheckoutid()) !== null && _p !== void 0 ? _p : "",
            externalReference: (_r = (_q = fundingMetaData.getPeachpaymentmetadata()) === null || _q === void 0 ? void 0 : _q.getExternaltransactionid()) !== null && _r !== void 0 ? _r : "",
            fee: (_t = (_s = fundingMetaData.getPeachpaymentmetadata()) === null || _s === void 0 ? void 0 : _s.getFee()) !== null && _t !== void 0 ? _t : new fee_pb_1.Fee(),
            paymentType: (_v = (_u = fundingMetaData.getPeachpaymentmetadata()) === null || _u === void 0 ? void 0 : _u.getPaymenttype()) !== null && _v !== void 0 ? _v : paymentType_pb_1.PaymentType.UNDEFINED_PAYMENT_TYPE,
        });
    }
}
class FundingMetaData {
    constructor(data) {
        this.checkoutId = data.checkoutId;
        this.externalReference = data.externalReference;
        this.fee = data.fee;
        this.paymentType = data.paymentType;
    }
}
