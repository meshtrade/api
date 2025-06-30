/* eslint-disable */
// @ts-nocheck
import { MetaData } from "./fundingOrderMetadata_pb";
import { Fee } from "./fee_pb";
import { PaymentType } from "./paymentType_pb";
export declare function fundingMetaData(fundingMetaData?: MetaData): FundingMetaData;
declare class FundingMetaData {
    checkoutId: string;
    externalReference: string;
    fee: Fee;
    paymentType: PaymentType;
    constructor(data: FundingMetaData);
}
export {};
