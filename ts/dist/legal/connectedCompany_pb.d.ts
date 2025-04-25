/* eslint-disable */
// @ts-nocheck
// package: api.legal
// file: api/proto/legal/connectedCompany.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_location_address_pb from "../location/address_pb";
import * as api_proto_legal_companyRepresentative_pb from "../legal/companyRepresentative_pb";

export class ConnectedCompany extends jspb.Message { 
    getId(): string;
    setId(value: string): ConnectedCompany;
    getBusinessname(): string;
    setBusinessname(value: string): ConnectedCompany;
    getLegalform(): LegalForm;
    setLegalform(value: LegalForm): ConnectedCompany;
    getRegisteredname(): string;
    setRegisteredname(value: string): ConnectedCompany;
    getRegistrationnumber(): string;
    setRegistrationnumber(value: string): ConnectedCompany;

    hasRegisteredaddress(): boolean;
    clearRegisteredaddress(): void;
    getRegisteredaddress(): api_proto_location_address_pb.Address | undefined;
    setRegisteredaddress(value?: api_proto_location_address_pb.Address): ConnectedCompany;

    hasBusinessaddress(): boolean;
    clearBusinessaddress(): void;
    getBusinessaddress(): api_proto_location_address_pb.Address | undefined;
    setBusinessaddress(value?: api_proto_location_address_pb.Address): ConnectedCompany;

    hasHeadofficeaddress(): boolean;
    clearHeadofficeaddress(): void;
    getHeadofficeaddress(): api_proto_location_address_pb.Address | undefined;
    setHeadofficeaddress(value?: api_proto_location_address_pb.Address): ConnectedCompany;

    hasCompanyrepresentative(): boolean;
    clearCompanyrepresentative(): void;
    getCompanyrepresentative(): api_proto_legal_companyRepresentative_pb.CompanyRepresentative | undefined;
    setCompanyrepresentative(value?: api_proto_legal_companyRepresentative_pb.CompanyRepresentative): ConnectedCompany;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConnectedCompany.AsObject;
    static toObject(includeInstance: boolean, msg: ConnectedCompany): ConnectedCompany.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConnectedCompany, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConnectedCompany;
    static deserializeBinaryFromReader(message: ConnectedCompany, reader: jspb.BinaryReader): ConnectedCompany;
}

export namespace ConnectedCompany {
    export type AsObject = {
        id: string,
        businessname: string,
        legalform: LegalForm,
        registeredname: string,
        registrationnumber: string,
        registeredaddress?: api_proto_location_address_pb.Address.AsObject,
        businessaddress?: api_proto_location_address_pb.Address.AsObject,
        headofficeaddress?: api_proto_location_address_pb.Address.AsObject,
        companyrepresentative?: api_proto_legal_companyRepresentative_pb.CompanyRepresentative.AsObject,
    }
}

export enum LegalForm {
    UNDEFINED_LEGAL_FORM = 0,
    SOUTH_AFRICAN_COMPANY_LEGAL_FORM = 1,
    SOLE_PROPRIETORSHIP_LEGAL_FORM = 2,
    CLOSE_CORPORATION_LEGAL_FORM = 3,
    FOREIGN_COMPANY_LEGAL_FORM = 4,
    LISTED_COMPANY_LEGAL_FORM = 5,
    PARTNERSHIP_LEGAL_FORM = 6,
    TRUST_LEGAL_FORM = 7,
    OTHER_LEGAL_FORM = 8,
}
