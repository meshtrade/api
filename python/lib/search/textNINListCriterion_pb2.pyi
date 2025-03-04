from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class TextNINListCriterion(_message.Message):
    __slots__ = ("field", "list")
    FIELD_FIELD_NUMBER: _ClassVar[int]
    LIST_FIELD_NUMBER: _ClassVar[int]
    field: str
    list: _containers.RepeatedScalarFieldContainer[str]
    def __init__(self, field: _Optional[str] = ..., list: _Optional[_Iterable[str]] = ...) -> None: ...
