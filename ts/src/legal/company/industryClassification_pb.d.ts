// package: api.legal.company
// file: api/proto/legal/company/industryClassification.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class IndustryClassification extends jspb.Message { 
    getSector(): string;
    setSector(value: string): IndustryClassification;
    getIndustry(): string;
    setIndustry(value: string): IndustryClassification;
    getSubindustry(): string;
    setSubindustry(value: string): IndustryClassification;

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
        sector: string,
        industry: string,
        subindustry: string,
    }
}
