/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Address } from "../location/address_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file legal/companyRepresentative.proto.
 */
export declare const file_legal_companyRepresentative: GenFile;
/**
 * @generated from message api.legal.CompanyRepresentative
 */
export type CompanyRepresentative = Message<"api.legal.CompanyRepresentative"> & {
    /**
     * First name of the company representative
     *
     * @generated from field: string firstName = 1;
     */
    firstName: string;
    /**
     * Middle names of the company representative (optional)
     *
     * @generated from field: string middleNames = 2;
     */
    middleNames: string;
    /**
     * Last name of the company representative
     *
     * @generated from field: string lastName = 3;
     */
    lastName: string;
    /**
     * Telephone number of the representative
     *
     * @generated from field: string telephoneNumber = 4;
     */
    telephoneNumber: string;
    /**
     * Cellphone number of the representative
     *
     * @generated from field: string cellphoneNumber = 5;
     */
    cellphoneNumber: string;
    /**
     * Email address of the representative
     *
     * @generated from field: string emailAddress = 6;
     */
    emailAddress: string;
    /**
     * Physical address of the representative
     *
     * @generated from field: api.location.Address physicalAddress = 7;
     */
    physicalAddress?: Address;
    /**
     * Postal address of the representative
     *
     * @generated from field: api.location.Address postalAddress = 8;
     */
    postalAddress?: Address;
};
/**
 * Describes the message api.legal.CompanyRepresentative.
 * Use `create(CompanyRepresentativeSchema)` to create a new message.
 */
export declare const CompanyRepresentativeSchema: GenMessage<CompanyRepresentative>;
