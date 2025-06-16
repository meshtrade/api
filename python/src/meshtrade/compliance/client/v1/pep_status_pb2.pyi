from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class PepStatus(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    PEP_STATUS_UNSPECIFIED: _ClassVar[PepStatus]
    PEP_STATUS_IS_NOT_PEP: _ClassVar[PepStatus]
    PEP_STATUS_IS_PEP: _ClassVar[PepStatus]
    PEP_STATUS_IS_ASSOCIATE: _ClassVar[PepStatus]
PEP_STATUS_UNSPECIFIED: PepStatus
PEP_STATUS_IS_NOT_PEP: PepStatus
PEP_STATUS_IS_PEP: PepStatus
PEP_STATUS_IS_ASSOCIATE: PepStatus
