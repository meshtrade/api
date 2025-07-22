"""ApiUserService v1 package."""

from .service_grpc_client import (
    ApiUserServiceGRPCClient,
    create_api_user_service_grpc_client,
    ApiUserService,
    GRPCClient,
)
from .service_grpc_client_options import (
    ClientOptions,
    with_tls,
    with_address,
    with_url,
    with_port,
    with_api_key,
    with_group,
    with_timeout,
)
from .common import (
    APICredentials,
    load_credentials_from_file,
    credentials_from_environment,
    create_auth_metadata,
    DEFAULT_GRPC_URL,
    DEFAULT_GRPC_PORT,
    DEFAULT_TLS,
)

# Re-export protobuf types
from .api_user_pb2 import APIUser, APIUserState, APIUserAction
from .service_pb2 import (
    GetApiUserRequest,
    CreateApiUserRequest,
    ListApiUsersRequest,
    ListApiUsersResponse,
    SearchApiUsersRequest,
    SearchApiUsersResponse,
    ActivateApiUserRequest,
    DeactivateApiUserRequest,
    GetApiUserByKeyHashRequest,
)

__all__ = [
    # Client classes
    "ApiUserServiceGRPCClient",
    "create_api_user_service_grpc_client",
    "ApiUserService",
    "GRPCClient",
    
    # Configuration
    "ClientOptions",
    "with_tls",
    "with_address",
    "with_url",
    "with_port",
    "with_api_key",
    "with_group",
    "with_timeout",
    
    # Common utilities
    "APICredentials",
    "load_credentials_from_file",
    "credentials_from_environment",
    "create_auth_metadata",
    "DEFAULT_GRPC_URL",
    "DEFAULT_GRPC_PORT",
    "DEFAULT_TLS",
    
    # Protobuf types
    "APIUser",
    "APIUserState",
    "APIUserAction",
    "GetApiUserRequest",
    "CreateApiUserRequest",
    "ListApiUsersRequest",
    "ListApiUsersResponse",
    "SearchApiUsersRequest",
    "SearchApiUsersResponse",
    "ActivateApiUserRequest",
    "DeactivateApiUserRequest",
    "GetApiUserByKeyHashRequest",
]
