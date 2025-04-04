/* eslint-disable */
// @ts-nocheck
// package: api.search
// file: api/proto/search/textNEExactCriterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class TextNEExactCriterion extends jspb.Message { 
    getField(): string;
    setField(value: string): TextNEExactCriterion;
    getText(): string;
    setText(value: string): TextNEExactCriterion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TextNEExactCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: TextNEExactCriterion): TextNEExactCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TextNEExactCriterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TextNEExactCriterion;
    static deserializeBinaryFromReader(message: TextNEExactCriterion, reader: jspb.BinaryReader): TextNEExactCriterion;
}

export namespace TextNEExactCriterion {
    export type AsObject = {
        field: string,
        text: string,
    }
}
