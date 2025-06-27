from meshtrade.trading.direct_order.v1 import direct_order_pb2 as _direct_order_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class GetDirectOrderRequest(_message.Message):
    __slots__ = ("number",)
    NUMBER_FIELD_NUMBER: _ClassVar[int]
    number: str
    def __init__(self, number: _Optional[str] = ...) -> None: ...

class GetDirectOrderResponse(_message.Message):
    __slots__ = ("directorder",)
    DIRECTORDER_FIELD_NUMBER: _ClassVar[int]
    directorder: _direct_order_pb2.DirectOrder
    def __init__(self, directorder: _Optional[_Union[_direct_order_pb2.DirectOrder, _Mapping]] = ...) -> None: ...
