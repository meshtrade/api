// package: api.search
// file: api/proto/search/uint32ListCriterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Uint32ListCriterion extends jspb.Message { 
    getField(): string;
    setField(value: string): Uint32ListCriterion;
    clearListList(): void;
    getListList(): Array<number>;
    setListList(value: Array<number>): Uint32ListCriterion;
    addList(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Uint32ListCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: Uint32ListCriterion): Uint32ListCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Uint32ListCriterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Uint32ListCriterion;
    static deserializeBinaryFromReader(message: Uint32ListCriterion, reader: jspb.BinaryReader): Uint32ListCriterion;
}

export namespace Uint32ListCriterion {
    export type AsObject = {
        field: string,
        listList: Array<number>,
    }
}
