from google.protobuf import timestamp_pb2 as _timestamp_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Uint32RangeCriterion(_message.Message):
    __slots__ = ("field", "start", "end")
    FIELD_FIELD_NUMBER: _ClassVar[int]
    START_FIELD_NUMBER: _ClassVar[int]
    END_FIELD_NUMBER: _ClassVar[int]
    field: str
    start: Uint32RangeValue
    end: Uint32RangeValue
    def __init__(self, field: _Optional[str] = ..., start: _Optional[_Union[Uint32RangeValue, _Mapping]] = ..., end: _Optional[_Union[Uint32RangeValue, _Mapping]] = ...) -> None: ...

class Uint32RangeValue(_message.Message):
    __slots__ = ("value", "inclusive", "ignore")
    VALUE_FIELD_NUMBER: _ClassVar[int]
    INCLUSIVE_FIELD_NUMBER: _ClassVar[int]
    IGNORE_FIELD_NUMBER: _ClassVar[int]
    value: int
    inclusive: bool
    ignore: bool
    def __init__(self, value: _Optional[int] = ..., inclusive: bool = ..., ignore: bool = ...) -> None: ...
