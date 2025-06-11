// package: api.banking.funding
// file: api/proto/banking/funding/service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_banking_funding_funding_pb from "../../banking/funding/funding_pb";
import * as api_proto_search_criterion_pb from "../../search/criterion_pb";
import * as api_proto_search_query_pb from "../../search/query_pb";

export class CreateRequest extends jspb.Message { 

    hasFunding(): boolean;
    clearFunding(): void;
    getFunding(): api_proto_banking_funding_funding_pb.Funding | undefined;
    setFunding(value?: api_proto_banking_funding_funding_pb.Funding): CreateRequest;

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
        funding?: api_proto_banking_funding_funding_pb.Funding.AsObject,
    }
}

export class CreateResponse extends jspb.Message { 

    hasFunding(): boolean;
    clearFunding(): void;
    getFunding(): api_proto_banking_funding_funding_pb.Funding | undefined;
    setFunding(value?: api_proto_banking_funding_funding_pb.Funding): CreateResponse;

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
        funding?: api_proto_banking_funding_funding_pb.Funding.AsObject,
    }
}

export class UpdateRequest extends jspb.Message { 

    hasFunding(): boolean;
    clearFunding(): void;
    getFunding(): api_proto_banking_funding_funding_pb.Funding | undefined;
    setFunding(value?: api_proto_banking_funding_funding_pb.Funding): UpdateRequest;

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
        funding?: api_proto_banking_funding_funding_pb.Funding.AsObject,
    }
}

export class UpdateResponse extends jspb.Message { 

    hasFunding(): boolean;
    clearFunding(): void;
    getFunding(): api_proto_banking_funding_funding_pb.Funding | undefined;
    setFunding(value?: api_proto_banking_funding_funding_pb.Funding): UpdateResponse;

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
        funding?: api_proto_banking_funding_funding_pb.Funding.AsObject,
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
    clearFundingsList(): void;
    getFundingsList(): Array<api_proto_banking_funding_funding_pb.Funding>;
    setFundingsList(value: Array<api_proto_banking_funding_funding_pb.Funding>): ListResponse;
    addFundings(value?: api_proto_banking_funding_funding_pb.Funding, index?: number): api_proto_banking_funding_funding_pb.Funding;
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
        fundingsList: Array<api_proto_banking_funding_funding_pb.Funding.AsObject>,
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

    hasFunding(): boolean;
    clearFunding(): void;
    getFunding(): api_proto_banking_funding_funding_pb.Funding | undefined;
    setFunding(value?: api_proto_banking_funding_funding_pb.Funding): GetResponse;

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
        funding?: api_proto_banking_funding_funding_pb.Funding.AsObject,
    }
}

export class SettleRequest extends jspb.Message { 
    getFundingnumber(): string;
    setFundingnumber(value: string): SettleRequest;
    getReason(): string;
    setReason(value: string): SettleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SettleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SettleRequest): SettleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SettleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SettleRequest;
    static deserializeBinaryFromReader(message: SettleRequest, reader: jspb.BinaryReader): SettleRequest;
}

export namespace SettleRequest {
    export type AsObject = {
        fundingnumber: string,
        reason: string,
    }
}

export class SettleResponse extends jspb.Message { 

    hasFunding(): boolean;
    clearFunding(): void;
    getFunding(): api_proto_banking_funding_funding_pb.Funding | undefined;
    setFunding(value?: api_proto_banking_funding_funding_pb.Funding): SettleResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SettleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SettleResponse): SettleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SettleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SettleResponse;
    static deserializeBinaryFromReader(message: SettleResponse, reader: jspb.BinaryReader): SettleResponse;
}

export namespace SettleResponse {
    export type AsObject = {
        funding?: api_proto_banking_funding_funding_pb.Funding.AsObject,
    }
}
