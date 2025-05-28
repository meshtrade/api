// package: api.instrument.feeprofile
// file: api/proto/instrument/feeprofile/service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_instrument_feeprofile_feeProfile_pb from "../../instrument/feeprofile/feeProfile_pb";
import * as api_proto_search_criterion_pb from "../../search/criterion_pb";
import * as api_proto_search_query_pb from "../../search/query_pb";

export class CreateRequest extends jspb.Message { 

    hasFeeprofile(): boolean;
    clearFeeprofile(): void;
    getFeeprofile(): api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile | undefined;
    setFeeprofile(value?: api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile): CreateRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateRequest;
    static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
    export type AsObject = {
        feeprofile?: api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject,
    }
}

export class CreateResponse extends jspb.Message { 

    hasFeeprofile(): boolean;
    clearFeeprofile(): void;
    getFeeprofile(): api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile | undefined;
    setFeeprofile(value?: api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile): CreateResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateResponse): CreateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateResponse;
    static deserializeBinaryFromReader(message: CreateResponse, reader: jspb.BinaryReader): CreateResponse;
}

export namespace CreateResponse {
    export type AsObject = {
        feeprofile?: api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject,
    }
}

export class UpdateRequest extends jspb.Message { 

    hasFeeprofile(): boolean;
    clearFeeprofile(): void;
    getFeeprofile(): api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile | undefined;
    setFeeprofile(value?: api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile): UpdateRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateRequest): UpdateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateRequest;
    static deserializeBinaryFromReader(message: UpdateRequest, reader: jspb.BinaryReader): UpdateRequest;
}

export namespace UpdateRequest {
    export type AsObject = {
        feeprofile?: api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject,
    }
}

export class UpdateResponse extends jspb.Message { 

    hasFeeprofile(): boolean;
    clearFeeprofile(): void;
    getFeeprofile(): api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile | undefined;
    setFeeprofile(value?: api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile): UpdateResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateResponse): UpdateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateResponse;
    static deserializeBinaryFromReader(message: UpdateResponse, reader: jspb.BinaryReader): UpdateResponse;
}

export namespace UpdateResponse {
    export type AsObject = {
        feeprofile?: api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject,
    }
}

export class ListRequest extends jspb.Message { 
    clearCriteriaList(): void;
    getCriteriaList(): Array<api_proto_search_criterion_pb.Criterion>;
    setCriteriaList(value: Array<api_proto_search_criterion_pb.Criterion>): ListRequest;
    addCriteria(value?: api_proto_search_criterion_pb.Criterion, index?: number): api_proto_search_criterion_pb.Criterion;

    hasQuery(): boolean;
    clearQuery(): void;
    getQuery(): api_proto_search_query_pb.Query | undefined;
    setQuery(value?: api_proto_search_query_pb.Query): ListRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListRequest): ListRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
    clearFeeprofilesList(): void;
    getFeeprofilesList(): Array<api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile>;
    setFeeprofilesList(value: Array<api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile>): ListResponse;
    addFeeprofiles(value?: api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile, index?: number): api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile;
    getTotal(): number;
    setTotal(value: number): ListResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListResponse): ListResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListResponse;
    static deserializeBinaryFromReader(message: ListResponse, reader: jspb.BinaryReader): ListResponse;
}

export namespace ListResponse {
    export type AsObject = {
        feeprofilesList: Array<api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject>,
        total: number,
    }
}

export class GetRequest extends jspb.Message { 
    clearCriteriaList(): void;
    getCriteriaList(): Array<api_proto_search_criterion_pb.Criterion>;
    setCriteriaList(value: Array<api_proto_search_criterion_pb.Criterion>): GetRequest;
    addCriteria(value?: api_proto_search_criterion_pb.Criterion, index?: number): api_proto_search_criterion_pb.Criterion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetRequest): GetRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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

    hasFeeprofile(): boolean;
    clearFeeprofile(): void;
    getFeeprofile(): api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile | undefined;
    setFeeprofile(value?: api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile): GetResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetResponse): GetResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetResponse;
    static deserializeBinaryFromReader(message: GetResponse, reader: jspb.BinaryReader): GetResponse;
}

export namespace GetResponse {
    export type AsObject = {
        feeprofile?: api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.AsObject,
    }
}
