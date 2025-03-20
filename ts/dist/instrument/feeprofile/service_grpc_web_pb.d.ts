/* eslint-disable */
// @ts-nocheck
import * as grpcWeb from 'grpc-web';

import * as api_proto_instrument_feeprofile_service_pb from '../../instrument/feeprofile/service_pb'; // proto import: "api/proto/instrument/feeprofile/service.proto"


export class ServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  create(
    request: api_proto_instrument_feeprofile_service_pb.CreateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_feeprofile_service_pb.CreateResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_feeprofile_service_pb.CreateResponse>;

  update(
    request: api_proto_instrument_feeprofile_service_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_feeprofile_service_pb.UpdateResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_feeprofile_service_pb.UpdateResponse>;

  list(
    request: api_proto_instrument_feeprofile_service_pb.ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_feeprofile_service_pb.ListResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_feeprofile_service_pb.ListResponse>;

  get(
    request: api_proto_instrument_feeprofile_service_pb.GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_instrument_feeprofile_service_pb.GetResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_instrument_feeprofile_service_pb.GetResponse>;

}

export class ServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  create(
    request: api_proto_instrument_feeprofile_service_pb.CreateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_feeprofile_service_pb.CreateResponse>;

  update(
    request: api_proto_instrument_feeprofile_service_pb.UpdateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_feeprofile_service_pb.UpdateResponse>;

  list(
    request: api_proto_instrument_feeprofile_service_pb.ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_feeprofile_service_pb.ListResponse>;

  get(
    request: api_proto_instrument_feeprofile_service_pb.GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_instrument_feeprofile_service_pb.GetResponse>;

}

