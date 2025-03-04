from api.python.lib.instrument.feeprofile import lifecycleEventCalculationConfigAmount_pb2 as _lifecycleEventCalculationConfigAmount_pb2
from api.python.lib.instrument.feeprofile import lifecycleEventCalculationConfigRate_pb2 as _lifecycleEventCalculationConfigRate_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class LifecycleEventCalculationConfig(_message.Message):
    __slots__ = ("amountLifecycleEventCalculationConfig", "rateLifecycleEventCalculationConfig")
    AMOUNTLIFECYCLEEVENTCALCULATIONCONFIG_FIELD_NUMBER: _ClassVar[int]
    RATELIFECYCLEEVENTCALCULATIONCONFIG_FIELD_NUMBER: _ClassVar[int]
    amountLifecycleEventCalculationConfig: _lifecycleEventCalculationConfigAmount_pb2.AmountLifecycleEventCalculationConfig
    rateLifecycleEventCalculationConfig: _lifecycleEventCalculationConfigRate_pb2.RateLifecycleEventCalculationConfig
    def __init__(self, amountLifecycleEventCalculationConfig: _Optional[_Union[_lifecycleEventCalculationConfigAmount_pb2.AmountLifecycleEventCalculationConfig, _Mapping]] = ..., rateLifecycleEventCalculationConfig: _Optional[_Union[_lifecycleEventCalculationConfigRate_pb2.RateLifecycleEventCalculationConfig, _Mapping]] = ...) -> None: ...
