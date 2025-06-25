// package: api.banking.funding
// file: api/proto/banking/funding/fee.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_ledger_amount_pb from "../../ledger/amount_pb";

export class Fee extends jspb.Message { 

    hasFeeincvat(): boolean;
    clearFeeincvat(): void;
    getFeeincvat(): api_proto_ledger_amount_pb.Amount | undefined;
    setFeeincvat(value?: api_proto_ledger_amount_pb.Amount): Fee;

    hasFeeexlvat(): boolean;
    clearFeeexlvat(): void;
    getFeeexlvat(): api_proto_ledger_amount_pb.Amount | undefined;
    setFeeexlvat(value?: api_proto_ledger_amount_pb.Amount): Fee;

    hasVatamount(): boolean;
    clearVatamount(): void;
    getVatamount(): api_proto_ledger_amount_pb.Amount | undefined;
    setVatamount(value?: api_proto_ledger_amount_pb.Amount): Fee;

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
        feeincvat?: api_proto_ledger_amount_pb.Amount.AsObject,
        feeexlvat?: api_proto_ledger_amount_pb.Amount.AsObject,
        vatamount?: api_proto_ledger_amount_pb.Amount.AsObject,
    }
}
