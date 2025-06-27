from meshtrade.iam.role.v1 import role_pb2 as _role_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class GetRoleRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class GetRoleResponse(_message.Message):
    __slots__ = ("role",)
    ROLE_FIELD_NUMBER: _ClassVar[int]
    role: _role_pb2.Role
    def __init__(self, role: _Optional[_Union[_role_pb2.Role, _Mapping]] = ...) -> None: ...
