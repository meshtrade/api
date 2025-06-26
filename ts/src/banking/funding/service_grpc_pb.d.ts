// package: api.banking.funding
// file: api/proto/banking/funding/service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as api_proto_banking_funding_service_pb from "../../banking/funding/service_pb";
import * as api_proto_banking_funding_funding_pb from "../../banking/funding/funding_pb";
import * as api_proto_search_criterion_pb from "../../search/criterion_pb";
import * as api_proto_search_query_pb from "../../search/query_pb";
import * as google_protobuf_field_mask_pb from "google-protobuf/google/protobuf/field_mask_pb";

interface IServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    create: IServiceService_ICreate;
    update: IServiceService_IUpdate;
    list: IServiceService_IList;
    get: IServiceService_IGet;
    settle: IServiceService_ISettle;
    cancel: IServiceService_ICancel;
    resolveState: IServiceService_IResolveState;
}

interface IServiceService_ICreate extends grpc.MethodDefinition<api_proto_banking_funding_service_pb.CreateRequest, api_proto_banking_funding_service_pb.CreateResponse> {
    path: "/api.banking.funding.Service/Create";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_banking_funding_service_pb.CreateRequest>;
    requestDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.CreateRequest>;
    responseSerialize: grpc.serialize<api_proto_banking_funding_service_pb.CreateResponse>;
    responseDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.CreateResponse>;
}
interface IServiceService_IUpdate extends grpc.MethodDefinition<api_proto_banking_funding_service_pb.UpdateRequest, api_proto_banking_funding_service_pb.UpdateResponse> {
    path: "/api.banking.funding.Service/Update";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_banking_funding_service_pb.UpdateRequest>;
    requestDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.UpdateRequest>;
    responseSerialize: grpc.serialize<api_proto_banking_funding_service_pb.UpdateResponse>;
    responseDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.UpdateResponse>;
}
interface IServiceService_IList extends grpc.MethodDefinition<api_proto_banking_funding_service_pb.ListRequest, api_proto_banking_funding_service_pb.ListResponse> {
    path: "/api.banking.funding.Service/List";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_banking_funding_service_pb.ListRequest>;
    requestDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.ListRequest>;
    responseSerialize: grpc.serialize<api_proto_banking_funding_service_pb.ListResponse>;
    responseDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.ListResponse>;
}
interface IServiceService_IGet extends grpc.MethodDefinition<api_proto_banking_funding_service_pb.GetRequest, api_proto_banking_funding_service_pb.GetResponse> {
    path: "/api.banking.funding.Service/Get";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_banking_funding_service_pb.GetRequest>;
    requestDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.GetRequest>;
    responseSerialize: grpc.serialize<api_proto_banking_funding_service_pb.GetResponse>;
    responseDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.GetResponse>;
}
interface IServiceService_ISettle extends grpc.MethodDefinition<api_proto_banking_funding_service_pb.SettleRequest, api_proto_banking_funding_service_pb.SettleResponse> {
    path: "/api.banking.funding.Service/Settle";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_banking_funding_service_pb.SettleRequest>;
    requestDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.SettleRequest>;
    responseSerialize: grpc.serialize<api_proto_banking_funding_service_pb.SettleResponse>;
    responseDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.SettleResponse>;
}
interface IServiceService_ICancel extends grpc.MethodDefinition<api_proto_banking_funding_service_pb.CancelRequest, api_proto_banking_funding_service_pb.CancelResponse> {
    path: "/api.banking.funding.Service/Cancel";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_banking_funding_service_pb.CancelRequest>;
    requestDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.CancelRequest>;
    responseSerialize: grpc.serialize<api_proto_banking_funding_service_pb.CancelResponse>;
    responseDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.CancelResponse>;
}
interface IServiceService_IResolveState extends grpc.MethodDefinition<api_proto_banking_funding_service_pb.ResolveStateRequest, api_proto_banking_funding_service_pb.ResolveStateResponse> {
    path: "/api.banking.funding.Service/ResolveState";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_banking_funding_service_pb.ResolveStateRequest>;
    requestDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.ResolveStateRequest>;
    responseSerialize: grpc.serialize<api_proto_banking_funding_service_pb.ResolveStateResponse>;
    responseDeserialize: grpc.deserialize<api_proto_banking_funding_service_pb.ResolveStateResponse>;
}

export const ServiceService: IServiceService;

