"""Group v1 package."""

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
from .group_pb2 import Group
from .service_pb2 import (
    CreateGroupRequest,
    GetGroupRequest,
    ListGroupsRequest,
    ListGroupsResponse,
    SearchGroupsRequest,
    SearchGroupsResponse,
    UpdateGroupRequest,
)

# Generated service imports
from .service_meshpy import (
    GroupService,
    GroupServiceGRPCClient,
    GroupServiceGRPCClientInterface,
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

# ===================================================================
# MODULE EXPORTS
# ===================================================================
# Combined auto-generated and manual exports
__all__ = [
    # Generated exports
    "ClientOptions",
    "CreateGroupRequest",
    "GetGroupRequest",
    "Group",
    "GroupService",
    "GroupServiceGRPCClient",
    "GroupServiceGRPCClientInterface",
    "ListGroupsRequest",
    "ListGroupsResponse",
    "SearchGroupsRequest",
    "SearchGroupsResponse",
    "UpdateGroupRequest",
]
