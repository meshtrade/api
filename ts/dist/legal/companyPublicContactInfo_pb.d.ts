/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file legal/companyPublicContactInfo.proto.
 */
export declare const file_legal_companyPublicContactInfo: GenFile;
/**
 * Represents the public contact information of a company
 *
 * @generated from message api.legal.CompanyPublicContactInfo
 */
export type CompanyPublicContactInfo = Message<"api.legal.CompanyPublicContactInfo"> & {
    /**
     * First name of the contact person
     *
     * @generated from field: string firstName = 1;
     */
    firstName: string;
    /**
     * Middle names of the contact person
     *
     * @generated from field: string middleNames = 2;
     */
    middleNames: string;
    /**
     * Last name of the contact person
     *
     * @generated from field: string lastName = 3;
     */
    lastName: string;
    /**
     * Telephone number of the contact person
     *
     * @generated from field: string telephoneNumber = 4;
     */
    telephoneNumber: string;
    /**
     * Cellphone number of the contact person
     *
     * @generated from field: string cellphoneNumber = 5;
     */
    cellphoneNumber: string;
    /**
     * Email address of the contact person
     *
     * @generated from field: string emailAddress = 6;
     */
    emailAddress: string;
};
/**
 * Describes the message api.legal.CompanyPublicContactInfo.
 * Use `create(CompanyPublicContactInfoSchema)` to create a new message.
 */
export declare const CompanyPublicContactInfoSchema: GenMessage<CompanyPublicContactInfo>;