export interface IServiceServer extends grpc.UntypedServiceImplementation {
    create: grpc.handleUnaryCall<api_proto_banking_funding_service_pb.CreateRequest, api_proto_banking_funding_service_pb.CreateResponse>;
    update: grpc.handleUnaryCall<api_proto_banking_funding_service_pb.UpdateRequest, api_proto_banking_funding_service_pb.UpdateResponse>;
    list: grpc.handleUnaryCall<api_proto_banking_funding_service_pb.ListRequest, api_proto_banking_funding_service_pb.ListResponse>;
    get: grpc.handleUnaryCall<api_proto_banking_funding_service_pb.GetRequest, api_proto_banking_funding_service_pb.GetResponse>;
    settle: grpc.handleUnaryCall<api_proto_banking_funding_service_pb.SettleRequest, api_proto_banking_funding_service_pb.SettleResponse>;
    cancel: grpc.handleUnaryCall<api_proto_banking_funding_service_pb.CancelRequest, api_proto_banking_funding_service_pb.CancelResponse>;
    resolveState: grpc.handleUnaryCall<api_proto_banking_funding_service_pb.ResolveStateRequest, api_proto_banking_funding_service_pb.ResolveStateResponse>;
}

export interface IServiceClient {
    create(request: api_proto_banking_funding_service_pb.CreateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    create(request: api_proto_banking_funding_service_pb.CreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    create(request: api_proto_banking_funding_service_pb.CreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    update(request: api_proto_banking_funding_service_pb.UpdateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    update(request: api_proto_banking_funding_service_pb.UpdateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    update(request: api_proto_banking_funding_service_pb.UpdateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    list(request: api_proto_banking_funding_service_pb.ListRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    list(request: api_proto_banking_funding_service_pb.ListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    list(request: api_proto_banking_funding_service_pb.ListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    get(request: api_proto_banking_funding_service_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    get(request: api_proto_banking_funding_service_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    get(request: api_proto_banking_funding_service_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    settle(request: api_proto_banking_funding_service_pb.SettleRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.SettleResponse) => void): grpc.ClientUnaryCall;
    settle(request: api_proto_banking_funding_service_pb.SettleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.SettleResponse) => void): grpc.ClientUnaryCall;
    settle(request: api_proto_banking_funding_service_pb.SettleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.SettleResponse) => void): grpc.ClientUnaryCall;
    cancel(request: api_proto_banking_funding_service_pb.CancelRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CancelResponse) => void): grpc.ClientUnaryCall;
    cancel(request: api_proto_banking_funding_service_pb.CancelRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CancelResponse) => void): grpc.ClientUnaryCall;
    cancel(request: api_proto_banking_funding_service_pb.CancelRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CancelResponse) => void): grpc.ClientUnaryCall;
    resolveState(request: api_proto_banking_funding_service_pb.ResolveStateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ResolveStateResponse) => void): grpc.ClientUnaryCall;
    resolveState(request: api_proto_banking_funding_service_pb.ResolveStateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ResolveStateResponse) => void): grpc.ClientUnaryCall;
    resolveState(request: api_proto_banking_funding_service_pb.ResolveStateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ResolveStateResponse) => void): grpc.ClientUnaryCall;
}

export class ServiceClient extends grpc.Client implements IServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public create(request: api_proto_banking_funding_service_pb.CreateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public create(request: api_proto_banking_funding_service_pb.CreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public create(request: api_proto_banking_funding_service_pb.CreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CreateResponse) => void): grpc.ClientUnaryCall;
    public update(request: api_proto_banking_funding_service_pb.UpdateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    public update(request: api_proto_banking_funding_service_pb.UpdateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    public update(request: api_proto_banking_funding_service_pb.UpdateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.UpdateResponse) => void): grpc.ClientUnaryCall;
    public list(request: api_proto_banking_funding_service_pb.ListRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    public list(request: api_proto_banking_funding_service_pb.ListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    public list(request: api_proto_banking_funding_service_pb.ListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    public get(request: api_proto_banking_funding_service_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    public get(request: api_proto_banking_funding_service_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    public get(request: api_proto_banking_funding_service_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    public settle(request: api_proto_banking_funding_service_pb.SettleRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.SettleResponse) => void): grpc.ClientUnaryCall;
    public settle(request: api_proto_banking_funding_service_pb.SettleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.SettleResponse) => void): grpc.ClientUnaryCall;
    public settle(request: api_proto_banking_funding_service_pb.SettleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.SettleResponse) => void): grpc.ClientUnaryCall;
    public cancel(request: api_proto_banking_funding_service_pb.CancelRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CancelResponse) => void): grpc.ClientUnaryCall;
    public cancel(request: api_proto_banking_funding_service_pb.CancelRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CancelResponse) => void): grpc.ClientUnaryCall;
    public cancel(request: api_proto_banking_funding_service_pb.CancelRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.CancelResponse) => void): grpc.ClientUnaryCall;
    public resolveState(request: api_proto_banking_funding_service_pb.ResolveStateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ResolveStateResponse) => void): grpc.ClientUnaryCall;
    public resolveState(request: api_proto_banking_funding_service_pb.ResolveStateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ResolveStateResponse) => void): grpc.ClientUnaryCall;
    public resolveState(request: api_proto_banking_funding_service_pb.ResolveStateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_banking_funding_service_pb.ResolveStateResponse) => void): grpc.ClientUnaryCall;
}
