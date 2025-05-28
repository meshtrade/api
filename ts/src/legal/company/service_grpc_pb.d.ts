// package: api.legal.company
// file: api/proto/legal/company/service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as api_proto_legal_company_service_pb from "../../legal/company/service_pb";
import * as api_proto_search_criterion_pb from "../../search/criterion_pb";
import * as api_proto_search_query_pb from "../../search/query_pb";
import * as api_proto_legal_company_company_pb from "../../legal/company/company_pb";

interface IServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    list: IServiceService_IList;
}

interface IServiceService_IList extends grpc.MethodDefinition<api_proto_legal_company_service_pb.ListRequest, api_proto_legal_company_service_pb.ListResponse> {
    path: "/api.legal.company.Service/List";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_legal_company_service_pb.ListRequest>;
    requestDeserialize: grpc.deserialize<api_proto_legal_company_service_pb.ListRequest>;
    responseSerialize: grpc.serialize<api_proto_legal_company_service_pb.ListResponse>;
    responseDeserialize: grpc.deserialize<api_proto_legal_company_service_pb.ListResponse>;
}

export const ServiceService: IServiceService;

export interface IServiceServer extends grpc.UntypedServiceImplementation {
    list: grpc.handleUnaryCall<api_proto_legal_company_service_pb.ListRequest, api_proto_legal_company_service_pb.ListResponse>;
}

export interface IServiceClient {
    list(request: api_proto_legal_company_service_pb.ListRequest, callback: (error: grpc.ServiceError | null, response: api_proto_legal_company_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    list(request: api_proto_legal_company_service_pb.ListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_legal_company_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    list(request: api_proto_legal_company_service_pb.ListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_legal_company_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
}

export class ServiceClient extends grpc.Client implements IServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public list(request: api_proto_legal_company_service_pb.ListRequest, callback: (error: grpc.ServiceError | null, response: api_proto_legal_company_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    public list(request: api_proto_legal_company_service_pb.ListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_legal_company_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    public list(request: api_proto_legal_company_service_pb.ListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_legal_company_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
}
