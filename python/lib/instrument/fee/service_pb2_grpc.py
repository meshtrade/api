# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc
import warnings

from api.python.lib.instrument.fee import service_pb2 as api_dot_proto_dot_instrument_dot_fee_dot_service__pb2

GRPC_GENERATED_VERSION = '1.71.0'
GRPC_VERSION = grpc.__version__
_version_not_supported = False

try:
    from grpc._utilities import first_version_is_lower
    _version_not_supported = first_version_is_lower(GRPC_VERSION, GRPC_GENERATED_VERSION)
except ImportError:
    _version_not_supported = True

if _version_not_supported:
    raise RuntimeError(
        f'The grpc package installed is at version {GRPC_VERSION},'
        + f' but the generated code in api/proto/instrument/fee/service_pb2_grpc.py depends on'
        + f' grpcio>={GRPC_GENERATED_VERSION}.'
        + f' Please upgrade your grpc module to grpcio>={GRPC_GENERATED_VERSION}'
        + f' or downgrade your generated code using grpcio-tools<={GRPC_VERSION}.'
    )


class ServiceStub(object):
    """
    Service is the Fee Service.
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.Get = channel.unary_unary(
                '/api.instrument.fee.Service/Get',
                request_serializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.GetRequest.SerializeToString,
                response_deserializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.GetResponse.FromString,
                _registered_method=True)
        self.List = channel.unary_unary(
                '/api.instrument.fee.Service/List',
                request_serializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.ListRequest.SerializeToString,
                response_deserializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.ListResponse.FromString,
                _registered_method=True)
        self.CalculateMintingFees = channel.unary_unary(
                '/api.instrument.fee.Service/CalculateMintingFees',
                request_serializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateMintingFeesRequest.SerializeToString,
                response_deserializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateMintingFeesResponse.FromString,
                _registered_method=True)
        self.CalculateBurningFees = channel.unary_unary(
                '/api.instrument.fee.Service/CalculateBurningFees',
                request_serializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateBurningFeesRequest.SerializeToString,
                response_deserializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateBurningFeesResponse.FromString,
                _registered_method=True)


class ServiceServicer(object):
    """
    Service is the Fee Service.
    """

    def Get(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def List(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CalculateMintingFees(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CalculateBurningFees(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_ServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'Get': grpc.unary_unary_rpc_method_handler(
                    servicer.Get,
                    request_deserializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.GetRequest.FromString,
                    response_serializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.GetResponse.SerializeToString,
            ),
            'List': grpc.unary_unary_rpc_method_handler(
                    servicer.List,
                    request_deserializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.ListRequest.FromString,
                    response_serializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.ListResponse.SerializeToString,
            ),
            'CalculateMintingFees': grpc.unary_unary_rpc_method_handler(
                    servicer.CalculateMintingFees,
                    request_deserializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateMintingFeesRequest.FromString,
                    response_serializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateMintingFeesResponse.SerializeToString,
            ),
            'CalculateBurningFees': grpc.unary_unary_rpc_method_handler(
                    servicer.CalculateBurningFees,
                    request_deserializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateBurningFeesRequest.FromString,
                    response_serializer=api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateBurningFeesResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'api.instrument.fee.Service', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))
    server.add_registered_method_handlers('api.instrument.fee.Service', rpc_method_handlers)


 # This class is part of an EXPERIMENTAL API.
class Service(object):
    """
    Service is the Fee Service.
    """

    @staticmethod
    def Get(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/api.instrument.fee.Service/Get',
            api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.GetRequest.SerializeToString,
            api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.GetResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def List(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/api.instrument.fee.Service/List',
            api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.ListRequest.SerializeToString,
            api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.ListResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def CalculateMintingFees(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/api.instrument.fee.Service/CalculateMintingFees',
            api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateMintingFeesRequest.SerializeToString,
            api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateMintingFeesResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def CalculateBurningFees(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/api.instrument.fee.Service/CalculateBurningFees',
            api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateBurningFeesRequest.SerializeToString,
            api_dot_proto_dot_instrument_dot_fee_dot_service__pb2.CalculateBurningFeesResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)
