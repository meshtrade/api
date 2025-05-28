/* eslint-disable */
// @ts-nocheck
// package: api.instrument.fee
// file: api/proto/instrument/fee/dataRate.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_ledger_amount_pb from "../../ledger/amount_pb";
import * as api_proto_num_decimal_pb from "../../num/decimal_pb";

export class RateData extends jspb.Message { 

    hasRate(): boolean;
    clearRate(): void;
    getRate(): api_proto_num_decimal_pb.Decimal | undefined;
    setRate(value?: api_proto_num_decimal_pb.Decimal): RateData;

    hasBaseamount(): boolean;
    clearBaseamount(): void;
    getBaseamount(): api_proto_ledger_amount_pb.Amount | undefined;
    setBaseamount(value?: api_proto_ledger_amount_pb.Amount): RateData;

    hasAmountexclvat(): boolean;
    clearAmountexclvat(): void;
    getAmountexclvat(): api_proto_ledger_amount_pb.Amount | undefined;
    setAmountexclvat(value?: api_proto_ledger_amount_pb.Amount): RateData;

    hasVatrate(): boolean;
    clearVatrate(): void;
    getVatrate(): api_proto_num_decimal_pb.Decimal | undefined;
    setVatrate(value?: api_proto_num_decimal_pb.Decimal): RateData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RateData.AsObject;
    static toObject(includeInstance: boolean, msg: RateData): RateData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RateData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RateData;
    static deserializeBinaryFromReader(message: RateData, reader: jspb.BinaryReader): RateData;
}

export namespace RateData {
    export type AsObject = {
        rate?: api_proto_num_decimal_pb.Decimal.AsObject,
        baseamount?: api_proto_ledger_amount_pb.Amount.AsObject,
        amountexclvat?: api_proto_ledger_amount_pb.Amount.AsObject,
        vatrate?: api_proto_num_decimal_pb.Decimal.AsObject,
    }
}
