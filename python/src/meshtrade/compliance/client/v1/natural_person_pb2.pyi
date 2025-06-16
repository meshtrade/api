from google.type import date_pb2 as _date_pb2
from meshtrade.compliance.client.v1 import identification_document_type_pb2 as _identification_document_type_pb2
from meshtrade.compliance.client.v1 import pep_status_pb2 as _pep_status_pb2
from meshtrade.type.v1 import address_pb2 as _address_pb2
from meshtrade.type.v1 import contact_details_pb2 as _contact_details_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class NaturalPerson(_message.Message):
    __slots__ = ("full_name", "date_of_birth", "country_of_citizenship", "identification_number", "identification_document_type", "identification_document_expiry_date", "physical_address", "pep_status", "postal_address", "personal_contact_details")
    FULL_NAME_FIELD_NUMBER: _ClassVar[int]
    DATE_OF_BIRTH_FIELD_NUMBER: _ClassVar[int]
    COUNTRY_OF_CITIZENSHIP_FIELD_NUMBER: _ClassVar[int]
    IDENTIFICATION_NUMBER_FIELD_NUMBER: _ClassVar[int]
    IDENTIFICATION_DOCUMENT_TYPE_FIELD_NUMBER: _ClassVar[int]
    IDENTIFICATION_DOCUMENT_EXPIRY_DATE_FIELD_NUMBER: _ClassVar[int]
    PHYSICAL_ADDRESS_FIELD_NUMBER: _ClassVar[int]
    PEP_STATUS_FIELD_NUMBER: _ClassVar[int]
    POSTAL_ADDRESS_FIELD_NUMBER: _ClassVar[int]
    PERSONAL_CONTACT_DETAILS_FIELD_NUMBER: _ClassVar[int]
    full_name: str
    date_of_birth: _date_pb2.Date
    country_of_citizenship: str
    identification_number: str
    identification_document_type: _identification_document_type_pb2.IdentificationDocumentType
    identification_document_expiry_date: _date_pb2.Date
    physical_address: _address_pb2.Address
    pep_status: _pep_status_pb2.PepStatus
    postal_address: _address_pb2.Address
    personal_contact_details: _contact_details_pb2.ContactDetails
    def __init__(self, full_name: _Optional[str] = ..., date_of_birth: _Optional[_Union[_date_pb2.Date, _Mapping]] = ..., country_of_citizenship: _Optional[str] = ..., identification_number: _Optional[str] = ..., identification_document_type: _Optional[_Union[_identification_document_type_pb2.IdentificationDocumentType, str]] = ..., identification_document_expiry_date: _Optional[_Union[_date_pb2.Date, _Mapping]] = ..., physical_address: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., pep_status: _Optional[_Union[_pep_status_pb2.PepStatus, str]] = ..., postal_address: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., personal_contact_details: _Optional[_Union[_contact_details_pb2.ContactDetails, _Mapping]] = ...) -> None: ...
