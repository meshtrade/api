/**
 * @fileoverview gRPC-Web generated client stub for instrument
 * @enhanceable
 * @public
 */
import * as grpcWeb from 'grpc-web';
import * as instrument_service_pb from '../instrument/service_pb';
export declare class ServiceClient {
    client_: grpcWeb.AbstractClientBase;
    hostname_: string;
    credentials_: null | {
        [index: string]: string;
    };
    options_: null | {
        [index: string]: any;
    };
    constructor(hostname: string, credentials?: null | {
        [index: string]: string;
    }, options?: null | {
        [index: string]: any;
    });
    methodDescriptorMint: grpcWeb.MethodDescriptor<instrument_service_pb.MintRequest, instrument_service_pb.MintResponse>;
    mint(request: instrument_service_pb.MintRequest, metadata?: grpcWeb.Metadata | null): Promise<instrument_service_pb.MintResponse>;
    mint(request: instrument_service_pb.MintRequest, metadata: grpcWeb.Metadata | null, callback: (err: grpcWeb.RpcError, response: instrument_service_pb.MintResponse) => void): grpcWeb.ClientReadableStream<instrument_service_pb.MintResponse>;
    methodDescriptorBurn: grpcWeb.MethodDescriptor<instrument_service_pb.BurnRequest, instrument_service_pb.BurnResponse>;
    burn(request: instrument_service_pb.BurnRequest, metadata?: grpcWeb.Metadata | null): Promise<instrument_service_pb.BurnResponse>;
    burn(request: instrument_service_pb.BurnRequest, metadata: grpcWeb.Metadata | null, callback: (err: grpcWeb.RpcError, response: instrument_service_pb.BurnResponse) => void): grpcWeb.ClientReadableStream<instrument_service_pb.BurnResponse>;
}
