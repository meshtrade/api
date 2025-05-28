import * as grpcWeb from 'grpc-web';

import * as api_proto_legal_company_service_pb from '../../legal/company/service_pb'; // proto import: "api/proto/legal/company/service.proto"


export class ServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  list(
    request: api_proto_legal_company_service_pb.ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_proto_legal_company_service_pb.ListResponse) => void
  ): grpcWeb.ClientReadableStream<api_proto_legal_company_service_pb.ListResponse>;

}

export class ServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  list(
    request: api_proto_legal_company_service_pb.ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_proto_legal_company_service_pb.ListResponse>;

}

