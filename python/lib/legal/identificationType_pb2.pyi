from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class IdentificationType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_IDENTIFICATION_TYPE: _ClassVar[IdentificationType]
    SOUTH_AFRICAN_ID_IDENTIFICATION_TYPE: _ClassVar[IdentificationType]
    PASSPORT_IDENTIFICATION_TYPE: _ClassVar[IdentificationType]
UNDEFINED_IDENTIFICATION_TYPE: IdentificationType
SOUTH_AFRICAN_ID_IDENTIFICATION_TYPE: IdentificationType
PASSPORT_IDENTIFICATION_TYPE: IdentificationType
