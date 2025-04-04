/* eslint-disable */
// @ts-nocheck
// package: api.instrument.feeprofile
// file: api/proto/instrument/feeprofile/service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as api_proto_instrument_feeprofile_service_pb from "../../instrument/feeprofile/service_pb";
import * as api_proto_instrument_feeprofile_feeProfile_pb from "../../instrument/feeprofile/feeProfile_pb";
import * as api_proto_search_criterion_pb from "../../search/criterion_pb";
import * as api_proto_search_query_pb from "../../search/query_pb";

interface IServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    create: IServiceService_ICreate;
    update: IServiceService_IUpdate;
    list: IServiceService_IList;
    get: IServiceService_IGet;
}

interface IServiceService_ICreate extends grpc.MethodDefinition<api_proto_instrument_feeprofile_service_pb.CreateRequest, api_proto_instrument_feeprofile_service_pb.CreateResponse> {
    path: "/api.instrument.feeprofile.Service/Create";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_feeprofile_service_pb.CreateRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_feeprofile_service_pb.CreateRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_feeprofile_service_pb.CreateResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_feeprofile_service_pb.CreateResponse>;
}
interface IServiceService_IUpdate extends grpc.MethodDefinition<api_proto_instrument_feeprofile_service_pb.UpdateRequest, api_proto_instrument_feeprofile_service_pb.UpdateResponse> {
    path: "/api.instrument.feeprofile.Service/Update";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_feeprofile_service_pb.UpdateRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_feeprofile_service_pb.UpdateRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_feeprofile_service_pb.UpdateResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_feeprofile_service_pb.UpdateResponse>;
}
interface IServiceService_IList extends grpc.MethodDefinition<api_proto_instrument_feeprofile_service_pb.ListRequest, api_proto_instrument_feeprofile_service_pb.ListResponse> {
    path: "/api.instrument.feeprofile.Service/List";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_feeprofile_service_pb.ListRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_feeprofile_service_pb.ListRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_feeprofile_service_pb.ListResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_feeprofile_service_pb.ListResponse>;
}
interface IServiceService_IGet extends grpc.MethodDefinition<api_proto_instrument_feeprofile_service_pb.GetRequest, api_proto_instrument_feeprofile_service_pb.GetResponse> {
    path: "/api.instrument.feeprofile.Service/Get";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_feeprofile_service_pb.GetRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_feeprofile_service_pb.GetRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_feeprofile_service_pb.GetResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_feeprofile_service_pb.GetResponse>;
}

export const ServiceService: IServiceService;

export interface IServiceServer extends grpc.UntypedServiceImplementation {
    create: grpc.handleUnaryCall<api_proto_instrument_feeprofile_service_pb.CreateRequest, api_proto_instrument_feeprofile_service_pb.CreateResponse>;
    update: grpc.handleUnaryCall<api_proto_instrument_feeprofile_service_pb.UpdateRequest, api_proto_instrument_feeprofile_service_pb.UpdateResponse>;
    list: grpc.handleUnaryCall<api_proto_instrument_feeprofile_service_pb.ListRequest, api_proto_instrument_feeprofile_service_pb.ListResponse>;
    get: grpc.handleUnaryCall<api_proto_instrument_feeprofile_service_pb.GetRequest, api_proto_instrument_feeprofile_service_pb.GetResponse>;
}

export interface IServiceClient {
    create(request: api_proto_instrument_feeprofile_service_pb.CreateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    create(request: api_proto_instrument_feeprofile_service_pb.CreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    create(request: api_proto_instrument_feeprofile_service_pb.CreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    update(request: api_proto_instrument_feeprofile_service_pb.UpdateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    update(request: api_proto_instrument_feeprofile_service_pb.UpdateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    update(request: api_proto_instrument_feeprofile_service_pb.UpdateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    list(request: api_proto_instrument_feeprofile_service_pb.ListRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    list(request: api_proto_instrument_feeprofile_service_pb.ListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    list(request: api_proto_instrument_feeprofile_service_pb.ListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    get(request: api_proto_instrument_feeprofile_service_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    get(request: api_proto_instrument_feeprofile_service_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    get(request: api_proto_instrument_feeprofile_service_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
}

export class ServiceClient extends grpc.Client implements IServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public create(request: api_proto_instrument_feeprofile_service_pb.CreateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public create(request: api_proto_instrument_feeprofile_service_pb.CreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public create(request: api_proto_instrument_feeprofile_service_pb.CreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public update(request: api_proto_instrument_feeprofile_service_pb.UpdateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    public update(request: api_proto_instrument_feeprofile_service_pb.UpdateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    public update(request: api_proto_instrument_feeprofile_service_pb.UpdateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    public list(request: api_proto_instrument_feeprofile_service_pb.ListRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    public list(request: api_proto_instrument_feeprofile_service_pb.ListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    public list(request: api_proto_instrument_feeprofile_service_pb.ListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    public get(request: api_proto_instrument_feeprofile_service_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    public get(request: api_proto_instrument_feeprofile_service_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    public get(request: api_proto_instrument_feeprofile_service_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_feeprofile_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
}
