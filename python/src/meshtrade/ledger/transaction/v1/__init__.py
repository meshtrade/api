"""Transaction v1 package."""

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
from .transaction_state_pb2 import TransactionState
from .service_pb2 import (
    GetTransactionStateRequest,
    GetTransactionStateResponse,
    MonitorTransactionStateRequest,
    MonitorTransactionStateResponse,
)
from .transaction_action_pb2 import TransactionAction

# Generated service imports
from .service_meshpy import (
    TransactionService,
    TransactionServiceGRPCClient,
    TransactionServiceGRPCClientInterface,
)

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

from .transaction_state_machine import transaction_state_can_perform_action_at_state

# ===================================================================
# MODULE EXPORTS
# ===================================================================
# Combined auto-generated and manual exports
__all__ = [
    # Generated exports
    "GetTransactionStateRequest",
    "GetTransactionStateResponse",
    "MonitorTransactionStateRequest",
    "MonitorTransactionStateResponse",
    "TransactionAction",
    "TransactionService",
    "TransactionServiceGRPCClient",
    "TransactionServiceGRPCClientInterface",
    "TransactionState",
    # Manual exports
    "transaction_state_can_perform_action_at_state",
]
