from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class TaxResidency(_message.Message):
    __slots__ = ("country_code", "tin")
    COUNTRY_CODE_FIELD_NUMBER: _ClassVar[int]
    TIN_FIELD_NUMBER: _ClassVar[int]
    country_code: str
    tin: str
    def __init__(self, country_code: _Optional[str] = ..., tin: _Optional[str] = ...) -> None: ...
