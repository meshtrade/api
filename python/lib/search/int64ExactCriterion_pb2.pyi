from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class Int64ExactCriterion(_message.Message):
    __slots__ = ("field", "int64")
    FIELD_FIELD_NUMBER: _ClassVar[int]
    INT64_FIELD_NUMBER: _ClassVar[int]
    field: str
    int64: int
    def __init__(self, field: _Optional[str] = ..., int64: _Optional[int] = ...) -> None: ...
