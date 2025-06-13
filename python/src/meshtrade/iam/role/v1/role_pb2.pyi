from meshtrade.iam.role.v1 import permission_pb2 as _permission_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Role(_message.Message):
    __slots__ = ("name", "permissions")
    NAME_FIELD_NUMBER: _ClassVar[int]
    PERMISSIONS_FIELD_NUMBER: _ClassVar[int]
    name: str
    permissions: _containers.RepeatedCompositeFieldContainer[_permission_pb2.Permission]
    def __init__(self, name: _Optional[str] = ..., permissions: _Optional[_Iterable[_Union[_permission_pb2.Permission, _Mapping]]] = ...) -> None: ...
