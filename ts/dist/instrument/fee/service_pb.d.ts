/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'

import * as api_proto_instrument_fee_fee_pb from '../../instrument/fee/fee_pb'; // proto import: "api/proto/instrument/fee/fee.proto"
import * as api_proto_ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "api/proto/ledger/amount.proto"
import * as api_proto_search_criterion_pb from '../../search/criterion_pb'; // proto import: "api/proto/search/criterion.proto"
import * as api_proto_search_query_pb from '../../search/query_pb'; // proto import: "api/proto/search/query.proto"
import * as api_proto_instrument_feeprofile_lifecycleEventCategory_pb from '../../instrument/feeprofile/lifecycleEventCategory_pb'; // proto import: "api/proto/instrument/feeprofile/lifecycleEventCategory.proto"


export class GetRequest extends jspb.Message {
  getCriteriaList(): Array<api_proto_search_criterion_pb.Criterion>;
  setCriteriaList(value: Array<api_proto_search_criterion_pb.Criterion>): GetRequest;
  clearCriteriaList(): GetRequest;
  addCriteria(value?: api_proto_search_criterion_pb.Criterion, index?: number): api_proto_search_criterion_pb.Criterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRequest): GetRequest.AsObject;
  static serializeBinaryToWriter(message: GetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRequest;
  static deserializeBinaryFromReader(message: GetRequest, reader: jspb.BinaryReader): GetRequest;
}

export namespace GetRequest {
  export type AsObject = {
    criteriaList: Array<api_proto_search_criterion_pb.Criterion.AsObject>,
  }
}

export class GetResponse extends jspb.Message {
  getFee(): api_proto_instrument_fee_fee_pb.Fee | undefined;
  setFee(value?: api_proto_instrument_fee_fee_pb.Fee): GetResponse;
  hasFee(): boolean;
  clearFee(): GetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetResponse): GetResponse.AsObject;
  static serializeBinaryToWriter(message: GetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResponse;
  static deserializeBinaryFromReader(message: GetResponse, reader: jspb.BinaryReader): GetResponse;
}

export namespace GetResponse {
  export type AsObject = {
    fee?: api_proto_instrument_fee_fee_pb.Fee.AsObject,
  }
}

export class ListRequest extends jspb.Message {
  getCriteriaList(): Array<api_proto_search_criterion_pb.Criterion>;
  setCriteriaList(value: Array<api_proto_search_criterion_pb.Criterion>): ListRequest;
  clearCriteriaList(): ListRequest;
  addCriteria(value?: api_proto_search_criterion_pb.Criterion, index?: number): api_proto_search_criterion_pb.Criterion;

  getQuery(): api_proto_search_query_pb.Query | undefined;
  setQuery(value?: api_proto_search_query_pb.Query): ListRequest;
  hasQuery(): boolean;
  clearQuery(): ListRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRequest): ListRequest.AsObject;
  static serializeBinaryToWriter(message: ListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRequest;
  static deserializeBinaryFromReader(message: ListRequest, reader: jspb.BinaryReader): ListRequest;
}

export namespace ListRequest {
  export type AsObject = {
    criteriaList: Array<api_proto_search_criterion_pb.Criterion.AsObject>,
    query?: api_proto_search_query_pb.Query.AsObject,
  }
}

export class ListResponse extends jspb.Message {
  getFeesList(): Array<api_proto_instrument_fee_fee_pb.Fee>;
  setFeesList(value: Array<api_proto_instrument_fee_fee_pb.Fee>): ListResponse;
  clearFeesList(): ListResponse;
  addFees(value?: api_proto_instrument_fee_fee_pb.Fee, index?: number): api_proto_instrument_fee_fee_pb.Fee;

  getTotal(): number;
  setTotal(value: number): ListResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListResponse): ListResponse.AsObject;
  static serializeBinaryToWriter(message: ListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListResponse;
  static deserializeBinaryFromReader(message: ListResponse, reader: jspb.BinaryReader): ListResponse;
}

export namespace ListResponse {
  export type AsObject = {
    feesList: Array<api_proto_instrument_fee_fee_pb.Fee.AsObject>,
    total: number,
  }
}

export class CalculateMintingFeesRequest extends jspb.Message {
  getAmount(): api_proto_ledger_amount_pb.Amount | undefined;
  setAmount(value?: api_proto_ledger_amount_pb.Amount): CalculateMintingFeesRequest;
  hasAmount(): boolean;
  clearAmount(): CalculateMintingFeesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculateMintingFeesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CalculateMintingFeesRequest): CalculateMintingFeesRequest.AsObject;
  static serializeBinaryToWriter(message: CalculateMintingFeesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculateMintingFeesRequest;
  static deserializeBinaryFromReader(message: CalculateMintingFeesRequest, reader: jspb.BinaryReader): CalculateMintingFeesRequest;
}

export namespace CalculateMintingFeesRequest {
  export type AsObject = {
    amount?: api_proto_ledger_amount_pb.Amount.AsObject,
  }
}

export class CalculateMintingFeesResponse extends jspb.Message {
  getFeesList(): Array<api_proto_instrument_fee_fee_pb.Fee>;
  setFeesList(value: Array<api_proto_instrument_fee_fee_pb.Fee>): CalculateMintingFeesResponse;
  clearFeesList(): CalculateMintingFeesResponse;
  addFees(value?: api_proto_instrument_fee_fee_pb.Fee, index?: number): api_proto_instrument_fee_fee_pb.Fee;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculateMintingFeesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CalculateMintingFeesResponse): CalculateMintingFeesResponse.AsObject;
  static serializeBinaryToWriter(message: CalculateMintingFeesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculateMintingFeesResponse;
  static deserializeBinaryFromReader(message: CalculateMintingFeesResponse, reader: jspb.BinaryReader): CalculateMintingFeesResponse;
}

