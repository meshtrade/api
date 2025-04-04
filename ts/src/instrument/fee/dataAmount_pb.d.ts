// package: api.instrument.fee
// file: api/proto/instrument/fee/dataAmount.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_ledger_amount_pb from "../../ledger/amount_pb";
import * as api_proto_num_decimal_pb from "../../num/decimal_pb";

export class AmountData extends jspb.Message { 

    hasAmountexclvat(): boolean;
    clearAmountexclvat(): void;
    getAmountexclvat(): api_proto_ledger_amount_pb.Amount | undefined;
    setAmountexclvat(value?: api_proto_ledger_amount_pb.Amount): AmountData;

    hasVatrate(): boolean;
    clearVatrate(): void;
    getVatrate(): api_proto_num_decimal_pb.Decimal | undefined;
    setVatrate(value?: api_proto_num_decimal_pb.Decimal): AmountData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AmountData.AsObject;
    static toObject(includeInstance: boolean, msg: AmountData): AmountData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AmountData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AmountData;
    static deserializeBinaryFromReader(message: AmountData, reader: jspb.BinaryReader): AmountData;
}

export namespace AmountData {
    export type AsObject = {
        amountexclvat?: api_proto_ledger_amount_pb.Amount.AsObject,
        vatrate?: api_proto_num_decimal_pb.Decimal.AsObject,
    }
}
