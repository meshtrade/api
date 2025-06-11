import * as grpcWeb from 'grpc-web';

import * as api_proto_banking_funding_service_pb from '../../banking/funding/service_pb'; // proto import: "api/proto/banking/funding/service.proto"


export class ServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  create(
    request: api_proto_banking_funding_service_pb.CreateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_banking_funding_service_pb.CreateResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_banking_funding_service_pb.CreateResponse>;

  update(
    request: api_proto_banking_funding_service_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_banking_funding_service_pb.UpdateResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_banking_funding_service_pb.UpdateResponse>;

  list(
    request: api_proto_banking_funding_service_pb.ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_banking_funding_service_pb.ListResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_banking_funding_service_pb.ListResponse>;

  get(
    request: api_proto_banking_funding_service_pb.GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_banking_funding_service_pb.GetResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_banking_funding_service_pb.GetResponse>;

  settle(
    request: api_proto_banking_funding_service_pb.SettleRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_banking_funding_service_pb.SettleResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_banking_funding_service_pb.SettleResponse>;

}

export class ServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  create(
    request: api_proto_banking_funding_service_pb.CreateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_banking_funding_service_pb.CreateResponse>;

  update(
    request: api_proto_banking_funding_service_pb.UpdateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_banking_funding_service_pb.UpdateResponse>;

  list(
    request: api_proto_banking_funding_service_pb.ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_banking_funding_service_pb.ListResponse>;

  get(
    request: api_proto_banking_funding_service_pb.GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_banking_funding_service_pb.GetResponse>;

  settle(
    request: api_proto_banking_funding_service_pb.SettleRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_banking_funding_service_pb.SettleResponse>;

}

