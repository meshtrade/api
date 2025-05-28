import * as grpcWeb from 'grpc-web';

import * as api_proto_auth_service_pb from '../auth/service_pb'; // proto import: "api/proto/auth/service.proto"


export class ServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  loginWithFirebaseToken(
    request: api_proto_auth_service_pb.LoginWithFirebaseTokenRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_auth_service_pb.LoginWithFirebaseTokenResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_auth_service_pb.LoginWithFirebaseTokenResponse>;

}

export class ServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  loginWithFirebaseToken(
    request: api_proto_auth_service_pb.LoginWithFirebaseTokenRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_auth_service_pb.LoginWithFirebaseTokenResponse>;

}

