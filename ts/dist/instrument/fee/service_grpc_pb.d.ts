/* eslint-disable */
// @ts-nocheck
// package: api.instrument.fee
// file: api/proto/instrument/fee/service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as api_proto_instrument_fee_service_pb from "../../instrument/fee/service_pb";
import * as api_proto_instrument_fee_fee_pb from "../../instrument/fee/fee_pb";
import * as api_proto_ledger_amount_pb from "../../ledger/amount_pb";
import * as api_proto_search_criterion_pb from "../../search/criterion_pb";
import * as api_proto_search_query_pb from "../../search/query_pb";
import * as api_proto_instrument_feeprofile_lifecycleEventCategory_pb from "../../instrument/feeprofile/lifecycleEventCategory_pb";

interface IServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    get: IServiceService_IGet;
    list: IServiceService_IList;
    calculateMintingFees: IServiceService_ICalculateMintingFees;
    calculateBurningFees: IServiceService_ICalculateBurningFees;
    calculateLifecycleFees: IServiceService_ICalculateLifecycleFees;
    fullUpdate: IServiceService_IFullUpdate;
}

interface IServiceService_IGet extends grpc.MethodDefinition<api_proto_instrument_fee_service_pb.GetRequest, api_proto_instrument_fee_service_pb.GetResponse> {
    path: "/api.instrument.fee.Service/Get";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.GetRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.GetRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.GetResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.GetResponse>;
}
interface IServiceService_IList extends grpc.MethodDefinition<api_proto_instrument_fee_service_pb.ListRequest, api_proto_instrument_fee_service_pb.ListResponse> {
    path: "/api.instrument.fee.Service/List";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.ListRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.ListRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.ListResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.ListResponse>;
}
interface IServiceService_ICalculateMintingFees extends grpc.MethodDefinition<api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest, api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse> {
    path: "/api.instrument.fee.Service/CalculateMintingFees";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse>;
}
interface IServiceService_ICalculateBurningFees extends grpc.MethodDefinition<api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest, api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse> {
    path: "/api.instrument.fee.Service/CalculateBurningFees";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse>;
}
interface IServiceService_ICalculateLifecycleFees extends grpc.MethodDefinition<api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest, api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse> {
    path: "/api.instrument.fee.Service/CalculateLifecycleFees";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse>;
}
interface IServiceService_IFullUpdate extends grpc.MethodDefinition<api_proto_instrument_fee_service_pb.FullUpdateRequest, api_proto_instrument_fee_service_pb.FullUpdateResponse> {
    path: "/api.instrument.fee.Service/FullUpdate";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.FullUpdateRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.FullUpdateRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_fee_service_pb.FullUpdateResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_fee_service_pb.FullUpdateResponse>;
}

export const ServiceService: IServiceService;

export interface IServiceServer extends grpc.UntypedServiceImplementation {
    get: grpc.handleUnaryCall<api_proto_instrument_fee_service_pb.GetRequest, api_proto_instrument_fee_service_pb.GetResponse>;
    list: grpc.handleUnaryCall<api_proto_instrument_fee_service_pb.ListRequest, api_proto_instrument_fee_service_pb.ListResponse>;
    calculateMintingFees: grpc.handleUnaryCall<api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest, api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse>;
    calculateBurningFees: grpc.handleUnaryCall<api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest, api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse>;
    calculateLifecycleFees: grpc.handleUnaryCall<api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest, api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse>;
    fullUpdate: grpc.handleUnaryCall<api_proto_instrument_fee_service_pb.FullUpdateRequest, api_proto_instrument_fee_service_pb.FullUpdateResponse>;
}

export interface IServiceClient {
    get(request: api_proto_instrument_fee_service_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    get(request: api_proto_instrument_fee_service_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    get(request: api_proto_instrument_fee_service_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    list(request: api_proto_instrument_fee_service_pb.ListRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    list(request: api_proto_instrument_fee_service_pb.ListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    list(request: api_proto_instrument_fee_service_pb.ListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    calculateMintingFees(request: api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse) => void): grpc.ClientUnaryCall;
    calculateMintingFees(request: api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse) => void): grpc.ClientUnaryCall;
    calculateMintingFees(request: api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse) => void): grpc.ClientUnaryCall;
    calculateBurningFees(request: api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse) => void): grpc.ClientUnaryCall;
    calculateBurningFees(request: api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse) => void): grpc.ClientUnaryCall;
    calculateBurningFees(request: api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse) => void): grpc.ClientUnaryCall;
    calculateLifecycleFees(request: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse) => void): grpc.ClientUnaryCall;
    calculateLifecycleFees(request: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse) => void): grpc.ClientUnaryCall;
    calculateLifecycleFees(request: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse) => void): grpc.ClientUnaryCall;
    fullUpdate(request: api_proto_instrument_fee_service_pb.FullUpdateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.FullUpdateResponse) => void): grpc.ClientUnaryCall;
    fullUpdate(request: api_proto_instrument_fee_service_pb.FullUpdateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.FullUpdateResponse) => void): grpc.ClientUnaryCall;
    fullUpdate(request: api_proto_instrument_fee_service_pb.FullUpdateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.FullUpdateResponse) => void): grpc.ClientUnaryCall;
}

export class ServiceClient extends grpc.Client implements IServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public get(request: api_proto_instrument_fee_service_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    public get(request: api_proto_instrument_fee_service_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    public get(request: api_proto_instrument_fee_service_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.GetResponse) => void): grpc.ClientUnaryCall;
    public list(request: api_proto_instrument_fee_service_pb.ListRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    public list(request: api_proto_instrument_fee_service_pb.ListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    public list(request: api_proto_instrument_fee_service_pb.ListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.ListResponse) => void): grpc.ClientUnaryCall;
    public calculateMintingFees(request: api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse) => void): grpc.ClientUnaryCall;
    public calculateMintingFees(request: api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse) => void): grpc.ClientUnaryCall;
    public calculateMintingFees(request: api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse) => void): grpc.ClientUnaryCall;
    public calculateBurningFees(request: api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse) => void): grpc.ClientUnaryCall;
    public calculateBurningFees(request: api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse) => void): grpc.ClientUnaryCall;
    public calculateBurningFees(request: api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse) => void): grpc.ClientUnaryCall;
    public calculateLifecycleFees(request: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse) => void): grpc.ClientUnaryCall;
    public calculateLifecycleFees(request: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse) => void): grpc.ClientUnaryCall;
    public calculateLifecycleFees(request: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse) => void): grpc.ClientUnaryCall;
    public fullUpdate(request: api_proto_instrument_fee_service_pb.FullUpdateRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.FullUpdateResponse) => void): grpc.ClientUnaryCall;
    public fullUpdate(request: api_proto_instrument_fee_service_pb.FullUpdateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.FullUpdateResponse) => void): grpc.ClientUnaryCall;
    public fullUpdate(request: api_proto_instrument_fee_service_pb.FullUpdateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_fee_service_pb.FullUpdateResponse) => void): grpc.ClientUnaryCall;
}
