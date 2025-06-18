// package: api.banking.funding
// file: api/proto/banking/funding/funding.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_ledger_amount_pb from "../../ledger/amount_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Funding extends jspb.Message { 
    getNumber(): string;
    setNumber(value: string): Funding;

    hasAmount(): boolean;
    clearAmount(): void;
    getAmount(): api_proto_ledger_amount_pb.Amount | undefined;
    setAmount(value?: api_proto_ledger_amount_pb.Amount): Funding;
    getFundingorigin(): FundingOrigin;
    setFundingorigin(value: FundingOrigin): Funding;

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): FundingOrderMetaData | undefined;
    setMetadata(value?: FundingOrderMetaData): Funding;
    getAccountnumber(): string;
    setAccountnumber(value: string): Funding;
    getState(): FundingState;
    setState(value: FundingState): Funding;
    getStatereason(): string;
    setStatereason(value: string): Funding;

    hasValuedate(): boolean;
    clearValuedate(): void;
    getValuedate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setValuedate(value?: google_protobuf_timestamp_pb.Timestamp): Funding;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Funding.AsObject;
    static toObject(includeInstance: boolean, msg: Funding): Funding.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Funding, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Funding;
    static deserializeBinaryFromReader(message: Funding, reader: jspb.BinaryReader): Funding;
}

