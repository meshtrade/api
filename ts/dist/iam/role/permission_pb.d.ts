/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'



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

