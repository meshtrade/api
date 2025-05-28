// package: api.instrument.fee
// file: api/proto/instrument/fee/fee.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_instrument_fee_data_pb from "../../instrument/fee/data_pb";
import * as api_proto_ledger_amount_pb from "../../ledger/amount_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Fee extends jspb.Message { 
    getId(): string;
    setId(value: string): Fee;
    getInstrumentname(): string;
    setInstrumentname(value: string): Fee;
    getState(): State;
    setState(value: State): Fee;
    getDescription(): string;
    setDescription(value: string): Fee;

    hasAmountinclvat(): boolean;
    clearAmountinclvat(): void;
    getAmountinclvat(): api_proto_ledger_amount_pb.Amount | undefined;
    setAmountinclvat(value?: api_proto_ledger_amount_pb.Amount): Fee;

    hasVatamount(): boolean;
    clearVatamount(): void;
    getVatamount(): api_proto_ledger_amount_pb.Amount | undefined;
    setVatamount(value?: api_proto_ledger_amount_pb.Amount): Fee;
    getCategory(): Category;
    setCategory(value: Category): Fee;

    hasPaymentdate(): boolean;
    clearPaymentdate(): void;
    getPaymentdate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setPaymentdate(value?: google_protobuf_timestamp_pb.Timestamp): Fee;

    hasData(): boolean;
    clearData(): void;
    getData(): api_proto_instrument_fee_data_pb.Data | undefined;
    setData(value?: api_proto_instrument_fee_data_pb.Data): Fee;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Fee.AsObject;
    static toObject(includeInstance: boolean, msg: Fee): Fee.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Fee, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Fee;
    static deserializeBinaryFromReader(message: Fee, reader: jspb.BinaryReader): Fee;
}

export namespace Fee {
    export type AsObject = {
        id: string,
        instrumentname: string,
        state: State,
        description: string,
        amountinclvat?: api_proto_ledger_amount_pb.Amount.AsObject,
        vatamount?: api_proto_ledger_amount_pb.Amount.AsObject,
        category: Category,
        paymentdate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        data?: api_proto_instrument_fee_data_pb.Data.AsObject,
    }
}

export enum State {
    UNDEFINED_STATE = 0,
    UPCOMING_STATE = 1,
    DUE_STATE = 2,
    PAYMENT_IN_PROGRESS_STATE = 3,
    FAILED_STATE = 4,
    CANCELLED_STATE = 5,
    PAID_STATE = 6,
}

export enum Category {
    UNDEFINED_CATEGORY = 0,
    TOKENISATION_CATEGORY = 1,
    LISTING_CATEGORY = 2,
    PRIMARY_MARKET_SETTLEMENT_CATEGORY = 3,
    AUM_CATEGORY = 4,
}
