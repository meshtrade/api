"""Client v1 package."""

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
from .client_pb2 import Client
from .company_pb2 import Company, ConnectedLegalPerson, LegalPersonConnectionType
from .company_representative_pb2 import CompanyRepresentative
from .company_representative_role_pb2 import CompanyRepresentativeRole
from .fund_pb2 import Fund
from .identification_document_type_pb2 import IdentificationDocumentType
from .industry_classification_pb2 import IndustryClassification
from .natural_person_connection_type_pb2 import NaturalPersonConnectionType
from .natural_person_pb2 import NaturalPerson
from .pep_status_pb2 import PepStatus

# Generated service imports
from .service_grpc_client_meshpy import (
    ClientServiceGRPCClient,
    ClientServiceGRPCClientInterface,
)
from .service_grpc_client_options_meshpy import ClientOptions
from .service_meshpy import ClientService
from .service_pb2 import (
    CreateClientRequest,
    GetClientRequest,
    ListClientsRequest,
    ListClientsResponse,
)
from .source_of_income_and_wealth_pb2 import SourceOfIncomeAndWealth
from .tax_residency_pb2 import TaxResidency
from .trust_pb2 import Trust
from .verification_status_pb2 import VerificationStatus

# Auto-generated __all__ exports
__all__ = [
    "Client",
    "ClientOptions",
    "ClientService",
    "ClientServiceGRPCClient",
    "ClientServiceGRPCClientInterface",
    "Company",
    "CompanyRepresentative",
    "CompanyRepresentativeRole",
    "ConnectedLegalPerson",
    "CreateClientRequest",
    "Fund",
    "GetClientRequest",
    "IdentificationDocumentType",
    "IndustryClassification",
    "LegalPersonConnectionType",
    "ListClientsRequest",
    "ListClientsResponse",
    "NaturalPerson",
    "NaturalPersonConnectionType",
    "PepStatus",
    "SourceOfIncomeAndWealth",
    "TaxResidency",
    "Trust",
    "VerificationStatus",
]

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
#   __all__.extend([
#       "my_function",
#   ])
# ===================================================================

# MANUAL SECTION - ADD YOUR CUSTOM IMPORTS AND EXPORTS BELOW
#
# You can safely add your own imports, functions, classes, and exports
# in this section. They will be preserved across code generation.
#
# Example:
#   from my_custom_module import my_function
#
#   __all__.extend([
#       "my_function",
#   ])
# ===================================================================

# MANUAL SECTION - ADD YOUR CUSTOM IMPORTS AND EXPORTS BELOW
#
# You can safely add your own imports, functions, classes, and exports
# in this section. They will be preserved across code generation.
#
# Example:
#   from my_custom_module import my_function
#
#   __all__.extend([
#       "my_function",
#   ])
# ===================================================================

# MANUAL EXPORTS - ADD CUSTOM IMPORTS BELOW
# ===========================================
