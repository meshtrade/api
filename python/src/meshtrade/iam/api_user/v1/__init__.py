"""ApiUserService v1 package."""

# Re-export common utilities
from meshtrade.common import (
    DEFAULT_GRPC_PORT,
    DEFAULT_GRPC_URL,
    DEFAULT_TLS,
    APICredentials,
    GRPCClient,
    create_auth_metadata,
)

# Import credentials functions from local module
from .api_credentials import (
    MESH_API_CREDENTIALS_ENV_VAR,
    api_credentials_from_environment,
    load_api_credentials_from_file,
)

# Re-export protobuf types
from .api_user_pb2 import APIUser, APIUserAction, APIUserState
from .service_grpc_client_meshpy import (
    ApiUserServiceGRPCClient,
    ApiUserServiceGRPCClientInterface,
)
from .service_grpc_client_options_meshpy import ClientOptions
from .service_meshpy import ApiUserService
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
    "ApiUserServiceGRPCClientInterface",
    "ApiUserService",
    "GRPCClient",
    # Configuration
    "ClientOptions",
    # Common utilities
    "APICredentials",
    "MESH_API_CREDENTIALS_ENV_VAR",
    "load_api_credentials_from_file",
    "api_credentials_from_environment",
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
