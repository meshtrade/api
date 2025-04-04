// package: api.search
// file: api/proto/search/textNINListCriterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class TextNINListCriterion extends jspb.Message { 
    getField(): string;
    setField(value: string): TextNINListCriterion;
    clearListList(): void;
    getListList(): Array<string>;
    setListList(value: Array<string>): TextNINListCriterion;
    addList(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TextNINListCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: TextNINListCriterion): TextNINListCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TextNINListCriterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TextNINListCriterion;
    static deserializeBinaryFromReader(message: TextNINListCriterion, reader: jspb.BinaryReader): TextNINListCriterion;
}

export namespace TextNINListCriterion {
    export type AsObject = {
        field: string,
        listList: Array<string>,
    }
}
