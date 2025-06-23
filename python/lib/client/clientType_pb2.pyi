from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class ClientType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_COMPANY_CLIENT_TYPE: _ClassVar[ClientType]
    ISSUER_COMPANY_CLIENT_TYPE: _ClassVar[ClientType]
    INVESTOR_COMPANY_CLIENT_TYPE: _ClassVar[ClientType]
    MANAGING_COMPANY_CLIENT_TYPE: _ClassVar[ClientType]
UNDEFINED_COMPANY_CLIENT_TYPE: ClientType
ISSUER_COMPANY_CLIENT_TYPE: ClientType
INVESTOR_COMPANY_CLIENT_TYPE: ClientType
MANAGING_COMPANY_CLIENT_TYPE: ClientType
