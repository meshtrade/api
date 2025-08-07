"""Api User v1 package."""

# ===================================================================
# AUTO-GENERATED SECTION - ONLY EDIT BELOW THE CLOSING COMMENT BLOCK
# ===================================================================
# This section is automatically managed by protoc-gen-meshpy.
#
# DO NOT EDIT ANYTHING IN THIS SECTION MANUALLY!
# Your changes will be overwritten during code generation.
#
# To add custom imports and exports, scroll down to the
# "MANUAL SECTION" indicated below.
# ===================================================================

# Generated protobuf imports
from .api_credentials_pb2 import APICredentials
from .api_user_pb2 import APIUser, APIUserAction, APIUserState
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

# Generated service imports
from .service_meshpy import (
    ApiUserService,
    ApiUserServiceGRPCClient,
    ApiUserServiceGRPCClientInterface,
)
from .service_options_meshpy import ClientOptions

# ===================================================================
# END OF AUTO-GENERATED SECTION
# ===================================================================
#
# MANUAL SECTION - ADD YOUR CUSTOM IMPORTS AND EXPORTS BELOW
#
# You can safely add your own imports, functions, classes, and exports
# in this section. They will be preserved across code generation.
#
# Example:
#   from my_custom_module import my_function
#
# ===================================================================

from meshtrade.common import (
    DEFAULT_GRPC_PORT,
    DEFAULT_GRPC_URL,
    DEFAULT_TLS,
    GRPCClient,
    create_auth_metadata,
)

# Import credentials functions from local module
from .api_credentials import (
    MESH_API_CREDENTIALS_ENV_VAR,
    api_credentials_from_environment,
    load_api_credentials_from_file,
)

# ===================================================================
# MODULE EXPORTS
# ===================================================================
# Combined auto-generated and manual exports
__all__ = [
    # Generated exports
    "APICredentials",
    "APIUser",
    "APIUserAction",
    "APIUserState",
    "ActivateApiUserRequest",
    "ApiUserService",
    "ApiUserServiceGRPCClient",
    "ApiUserServiceGRPCClientInterface",
    "ClientOptions",
    "CreateApiUserRequest",
    "DeactivateApiUserRequest",
    "GetApiUserByKeyHashRequest",
    "GetApiUserRequest",
    "ListApiUsersRequest",
    "ListApiUsersResponse",
    "SearchApiUsersRequest",
    "SearchApiUsersResponse",
    # Manual exports
    "DEFAULT_GRPC_PORT",
    "DEFAULT_GRPC_URL",
    "DEFAULT_TLS",
    "GRPCClient",
    "MESH_API_CREDENTIALS_ENV_VAR",
    "api_credentials_from_environment",
    "create_auth_metadata",
    "load_api_credentials_from_file",
]
