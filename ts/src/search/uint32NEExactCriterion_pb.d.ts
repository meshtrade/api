// package: api.search
// file: api/proto/search/uint32NEExactCriterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Uint32NEExactCriterion extends jspb.Message { 
    getField(): string;
    setField(value: string): Uint32NEExactCriterion;
    getUint32(): number;
    setUint32(value: number): Uint32NEExactCriterion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Uint32NEExactCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: Uint32NEExactCriterion): Uint32NEExactCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Uint32NEExactCriterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Uint32NEExactCriterion;
    static deserializeBinaryFromReader(message: Uint32NEExactCriterion, reader: jspb.BinaryReader): Uint32NEExactCriterion;
}

export namespace Uint32NEExactCriterion {
    export type AsObject = {
        field: string,
        uint32: number,
    }
}
