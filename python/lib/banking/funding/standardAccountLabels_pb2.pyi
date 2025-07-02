from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class StandardPeachAccountLabel(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    ACCOUNT_LABEL_UNSPECIFIED: _ClassVar[StandardPeachAccountLabel]
    PEACH_FEE_ACCOUNT_STANDARD_LABEL: _ClassVar[StandardPeachAccountLabel]
    PEACH_SETTLEMENT_ACCOUNT_STANDARD_LABEL: _ClassVar[StandardPeachAccountLabel]
    PEACH_FLOAT_ACCOUNT_STANDARD_LABEL: _ClassVar[StandardPeachAccountLabel]
ACCOUNT_LABEL_UNSPECIFIED: StandardPeachAccountLabel
PEACH_FEE_ACCOUNT_STANDARD_LABEL: StandardPeachAccountLabel
PEACH_SETTLEMENT_ACCOUNT_STANDARD_LABEL: StandardPeachAccountLabel
PEACH_FLOAT_ACCOUNT_STANDARD_LABEL: StandardPeachAccountLabel
