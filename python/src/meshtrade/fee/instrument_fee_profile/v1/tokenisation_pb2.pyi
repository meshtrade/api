from meshtrade.type.v1 import amount_pb2 as _amount_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Tokenisation(_message.Message):
    __slots__ = ("first_time_minting_amount", "minting_amount", "burning_amount")
    FIRST_TIME_MINTING_AMOUNT_FIELD_NUMBER: _ClassVar[int]
    MINTING_AMOUNT_FIELD_NUMBER: _ClassVar[int]
    BURNING_AMOUNT_FIELD_NUMBER: _ClassVar[int]
    first_time_minting_amount: _amount_pb2.Amount
    minting_amount: _amount_pb2.Amount
    burning_amount: _amount_pb2.Amount
    def __init__(self, first_time_minting_amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., minting_amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., burning_amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ...) -> None: ...
