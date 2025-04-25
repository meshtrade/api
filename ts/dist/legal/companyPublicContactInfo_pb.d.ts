/* eslint-disable */
// @ts-nocheck
// package: api.legal
// file: api/proto/legal/companyPublicContactInfo.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CompanyPublicContactInfo extends jspb.Message { 
    getFirstname(): string;
    setFirstname(value: string): CompanyPublicContactInfo;
    getMiddlenames(): string;
    setMiddlenames(value: string): CompanyPublicContactInfo;
    getLastname(): string;
    setLastname(value: string): CompanyPublicContactInfo;
    getTelephonenumber(): string;
    setTelephonenumber(value: string): CompanyPublicContactInfo;
    getCellphonenumber(): string;
    setCellphonenumber(value: string): CompanyPublicContactInfo;
    getEmailaddress(): string;
    setEmailaddress(value: string): CompanyPublicContactInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CompanyPublicContactInfo.AsObject;
    static toObject(includeInstance: boolean, msg: CompanyPublicContactInfo): CompanyPublicContactInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CompanyPublicContactInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CompanyPublicContactInfo;
    static deserializeBinaryFromReader(message: CompanyPublicContactInfo, reader: jspb.BinaryReader): CompanyPublicContactInfo;
}

export namespace CompanyPublicContactInfo {
    export type AsObject = {
        firstname: string,
        middlenames: string,
        lastname: string,
        telephonenumber: string,
        cellphonenumber: string,
        emailaddress: string,
    }
}
