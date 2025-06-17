from meshtrade.fee.instrument_fee_profile.v1 import aum_pb2 as _aum_pb2
from meshtrade.fee.instrument_fee_profile.v1 import lifecycle_event_pb2 as _lifecycle_event_pb2
from meshtrade.fee.instrument_fee_profile.v1 import tokenisation_pb2 as _tokenisation_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class FeeProfile(_message.Message):
    __slots__ = ("instrument_id", "tokenisation", "lifecycle_events", "aum")
    INSTRUMENT_ID_FIELD_NUMBER: _ClassVar[int]
    TOKENISATION_FIELD_NUMBER: _ClassVar[int]
    LIFECYCLE_EVENTS_FIELD_NUMBER: _ClassVar[int]
    AUM_FIELD_NUMBER: _ClassVar[int]
    instrument_id: str
    tokenisation: _tokenisation_pb2.Tokenisation
    lifecycle_events: _containers.RepeatedCompositeFieldContainer[_lifecycle_event_pb2.LifecycleEvent]
    aum: _aum_pb2.AUM
    def __init__(self, instrument_id: _Optional[str] = ..., tokenisation: _Optional[_Union[_tokenisation_pb2.Tokenisation, _Mapping]] = ..., lifecycle_events: _Optional[_Iterable[_Union[_lifecycle_event_pb2.LifecycleEvent, _Mapping]]] = ..., aum: _Optional[_Union[_aum_pb2.AUM, _Mapping]] = ...) -> None: ...
