/* eslint-disable */
// @ts-nocheck
// package: api.search
// file: api/proto/search/textExactCriterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class TextExactCriterion extends jspb.Message { 
    getField(): string;
    setField(value: string): TextExactCriterion;
    getText(): string;
    setText(value: string): TextExactCriterion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TextExactCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: TextExactCriterion): TextExactCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TextExactCriterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TextExactCriterion;
    static deserializeBinaryFromReader(message: TextExactCriterion, reader: jspb.BinaryReader): TextExactCriterion;
}

export namespace TextExactCriterion {
    export type AsObject = {
        field: string,
        text: string,
    }
}
