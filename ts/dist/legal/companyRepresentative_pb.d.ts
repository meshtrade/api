/* eslint-disable */
// @ts-nocheck
// package: api.legal
// file: api/proto/legal/companyRepresentative.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_location_address_pb from "../location/address_pb";

export class CompanyRepresentative extends jspb.Message { 
    getFirstname(): string;
    setFirstname(value: string): CompanyRepresentative;
    getMiddlenames(): string;
    setMiddlenames(value: string): CompanyRepresentative;
    getLastname(): string;
    setLastname(value: string): CompanyRepresentative;
    getTelephonenumber(): string;
    setTelephonenumber(value: string): CompanyRepresentative;
    getCellphonenumber(): string;
    setCellphonenumber(value: string): CompanyRepresentative;
    getEmailaddress(): string;
    setEmailaddress(value: string): CompanyRepresentative;

    hasPhysicaladdress(): boolean;
    clearPhysicaladdress(): void;
    getPhysicaladdress(): api_proto_location_address_pb.Address | undefined;
    setPhysicaladdress(value?: api_proto_location_address_pb.Address): CompanyRepresentative;

    hasPostaladdress(): boolean;
    clearPostaladdress(): void;
    getPostaladdress(): api_proto_location_address_pb.Address | undefined;
    setPostaladdress(value?: api_proto_location_address_pb.Address): CompanyRepresentative;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CompanyRepresentative.AsObject;
    static toObject(includeInstance: boolean, msg: CompanyRepresentative): CompanyRepresentative.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CompanyRepresentative, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CompanyRepresentative;
    static deserializeBinaryFromReader(message: CompanyRepresentative, reader: jspb.BinaryReader): CompanyRepresentative;
}

export namespace CompanyRepresentative {
    export type AsObject = {
        firstname: string,
        middlenames: string,
        lastname: string,
        telephonenumber: string,
        cellphonenumber: string,
        emailaddress: string,
        physicaladdress?: api_proto_location_address_pb.Address.AsObject,
        postaladdress?: api_proto_location_address_pb.Address.AsObject,
    }
}
