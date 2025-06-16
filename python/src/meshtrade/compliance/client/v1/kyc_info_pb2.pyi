import datetime

from google.protobuf import timestamp_pb2 as _timestamp_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class KYCInfo(_message.Message):
    __slots__ = ("full_name", "verification_date")
    FULL_NAME_FIELD_NUMBER: _ClassVar[int]
    VERIFICATION_DATE_FIELD_NUMBER: _ClassVar[int]
    full_name: str
    verification_date: _timestamp_pb2.Timestamp
    def __init__(self, full_name: _Optional[str] = ..., verification_date: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ...) -> None: ...
