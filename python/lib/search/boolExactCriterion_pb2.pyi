from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class BoolExactCriterion(_message.Message):
    __slots__ = ("field", "bool")
    FIELD_FIELD_NUMBER: _ClassVar[int]
    BOOL_FIELD_NUMBER: _ClassVar[int]
    field: str
    bool: bool
    def __init__(self, field: _Optional[str] = ..., bool: bool = ...) -> None: ...
