// package: api.search
// file: api/proto/search/textListCriterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class TextListCriterion extends jspb.Message { 
    getField(): string;
    setField(value: string): TextListCriterion;
    clearListList(): void;
    getListList(): Array<string>;
    setListList(value: Array<string>): TextListCriterion;
    addList(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TextListCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: TextListCriterion): TextListCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TextListCriterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TextListCriterion;
    static deserializeBinaryFromReader(message: TextListCriterion, reader: jspb.BinaryReader): TextListCriterion;
}

export namespace TextListCriterion {
    export type AsObject = {
        field: string,
        listList: Array<string>,
    }
}
