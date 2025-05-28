// package: api.instrument.feeprofile
// file: api/proto/instrument/feeprofile/aum.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_num_decimal_pb from "../../num/decimal_pb";

export class AUM extends jspb.Message { 

    hasRate(): boolean;
    clearRate(): void;
    getRate(): api_proto_num_decimal_pb.Decimal | undefined;
    setRate(value?: api_proto_num_decimal_pb.Decimal): AUM;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AUM.AsObject;
    static toObject(includeInstance: boolean, msg: AUM): AUM.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AUM, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AUM;
    static deserializeBinaryFromReader(message: AUM, reader: jspb.BinaryReader): AUM;
}

export namespace AUM {
    export type AsObject = {
        rate?: api_proto_num_decimal_pb.Decimal.AsObject,
    }
}