export namespace CalculateMintingFeesResponse {
  export type AsObject = {
    feesList: Array<api_proto_instrument_fee_fee_pb.Fee.AsObject>,
  }
}

export class CalculateBurningFeesRequest extends jspb.Message {
  getAmount(): api_proto_ledger_amount_pb.Amount | undefined;
  setAmount(value?: api_proto_ledger_amount_pb.Amount): CalculateBurningFeesRequest;
  hasAmount(): boolean;
  clearAmount(): CalculateBurningFeesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculateBurningFeesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CalculateBurningFeesRequest): CalculateBurningFeesRequest.AsObject;
  static serializeBinaryToWriter(message: CalculateBurningFeesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculateBurningFeesRequest;
  static deserializeBinaryFromReader(message: CalculateBurningFeesRequest, reader: jspb.BinaryReader): CalculateBurningFeesRequest;
}

export namespace CalculateBurningFeesRequest {
  export type AsObject = {
    amount?: api_proto_ledger_amount_pb.Amount.AsObject,
  }
}

export class CalculateBurningFeesResponse extends jspb.Message {
  getFeesList(): Array<api_proto_instrument_fee_fee_pb.Fee>;
  setFeesList(value: Array<api_proto_instrument_fee_fee_pb.Fee>): CalculateBurningFeesResponse;
  clearFeesList(): CalculateBurningFeesResponse;
  addFees(value?: api_proto_instrument_fee_fee_pb.Fee, index?: number): api_proto_instrument_fee_fee_pb.Fee;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculateBurningFeesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CalculateBurningFeesResponse): CalculateBurningFeesResponse.AsObject;
  static serializeBinaryToWriter(message: CalculateBurningFeesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculateBurningFeesResponse;
  static deserializeBinaryFromReader(message: CalculateBurningFeesResponse, reader: jspb.BinaryReader): CalculateBurningFeesResponse;
}

export namespace CalculateBurningFeesResponse {
  export type AsObject = {
    feesList: Array<api_proto_instrument_fee_fee_pb.Fee.AsObject>,
  }
}

export class CalculateLifecycleFeesRequest extends jspb.Message {
  getInstrumentid(): string;
  setInstrumentid(value: string): CalculateLifecycleFeesRequest;

  getLifecycleeventcategory(): api_proto_instrument_feeprofile_lifecycleEventCategory_pb.LifecycleEventCategory;
  setLifecycleeventcategory(value: api_proto_instrument_feeprofile_lifecycleEventCategory_pb.LifecycleEventCategory): CalculateLifecycleFeesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculateLifecycleFeesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CalculateLifecycleFeesRequest): CalculateLifecycleFeesRequest.AsObject;
  static serializeBinaryToWriter(message: CalculateLifecycleFeesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculateLifecycleFeesRequest;
  static deserializeBinaryFromReader(message: CalculateLifecycleFeesRequest, reader: jspb.BinaryReader): CalculateLifecycleFeesRequest;
}

export namespace CalculateLifecycleFeesRequest {
  export type AsObject = {
    instrumentid: string,
    lifecycleeventcategory: api_proto_instrument_feeprofile_lifecycleEventCategory_pb.LifecycleEventCategory,
  }
}

export class CalculateLifecycleFeesResponse extends jspb.Message {
  getFeesList(): Array<api_proto_instrument_fee_fee_pb.Fee>;
  setFeesList(value: Array<api_proto_instrument_fee_fee_pb.Fee>): CalculateLifecycleFeesResponse;
  clearFeesList(): CalculateLifecycleFeesResponse;
  addFees(value?: api_proto_instrument_fee_fee_pb.Fee, index?: number): api_proto_instrument_fee_fee_pb.Fee;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculateLifecycleFeesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CalculateLifecycleFeesResponse): CalculateLifecycleFeesResponse.AsObject;
  static serializeBinaryToWriter(message: CalculateLifecycleFeesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculateLifecycleFeesResponse;
  static deserializeBinaryFromReader(message: CalculateLifecycleFeesResponse, reader: jspb.BinaryReader): CalculateLifecycleFeesResponse;
}

export namespace CalculateLifecycleFeesResponse {
  export type AsObject = {
    feesList: Array<api_proto_instrument_fee_fee_pb.Fee.AsObject>,
  }
}

export class FullUpdateRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FullUpdateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FullUpdateRequest): FullUpdateRequest.AsObject;
  static serializeBinaryToWriter(message: FullUpdateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FullUpdateRequest;
  static deserializeBinaryFromReader(message: FullUpdateRequest, reader: jspb.BinaryReader): FullUpdateRequest;
}

export namespace FullUpdateRequest {
  export type AsObject = {
  }
}

export class FullUpdateResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FullUpdateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FullUpdateResponse): FullUpdateResponse.AsObject;
  static serializeBinaryToWriter(message: FullUpdateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FullUpdateResponse;
  static deserializeBinaryFromReader(message: FullUpdateResponse, reader: jspb.BinaryReader): FullUpdateResponse;
}

export namespace FullUpdateResponse {
  export type AsObject = {
  }
}

