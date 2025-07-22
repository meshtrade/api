"""ApiUserService v1 package."""

# Re-export common utilities
from meshtrade.common import (
    DEFAULT_GRPC_PORT,
    DEFAULT_GRPC_URL,
    DEFAULT_TLS,
    APICredentials,
    GRPCClient,
    create_auth_metadata,
    credentials_from_environment,
    load_credentials_from_file,
)

# Re-export protobuf types
from .api_user_pb2 import APIUser, APIUserAction, APIUserState
from .service import ApiUserService
from .service_grpc_client import (
    ApiUserServiceGRPCClient,
    create_api_user_service_grpc_client,
)
from .service_grpc_client_options import (
    ClientOptions,
    with_address,
    with_api_key,
    with_group,
    with_port,
    with_timeout,
    with_tls,
    with_url,
)
from .service_pb2 import (
    ActivateApiUserRequest,
    CreateApiUserRequest,
    DeactivateApiUserRequest,
    GetApiUserByKeyHashRequest,
    GetApiUserRequest,
    ListApiUsersRequest,
    ListApiUsersResponse,
    SearchApiUsersRequest,
    SearchApiUsersResponse,
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
