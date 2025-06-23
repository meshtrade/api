from google.protobuf import descriptor_pb2 as _descriptor_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor
REQUIRED_PERMISSIONS_FIELD_NUMBER: _ClassVar[int]
required_permissions: _descriptor.FieldDescriptor
REQUIRED_ROLES_FIELD_NUMBER: _ClassVar[int]
required_roles: _descriptor.FieldDescriptor
STANDARD_ROLES_FIELD_NUMBER: _ClassVar[int]
standard_roles: _descriptor.FieldDescriptor

class StandardRole(_message.Message):
    __slots__ = ("name", "permissions")
    NAME_FIELD_NUMBER: _ClassVar[int]
    PERMISSIONS_FIELD_NUMBER: _ClassVar[int]
    name: str
    permissions: _containers.RepeatedScalarFieldContainer[str]
    def __init__(self, name: _Optional[str] = ..., permissions: _Optional[_Iterable[str]] = ...) -> None: ...

class PermissionStringList(_message.Message):
    __slots__ = ("permissions",)
    PERMISSIONS_FIELD_NUMBER: _ClassVar[int]
    permissions: _containers.RepeatedScalarFieldContainer[str]
    def __init__(self, permissions: _Optional[_Iterable[str]] = ...) -> None: ...

class StandardRoleNameList(_message.Message):
    __slots__ = ("roles",)
    ROLES_FIELD_NUMBER: _ClassVar[int]
    roles: _containers.RepeatedScalarFieldContainer[str]
    def __init__(self, roles: _Optional[_Iterable[str]] = ...) -> None: ...

class StandardRoleList(_message.Message):
    __slots__ = ("roles",)
    ROLES_FIELD_NUMBER: _ClassVar[int]
    roles: _containers.RepeatedCompositeFieldContainer[StandardRole]
    def __init__(self, roles: _Optional[_Iterable[_Union[StandardRole, _Mapping]]] = ...) -> None: ...
