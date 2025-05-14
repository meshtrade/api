from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class ClientType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_COMPANY_Role: _ClassVar[ClientType]
    Issuer_COMPANY_Role: _ClassVar[ClientType]
    Investor_COMPANY_Role: _ClassVar[ClientType]
    Managing_Company_Role: _ClassVar[ClientType]
UNDEFINED_COMPANY_Role: ClientType
Issuer_COMPANY_Role: ClientType
Investor_COMPANY_Role: ClientType
Managing_Company_Role: ClientType
