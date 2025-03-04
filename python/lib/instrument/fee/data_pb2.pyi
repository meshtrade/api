from api.python.lib.instrument.fee import dataAmount_pb2 as _dataAmount_pb2
from api.python.lib.instrument.fee import dataRate_pb2 as _dataRate_pb2
from api.python.lib.instrument.fee import dataPerUnit_pb2 as _dataPerUnit_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Data(_message.Message):
    __slots__ = ("amountData", "rateData", "perUnitData")
    AMOUNTDATA_FIELD_NUMBER: _ClassVar[int]
    RATEDATA_FIELD_NUMBER: _ClassVar[int]
    PERUNITDATA_FIELD_NUMBER: _ClassVar[int]
    amountData: _dataAmount_pb2.AmountData
    rateData: _dataRate_pb2.RateData
    perUnitData: _dataPerUnit_pb2.PerUnitData
    def __init__(self, amountData: _Optional[_Union[_dataAmount_pb2.AmountData, _Mapping]] = ..., rateData: _Optional[_Union[_dataRate_pb2.RateData, _Mapping]] = ..., perUnitData: _Optional[_Union[_dataPerUnit_pb2.PerUnitData, _Mapping]] = ...) -> None: ...
