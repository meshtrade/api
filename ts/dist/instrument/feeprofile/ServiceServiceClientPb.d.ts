/**
 * @fileoverview gRPC-Web generated client stub for feeprofile
 * @enhanceable
 * @public
 */
import * as grpcWeb from 'grpc-web';
import * as instrument_feeprofile_service_pb from '../../instrument/feeprofile/service_pb';
import * as instrument_feeprofile_feeProfile_pb from '../../instrument/feeprofile/feeProfile_pb';
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
    methodDescriptorCreate: grpcWeb.MethodDescriptor<instrument_feeprofile_service_pb.CreateRequest, instrument_feeprofile_feeProfile_pb.FeeProfile>;
    create(request: instrument_feeprofile_service_pb.CreateRequest, metadata?: grpcWeb.Metadata | null): Promise<instrument_feeprofile_feeProfile_pb.FeeProfile>;
    create(request: instrument_feeprofile_service_pb.CreateRequest, metadata: grpcWeb.Metadata | null, callback: (err: grpcWeb.RpcError, response: instrument_feeprofile_feeProfile_pb.FeeProfile) => void): grpcWeb.ClientReadableStream<instrument_feeprofile_feeProfile_pb.FeeProfile>;
    methodDescriptorGet: grpcWeb.MethodDescriptor<instrument_feeprofile_service_pb.GetRequest, instrument_feeprofile_feeProfile_pb.FeeProfile>;
    get(request: instrument_feeprofile_service_pb.GetRequest, metadata?: grpcWeb.Metadata | null): Promise<instrument_feeprofile_feeProfile_pb.FeeProfile>;
    get(request: instrument_feeprofile_service_pb.GetRequest, metadata: grpcWeb.Metadata | null, callback: (err: grpcWeb.RpcError, response: instrument_feeprofile_feeProfile_pb.FeeProfile) => void): grpcWeb.ClientReadableStream<instrument_feeprofile_feeProfile_pb.FeeProfile>;
}
