from meshtrade.fee.instrument_fee_profile.v1 import lifecycle_event_calculation_config_amount_pb2 as _lifecycle_event_calculation_config_amount_pb2
from meshtrade.fee.instrument_fee_profile.v1 import lifecycle_event_calculation_config_rate_pb2 as _lifecycle_event_calculation_config_rate_pb2
from meshtrade.fee.instrument_fee_profile.v1 import lifecycle_event_category_pb2 as _lifecycle_event_category_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class LifecycleEvent(_message.Message):
    __slots__ = ("description", "category", "amount_lifecycle_event_calculation_config", "rate_lifecycle_event_calculation_config")
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    CATEGORY_FIELD_NUMBER: _ClassVar[int]
    AMOUNT_LIFECYCLE_EVENT_CALCULATION_CONFIG_FIELD_NUMBER: _ClassVar[int]
    RATE_LIFECYCLE_EVENT_CALCULATION_CONFIG_FIELD_NUMBER: _ClassVar[int]
    description: str
    category: _lifecycle_event_category_pb2.LifecycleEventCategory
    amount_lifecycle_event_calculation_config: _lifecycle_event_calculation_config_amount_pb2.AmountLifecycleEventCalculationConfig
    rate_lifecycle_event_calculation_config: _lifecycle_event_calculation_config_rate_pb2.RateLifecycleEventCalculationConfig
    def __init__(self, description: _Optional[str] = ..., category: _Optional[_Union[_lifecycle_event_category_pb2.LifecycleEventCategory, str]] = ..., amount_lifecycle_event_calculation_config: _Optional[_Union[_lifecycle_event_calculation_config_amount_pb2.AmountLifecycleEventCalculationConfig, _Mapping]] = ..., rate_lifecycle_event_calculation_config: _Optional[_Union[_lifecycle_event_calculation_config_rate_pb2.RateLifecycleEventCalculationConfig, _Mapping]] = ...) -> None: ...
