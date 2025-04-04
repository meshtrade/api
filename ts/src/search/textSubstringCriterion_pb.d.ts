// package: api.search
// file: api/proto/search/textSubstringCriterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class TextSubstringCriterion extends jspb.Message { 
    getField(): string;
    setField(value: string): TextSubstringCriterion;
    getValue(): string;
    setValue(value: string): TextSubstringCriterion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TextSubstringCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: TextSubstringCriterion): TextSubstringCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TextSubstringCriterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TextSubstringCriterion;
    static deserializeBinaryFromReader(message: TextSubstringCriterion, reader: jspb.BinaryReader): TextSubstringCriterion;
}

export namespace TextSubstringCriterion {
    export type AsObject = {
        field: string,
        value: string,
    }
}
