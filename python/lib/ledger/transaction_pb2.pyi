from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class TransactionState(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_TRANSACTION_STATE: _ClassVar[TransactionState]
    DRAFT_TRANSACTION_STATE: _ClassVar[TransactionState]
    SIGNING_IN_PROGRESS_TRANSACTION_STATE: _ClassVar[TransactionState]
    PENDING_TRANSACTION_STATE: _ClassVar[TransactionState]
    SUBMISSION_IN_PROGRESS_TRANSACTION_STATE: _ClassVar[TransactionState]
    FAILED_TRANSACTION_STATE: _ClassVar[TransactionState]
    INDETERMINATE_TRANSACTION_STATE: _ClassVar[TransactionState]
    SUCCESSFUL_TRANSACTION_STATE: _ClassVar[TransactionState]

class TransactionAction(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_TRANSACTION_ACTION: _ClassVar[TransactionAction]
    DO_NOTHING_TRANSACTION_ACTION: _ClassVar[TransactionAction]
    BUILD_TRANSACTION_ACTION: _ClassVar[TransactionAction]
    COMMIT_TRANSACTION_ACTION: _ClassVar[TransactionAction]
    SIGN_TRANSACTION_ACTION: _ClassVar[TransactionAction]
    MARK_PENDING_TRANSACTION_ACTION: _ClassVar[TransactionAction]
    SUBMIT_TRANSACTION_ACTION: _ClassVar[TransactionAction]
UNDEFINED_TRANSACTION_STATE: TransactionState
DRAFT_TRANSACTION_STATE: TransactionState
SIGNING_IN_PROGRESS_TRANSACTION_STATE: TransactionState
PENDING_TRANSACTION_STATE: TransactionState
SUBMISSION_IN_PROGRESS_TRANSACTION_STATE: TransactionState
FAILED_TRANSACTION_STATE: TransactionState
INDETERMINATE_TRANSACTION_STATE: TransactionState
SUCCESSFUL_TRANSACTION_STATE: TransactionState
UNDEFINED_TRANSACTION_ACTION: TransactionAction
DO_NOTHING_TRANSACTION_ACTION: TransactionAction
BUILD_TRANSACTION_ACTION: TransactionAction
COMMIT_TRANSACTION_ACTION: TransactionAction
SIGN_TRANSACTION_ACTION: TransactionAction
MARK_PENDING_TRANSACTION_ACTION: TransactionAction
SUBMIT_TRANSACTION_ACTION: TransactionAction
