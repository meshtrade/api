from .client_pb2 import Client
from .company_pb2 import Company
from .company_representative_pb2 import CompanyRepresentative
from .company_representative_role_pb2 import CompanyRepresentativeRole
from .fund_pb2 import Fund
from .identification_document_type_pb2 import IdentificationDocumentType
from .industry_classification_pb2 import IndustryClassification
from .natural_person_pb2 import NaturalPerson
from .natural_person_connection_type_pb2 import NaturalPersonConnectionType
from .pep_status_pb2 import PepStatus
from .service_pb2 import ClientService
from .source_of_income_and_wealth_pb2 import SourceOfIncomeAndWealth
from .tax_residency_pb2 import TaxResidency
from .trust_pb2 import Trust
from .verification_status_pb2 import VerificationStatus

__all__ = [
    "Client",
    "Company",
    "CompanyRepresentative",
    "CompanyRepresentativeRole",
    "Fund",
    "IdentificationDocumentType",
    "IndustryClassification",
    "NaturalPerson",
    "NaturalPersonConnectionType",
    "PepStatus",
    "ClientService",
    "SourceOfIncomeAndWealth",
    "TaxResidency",
    "Trust",
    "VerificationStatus",
]