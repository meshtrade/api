// package: api.search
// file: api/proto/search/uint32ExactCriterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Uint32ExactCriterion extends jspb.Message { 
    getField(): string;
    setField(value: string): Uint32ExactCriterion;
    getUint32(): number;
    setUint32(value: number): Uint32ExactCriterion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Uint32ExactCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: Uint32ExactCriterion): Uint32ExactCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Uint32ExactCriterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Uint32ExactCriterion;
    static deserializeBinaryFromReader(message: Uint32ExactCriterion, reader: jspb.BinaryReader): Uint32ExactCriterion;
}

export namespace Uint32ExactCriterion {
    export type AsObject = {
        field: string,
        uint32: number,
    }
}
