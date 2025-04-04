// package: api.instrument.fee
// file: api/proto/instrument/fee/dataPerUnit.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_ledger_amount_pb from "../../ledger/amount_pb";
import * as api_proto_num_decimal_pb from "../../num/decimal_pb";

export class PerUnitData extends jspb.Message { 

    hasNounits(): boolean;
    clearNounits(): void;
    getNounits(): api_proto_num_decimal_pb.Decimal | undefined;
    setNounits(value?: api_proto_num_decimal_pb.Decimal): PerUnitData;

    hasPerunitamount(): boolean;
    clearPerunitamount(): void;
    getPerunitamount(): api_proto_ledger_amount_pb.Amount | undefined;
    setPerunitamount(value?: api_proto_ledger_amount_pb.Amount): PerUnitData;

    hasAmountexclvat(): boolean;
    clearAmountexclvat(): void;
    getAmountexclvat(): api_proto_ledger_amount_pb.Amount | undefined;
    setAmountexclvat(value?: api_proto_ledger_amount_pb.Amount): PerUnitData;

    hasVatrate(): boolean;
    clearVatrate(): void;
    getVatrate(): api_proto_num_decimal_pb.Decimal | undefined;
    setVatrate(value?: api_proto_num_decimal_pb.Decimal): PerUnitData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PerUnitData.AsObject;
    static toObject(includeInstance: boolean, msg: PerUnitData): PerUnitData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PerUnitData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PerUnitData;
    static deserializeBinaryFromReader(message: PerUnitData, reader: jspb.BinaryReader): PerUnitData;
}

export namespace PerUnitData {
    export type AsObject = {
        nounits?: api_proto_num_decimal_pb.Decimal.AsObject,
        perunitamount?: api_proto_ledger_amount_pb.Amount.AsObject,
        amountexclvat?: api_proto_ledger_amount_pb.Amount.AsObject,
        vatrate?: api_proto_num_decimal_pb.Decimal.AsObject,
    }
}
