from meshtrade.type.v1 import decimal_pb2 as _decimal_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class RateLifecycleEventCalculationConfig(_message.Message):
    __slots__ = ("rate",)
    RATE_FIELD_NUMBER: _ClassVar[int]
    rate: _decimal_pb2.Decimal
    def __init__(self, rate: _Optional[_Union[_decimal_pb2.Decimal, _Mapping]] = ...) -> None: ...
