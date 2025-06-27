from meshtrade.trading.spot.v1 import spot_pb2 as _spot_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class GetSpotRequest(_message.Message):
    __slots__ = ("number",)
    NUMBER_FIELD_NUMBER: _ClassVar[int]
    number: str
    def __init__(self, number: _Optional[str] = ...) -> None: ...

class GetSpotResponse(_message.Message):
    __slots__ = ("spot",)
    SPOT_FIELD_NUMBER: _ClassVar[int]
    spot: _spot_pb2.Spot
    def __init__(self, spot: _Optional[_Union[_spot_pb2.Spot, _Mapping]] = ...) -> None: ...
