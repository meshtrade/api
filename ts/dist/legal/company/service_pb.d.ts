/* eslint-disable */
// @ts-nocheck
// package: api.legal.company
// file: api/proto/legal/company/service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_search_criterion_pb from "../../search/criterion_pb";
import * as api_proto_search_query_pb from "../../search/query_pb";
import * as api_proto_legal_company_company_pb from "../../legal/company/company_pb";

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
    clearCompaniesList(): void;
    getCompaniesList(): Array<api_proto_legal_company_company_pb.Company>;
    setCompaniesList(value: Array<api_proto_legal_company_company_pb.Company>): ListResponse;
    addCompanies(value?: api_proto_legal_company_company_pb.Company, index?: number): api_proto_legal_company_company_pb.Company;
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
        companiesList: Array<api_proto_legal_company_company_pb.Company.AsObject>,
        total: number,
    }
}
