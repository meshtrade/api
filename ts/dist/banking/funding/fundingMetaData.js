/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundingMetaData = fundingMetaData;
const fundingOrderMetadata_pb_1 = require("./fundingOrderMetadata_pb");
const fee_pb_1 = require("./fee_pb");
const paymentType_pb_1 = require("./paymentType_pb");
function fundingMetaData(fundingMetaData) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    switch (fundingMetaData === null || fundingMetaData === void 0 ? void 0 : fundingMetaData.getMetadataCase()) {
        case fundingOrderMetadata_pb_1.MetaData.MetadataCase.PEACHPAYMENTMETADATA:
            return new FundingMetaData({
                checkoutId: (_b = (_a = fundingMetaData.getPeachpaymentmetadata()) === null || _a === void 0 ? void 0 : _a.getCheckoutid()) !== null && _b !== void 0 ? _b : "",
                externalReference: (_d = (_c = fundingMetaData
                    .getPeachpaymentmetadata()) === null || _c === void 0 ? void 0 : _c.getExternaltransactionid()) !== null && _d !== void 0 ? _d : "",
                fee: (_f = (_e = fundingMetaData.getPeachpaymentmetadata()) === null || _e === void 0 ? void 0 : _e.getFee()) !== null && _f !== void 0 ? _f : new fee_pb_1.Fee(),
                paymentType: (_h = (_g = fundingMetaData.getPeachpaymentmetadata()) === null || _g === void 0 ? void 0 : _g.getPaymenttype()) !== null && _h !== void 0 ? _h : paymentType_pb_1.PaymentType.UNDEFINED_PAYMENT_TYPE,
            });
        case fundingOrderMetadata_pb_1.MetaData.MetadataCase.PEACHSETTLEMENTMETADATA:
            return new FundingMetaData({
                checkoutId: "",
                externalReference: (_k = (_j = fundingMetaData
                    .getPeachsettlementmetadata()) === null || _j === void 0 ? void 0 : _j.getExternaltransactionid()) !== null && _k !== void 0 ? _k : "",
                fee: (_m = (_l = fundingMetaData.getPeachsettlementmetadata()) === null || _l === void 0 ? void 0 : _l.getFee()) !== null && _m !== void 0 ? _m : new fee_pb_1.Fee(),
                paymentType: paymentType_pb_1.PaymentType.UNDEFINED_PAYMENT_TYPE,
            });
        case fundingOrderMetadata_pb_1.MetaData.MetadataCase.DIRECTEFTMETADATA:
            return new FundingMetaData({
                checkoutId: "",
                externalReference: (_p = (_o = fundingMetaData.getDirecteftmetadata()) === null || _o === void 0 ? void 0 : _o.getExternalreference()) !== null && _p !== void 0 ? _p : "",
                fee: (_r = (_q = fundingMetaData.getDirecteftmetadata()) === null || _q === void 0 ? void 0 : _q.getFee()) !== null && _r !== void 0 ? _r : new fee_pb_1.Fee(),
                paymentType: paymentType_pb_1.PaymentType.UNDEFINED_PAYMENT_TYPE,
            });
        case fundingOrderMetadata_pb_1.MetaData.MetadataCase.METADATA_NOT_SET:
        default:
            return new FundingMetaData({
                checkoutId: "",
                externalReference: "",
                fee: new fee_pb_1.Fee(),
                paymentType: paymentType_pb_1.PaymentType.UNDEFINED_PAYMENT_TYPE,
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
