// package: api.banking.funding
// file: api/proto/banking/funding/funding.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_ledger_amount_pb from "../../ledger/amount_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as api_proto_banking_funding_fundingOrderMetadata_pb from "../../banking/funding/fundingOrderMetadata_pb";

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
    getMetadata(): api_proto_banking_funding_fundingOrderMetadata_pb.MetaData | undefined;
    setMetadata(value?: api_proto_banking_funding_fundingOrderMetadata_pb.MetaData): Funding;
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
        metadata?: api_proto_banking_funding_fundingOrderMetadata_pb.MetaData.AsObject,
        accountnumber: string,
        state: FundingState,
        statereason: string,
        valuedate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
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
    DIRECT_EFT = 4,
}
