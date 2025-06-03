/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Address } from "../location/address_pb";
import type { CompanyRepresentative } from "./companyRepresentative_pb";
import type { LegalForm } from "./legalform_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file legal/connectedCompany.proto.
 */
export declare const file_legal_connectedCompany: GenFile;
/**
 * @generated from message api.legal.ConnectedCompany
 */
export type ConnectedCompany = Message<"api.legal.ConnectedCompany"> & {
    /**
     * Unique identifier for the connected company
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * The business name of the connected company
     *
     * @generated from field: string businessName = 2;
     */
    businessName: string;
    /**
     * Legal form of the connected company (e.g., Corporation, Partnership)
     *
     * @generated from field: api.legal.LegalForm legalForm = 3;
     */
    legalForm: LegalForm;
    /**
     * Registered name of the connected company
     *
     * @generated from field: string registeredName = 4;
     */
    registeredName: string;
    /**
     * Registration number of the connected company
     *
     * @generated from field: string registrationNumber = 5;
     */
    registrationNumber: string;
    /**
     * Registered address of the connected company
     *
     * @generated from field: api.location.Address registeredAddress = 6;
     */
    registeredAddress?: Address;
    /**
     * Business address of the connected company
     *
     * @generated from field: api.location.Address businessAddress = 7;
     */
    businessAddress?: Address;
    /**
     * Head office address of the connected company
     *
     * @generated from field: api.location.Address headOfficeAddress = 8;
     */
    headOfficeAddress?: Address;
    /**
     * Representative information for the connected company
     *
     * @generated from field: api.legal.CompanyRepresentative companyRepresentative = 9;
     */
    companyRepresentative?: CompanyRepresentative;
};
/**
 * Describes the message api.legal.ConnectedCompany.
 * Use `create(ConnectedCompanySchema)` to create a new message.
 */
export declare const ConnectedCompanySchema: GenMessage<ConnectedCompany>;
