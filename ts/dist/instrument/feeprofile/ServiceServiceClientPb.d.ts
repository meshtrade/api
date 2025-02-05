/**
 * @fileoverview gRPC-Web generated client stub for feeprofile
 * @enhanceable
 * @public
 */
import * as grpcWeb from 'grpc-web';
import * as instrument_feeprofile_service_pb from '../../instrument/feeprofile/service_pb';
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
    methodDescriptorCreate: grpcWeb.MethodDescriptor<instrument_feeprofile_service_pb.CreateRequest, instrument_feeprofile_service_pb.CreateResponse>;
    create(request: instrument_feeprofile_service_pb.CreateRequest, metadata?: grpcWeb.Metadata | null): Promise<instrument_feeprofile_service_pb.CreateResponse>;
    create(request: instrument_feeprofile_service_pb.CreateRequest, metadata: grpcWeb.Metadata | null, callback: (err: grpcWeb.RpcError, response: instrument_feeprofile_service_pb.CreateResponse) => void): grpcWeb.ClientReadableStream<instrument_feeprofile_service_pb.CreateResponse>;
    methodDescriptorUpdate: grpcWeb.MethodDescriptor<instrument_feeprofile_service_pb.UpdateRequest, instrument_feeprofile_service_pb.UpdateResponse>;
    update(request: instrument_feeprofile_service_pb.UpdateRequest, metadata?: grpcWeb.Metadata | null): Promise<instrument_feeprofile_service_pb.UpdateResponse>;
    update(request: instrument_feeprofile_service_pb.UpdateRequest, metadata: grpcWeb.Metadata | null, callback: (err: grpcWeb.RpcError, response: instrument_feeprofile_service_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<instrument_feeprofile_service_pb.UpdateResponse>;
    methodDescriptorList: grpcWeb.MethodDescriptor<instrument_feeprofile_service_pb.ListRequest, instrument_feeprofile_service_pb.ListResponse>;
    list(request: instrument_feeprofile_service_pb.ListRequest, metadata?: grpcWeb.Metadata | null): Promise<instrument_feeprofile_service_pb.ListResponse>;
    list(request: instrument_feeprofile_service_pb.ListRequest, metadata: grpcWeb.Metadata | null, callback: (err: grpcWeb.RpcError, response: instrument_feeprofile_service_pb.ListResponse) => void): grpcWeb.ClientReadableStream<instrument_feeprofile_service_pb.ListResponse>;
}
