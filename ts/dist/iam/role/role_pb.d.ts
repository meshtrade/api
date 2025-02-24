import * as jspb from 'google-protobuf'

import * as iam_role_permission_pb from '../../iam/role/permission_pb'; // proto import: "iam/role/permission.proto"


export class Role extends jspb.Message {
  getName(): string;
  setName(value: string): Role;

  getPermissionsList(): Array<iam_role_permission_pb.Permission>;
  setPermissionsList(value: Array<iam_role_permission_pb.Permission>): Role;
  clearPermissionsList(): Role;
  addPermissions(value?: iam_role_permission_pb.Permission, index?: number): iam_role_permission_pb.Permission;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Role.AsObject;
  static toObject(includeInstance: boolean, msg: Role): Role.AsObject;
  static serializeBinaryToWriter(message: Role, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Role;
  static deserializeBinaryFromReader(message: Role, reader: jspb.BinaryReader): Role;
}

export namespace Role {
  export type AsObject = {
    name: string,
    permissionsList: Array<iam_role_permission_pb.Permission.AsObject>,
  }
}

