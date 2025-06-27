from meshtrade.trading.limit_order.v1 import limit_order_pb2 as _limit_order_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class GetLimitOrderRequest(_message.Message):
    __slots__ = ("number",)
    NUMBER_FIELD_NUMBER: _ClassVar[int]
    number: str
    def __init__(self, number: _Optional[str] = ...) -> None: ...

class GetLimitOrderResponse(_message.Message):
    __slots__ = ("limitorder",)
    LIMITORDER_FIELD_NUMBER: _ClassVar[int]
    limitorder: _limit_order_pb2.LimitOrder
    def __init__(self, limitorder: _Optional[_Union[_limit_order_pb2.LimitOrder, _Mapping]] = ...) -> None: ...
