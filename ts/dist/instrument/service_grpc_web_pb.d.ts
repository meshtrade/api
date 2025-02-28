import * as grpcWeb from 'grpc-web';

import * as api_proto_instrument_service_pb from '../instrument/service_pb'; // proto import: "api/proto/instrument/service.proto"


export class ServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  mint(
    request: api_proto_instrument_service_pb.MintRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_service_pb.MintResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_service_pb.MintResponse>;

  burn(
    request: api_proto_instrument_service_pb.BurnRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_service_pb.BurnResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_service_pb.BurnResponse>;

}

export class ServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  mint(
    request: api_proto_instrument_service_pb.MintRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_service_pb.MintResponse>;

  burn(
    request: api_proto_instrument_service_pb.BurnRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_service_pb.BurnResponse>;

}

