from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class Address(_message.Message):
    __slots__ = ("address_lines", "suburb", "city", "province", "country_code", "postal_code")
    ADDRESS_LINES_FIELD_NUMBER: _ClassVar[int]
    SUBURB_FIELD_NUMBER: _ClassVar[int]
    CITY_FIELD_NUMBER: _ClassVar[int]
    PROVINCE_FIELD_NUMBER: _ClassVar[int]
    COUNTRY_CODE_FIELD_NUMBER: _ClassVar[int]
    POSTAL_CODE_FIELD_NUMBER: _ClassVar[int]
    address_lines: _containers.RepeatedScalarFieldContainer[str]
    suburb: str
    city: str
    province: str
    country_code: str
    postal_code: str
    def __init__(self, address_lines: _Optional[_Iterable[str]] = ..., suburb: _Optional[str] = ..., city: _Optional[str] = ..., province: _Optional[str] = ..., country_code: _Optional[str] = ..., postal_code: _Optional[str] = ...) -> None: ...
