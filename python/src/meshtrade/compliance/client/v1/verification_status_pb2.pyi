from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class VerificationStatus(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    VERIFICATION_STATUS_UNSPECIFIED: _ClassVar[VerificationStatus]
    VERIFICATION_STATUS_NOT_STARTED: _ClassVar[VerificationStatus]
    VERIFICATION_STATUS_PENDING: _ClassVar[VerificationStatus]
    VERIFICATION_STATUS_VERIFIED: _ClassVar[VerificationStatus]
    VERIFICATION_STATUS_FAILED: _ClassVar[VerificationStatus]
VERIFICATION_STATUS_UNSPECIFIED: VerificationStatus
VERIFICATION_STATUS_NOT_STARTED: VerificationStatus
VERIFICATION_STATUS_PENDING: VerificationStatus
VERIFICATION_STATUS_VERIFIED: VerificationStatus
VERIFICATION_STATUS_FAILED: VerificationStatus
