/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Address } from "../location/address_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file legal/connectedIndividual.proto.
 */
export declare const file_legal_connectedIndividual: GenFile;
/**
 * @generated from message api.legal.ConnectedIndividual
 */
export type ConnectedIndividual = Message<"api.legal.ConnectedIndividual"> & {
    /**
     * The type of connection this individual has with the company
     *
     * @generated from field: string connectionType = 1;
     */
    connectionType: string;
    /**
     * First name of the connected individual
     *
     * @generated from field: string firstName = 2;
     */
    firstName: string;
    /**
     * Middle names of the connected individual (optional)
     *
     * @generated from field: string middleNames = 3;
     */
    middleNames: string;
    /**
     * Last name of the connected individual
     *
     * @generated from field: string lastName = 4;
     */
    lastName: string;
    /**
     * Date of birth of the connected individual in format YYYY-MM-DD
     *
     * @generated from field: string dateOfBirth = 5;
     */
    dateOfBirth: string;
    /**
     * Nationality of the connected individual
     *
     * @generated from field: string nationality = 6;
     */
    nationality: string;
    /**
     * Type of identification document (e.g., Passport, ID)
     *
     * @generated from field: string identificationType = 7;
     */
    identificationType: string;
    /**
     * Identification number based on the identification type
     *
     * @generated from field: string identificationNumber = 8;
     */
    identificationNumber: string;
    /**
     * Physical address of the individual
     *
     * @generated from field: api.location.Address physicalAddress = 9;
     */
    physicalAddress?: Address;
    /**
     * Postal address of the individual
     *
     * @generated from field: api.location.Address postalAddress = 10;
     */
    postalAddress?: Address;
    /**
     * Telephone number of the individual (at least one of telephone, cellphone, or email must be provided)
     *
     * @generated from field: string telephoneNumber = 11;
     */
    telephoneNumber: string;
    /**
     * Cellphone number of the individual (at least one of telephone, cellphone, or email must be provided)
     *
     * @generated from field: string cellphoneNumber = 12;
     */
    cellphoneNumber: string;
    /**
     * Email address of the individual (at least one of telephone, cellphone, or email must be provided)
     *
     * @generated from field: string emailAddress = 13;
     */
    emailAddress: string;
};
/**
 * Describes the message api.legal.ConnectedIndividual.
 * Use `create(ConnectedIndividualSchema)` to create a new message.
 */
export declare const ConnectedIndividualSchema: GenMessage<ConnectedIndividual>;
