# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc
import warnings

from api.python.lib.instrument import service_pb2 as api_dot_proto_dot_instrument_dot_service__pb2

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
        + f' but the generated code in api/proto/instrument/service_pb2_grpc.py depends on'
        + f' grpcio>={GRPC_GENERATED_VERSION}.'
        + f' Please upgrade your grpc module to grpcio>={GRPC_GENERATED_VERSION}'
        + f' or downgrade your generated code using grpcio-tools<={GRPC_VERSION}.'
    )


class ServiceStub(object):
    """
    Service is the Instrument Service.
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.Mint = channel.unary_unary(
                '/api.instrument.Service/Mint',
                request_serializer=api_dot_proto_dot_instrument_dot_service__pb2.MintRequest.SerializeToString,
                response_deserializer=api_dot_proto_dot_instrument_dot_service__pb2.MintResponse.FromString,
                _registered_method=True)
        self.Burn = channel.unary_unary(
                '/api.instrument.Service/Burn',
                request_serializer=api_dot_proto_dot_instrument_dot_service__pb2.BurnRequest.SerializeToString,
                response_deserializer=api_dot_proto_dot_instrument_dot_service__pb2.BurnResponse.FromString,
                _registered_method=True)


class ServiceServicer(object):
    """
    Service is the Instrument Service.
    """

    def Mint(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def Burn(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_ServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'Mint': grpc.unary_unary_rpc_method_handler(
                    servicer.Mint,
                    request_deserializer=api_dot_proto_dot_instrument_dot_service__pb2.MintRequest.FromString,
                    response_serializer=api_dot_proto_dot_instrument_dot_service__pb2.MintResponse.SerializeToString,
            ),
            'Burn': grpc.unary_unary_rpc_method_handler(
                    servicer.Burn,
                    request_deserializer=api_dot_proto_dot_instrument_dot_service__pb2.BurnRequest.FromString,
                    response_serializer=api_dot_proto_dot_instrument_dot_service__pb2.BurnResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'api.instrument.Service', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))
    server.add_registered_method_handlers('api.instrument.Service', rpc_method_handlers)


 # This class is part of an EXPERIMENTAL API.
class Service(object):
    """
    Service is the Instrument Service.
    """

    @staticmethod
    def Mint(request,
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
            '/api.instrument.Service/Mint',
            api_dot_proto_dot_instrument_dot_service__pb2.MintRequest.SerializeToString,
            api_dot_proto_dot_instrument_dot_service__pb2.MintResponse.FromString,
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
    def Burn(request,
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
            '/api.instrument.Service/Burn',
            api_dot_proto_dot_instrument_dot_service__pb2.BurnRequest.SerializeToString,
            api_dot_proto_dot_instrument_dot_service__pb2.BurnResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)
