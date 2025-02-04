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

export class CreateResponse extends jspb.Message {
  getFeeprofile(): instrument_feeprofile_feeProfile_pb.FeeProfile | undefined;
  setFeeprofile(value?: instrument_feeprofile_feeProfile_pb.FeeProfile): CreateResponse;
  hasFeeprofile(): boolean;
  clearFeeprofile(): CreateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateResponse): CreateResponse.AsObject;
  static serializeBinaryToWriter(message: CreateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateResponse;
  static deserializeBinaryFromReader(message: CreateResponse, reader: jspb.BinaryReader): CreateResponse;
}

export namespace CreateResponse {
  export type AsObject = {
    feeprofile?: instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject,
  }
}

export class UpdateRequest extends jspb.Message {
  getFeeprofile(): instrument_feeprofile_feeProfile_pb.FeeProfile | undefined;
  setFeeprofile(value?: instrument_feeprofile_feeProfile_pb.FeeProfile): UpdateRequest;
  hasFeeprofile(): boolean;
  clearFeeprofile(): UpdateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRequest): UpdateRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRequest;
  static deserializeBinaryFromReader(message: UpdateRequest, reader: jspb.BinaryReader): UpdateRequest;
}

export namespace UpdateRequest {
  export type AsObject = {
    feeprofile?: instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject,
  }
}

export class UpdateResponse extends jspb.Message {
  getFeeprofile(): instrument_feeprofile_feeProfile_pb.FeeProfile | undefined;
  setFeeprofile(value?: instrument_feeprofile_feeProfile_pb.FeeProfile): UpdateResponse;
  hasFeeprofile(): boolean;
  clearFeeprofile(): UpdateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateResponse): UpdateResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateResponse;
  static deserializeBinaryFromReader(message: UpdateResponse, reader: jspb.BinaryReader): UpdateResponse;
}

export namespace UpdateResponse {
  export type AsObject = {
    feeprofile?: instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject,
  }
}

export class GetRequest extends jspb.Message {
  getInstrumentname(): string;
  setInstrumentname(value: string): GetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRequest): GetRequest.AsObject;
  static serializeBinaryToWriter(message: GetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRequest;
  static deserializeBinaryFromReader(message: GetRequest, reader: jspb.BinaryReader): GetRequest;
}

export namespace GetRequest {
  export type AsObject = {
    instrumentname: string,
  }
}

export class GetResponse extends jspb.Message {
  getFeeprofile(): instrument_feeprofile_feeProfile_pb.FeeProfile | undefined;
  setFeeprofile(value?: instrument_feeprofile_feeProfile_pb.FeeProfile): GetResponse;
  hasFeeprofile(): boolean;
  clearFeeprofile(): GetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetResponse): GetResponse.AsObject;
  static serializeBinaryToWriter(message: GetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResponse;
  static deserializeBinaryFromReader(message: GetResponse, reader: jspb.BinaryReader): GetResponse;
}

export namespace GetResponse {
  export type AsObject = {
    feeprofile?: instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject,
  }
}

