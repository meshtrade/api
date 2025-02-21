/**
 * @fileoverview gRPC-Web generated client stub for fee
 * @enhanceable
 * @public
 */
import * as grpcWeb from 'grpc-web';
import * as instrument_fee_service_pb from '../../instrument/fee/service_pb';
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
    methodDescriptorGet: grpcWeb.MethodDescriptor<instrument_fee_service_pb.GetRequest, instrument_fee_service_pb.GetResponse>;
    get(request: instrument_fee_service_pb.GetRequest, metadata?: grpcWeb.Metadata | null): Promise<instrument_fee_service_pb.GetResponse>;
    get(request: instrument_fee_service_pb.GetRequest, metadata: grpcWeb.Metadata | null, callback: (err: grpcWeb.RpcError, response: instrument_fee_service_pb.GetResponse) => void): grpcWeb.ClientReadableStream<instrument_fee_service_pb.GetResponse>;
    methodDescriptorList: grpcWeb.MethodDescriptor<instrument_fee_service_pb.ListRequest, instrument_fee_service_pb.ListResponse>;
    list(request: instrument_fee_service_pb.ListRequest, metadata?: grpcWeb.Metadata | null): Promise<instrument_fee_service_pb.ListResponse>;
    list(request: instrument_fee_service_pb.ListRequest, metadata: grpcWeb.Metadata | null, callback: (err: grpcWeb.RpcError, response: instrument_fee_service_pb.ListResponse) => void): grpcWeb.ClientReadableStream<instrument_fee_service_pb.ListResponse>;
    methodDescriptorCalculateMintingFees: grpcWeb.MethodDescriptor<instrument_fee_service_pb.CalculateMintingFeesRequest, instrument_fee_service_pb.CalculateMintingFeesResponse>;
    calculateMintingFees(request: instrument_fee_service_pb.CalculateMintingFeesRequest, metadata?: grpcWeb.Metadata | null): Promise<instrument_fee_service_pb.CalculateMintingFeesResponse>;
    calculateMintingFees(request: instrument_fee_service_pb.CalculateMintingFeesRequest, metadata: grpcWeb.Metadata | null, callback: (err: grpcWeb.RpcError, response: instrument_fee_service_pb.CalculateMintingFeesResponse) => void): grpcWeb.ClientReadableStream<instrument_fee_service_pb.CalculateMintingFeesResponse>;
    methodDescriptorCalculateBurnignFees: grpcWeb.MethodDescriptor<instrument_fee_service_pb.CalculateBurningFeesRequest, instrument_fee_service_pb.CalculateBurningFeesResponse>;
    calculateBurnignFees(request: instrument_fee_service_pb.CalculateBurningFeesRequest, metadata?: grpcWeb.Metadata | null): Promise<instrument_fee_service_pb.CalculateBurningFeesResponse>;
    calculateBurnignFees(request: instrument_fee_service_pb.CalculateBurningFeesRequest, metadata: grpcWeb.Metadata | null, callback: (err: grpcWeb.RpcError, response: instrument_fee_service_pb.CalculateBurningFeesResponse) => void): grpcWeb.ClientReadableStream<instrument_fee_service_pb.CalculateBurningFeesResponse>;
}
