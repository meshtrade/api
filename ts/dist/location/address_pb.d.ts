/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file location/address.proto.
 */
export declare const file_location_address: GenFile;
/**
 * @generated from message api.location.Address
 */
export type Address = Message<"api.location.Address"> & {
    /**
     * First line of the address
     *
     * @generated from field: string line1 = 1;
     */
    line1: string;
    /**
     * Second line of the address (optional)
     *
     * @generated from field: string line2 = 2;
     */
    line2: string;
    /**
     * Suburb field on the address
     *
     * @generated from field: string suburb = 3;
     */
    suburb: string;
    /**
     * City of the address
     *
     * @generated from field: string city = 4;
     */
    city: string;
    /**
     * Province or state of the address
     *
     * @generated from field: string province = 5;
     */
    province: string;
    /**
     * Postal or ZIP code of the address
     *
     * @generated from field: string postal_code = 6;
     */
    postalCode: string;
    /**
     * Country code of the address in ISO format
     *
     * @generated from field: string country_code = 7;
     */
    countryCode: string;
};
/**
 * Describes the message api.location.Address.
 * Use `create(AddressSchema)` to create a new message.
 */
export declare const AddressSchema: GenMessage<Address>;
