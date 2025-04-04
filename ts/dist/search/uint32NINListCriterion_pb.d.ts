/* eslint-disable */
// @ts-nocheck
// package: api.search
// file: api/proto/search/uint32NINListCriterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Uint32NINListCriterion extends jspb.Message { 
    getField(): string;
    setField(value: string): Uint32NINListCriterion;
    clearListList(): void;
    getListList(): Array<number>;
    setListList(value: Array<number>): Uint32NINListCriterion;
    addList(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Uint32NINListCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: Uint32NINListCriterion): Uint32NINListCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Uint32NINListCriterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Uint32NINListCriterion;
    static deserializeBinaryFromReader(message: Uint32NINListCriterion, reader: jspb.BinaryReader): Uint32NINListCriterion;
}

export namespace Uint32NINListCriterion {
    export type AsObject = {
        field: string,
        listList: Array<number>,
    }
}
