/* eslint-disable */
// @ts-nocheck
// package: api.role
// file: api/proto/iam/role/role.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_iam_role_permission_pb from "../../iam/role/permission_pb";

export class Role extends jspb.Message { 
    getName(): string;
    setName(value: string): Role;
    clearPermissionsList(): void;
    getPermissionsList(): Array<api_proto_iam_role_permission_pb.Permission>;
    setPermissionsList(value: Array<api_proto_iam_role_permission_pb.Permission>): Role;
    addPermissions(value?: api_proto_iam_role_permission_pb.Permission, index?: number): api_proto_iam_role_permission_pb.Permission;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Role.AsObject;
    static toObject(includeInstance: boolean, msg: Role): Role.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Role, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Role;
    static deserializeBinaryFromReader(message: Role, reader: jspb.BinaryReader): Role;
}

export namespace Role {
    export type AsObject = {
        name: string,
        permissionsList: Array<api_proto_iam_role_permission_pb.Permission.AsObject>,
    }
}
