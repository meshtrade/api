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
from .company_representative_role_pb2 import CompanyRepresentativeRole
from .identification_document_type_pb2 import IdentificationDocumentType
from .pep_status_pb2 import PepStatus
from .source_of_income_and_wealth_pb2 import SourceOfIncomeAndWealth
from .tax_residency_pb2 import TaxResidency
from .natural_person_pb2 import NaturalPerson
from .company_representative_pb2 import CompanyRepresentative
from .fund_pb2 import Fund
from .industry_classification_pb2 import IndustryClassification
from .trust_pb2 import Trust
from .company_pb2 import Company, ConnectedLegalPerson, LegalPersonConnectionType
from .verification_status_pb2 import VerificationStatus
from .client_pb2 import Client
from .natural_person_connection_type_pb2 import NaturalPersonConnectionType
from .service_pb2 import (
    CreateClientRequest,
    GetClientRequest,
    ListClientsRequest,
    ListClientsResponse,
)

# Generated service imports
from .service_meshpy import (
    ClientService,
    ClientServiceGRPCClient,
    ClientServiceGRPCClientInterface,
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
