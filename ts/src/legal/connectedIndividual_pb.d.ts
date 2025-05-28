// package: api.legal
// file: api/proto/legal/connectedIndividual.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_location_address_pb from "../location/address_pb";

export class ConnectedIndividual extends jspb.Message { 
    getConnectiontype(): string;
    setConnectiontype(value: string): ConnectedIndividual;
    getFirstname(): string;
    setFirstname(value: string): ConnectedIndividual;
    getMiddlenames(): string;
    setMiddlenames(value: string): ConnectedIndividual;
    getLastname(): string;
    setLastname(value: string): ConnectedIndividual;
    getDateofbirth(): string;
    setDateofbirth(value: string): ConnectedIndividual;
    getNationality(): string;
    setNationality(value: string): ConnectedIndividual;
    getIdentificationtype(): string;
    setIdentificationtype(value: string): ConnectedIndividual;
    getIdentificationnumber(): string;
    setIdentificationnumber(value: string): ConnectedIndividual;

    hasPhysicaladdress(): boolean;
    clearPhysicaladdress(): void;
    getPhysicaladdress(): api_proto_location_address_pb.Address | undefined;
    setPhysicaladdress(value?: api_proto_location_address_pb.Address): ConnectedIndividual;

    hasPostaladdress(): boolean;
    clearPostaladdress(): void;
    getPostaladdress(): api_proto_location_address_pb.Address | undefined;
    setPostaladdress(value?: api_proto_location_address_pb.Address): ConnectedIndividual;
    getTelephonenumber(): string;
    setTelephonenumber(value: string): ConnectedIndividual;
    getCellphonenumber(): string;
    setCellphonenumber(value: string): ConnectedIndividual;
    getEmailaddress(): string;
    setEmailaddress(value: string): ConnectedIndividual;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConnectedIndividual.AsObject;
    static toObject(includeInstance: boolean, msg: ConnectedIndividual): ConnectedIndividual.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConnectedIndividual, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConnectedIndividual;
    static deserializeBinaryFromReader(message: ConnectedIndividual, reader: jspb.BinaryReader): ConnectedIndividual;
}

export namespace ConnectedIndividual {
    export type AsObject = {
        connectiontype: string,
        firstname: string,
        middlenames: string,
        lastname: string,
        dateofbirth: string,
        nationality: string,
        identificationtype: string,
        identificationnumber: string,
        physicaladdress?: api_proto_location_address_pb.Address.AsObject,
        postaladdress?: api_proto_location_address_pb.Address.AsObject,
        telephonenumber: string,
        cellphonenumber: string,
        emailaddress: string,
    }
}
