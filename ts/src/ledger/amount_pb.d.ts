// package: api.ledger
// file: api/proto/ledger/amount.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_ledger_token_pb from "../ledger/token_pb";
import * as api_proto_num_decimal_pb from "../num/decimal_pb";

export class Amount extends jspb.Message { 

    hasToken(): boolean;
    clearToken(): void;
    getToken(): api_proto_ledger_token_pb.Token | undefined;
    setToken(value?: api_proto_ledger_token_pb.Token): Amount;

    hasValue(): boolean;
    clearValue(): void;
    getValue(): api_proto_num_decimal_pb.Decimal | undefined;
    setValue(value?: api_proto_num_decimal_pb.Decimal): Amount;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Amount.AsObject;
    static toObject(includeInstance: boolean, msg: Amount): Amount.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Amount, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Amount;
    static deserializeBinaryFromReader(message: Amount, reader: jspb.BinaryReader): Amount;
}

export namespace Amount {
    export type AsObject = {
        token?: api_proto_ledger_token_pb.Token.AsObject,
        value?: api_proto_num_decimal_pb.Decimal.AsObject,
    }
}
