from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class TransactionAction(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    TRANSACTION_ACTION_UNSPECIFIED: _ClassVar[TransactionAction]
    TRANSACTION_ACTION_DO_NOTHING: _ClassVar[TransactionAction]
    TRANSACTION_ACTION_BUILD: _ClassVar[TransactionAction]
    TRANSACTION_ACTION_COMMIT: _ClassVar[TransactionAction]
    TRANSACTION_ACTION_SIGN: _ClassVar[TransactionAction]
    TRANSACTION_ACTION_MARK_PENDING: _ClassVar[TransactionAction]
    TRANSACTION_ACTION_SUBMIT: _ClassVar[TransactionAction]
TRANSACTION_ACTION_UNSPECIFIED: TransactionAction
TRANSACTION_ACTION_DO_NOTHING: TransactionAction
TRANSACTION_ACTION_BUILD: TransactionAction
TRANSACTION_ACTION_COMMIT: TransactionAction
TRANSACTION_ACTION_SIGN: TransactionAction
TRANSACTION_ACTION_MARK_PENDING: TransactionAction
TRANSACTION_ACTION_SUBMIT: TransactionAction
