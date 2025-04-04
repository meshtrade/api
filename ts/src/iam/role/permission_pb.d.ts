// package: api.role
// file: api/proto/iam/role/permission.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Permission extends jspb.Message { 
    getServiceprovider(): string;
    setServiceprovider(value: string): Permission;
    getService(): string;
    setService(value: string): Permission;
    getDescription(): string;
    setDescription(value: string): Permission;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Permission.AsObject;
    static toObject(includeInstance: boolean, msg: Permission): Permission.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Permission, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Permission;
    static deserializeBinaryFromReader(message: Permission, reader: jspb.BinaryReader): Permission;
}

export namespace Permission {
    export type AsObject = {
        serviceprovider: string,
        service: string,
        description: string,
    }
}
