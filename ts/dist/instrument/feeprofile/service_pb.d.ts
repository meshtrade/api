import * as jspb from 'google-protobuf'

import * as instrument_feeprofile_feeProfile_pb from '../../instrument/feeprofile/feeProfile_pb'; // proto import: "instrument/feeprofile/feeProfile.proto"
import * as search_criterion_pb from '../../search/criterion_pb'; // proto import: "search/criterion.proto"


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

export class ListRequest extends jspb.Message {
  getCriteriaList(): Array<search_criterion_pb.Criterion>;
  setCriteriaList(value: Array<search_criterion_pb.Criterion>): ListRequest;
  clearCriteriaList(): ListRequest;
  addCriteria(value?: search_criterion_pb.Criterion, index?: number): search_criterion_pb.Criterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRequest): ListRequest.AsObject;
  static serializeBinaryToWriter(message: ListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRequest;
  static deserializeBinaryFromReader(message: ListRequest, reader: jspb.BinaryReader): ListRequest;
}

export namespace ListRequest {
  export type AsObject = {
    criteriaList: Array<search_criterion_pb.Criterion.AsObject>,
  }
}

export class ListResponse extends jspb.Message {
  getFeeprofilesList(): Array<instrument_feeprofile_feeProfile_pb.FeeProfile>;
  setFeeprofilesList(value: Array<instrument_feeprofile_feeProfile_pb.FeeProfile>): ListResponse;
  clearFeeprofilesList(): ListResponse;
  addFeeprofiles(value?: instrument_feeprofile_feeProfile_pb.FeeProfile, index?: number): instrument_feeprofile_feeProfile_pb.FeeProfile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListResponse): ListResponse.AsObject;
  static serializeBinaryToWriter(message: ListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListResponse;
  static deserializeBinaryFromReader(message: ListResponse, reader: jspb.BinaryReader): ListResponse;
}

export namespace ListResponse {
  export type AsObject = {
    feeprofilesList: Array<instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject>,
  }
}

