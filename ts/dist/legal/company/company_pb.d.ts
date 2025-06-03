/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Address } from "../../location/address_pb";
import type { CompanyPublicContactInfo } from "../companyPublicContactInfo_pb";
import type { CompanyRepresentative } from "../companyRepresentative_pb";
import type { ConnectedCompany } from "../connectedCompany_pb";
import type { ConnectedIndividual } from "../connectedIndividual_pb";
import type { IndustryClassification } from "./industryClassification_pb";
import type { LegalForm } from "../legalform_pb";
import type { ClientType } from "../../client/clientType_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file legal/company/company.proto.
 */
export declare const file_legal_company_company: GenFile;
/**
 * @generated from message api.legal.company.Company
 */
export type Company = Message<"api.legal.company.Company"> & {
    /**
     * Registered name of the company (required field)
     *
     * @generated from field: string registeredName = 1;
     */
    registeredName: string;
    /**
     * Tax reference number of the company
     *
     * @generated from field: string taxReferenceNumber = 2;
     */
    taxReferenceNumber: string;
    /**
     * Registration number of the company
     *
     * @generated from field: string registrationNumber = 3;
     */
    registrationNumber: string;
    /**
     * VAT (Value-Added Tax) registration number of the company
     *
     * @generated from field: string vatRegistrationNumber = 4;
     */
    vatRegistrationNumber: string;
    /**
     * Public contact information of the company
     *
     * @generated from field: api.legal.CompanyPublicContactInfo public_contact_info = 5;
     */
    publicContactInfo?: CompanyPublicContactInfo;
    /**
     * Details of the company representative
     *
     * @generated from field: api.legal.CompanyRepresentative companyRepresentative = 6;
     */
    companyRepresentative?: CompanyRepresentative;
    /**
     * Industry classification of the company
     *
     * @generated from field: api.legal.company.IndustryClassification industryClassification = 7;
     */
    industryClassification?: IndustryClassification;
    /**
     * Stock exchange where the company is listed
     *
     * @generated from field: string listed_exchange = 8;
     */
    listedExchange: string;
    /**
     * Listing reference number for the stock exchange
     *
     * @generated from field: string listing_reference = 9;
     */
    listingReference: string;
    /**
     * Country code representing the country of incorporation
     *
     * @generated from field: string countryOfIncorporation = 10;
     */
    countryOfIncorporation: string;
    /**
     * Legal form of the company (e.g., Proprietorship, Corporation)
     *
     * @generated from field: api.legal.LegalForm formOfIncorporation = 11;
     */
    formOfIncorporation: LegalForm;
    /**
     * The company's registered address
     *
     * @generated from field: api.location.Address registeredAddress = 12;
     */
    registeredAddress?: Address;
    /**
     * The company's business address
     *
     * @generated from field: api.location.Address businessAddress = 13;
     */
    businessAddress?: Address;
    /**
     * The company's head office address
     *
     * @generated from field: api.location.Address headOfficeAddress = 14;
     */
    headOfficeAddress?: Address;
    /**
     * List of individuals connected to the company, such as directors or stakeholders
     *
     * @generated from field: repeated api.legal.ConnectedIndividual connectedIndividuals = 15;
     */
    connectedIndividuals: ConnectedIndividual[];
    /**
     * List of companies connected to the company
     *
     * @generated from field: repeated api.legal.ConnectedCompany connectedCompanies = 16;
     */
    connectedCompanies: ConnectedCompany[];
    /**
     * @generated from field: repeated api.client.ClientType clientType = 17;
     */
    clientType: ClientType[];
};
/**
 * Describes the message api.legal.company.Company.
 * Use `create(CompanySchema)` to create a new message.
 */
export declare const CompanySchema: GenMessage<Company>;
