from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class IndustryClassification(_message.Message):
    __slots__ = ("sector_code", "sector_name", "industry_group_code", "industry_group_name", "industry_code", "industry_name", "sub_industry_code", "sub_industry_name")
    SECTOR_CODE_FIELD_NUMBER: _ClassVar[int]
    SECTOR_NAME_FIELD_NUMBER: _ClassVar[int]
    INDUSTRY_GROUP_CODE_FIELD_NUMBER: _ClassVar[int]
    INDUSTRY_GROUP_NAME_FIELD_NUMBER: _ClassVar[int]
    INDUSTRY_CODE_FIELD_NUMBER: _ClassVar[int]
    INDUSTRY_NAME_FIELD_NUMBER: _ClassVar[int]
    SUB_INDUSTRY_CODE_FIELD_NUMBER: _ClassVar[int]
    SUB_INDUSTRY_NAME_FIELD_NUMBER: _ClassVar[int]
    sector_code: str
    sector_name: str
    industry_group_code: str
    industry_group_name: str
    industry_code: str
    industry_name: str
    sub_industry_code: str
    sub_industry_name: str
    def __init__(self, sector_code: _Optional[str] = ..., sector_name: _Optional[str] = ..., industry_group_code: _Optional[str] = ..., industry_group_name: _Optional[str] = ..., industry_code: _Optional[str] = ..., industry_name: _Optional[str] = ..., sub_industry_code: _Optional[str] = ..., sub_industry_name: _Optional[str] = ...) -> None: ...
