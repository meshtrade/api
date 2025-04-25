/* eslint-disable */
// @ts-nocheck
// package: api.location
// file: api/proto/location/address.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Address extends jspb.Message { 
    getLine1(): string;
    setLine1(value: string): Address;
    getLine2(): string;
    setLine2(value: string): Address;
    getCity(): string;
    setCity(value: string): Address;
    getProvince(): string;
    setProvince(value: string): Address;
    getPostalCode(): string;
    setPostalCode(value: string): Address;
    getCountryCode(): string;
    setCountryCode(value: string): Address;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Address.AsObject;
    static toObject(includeInstance: boolean, msg: Address): Address.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Address, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Address;
    static deserializeBinaryFromReader(message: Address, reader: jspb.BinaryReader): Address;
}

export namespace Address {
    export type AsObject = {
        line1: string,
        line2: string,
        city: string,
        province: string,
        postalCode: string,
        countryCode: string,
    }
}
