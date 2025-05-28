from google.protobuf import timestamp_pb2 as _timestamp_pb2
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Action(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_ACTION: _ClassVar[Action]
    CREATED_ACTION: _ClassVar[Action]
    MODIFIED_ACTION: _ClassVar[Action]
    DELETED_ACTION: _ClassVar[Action]
    RESTORED_ACTION: _ClassVar[Action]
UNDEFINED_ACTION: Action
CREATED_ACTION: Action
MODIFIED_ACTION: Action
DELETED_ACTION: Action
RESTORED_ACTION: Action

class Entry(_message.Message):
    __slots__ = ("userID", "action", "time", "version")
    USERID_FIELD_NUMBER: _ClassVar[int]
    ACTION_FIELD_NUMBER: _ClassVar[int]
    TIME_FIELD_NUMBER: _ClassVar[int]
    VERSION_FIELD_NUMBER: _ClassVar[int]
    userID: str
    action: Action
    time: _timestamp_pb2.Timestamp
    version: int
    def __init__(self, userID: _Optional[str] = ..., action: _Optional[_Union[Action, str]] = ..., time: _Optional[_Union[_timestamp_pb2.Timestamp, _Mapping]] = ..., version: _Optional[int] = ...) -> None: ...
