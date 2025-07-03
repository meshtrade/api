from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class TransactionState(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    TRANSACTION_STATE_UNSPECIFIED: _ClassVar[TransactionState]
    TRANSACTION_STATE_DRAFT: _ClassVar[TransactionState]
    TRANSACTION_STATE_SIGNING_IN_PROGRESS: _ClassVar[TransactionState]
    TRANSACTION_STATE_PENDING: _ClassVar[TransactionState]
    TRANSACTION_STATE_SUBMISSION_IN_PROGRESS: _ClassVar[TransactionState]
    TRANSACTION_STATE_FAILED: _ClassVar[TransactionState]
    TRANSACTION_STATE_INDETERMINATE: _ClassVar[TransactionState]
    TRANSACTION_STATE_SUCCESSFUL: _ClassVar[TransactionState]
TRANSACTION_STATE_UNSPECIFIED: TransactionState
TRANSACTION_STATE_DRAFT: TransactionState
TRANSACTION_STATE_SIGNING_IN_PROGRESS: TransactionState
TRANSACTION_STATE_PENDING: TransactionState
TRANSACTION_STATE_SUBMISSION_IN_PROGRESS: TransactionState
TRANSACTION_STATE_FAILED: TransactionState
TRANSACTION_STATE_INDETERMINATE: TransactionState
TRANSACTION_STATE_SUCCESSFUL: TransactionState