export namespace Funding {
    export type AsObject = {
        number: string,
        amount?: api_proto_ledger_amount_pb.Amount.AsObject,
        fundingorigin: FundingOrigin,
        metadata?: FundingOrderMetaData.AsObject,
        accountnumber: string,
        state: FundingState,
        statereason: string,
        valuedate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class FundingOrderMetaData extends jspb.Message { 

    hasPeachpayment(): boolean;
    clearPeachpayment(): void;
    getPeachpayment(): PeachPaymentMetaData | undefined;
    setPeachpayment(value?: PeachPaymentMetaData): FundingOrderMetaData;

    hasPeachsettlement(): boolean;
    clearPeachsettlement(): void;
    getPeachsettlement(): PeachSettlementMetaData | undefined;
    setPeachsettlement(value?: PeachSettlementMetaData): FundingOrderMetaData;

    hasInvestecdirecteft(): boolean;
    clearInvestecdirecteft(): void;
    getInvestecdirecteft(): InvestecDirectEFTMetaData | undefined;
    setInvestecdirecteft(value?: InvestecDirectEFTMetaData): FundingOrderMetaData;

    getMetadataCase(): FundingOrderMetaData.MetadataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FundingOrderMetaData.AsObject;
    static toObject(includeInstance: boolean, msg: FundingOrderMetaData): FundingOrderMetaData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FundingOrderMetaData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FundingOrderMetaData;
    static deserializeBinaryFromReader(message: FundingOrderMetaData, reader: jspb.BinaryReader): FundingOrderMetaData;
}

export namespace FundingOrderMetaData {
    export type AsObject = {
        peachpayment?: PeachPaymentMetaData.AsObject,
        peachsettlement?: PeachSettlementMetaData.AsObject,
        investecdirecteft?: InvestecDirectEFTMetaData.AsObject,
    }

    export enum MetadataCase {
        METADATA_NOT_SET = 0,
        PEACHPAYMENT = 1,
        PEACHSETTLEMENT = 2,
        INVESTECDIRECTEFT = 3,
    }

}

export class InvestecDirectEFTMetaData extends jspb.Message { 
    getExternaltransactionid(): string;
    setExternaltransactionid(value: string): InvestecDirectEFTMetaData;
    getExternalreference(): string;
    setExternalreference(value: string): InvestecDirectEFTMetaData;
    getBankname(): string;
    setBankname(value: string): InvestecDirectEFTMetaData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InvestecDirectEFTMetaData.AsObject;
    static toObject(includeInstance: boolean, msg: InvestecDirectEFTMetaData): InvestecDirectEFTMetaData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InvestecDirectEFTMetaData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InvestecDirectEFTMetaData;
    static deserializeBinaryFromReader(message: InvestecDirectEFTMetaData, reader: jspb.BinaryReader): InvestecDirectEFTMetaData;
}

export namespace InvestecDirectEFTMetaData {
    export type AsObject = {
        externaltransactionid: string,
        externalreference: string,
        bankname: string,
    }
}

export class PeachSettlementMetaData extends jspb.Message { 
    getExternaltransactionid(): string;
    setExternaltransactionid(value: string): PeachSettlementMetaData;
    getExternalsettlementreference(): string;
    setExternalsettlementreference(value: string): PeachSettlementMetaData;
    getBankname(): string;
    setBankname(value: string): PeachSettlementMetaData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PeachSettlementMetaData.AsObject;
    static toObject(includeInstance: boolean, msg: PeachSettlementMetaData): PeachSettlementMetaData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PeachSettlementMetaData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PeachSettlementMetaData;
    static deserializeBinaryFromReader(message: PeachSettlementMetaData, reader: jspb.BinaryReader): PeachSettlementMetaData;
}

export namespace PeachSettlementMetaData {
    export type AsObject = {
        externaltransactionid: string,
        externalsettlementreference: string,
        bankname: string,
    }
}

export class PeachPaymentMetaData extends jspb.Message { 
    getExternaltransactionid(): string;
    setExternaltransactionid(value: string): PeachPaymentMetaData;
    getExternalreference(): string;
    setExternalreference(value: string): PeachPaymentMetaData;
    getBankname(): string;
    setBankname(value: string): PeachPaymentMetaData;
    getPeachpaymentmethod(): PeachPaymentMethod;
    setPeachpaymentmethod(value: PeachPaymentMethod): PeachPaymentMetaData;
    getCheckoutid(): string;
    setCheckoutid(value: string): PeachPaymentMetaData;

    hasFee(): boolean;
    clearFee(): void;
    getFee(): PeachFee | undefined;
    setFee(value?: PeachFee): PeachPaymentMetaData;
    getCustomername(): string;
    setCustomername(value: string): PeachPaymentMetaData;
    getAccountholder(): string;
    setAccountholder(value: string): PeachPaymentMetaData;
    getPaymenttype(): PaymentType;
    setPaymenttype(value: PaymentType): PeachPaymentMetaData;
    getUserspecifiedaccount(): string;
    setUserspecifiedaccount(value: string): PeachPaymentMetaData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PeachPaymentMetaData.AsObject;
    static toObject(includeInstance: boolean, msg: PeachPaymentMetaData): PeachPaymentMetaData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PeachPaymentMetaData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PeachPaymentMetaData;
    static deserializeBinaryFromReader(message: PeachPaymentMetaData, reader: jspb.BinaryReader): PeachPaymentMetaData;
}

export namespace PeachPaymentMetaData {
    export type AsObject = {
        externaltransactionid: string,
        externalreference: string,
        bankname: string,
        peachpaymentmethod: PeachPaymentMethod,
        checkoutid: string,
        fee?: PeachFee.AsObject,
        customername: string,
        accountholder: string,
        paymenttype: PaymentType,
        userspecifiedaccount: string,
    }
}

export class PeachFee extends jspb.Message { 

    hasFeeincvat(): boolean;
    clearFeeincvat(): void;
    getFeeincvat(): api_proto_ledger_amount_pb.Amount | undefined;
    setFeeincvat(value?: api_proto_ledger_amount_pb.Amount): PeachFee;

    hasFeeexlvat(): boolean;
    clearFeeexlvat(): void;
    getFeeexlvat(): api_proto_ledger_amount_pb.Amount | undefined;
    setFeeexlvat(value?: api_proto_ledger_amount_pb.Amount): PeachFee;

    hasVatamount(): boolean;
    clearVatamount(): void;
    getVatamount(): api_proto_ledger_amount_pb.Amount | undefined;
    setVatamount(value?: api_proto_ledger_amount_pb.Amount): PeachFee;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PeachFee.AsObject;
    static toObject(includeInstance: boolean, msg: PeachFee): PeachFee.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PeachFee, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PeachFee;
    static deserializeBinaryFromReader(message: PeachFee, reader: jspb.BinaryReader): PeachFee;
}

export namespace PeachFee {
    export type AsObject = {
        feeincvat?: api_proto_ledger_amount_pb.Amount.AsObject,
        feeexlvat?: api_proto_ledger_amount_pb.Amount.AsObject,
        vatamount?: api_proto_ledger_amount_pb.Amount.AsObject,
    }
}

export enum FundingState {
    UNDEFINED_FUNDING_ORDER_STATE = 0,
    PENDING_CONFIRMATION_FUNDING_ORDER_STATE = 1,
    AWAITING_APPROVAL_FUNDING_ORDER_STATE = 2,
    SETTLEMENT_IN_PROGRESS_FUNDING_ORDER_STATE = 3,
    CANCELLED_FUNDING_ORDER_STATE = 4,
    FAILED_FUNDING_ORDER_STATE = 5,
    SETTLED_FUNDING_ORDER_STATE = 6,
    UNDER_INVESTIGATION_FUNDING_ORDER_STATE = 7,
}

export enum FundingOrigin {
    UNDEFINED_FUNDING_ORIGIN = 0,
    INVESTEC_DIRECT_EFT = 1,
    PEACH_SETTLEMENT = 2,
    PEACH_PAYMENT = 3,
}

export enum PeachPaymentMethod {
    UNDEFINED_PEACH_FUNDING_CATEGORY = 0,
    PEACH_PAY_BY_BANK = 1,
    PEACH_PAY_BY_CARD = 2,
}

export enum PaymentType {
    UNDEFINED_PAYMENT_TYPE = 0,
    DB = 1,
    RG = 2,
    PA = 3,
    RF = 4,
    CP = 5,
    RV = 6,
    CD = 7,
    RB = 8,
}
