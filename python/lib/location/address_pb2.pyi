from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class Address(_message.Message):
    __slots__ = ("line1", "line2", "suburb", "city", "province", "postal_code", "country_code")
    LINE1_FIELD_NUMBER: _ClassVar[int]
    LINE2_FIELD_NUMBER: _ClassVar[int]
    SUBURB_FIELD_NUMBER: _ClassVar[int]
    CITY_FIELD_NUMBER: _ClassVar[int]
    PROVINCE_FIELD_NUMBER: _ClassVar[int]
    POSTAL_CODE_FIELD_NUMBER: _ClassVar[int]
    COUNTRY_CODE_FIELD_NUMBER: _ClassVar[int]
    line1: str
    line2: str
    suburb: str
    city: str
    province: str
    postal_code: str
    country_code: str
    def __init__(self, line1: _Optional[str] = ..., line2: _Optional[str] = ..., suburb: _Optional[str] = ..., city: _Optional[str] = ..., province: _Optional[str] = ..., postal_code: _Optional[str] = ..., country_code: _Optional[str] = ...) -> None: ...
