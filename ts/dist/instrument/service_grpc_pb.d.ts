/* eslint-disable */
// @ts-nocheck
// package: api.instrument
// file: api/proto/instrument/service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as api_proto_instrument_service_pb from "../instrument/service_pb";
import * as api_proto_ledger_amount_pb from "../ledger/amount_pb";

interface IServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    mint: IServiceService_IMint;
    burn: IServiceService_IBurn;
}

interface IServiceService_IMint extends grpc.MethodDefinition<api_proto_instrument_service_pb.MintRequest, api_proto_instrument_service_pb.MintResponse> {
    path: "/api.instrument.Service/Mint";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_service_pb.MintRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_service_pb.MintRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_service_pb.MintResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_service_pb.MintResponse>;
}
interface IServiceService_IBurn extends grpc.MethodDefinition<api_proto_instrument_service_pb.BurnRequest, api_proto_instrument_service_pb.BurnResponse> {
    path: "/api.instrument.Service/Burn";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_instrument_service_pb.BurnRequest>;
    requestDeserialize: grpc.deserialize<api_proto_instrument_service_pb.BurnRequest>;
    responseSerialize: grpc.serialize<api_proto_instrument_service_pb.BurnResponse>;
    responseDeserialize: grpc.deserialize<api_proto_instrument_service_pb.BurnResponse>;
}

export const ServiceService: IServiceService;

export interface IServiceServer extends grpc.UntypedServiceImplementation {
    mint: grpc.handleUnaryCall<api_proto_instrument_service_pb.MintRequest, api_proto_instrument_service_pb.MintResponse>;
    burn: grpc.handleUnaryCall<api_proto_instrument_service_pb.BurnRequest, api_proto_instrument_service_pb.BurnResponse>;
}

export interface IServiceClient {
    mint(request: api_proto_instrument_service_pb.MintRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.MintResponse) => void): grpc.ClientUnaryCall;
    mint(request: api_proto_instrument_service_pb.MintRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.MintResponse) => void): grpc.ClientUnaryCall;
    mint(request: api_proto_instrument_service_pb.MintRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.MintResponse) => void): grpc.ClientUnaryCall;
    burn(request: api_proto_instrument_service_pb.BurnRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.BurnResponse) => void): grpc.ClientUnaryCall;
    burn(request: api_proto_instrument_service_pb.BurnRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.BurnResponse) => void): grpc.ClientUnaryCall;
    burn(request: api_proto_instrument_service_pb.BurnRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.BurnResponse) => void): grpc.ClientUnaryCall;
}

export class ServiceClient extends grpc.Client implements IServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public mint(request: api_proto_instrument_service_pb.MintRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.MintResponse) => void): grpc.ClientUnaryCall;
    public mint(request: api_proto_instrument_service_pb.MintRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.MintResponse) => void): grpc.ClientUnaryCall;
    public mint(request: api_proto_instrument_service_pb.MintRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.MintResponse) => void): grpc.ClientUnaryCall;
    public burn(request: api_proto_instrument_service_pb.BurnRequest, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.BurnResponse) => void): grpc.ClientUnaryCall;
    public burn(request: api_proto_instrument_service_pb.BurnRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.BurnResponse) => void): grpc.ClientUnaryCall;
    public burn(request: api_proto_instrument_service_pb.BurnRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_instrument_service_pb.BurnResponse) => void): grpc.ClientUnaryCall;
}
