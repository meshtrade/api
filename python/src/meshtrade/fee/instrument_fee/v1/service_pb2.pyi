from meshtrade.fee.instrument_fee.v1 import instrument_fee_pb2 as _instrument_fee_pb2
from meshtrade.fee.instrument_fee_profile.v1 import lifecycle_event_category_pb2 as _lifecycle_event_category_pb2
from meshtrade.type.v1 import amount_pb2 as _amount_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class ListRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class ListResponse(_message.Message):
    __slots__ = ("fees",)
    FEES_FIELD_NUMBER: _ClassVar[int]
    fees: _containers.RepeatedCompositeFieldContainer[_instrument_fee_pb2.InstrumentFee]
    def __init__(self, fees: _Optional[_Iterable[_Union[_instrument_fee_pb2.InstrumentFee, _Mapping]]] = ...) -> None: ...

class CalculateMintingFeesRequest(_message.Message):
    __slots__ = ("amount",)
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    amount: _amount_pb2.Amount
    def __init__(self, amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ...) -> None: ...

class CalculateMintingFeesResponse(_message.Message):
    __slots__ = ("fees",)
    FEES_FIELD_NUMBER: _ClassVar[int]
    fees: _containers.RepeatedCompositeFieldContainer[_instrument_fee_pb2.InstrumentFee]
    def __init__(self, fees: _Optional[_Iterable[_Union[_instrument_fee_pb2.InstrumentFee, _Mapping]]] = ...) -> None: ...

class CalculateBurningFeesRequest(_message.Message):
    __slots__ = ("amount",)
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    amount: _amount_pb2.Amount
    def __init__(self, amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ...) -> None: ...

class CalculateBurningFeesResponse(_message.Message):
    __slots__ = ("fees",)
    FEES_FIELD_NUMBER: _ClassVar[int]
    fees: _containers.RepeatedCompositeFieldContainer[_instrument_fee_pb2.InstrumentFee]
    def __init__(self, fees: _Optional[_Iterable[_Union[_instrument_fee_pb2.InstrumentFee, _Mapping]]] = ...) -> None: ...

class CalculateLifecycleFeesRequest(_message.Message):
    __slots__ = ("instrument_id", "lifecycle_event_category")
    INSTRUMENT_ID_FIELD_NUMBER: _ClassVar[int]
    LIFECYCLE_EVENT_CATEGORY_FIELD_NUMBER: _ClassVar[int]
    instrument_id: str
    lifecycle_event_category: _lifecycle_event_category_pb2.LifecycleEventCategory
    def __init__(self, instrument_id: _Optional[str] = ..., lifecycle_event_category: _Optional[_Union[_lifecycle_event_category_pb2.LifecycleEventCategory, str]] = ...) -> None: ...

class CalculateLifecycleFeesResponse(_message.Message):
    __slots__ = ("fees",)
    FEES_FIELD_NUMBER: _ClassVar[int]
    fees: _containers.RepeatedCompositeFieldContainer[_instrument_fee_pb2.InstrumentFee]
    def __init__(self, fees: _Optional[_Iterable[_Union[_instrument_fee_pb2.InstrumentFee, _Mapping]]] = ...) -> None: ...

class FullUpdateRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class FullUpdateResponse(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...
