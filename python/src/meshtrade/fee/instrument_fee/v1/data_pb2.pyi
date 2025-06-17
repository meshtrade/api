from meshtrade.fee.instrument_fee.v1 import data_amount_pb2 as _data_amount_pb2
from meshtrade.fee.instrument_fee.v1 import data_per_unit_pb2 as _data_per_unit_pb2
from meshtrade.fee.instrument_fee.v1 import data_rate_pb2 as _data_rate_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Data(_message.Message):
    __slots__ = ("amount_data", "rate_data", "per_unit_data")
    AMOUNT_DATA_FIELD_NUMBER: _ClassVar[int]
    RATE_DATA_FIELD_NUMBER: _ClassVar[int]
    PER_UNIT_DATA_FIELD_NUMBER: _ClassVar[int]
    amount_data: _data_amount_pb2.AmountData
    rate_data: _data_rate_pb2.RateData
    per_unit_data: _data_per_unit_pb2.PerUnitData
    def __init__(self, amount_data: _Optional[_Union[_data_amount_pb2.AmountData, _Mapping]] = ..., rate_data: _Optional[_Union[_data_rate_pb2.RateData, _Mapping]] = ..., per_unit_data: _Optional[_Union[_data_per_unit_pb2.PerUnitData, _Mapping]] = ...) -> None: ...
