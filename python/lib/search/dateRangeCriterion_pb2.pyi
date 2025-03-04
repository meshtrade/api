from google.protobuf import timestamp_pb2 as _timestamp_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class DateRangeCriterion(_message.Message):
    __slots__ = ("field", "start", "end")
    FIELD_FIELD_NUMBER: _ClassVar[int]
    START_FIELD_NUMBER: _ClassVar[int]
    END_FIELD_NUMBER: _ClassVar[int]
    field: str
    start: RangeValue
    end: RangeValue
    def __init__(self, field: _Optional[str] = ..., start: _Optional[_Union[RangeValue, _Mapping]] = ..., end: _Optional[_Union[RangeValue, _Mapping]] = ...) -> None: ...

class RangeValue(_message.Message):
    __slots__ = ("date", "inclusive", "ignore")
    DATE_FIELD_NUMBER: _ClassVar[int]
    INCLUSIVE_FIELD_NUMBER: _ClassVar[int]
    IGNORE_FIELD_NUMBER: _ClassVar[int]
    date: _timestamp_pb2.Timestamp
    inclusive: bool
    ignore: bool
    def __init__(self, date: _Optional[_Union[_timestamp_pb2.Timestamp, _Mapping]] = ..., inclusive: bool = ..., ignore: bool = ...) -> None: ...
