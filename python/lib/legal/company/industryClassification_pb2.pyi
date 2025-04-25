from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class IndustryClassification(_message.Message):
    __slots__ = ("sector", "industry", "subIndustry")
    SECTOR_FIELD_NUMBER: _ClassVar[int]
    INDUSTRY_FIELD_NUMBER: _ClassVar[int]
    SUBINDUSTRY_FIELD_NUMBER: _ClassVar[int]
    sector: str
    industry: str
    subIndustry: str
    def __init__(self, sector: _Optional[str] = ..., industry: _Optional[str] = ..., subIndustry: _Optional[str] = ...) -> None: ...
