"""Account v1 package."""

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
from .account_pb2 import (
    Account,
    AccountState,
    Balance,
    InstrumentMetaData,
    Signatory,
)
from .service_pb2 import (
    AddSignatoriesToAccountRequest,
    AddSignatoriesToAccountResponse,
    CreateAccountRequest,
    GetAccountByNumberRequest,
    GetAccountRequest,
    ListAccountsRequest,
    ListAccountsResponse,
    OpenAccountRequest,
    OpenAccountResponse,
    RemoveSignatoriesFromAccountRequest,
    RemoveSignatoriesFromAccountResponse,
    SearchAccountsRequest,
    SearchAccountsResponse,
    UpdateAccountRequest,
)

# Generated service imports
from .service_meshpy import (
    AccountService,
    AccountServiceGRPCClient,
    AccountServiceGRPCClientInterface,
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

# ===================================================================
# MODULE EXPORTS
# ===================================================================
# Combined auto-generated and manual exports
__all__ = [
    # Generated exports
    "Account",
    "AccountService",
    "AccountServiceGRPCClient",
    "AccountServiceGRPCClientInterface",
    "AccountState",
    "AddSignatoriesToAccountRequest",
    "AddSignatoriesToAccountResponse",
    "Balance",
    "CreateAccountRequest",
    "GetAccountByNumberRequest",
    "GetAccountRequest",
    "InstrumentMetaData",
    "ListAccountsRequest",
    "ListAccountsResponse",
    "OpenAccountRequest",
    "OpenAccountResponse",
    "RemoveSignatoriesFromAccountRequest",
    "RemoveSignatoriesFromAccountResponse",
    "SearchAccountsRequest",
    "SearchAccountsResponse",
    "Signatory",
    "UpdateAccountRequest",
]
