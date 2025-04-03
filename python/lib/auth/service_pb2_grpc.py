# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc
import warnings

from api.python.lib.auth import service_pb2 as api_dot_proto_dot_auth_dot_service__pb2

GRPC_GENERATED_VERSION = '1.70.0'
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
        + f' but the generated code in api/proto/auth/service_pb2_grpc.py depends on'
        + f' grpcio>={GRPC_GENERATED_VERSION}.'
        + f' Please upgrade your grpc module to grpcio>={GRPC_GENERATED_VERSION}'
        + f' or downgrade your generated code using grpcio-tools<={GRPC_VERSION}.'
    )


class ServiceStub(object):
    """
    Service is the Auth Service.
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.LoginWithFirebaseToken = channel.unary_unary(
                '/api.auth.Service/LoginWithFirebaseToken',
                request_serializer=api_dot_proto_dot_auth_dot_service__pb2.LoginWithFirebaseTokenRequest.SerializeToString,
                response_deserializer=api_dot_proto_dot_auth_dot_service__pb2.LoginWithFirebaseTokenResponse.FromString,
                _registered_method=True)


class ServiceServicer(object):
    """
    Service is the Auth Service.
    """

    def LoginWithFirebaseToken(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_ServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'LoginWithFirebaseToken': grpc.unary_unary_rpc_method_handler(
                    servicer.LoginWithFirebaseToken,
                    request_deserializer=api_dot_proto_dot_auth_dot_service__pb2.LoginWithFirebaseTokenRequest.FromString,
                    response_serializer=api_dot_proto_dot_auth_dot_service__pb2.LoginWithFirebaseTokenResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'api.auth.Service', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))
    server.add_registered_method_handlers('api.auth.Service', rpc_method_handlers)


 # This class is part of an EXPERIMENTAL API.
class Service(object):
    """
    Service is the Auth Service.
    """

    @staticmethod
    def LoginWithFirebaseToken(request,
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
            '/api.auth.Service/LoginWithFirebaseToken',
            api_dot_proto_dot_auth_dot_service__pb2.LoginWithFirebaseTokenRequest.SerializeToString,
            api_dot_proto_dot_auth_dot_service__pb2.LoginWithFirebaseTokenResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)
