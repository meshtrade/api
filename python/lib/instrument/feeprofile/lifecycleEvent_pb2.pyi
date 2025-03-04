from api.python.lib.instrument.feeprofile import lifecycleEventCategory_pb2 as _lifecycleEventCategory_pb2
from api.python.lib.instrument.feeprofile import lifecycleEventCalculationConfig_pb2 as _lifecycleEventCalculationConfig_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class LifecycleEvent(_message.Message):
    __slots__ = ("description", "category", "calculationConfig")
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    CATEGORY_FIELD_NUMBER: _ClassVar[int]
    CALCULATIONCONFIG_FIELD_NUMBER: _ClassVar[int]
    description: str
    category: _lifecycleEventCategory_pb2.LifecycleEventCategory
    calculationConfig: _lifecycleEventCalculationConfig_pb2.LifecycleEventCalculationConfig
    def __init__(self, description: _Optional[str] = ..., category: _Optional[_Union[_lifecycleEventCategory_pb2.LifecycleEventCategory, str]] = ..., calculationConfig: _Optional[_Union[_lifecycleEventCalculationConfig_pb2.LifecycleEventCalculationConfig, _Mapping]] = ...) -> None: ...
