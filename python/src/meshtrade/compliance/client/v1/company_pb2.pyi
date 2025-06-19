from google.type import date_pb2 as _date_pb2
from meshtrade.compliance.client.v1 import company_representative_pb2 as _company_representative_pb2
from meshtrade.compliance.client.v1 import fund_pb2 as _fund_pb2
from meshtrade.compliance.client.v1 import industry_classification_pb2 as _industry_classification_pb2
from meshtrade.compliance.client.v1 import natural_person_pb2 as _natural_person_pb2
from meshtrade.compliance.client.v1 import trust_pb2 as _trust_pb2
from meshtrade.type.v1 import address_pb2 as _address_pb2
from meshtrade.type.v1 import decimal_pb2 as _decimal_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class LegalPersonConnectionType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    LEGAL_PERSON_CONNECTION_TYPE_UNSPECIFIED: _ClassVar[LegalPersonConnectionType]
    LEGAL_PERSON_CONNECTION_TYPE_SHAREHOLDER: _ClassVar[LegalPersonConnectionType]
    LEGAL_PERSON_CONNECTION_TYPE_PARENT_COMPANY: _ClassVar[LegalPersonConnectionType]
    LEGAL_PERSON_CONNECTION_TYPE_CORPORATE_DIRECTOR: _ClassVar[LegalPersonConnectionType]
    LEGAL_PERSON_CONNECTION_TYPE_TRUST: _ClassVar[LegalPersonConnectionType]
    LEGAL_PERSON_CONNECTION_TYPE_GENERAL_PARTNER: _ClassVar[LegalPersonConnectionType]
    LEGAL_PERSON_CONNECTION_TYPE_GUARANTOR: _ClassVar[LegalPersonConnectionType]
LEGAL_PERSON_CONNECTION_TYPE_UNSPECIFIED: LegalPersonConnectionType
LEGAL_PERSON_CONNECTION_TYPE_SHAREHOLDER: LegalPersonConnectionType
LEGAL_PERSON_CONNECTION_TYPE_PARENT_COMPANY: LegalPersonConnectionType
LEGAL_PERSON_CONNECTION_TYPE_CORPORATE_DIRECTOR: LegalPersonConnectionType
LEGAL_PERSON_CONNECTION_TYPE_TRUST: LegalPersonConnectionType
LEGAL_PERSON_CONNECTION_TYPE_GENERAL_PARTNER: LegalPersonConnectionType
LEGAL_PERSON_CONNECTION_TYPE_GUARANTOR: LegalPersonConnectionType

class Company(_message.Message):
    __slots__ = ("registered_name", "registration_number", "tax_identifier", "country_of_incorporation", "date_of_incorporation", "registered_address", "principal_physical_address", "postal_address", "head_office_address", "company_representatives", "connected_legal_persons", "industry_classification", "listed_exchange_code", "listing_reference")
    REGISTERED_NAME_FIELD_NUMBER: _ClassVar[int]
    REGISTRATION_NUMBER_FIELD_NUMBER: _ClassVar[int]
    TAX_IDENTIFIER_FIELD_NUMBER: _ClassVar[int]
    COUNTRY_OF_INCORPORATION_FIELD_NUMBER: _ClassVar[int]
    DATE_OF_INCORPORATION_FIELD_NUMBER: _ClassVar[int]
    REGISTERED_ADDRESS_FIELD_NUMBER: _ClassVar[int]
    PRINCIPAL_PHYSICAL_ADDRESS_FIELD_NUMBER: _ClassVar[int]
    POSTAL_ADDRESS_FIELD_NUMBER: _ClassVar[int]
    HEAD_OFFICE_ADDRESS_FIELD_NUMBER: _ClassVar[int]
    COMPANY_REPRESENTATIVES_FIELD_NUMBER: _ClassVar[int]
    CONNECTED_LEGAL_PERSONS_FIELD_NUMBER: _ClassVar[int]
    INDUSTRY_CLASSIFICATION_FIELD_NUMBER: _ClassVar[int]
    LISTED_EXCHANGE_CODE_FIELD_NUMBER: _ClassVar[int]
    LISTING_REFERENCE_FIELD_NUMBER: _ClassVar[int]
    registered_name: str
    registration_number: str
    tax_identifier: str
    country_of_incorporation: str
    date_of_incorporation: _date_pb2.Date
    registered_address: _address_pb2.Address
    principal_physical_address: _address_pb2.Address
    postal_address: _address_pb2.Address
    head_office_address: _address_pb2.Address
    company_representatives: _containers.RepeatedCompositeFieldContainer[_company_representative_pb2.CompanyRepresentative]
    connected_legal_persons: _containers.RepeatedCompositeFieldContainer[ConnectedLegalPerson]
    industry_classification: _industry_classification_pb2.IndustryClassification
    listed_exchange_code: str
    listing_reference: str
    def __init__(self, registered_name: _Optional[str] = ..., registration_number: _Optional[str] = ..., tax_identifier: _Optional[str] = ..., country_of_incorporation: _Optional[str] = ..., date_of_incorporation: _Optional[_Union[_date_pb2.Date, _Mapping]] = ..., registered_address: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., principal_physical_address: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., postal_address: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., head_office_address: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., company_representatives: _Optional[_Iterable[_Union[_company_representative_pb2.CompanyRepresentative, _Mapping]]] = ..., connected_legal_persons: _Optional[_Iterable[_Union[ConnectedLegalPerson, _Mapping]]] = ..., industry_classification: _Optional[_Union[_industry_classification_pb2.IndustryClassification, _Mapping]] = ..., listed_exchange_code: _Optional[str] = ..., listing_reference: _Optional[str] = ...) -> None: ...

class ConnectedLegalPerson(_message.Message):
    __slots__ = ("natural_person", "company", "fund", "trust", "connection_types", "ownership_percentage", "voting_rights_percentage", "connection_description")
    NATURAL_PERSON_FIELD_NUMBER: _ClassVar[int]
    COMPANY_FIELD_NUMBER: _ClassVar[int]
    FUND_FIELD_NUMBER: _ClassVar[int]
    TRUST_FIELD_NUMBER: _ClassVar[int]
    CONNECTION_TYPES_FIELD_NUMBER: _ClassVar[int]
    OWNERSHIP_PERCENTAGE_FIELD_NUMBER: _ClassVar[int]
    VOTING_RIGHTS_PERCENTAGE_FIELD_NUMBER: _ClassVar[int]
    CONNECTION_DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    natural_person: _natural_person_pb2.NaturalPerson
    company: Company
    fund: _fund_pb2.Fund
    trust: _trust_pb2.Trust
    connection_types: _containers.RepeatedScalarFieldContainer[LegalPersonConnectionType]
    ownership_percentage: _decimal_pb2.Decimal
    voting_rights_percentage: _decimal_pb2.Decimal
    connection_description: str
    def __init__(self, natural_person: _Optional[_Union[_natural_person_pb2.NaturalPerson, _Mapping]] = ..., company: _Optional[_Union[Company, _Mapping]] = ..., fund: _Optional[_Union[_fund_pb2.Fund, _Mapping]] = ..., trust: _Optional[_Union[_trust_pb2.Trust, _Mapping]] = ..., connection_types: _Optional[_Iterable[_Union[LegalPersonConnectionType, str]]] = ..., ownership_percentage: _Optional[_Union[_decimal_pb2.Decimal, _Mapping]] = ..., voting_rights_percentage: _Optional[_Union[_decimal_pb2.Decimal, _Mapping]] = ..., connection_description: _Optional[str] = ...) -> None: ...
