from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class ClientType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_COMPANY_ClientType: _ClassVar[ClientType]
    Issuer_COMPANY_ClientType: _ClassVar[ClientType]
    Investor_COMPANY_ClientType: _ClassVar[ClientType]
    Managing_Company_ClientType: _ClassVar[ClientType]
UNDEFINED_COMPANY_ClientType: ClientType
Issuer_COMPANY_ClientType: ClientType
Investor_COMPANY_ClientType: ClientType
Managing_Company_ClientType: ClientType
