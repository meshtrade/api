/* eslint-disable */
// @ts-nocheck
// package: api.auth
// file: api/proto/auth/service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as api_proto_auth_service_pb from "../auth/service_pb";

interface IServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    loginWithFirebaseToken: IServiceService_ILoginWithFirebaseToken;
}

interface IServiceService_ILoginWithFirebaseToken extends grpc.MethodDefinition<api_proto_auth_service_pb.LoginWithFirebaseTokenRequest, api_proto_auth_service_pb.LoginWithFirebaseTokenResponse> {
    path: "/api.auth.Service/LoginWithFirebaseToken";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_proto_auth_service_pb.LoginWithFirebaseTokenRequest>;
    requestDeserialize: grpc.deserialize<api_proto_auth_service_pb.LoginWithFirebaseTokenRequest>;
    responseSerialize: grpc.serialize<api_proto_auth_service_pb.LoginWithFirebaseTokenResponse>;
    responseDeserialize: grpc.deserialize<api_proto_auth_service_pb.LoginWithFirebaseTokenResponse>;
}

export const ServiceService: IServiceService;

export interface IServiceServer extends grpc.UntypedServiceImplementation {
    loginWithFirebaseToken: grpc.handleUnaryCall<api_proto_auth_service_pb.LoginWithFirebaseTokenRequest, api_proto_auth_service_pb.LoginWithFirebaseTokenResponse>;
}

export interface IServiceClient {
    loginWithFirebaseToken(request: api_proto_auth_service_pb.LoginWithFirebaseTokenRequest, callback: (error: grpc.ServiceError | null, response: api_proto_auth_service_pb.LoginWithFirebaseTokenResponse) => void): grpc.ClientUnaryCall;
    loginWithFirebaseToken(request: api_proto_auth_service_pb.LoginWithFirebaseTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_auth_service_pb.LoginWithFirebaseTokenResponse) => void): grpc.ClientUnaryCall;
    loginWithFirebaseToken(request: api_proto_auth_service_pb.LoginWithFirebaseTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_auth_service_pb.LoginWithFirebaseTokenResponse) => void): grpc.ClientUnaryCall;
}

export class ServiceClient extends grpc.Client implements IServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public loginWithFirebaseToken(request: api_proto_auth_service_pb.LoginWithFirebaseTokenRequest, callback: (error: grpc.ServiceError | null, response: api_proto_auth_service_pb.LoginWithFirebaseTokenResponse) => void): grpc.ClientUnaryCall;
    public loginWithFirebaseToken(request: api_proto_auth_service_pb.LoginWithFirebaseTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_proto_auth_service_pb.LoginWithFirebaseTokenResponse) => void): grpc.ClientUnaryCall;
    public loginWithFirebaseToken(request: api_proto_auth_service_pb.LoginWithFirebaseTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_proto_auth_service_pb.LoginWithFirebaseTokenResponse) => void): grpc.ClientUnaryCall;
}
