import * as grpcWeb from 'grpc-web';

import * as api_proto_instrument_fee_service_pb from '../../instrument/fee/service_pb'; // proto import: "api/proto/instrument/fee/service.proto"


export class ServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  get(
    request: api_proto_instrument_fee_service_pb.GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_fee_service_pb.GetResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_fee_service_pb.GetResponse>;

  list(
    request: api_proto_instrument_fee_service_pb.ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_fee_service_pb.ListResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_fee_service_pb.ListResponse>;

  calculateMintingFees(
    request: api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse>;

  calculateBurningFees(
    request: api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse>;

  calculateLifecycleFees(
    request: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse>;

  fullUpdate(
    request: api_proto_instrument_fee_service_pb.FullUpdateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_fee_service_pb.FullUpdateResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_fee_service_pb.FullUpdateResponse>;

}

export class ServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  get(
    request: api_proto_instrument_fee_service_pb.GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_fee_service_pb.GetResponse>;

  list(
    request: api_proto_instrument_fee_service_pb.ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_fee_service_pb.ListResponse>;

  calculateMintingFees(
    request: api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse>;

  calculateBurningFees(
    request: api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse>;

  calculateLifecycleFees(
    request: api_proto_instrument_fee_service_pb.CalculateLifecycleFeesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_fee_service_pb.CalculateLifecycleFeesResponse>;

  fullUpdate(
    request: api_proto_instrument_fee_service_pb.FullUpdateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_fee_service_pb.FullUpdateResponse>;

}

