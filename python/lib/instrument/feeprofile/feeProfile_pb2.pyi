from api.python.lib.instrument.feeprofile import tokenisation_pb2 as _tokenisation_pb2
from api.python.lib.instrument.feeprofile import lifecycleEvent_pb2 as _lifecycleEvent_pb2
from api.python.lib.instrument.feeprofile import aum_pb2 as _aum_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class FeeProfile(_message.Message):
    __slots__ = ("instrumentID", "tokenisation", "lifecycleEvents", "aum")
    INSTRUMENTID_FIELD_NUMBER: _ClassVar[int]
    TOKENISATION_FIELD_NUMBER: _ClassVar[int]
    LIFECYCLEEVENTS_FIELD_NUMBER: _ClassVar[int]
    AUM_FIELD_NUMBER: _ClassVar[int]
    instrumentID: str
    tokenisation: _tokenisation_pb2.Tokenisation
    lifecycleEvents: _containers.RepeatedCompositeFieldContainer[_lifecycleEvent_pb2.LifecycleEvent]
    aum: _aum_pb2.AUM
    def __init__(self, instrumentID: _Optional[str] = ..., tokenisation: _Optional[_Union[_tokenisation_pb2.Tokenisation, _Mapping]] = ..., lifecycleEvents: _Optional[_Iterable[_Union[_lifecycleEvent_pb2.LifecycleEvent, _Mapping]]] = ..., aum: _Optional[_Union[_aum_pb2.AUM, _Mapping]] = ...) -> None: ...
