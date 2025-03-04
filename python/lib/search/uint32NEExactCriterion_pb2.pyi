from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class Uint32NEExactCriterion(_message.Message):
    __slots__ = ("field", "uint32")
    FIELD_FIELD_NUMBER: _ClassVar[int]
    UINT32_FIELD_NUMBER: _ClassVar[int]
    field: str
    uint32: int
    def __init__(self, field: _Optional[str] = ..., uint32: _Optional[int] = ...) -> None: ...
