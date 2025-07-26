"""Role v1 package."""

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
from .role_pb2 import Role, RoleList

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

from .role import full_resource_name_from_group_name

# ===================================================================
# MODULE EXPORTS
# ===================================================================
# Combined auto-generated and manual exports
__all__ = [
    # Generated exports
    "Role",
    "RoleList",
    # Manual exports
    "full_resource_name_from_group_name",
]
