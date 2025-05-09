from google.protobuf import timestamp_pb2 as _timestamp_pb2
from api.python.lib.location import address_pb2 as _address_pb2
from api.python.lib.legal import companyPublicContactInfo_pb2 as _companyPublicContactInfo_pb2
from api.python.lib.legal import companyRepresentative_pb2 as _companyRepresentative_pb2
from api.python.lib.legal import connectedCompany_pb2 as _connectedCompany_pb2
from api.python.lib.legal import connectedIndividual_pb2 as _connectedIndividual_pb2
from api.python.lib.legal.company import industryClassification_pb2 as _industryClassification_pb2
from api.python.lib.audit import entry_pb2 as _entry_pb2
from api.python.lib.legal import legalform_pb2 as _legalform_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Company_Role(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_COMPANY_Role: _ClassVar[Company_Role]
    Issuer_COMPANY_Role: _ClassVar[Company_Role]
    Investor_COMPANY_Role: _ClassVar[Company_Role]
    Managing_Company_Role: _ClassVar[Company_Role]
UNDEFINED_COMPANY_Role: Company_Role
Issuer_COMPANY_Role: Company_Role
Investor_COMPANY_Role: Company_Role
Managing_Company_Role: Company_Role

class Company(_message.Message):
    __slots__ = ("registeredName", "taxReferenceNumber", "registrationNumber", "vatRegistrationNumber", "public_contact_info", "companyRepresentative", "industryClassification", "listed_exchange", "listing_reference", "countryOfIncorporation", "formOfIncorporation", "registeredAddress", "businessAddress", "headOfficeAddress", "connectedIndividuals", "connectedCompanies", "role")
    REGISTEREDNAME_FIELD_NUMBER: _ClassVar[int]
    TAXREFERENCENUMBER_FIELD_NUMBER: _ClassVar[int]
    REGISTRATIONNUMBER_FIELD_NUMBER: _ClassVar[int]
    VATREGISTRATIONNUMBER_FIELD_NUMBER: _ClassVar[int]
    PUBLIC_CONTACT_INFO_FIELD_NUMBER: _ClassVar[int]
    COMPANYREPRESENTATIVE_FIELD_NUMBER: _ClassVar[int]
    INDUSTRYCLASSIFICATION_FIELD_NUMBER: _ClassVar[int]
    LISTED_EXCHANGE_FIELD_NUMBER: _ClassVar[int]
    LISTING_REFERENCE_FIELD_NUMBER: _ClassVar[int]
    COUNTRYOFINCORPORATION_FIELD_NUMBER: _ClassVar[int]
    FORMOFINCORPORATION_FIELD_NUMBER: _ClassVar[int]
    REGISTEREDADDRESS_FIELD_NUMBER: _ClassVar[int]
    BUSINESSADDRESS_FIELD_NUMBER: _ClassVar[int]
    HEADOFFICEADDRESS_FIELD_NUMBER: _ClassVar[int]
    CONNECTEDINDIVIDUALS_FIELD_NUMBER: _ClassVar[int]
    CONNECTEDCOMPANIES_FIELD_NUMBER: _ClassVar[int]
    ROLE_FIELD_NUMBER: _ClassVar[int]
    registeredName: str
    taxReferenceNumber: str
    registrationNumber: str
    vatRegistrationNumber: str
    public_contact_info: _companyPublicContactInfo_pb2.CompanyPublicContactInfo
    companyRepresentative: _companyRepresentative_pb2.CompanyRepresentative
    industryClassification: _industryClassification_pb2.IndustryClassification
    listed_exchange: str
    listing_reference: str
    countryOfIncorporation: str
    formOfIncorporation: _legalform_pb2.LegalForm
    registeredAddress: _address_pb2.Address
    businessAddress: _address_pb2.Address
    headOfficeAddress: _address_pb2.Address
    connectedIndividuals: _containers.RepeatedCompositeFieldContainer[_connectedIndividual_pb2.ConnectedIndividual]
    connectedCompanies: _containers.RepeatedCompositeFieldContainer[_connectedCompany_pb2.ConnectedCompany]
    role: _containers.RepeatedScalarFieldContainer[Company_Role]
    def __init__(self, registeredName: _Optional[str] = ..., taxReferenceNumber: _Optional[str] = ..., registrationNumber: _Optional[str] = ..., vatRegistrationNumber: _Optional[str] = ..., public_contact_info: _Optional[_Union[_companyPublicContactInfo_pb2.CompanyPublicContactInfo, _Mapping]] = ..., companyRepresentative: _Optional[_Union[_companyRepresentative_pb2.CompanyRepresentative, _Mapping]] = ..., industryClassification: _Optional[_Union[_industryClassification_pb2.IndustryClassification, _Mapping]] = ..., listed_exchange: _Optional[str] = ..., listing_reference: _Optional[str] = ..., countryOfIncorporation: _Optional[str] = ..., formOfIncorporation: _Optional[_Union[_legalform_pb2.LegalForm, str]] = ..., registeredAddress: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., businessAddress: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., headOfficeAddress: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., connectedIndividuals: _Optional[_Iterable[_Union[_connectedIndividual_pb2.ConnectedIndividual, _Mapping]]] = ..., connectedCompanies: _Optional[_Iterable[_Union[_connectedCompany_pb2.ConnectedCompany, _Mapping]]] = ..., role: _Optional[_Iterable[_Union[Company_Role, str]]] = ...) -> None: ...
