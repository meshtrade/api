from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class IndustryClassification(_message.Message):
    __slots__ = ("industryCode", "industryName", "subIndustryCode", "subIndustryName")
    INDUSTRYCODE_FIELD_NUMBER: _ClassVar[int]
    INDUSTRYNAME_FIELD_NUMBER: _ClassVar[int]
    SUBINDUSTRYCODE_FIELD_NUMBER: _ClassVar[int]
    SUBINDUSTRYNAME_FIELD_NUMBER: _ClassVar[int]
    industryCode: int
    industryName: str
    subIndustryCode: int
    subIndustryName: str
    def __init__(self, industryCode: _Optional[int] = ..., industryName: _Optional[str] = ..., subIndustryCode: _Optional[int] = ..., subIndustryName: _Optional[str] = ...) -> None: ...
