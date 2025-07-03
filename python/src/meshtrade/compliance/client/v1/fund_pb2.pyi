from google.type import date_pb2 as _date_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Fund(_message.Message):
    __slots__ = ("registered_name", "registration_number", "tax_identifier", "country_of_domicile", "date_of_inception")
    REGISTERED_NAME_FIELD_NUMBER: _ClassVar[int]
    REGISTRATION_NUMBER_FIELD_NUMBER: _ClassVar[int]
    TAX_IDENTIFIER_FIELD_NUMBER: _ClassVar[int]
    COUNTRY_OF_DOMICILE_FIELD_NUMBER: _ClassVar[int]
    DATE_OF_INCEPTION_FIELD_NUMBER: _ClassVar[int]
    registered_name: str
    registration_number: str
    tax_identifier: str
    country_of_domicile: str
    date_of_inception: _date_pb2.Date
    def __init__(self, registered_name: _Optional[str] = ..., registration_number: _Optional[str] = ..., tax_identifier: _Optional[str] = ..., country_of_domicile: _Optional[str] = ..., date_of_inception: _Optional[_Union[_date_pb2.Date, _Mapping]] = ...) -> None: ...
