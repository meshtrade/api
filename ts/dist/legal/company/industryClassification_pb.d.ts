/* eslint-disable */
// @ts-nocheck
// package: api.legal.company
// file: api/proto/legal/company/industryClassification.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class IndustryClassification extends jspb.Message { 
    getIndustrycode(): number;
    setIndustrycode(value: number): IndustryClassification;
    getIndustryname(): string;
    setIndustryname(value: string): IndustryClassification;
    getSubindustrycode(): number;
    setSubindustrycode(value: number): IndustryClassification;
    getSubindustryname(): string;
    setSubindustryname(value: string): IndustryClassification;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IndustryClassification.AsObject;
    static toObject(includeInstance: boolean, msg: IndustryClassification): IndustryClassification.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IndustryClassification, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IndustryClassification;
    static deserializeBinaryFromReader(message: IndustryClassification, reader: jspb.BinaryReader): IndustryClassification;
}

export namespace IndustryClassification {
    export type AsObject = {
        industrycode: number,
        industryname: string,
        subindustrycode: number,
        subindustryname: string,
    }
}
