from meshtrade.type.v1 import amount_pb2 as _amount_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class AmountLifecycleEventCalculationConfig(_message.Message):
    __slots__ = ("amount",)
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    amount: _amount_pb2.Amount
    def __init__(self, amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ...) -> None: ...
