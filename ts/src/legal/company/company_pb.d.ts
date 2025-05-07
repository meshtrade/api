// package: api.legal.company
// file: api/proto/legal/company/company.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as api_proto_location_address_pb from "../../location/address_pb";
import * as api_proto_legal_companyPublicContactInfo_pb from "../../legal/companyPublicContactInfo_pb";
import * as api_proto_legal_companyRepresentative_pb from "../../legal/companyRepresentative_pb";
import * as api_proto_legal_connectedCompany_pb from "../../legal/connectedCompany_pb";
import * as api_proto_legal_connectedIndividual_pb from "../../legal/connectedIndividual_pb";
import * as api_proto_legal_company_industryClassification_pb from "../../legal/company/industryClassification_pb";
import * as api_proto_audit_entry_pb from "../../audit/entry_pb";

export class Company extends jspb.Message { 
    getRegisteredname(): string;
    setRegisteredname(value: string): Company;
    getTaxreferencenumber(): string;
    setTaxreferencenumber(value: string): Company;
    getRegistrationnumber(): string;
    setRegistrationnumber(value: string): Company;
    getVatregistrationnumber(): string;
    setVatregistrationnumber(value: string): Company;

    hasPublicContactInfo(): boolean;
    clearPublicContactInfo(): void;
    getPublicContactInfo(): api_proto_legal_companyPublicContactInfo_pb.CompanyPublicContactInfo | undefined;
    setPublicContactInfo(value?: api_proto_legal_companyPublicContactInfo_pb.CompanyPublicContactInfo): Company;

    hasCompanyrepresentative(): boolean;
    clearCompanyrepresentative(): void;
    getCompanyrepresentative(): api_proto_legal_companyRepresentative_pb.CompanyRepresentative | undefined;
    setCompanyrepresentative(value?: api_proto_legal_companyRepresentative_pb.CompanyRepresentative): Company;
    getIndustryclassification(): LegalForm;
    setIndustryclassification(value: LegalForm): Company;
    getListedExchange(): string;
    setListedExchange(value: string): Company;
    getListingReference(): string;
    setListingReference(value: string): Company;
    getCountryofincorporation(): string;
    setCountryofincorporation(value: string): Company;
    getFormofincorporation(): LegalForm;
    setFormofincorporation(value: LegalForm): Company;

    hasRegisteredaddress(): boolean;
    clearRegisteredaddress(): void;
    getRegisteredaddress(): api_proto_location_address_pb.Address | undefined;
    setRegisteredaddress(value?: api_proto_location_address_pb.Address): Company;

    hasBusinessaddress(): boolean;
    clearBusinessaddress(): void;
    getBusinessaddress(): api_proto_location_address_pb.Address | undefined;
    setBusinessaddress(value?: api_proto_location_address_pb.Address): Company;

    hasHeadofficeaddress(): boolean;
    clearHeadofficeaddress(): void;
    getHeadofficeaddress(): api_proto_location_address_pb.Address | undefined;
    setHeadofficeaddress(value?: api_proto_location_address_pb.Address): Company;
    clearConnectedindividualsList(): void;
    getConnectedindividualsList(): Array<api_proto_legal_connectedIndividual_pb.ConnectedIndividual>;
    setConnectedindividualsList(value: Array<api_proto_legal_connectedIndividual_pb.ConnectedIndividual>): Company;
    addConnectedindividuals(value?: api_proto_legal_connectedIndividual_pb.ConnectedIndividual, index?: number): api_proto_legal_connectedIndividual_pb.ConnectedIndividual;
    clearConnectedcompaniesList(): void;
    getConnectedcompaniesList(): Array<api_proto_legal_connectedCompany_pb.ConnectedCompany>;
    setConnectedcompaniesList(value: Array<api_proto_legal_connectedCompany_pb.ConnectedCompany>): Company;
    addConnectedcompanies(value?: api_proto_legal_connectedCompany_pb.ConnectedCompany, index?: number): api_proto_legal_connectedCompany_pb.ConnectedCompany;
    clearRoleList(): void;
    getRoleList(): Array<Company_Role>;
    setRoleList(value: Array<Company_Role>): Company;
    addRole(value: Company_Role, index?: number): Company_Role;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Company.AsObject;
    static toObject(includeInstance: boolean, msg: Company): Company.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Company, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Company;
    static deserializeBinaryFromReader(message: Company, reader: jspb.BinaryReader): Company;
}

export namespace Company {
    export type AsObject = {
        registeredname: string,
        taxreferencenumber: string,
        registrationnumber: string,
        vatregistrationnumber: string,
        publicContactInfo?: api_proto_legal_companyPublicContactInfo_pb.CompanyPublicContactInfo.AsObject,
        companyrepresentative?: api_proto_legal_companyRepresentative_pb.CompanyRepresentative.AsObject,
        industryclassification: LegalForm,
        listedExchange: string,
        listingReference: string,
        countryofincorporation: string,
        formofincorporation: LegalForm,
        registeredaddress?: api_proto_location_address_pb.Address.AsObject,
        businessaddress?: api_proto_location_address_pb.Address.AsObject,
        headofficeaddress?: api_proto_location_address_pb.Address.AsObject,
        connectedindividualsList: Array<api_proto_legal_connectedIndividual_pb.ConnectedIndividual.AsObject>,
        connectedcompaniesList: Array<api_proto_legal_connectedCompany_pb.ConnectedCompany.AsObject>,
        roleList: Array<Company_Role>,
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

export enum Company_Role {
    UNDEFINED_COMPANY_ROLE = 0,
    ISSUER_COMPANY_ROLE = 1,
    INVESTOR_COMPANY_ROLE = 2,
    MANAGING_COMPANY_ROLE = 3,
}
