import * as jspb from 'google-protobuf'

import * as instrument_feeprofile_feeProfile_pb from '../../instrument/feeprofile/feeProfile_pb'; // proto import: "instrument/feeprofile/feeProfile.proto"


export class CreateRequest extends jspb.Message {
  getFeeprofile(): instrument_feeprofile_feeProfile_pb.FeeProfile | undefined;
  setFeeprofile(value?: instrument_feeprofile_feeProfile_pb.FeeProfile): CreateRequest;
  hasFeeprofile(): boolean;
  clearFeeprofile(): CreateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRequest;
  static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
  export type AsObject = {
    feeprofile?: instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject,
  }
}

export class GetRequest extends jspb.Message {
  getId(): string;
  setId(value: string): GetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRequest): GetRequest.AsObject;
  static serializeBinaryToWriter(message: GetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRequest;
  static deserializeBinaryFromReader(message: GetRequest, reader: jspb.BinaryReader): GetRequest;
}

export namespace GetRequest {
  export type AsObject = {
    id: string,
  }
}

