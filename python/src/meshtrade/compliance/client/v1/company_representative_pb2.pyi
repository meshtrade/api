from google.type import date_pb2 as _date_pb2
from meshtrade.compliance.client.v1 import company_representative_role_pb2 as _company_representative_role_pb2
from meshtrade.compliance.client.v1 import natural_person_pb2 as _natural_person_pb2
from meshtrade.type.v1 import contact_details_pb2 as _contact_details_pb2
from meshtrade.type.v1 import decimal_pb2 as _decimal_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class CompanyRepresentative(_message.Message):
    __slots__ = ("natural_person", "role", "position", "ownership_percentage", "professional_contact_details", "date_of_appointment")
    NATURAL_PERSON_FIELD_NUMBER: _ClassVar[int]
    ROLE_FIELD_NUMBER: _ClassVar[int]
    POSITION_FIELD_NUMBER: _ClassVar[int]
    OWNERSHIP_PERCENTAGE_FIELD_NUMBER: _ClassVar[int]
    PROFESSIONAL_CONTACT_DETAILS_FIELD_NUMBER: _ClassVar[int]
    DATE_OF_APPOINTMENT_FIELD_NUMBER: _ClassVar[int]
    natural_person: _natural_person_pb2.NaturalPerson
    role: _company_representative_role_pb2.CompanyRepresentativeRole
    position: str
    ownership_percentage: _decimal_pb2.Decimal
    professional_contact_details: _contact_details_pb2.ContactDetails
    date_of_appointment: _date_pb2.Date
    def __init__(self, natural_person: _Optional[_Union[_natural_person_pb2.NaturalPerson, _Mapping]] = ..., role: _Optional[_Union[_company_representative_role_pb2.CompanyRepresentativeRole, str]] = ..., position: _Optional[str] = ..., ownership_percentage: _Optional[_Union[_decimal_pb2.Decimal, _Mapping]] = ..., professional_contact_details: _Optional[_Union[_contact_details_pb2.ContactDetails, _Mapping]] = ..., date_of_appointment: _Optional[_Union[_date_pb2.Date, _Mapping]] = ...) -> None: ...
