from google.protobuf import descriptor_pb2 as _descriptor_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class StandardRole(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    STANDARD_ROLE_UNSPECIFIED: _ClassVar[StandardRole]
    STANDARD_ROLE_WALLET_ADMIN: _ClassVar[StandardRole]
    STANDARD_ROLE_WALLET_VIEWER: _ClassVar[StandardRole]
STANDARD_ROLE_UNSPECIFIED: StandardRole
STANDARD_ROLE_WALLET_ADMIN: StandardRole
STANDARD_ROLE_WALLET_VIEWER: StandardRole
STANDARD_ROLES_FIELD_NUMBER: _ClassVar[int]
standard_roles: _descriptor.FieldDescriptor
REQUIRED_ROLES_FIELD_NUMBER: _ClassVar[int]
required_roles: _descriptor.FieldDescriptor

class StandardRoleList(_message.Message):
    __slots__ = ("roles",)
    ROLES_FIELD_NUMBER: _ClassVar[int]
    roles: _containers.RepeatedScalarFieldContainer[StandardRole]
    def __init__(self, roles: _Optional[_Iterable[_Union[StandardRole, str]]] = ...) -> None: ...
