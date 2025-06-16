from google.type import date_pb2 as _date_pb2
from meshtrade.compliance.client.v1 import legal_person_form_pb2 as _legal_person_form_pb2
from meshtrade.type.v1 import address_pb2 as _address_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class LegalPerson(_message.Message):
    __slots__ = ("registered_name", "legal_form", "registration_number", "tax_identifier", "country_of_incorporation", "date_of_incorporation", "registered_address", "principal_physical_address", "postal_address", "head_office_address")
    REGISTERED_NAME_FIELD_NUMBER: _ClassVar[int]
    LEGAL_FORM_FIELD_NUMBER: _ClassVar[int]
    REGISTRATION_NUMBER_FIELD_NUMBER: _ClassVar[int]
    TAX_IDENTIFIER_FIELD_NUMBER: _ClassVar[int]
    COUNTRY_OF_INCORPORATION_FIELD_NUMBER: _ClassVar[int]
    DATE_OF_INCORPORATION_FIELD_NUMBER: _ClassVar[int]
    REGISTERED_ADDRESS_FIELD_NUMBER: _ClassVar[int]
    PRINCIPAL_PHYSICAL_ADDRESS_FIELD_NUMBER: _ClassVar[int]
    POSTAL_ADDRESS_FIELD_NUMBER: _ClassVar[int]
    HEAD_OFFICE_ADDRESS_FIELD_NUMBER: _ClassVar[int]
    registered_name: str
    legal_form: _legal_person_form_pb2.LegalPersonForm
    registration_number: str
    tax_identifier: str
    country_of_incorporation: str
    date_of_incorporation: _date_pb2.Date
    registered_address: _address_pb2.Address
    principal_physical_address: _address_pb2.Address
    postal_address: _address_pb2.Address
    head_office_address: _address_pb2.Address
    def __init__(self, registered_name: _Optional[str] = ..., legal_form: _Optional[_Union[_legal_person_form_pb2.LegalPersonForm, str]] = ..., registration_number: _Optional[str] = ..., tax_identifier: _Optional[str] = ..., country_of_incorporation: _Optional[str] = ..., date_of_incorporation: _Optional[_Union[_date_pb2.Date, _Mapping]] = ..., registered_address: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., principal_physical_address: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., postal_address: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., head_office_address: _Optional[_Union[_address_pb2.Address, _Mapping]] = ...) -> None: ...
