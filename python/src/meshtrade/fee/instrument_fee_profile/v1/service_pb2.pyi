from meshtrade.fee.instrument_fee_profile.v1 import fee_profile_pb2 as _fee_profile_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class CreateRequest(_message.Message):
    __slots__ = ("fee_profile",)
    FEE_PROFILE_FIELD_NUMBER: _ClassVar[int]
    fee_profile: _fee_profile_pb2.FeeProfile
    def __init__(self, fee_profile: _Optional[_Union[_fee_profile_pb2.FeeProfile, _Mapping]] = ...) -> None: ...

class CreateResponse(_message.Message):
    __slots__ = ("fee_profile",)
    FEE_PROFILE_FIELD_NUMBER: _ClassVar[int]
    fee_profile: _fee_profile_pb2.FeeProfile
    def __init__(self, fee_profile: _Optional[_Union[_fee_profile_pb2.FeeProfile, _Mapping]] = ...) -> None: ...

class UpdateRequest(_message.Message):
    __slots__ = ("fee_profile",)
    FEE_PROFILE_FIELD_NUMBER: _ClassVar[int]
    fee_profile: _fee_profile_pb2.FeeProfile
    def __init__(self, fee_profile: _Optional[_Union[_fee_profile_pb2.FeeProfile, _Mapping]] = ...) -> None: ...

class UpdateResponse(_message.Message):
    __slots__ = ("fee_profile",)
    FEE_PROFILE_FIELD_NUMBER: _ClassVar[int]
    fee_profile: _fee_profile_pb2.FeeProfile
    def __init__(self, fee_profile: _Optional[_Union[_fee_profile_pb2.FeeProfile, _Mapping]] = ...) -> None: ...

class ListRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class ListResponse(_message.Message):
    __slots__ = ("fee_profiles",)
    FEE_PROFILES_FIELD_NUMBER: _ClassVar[int]
    fee_profiles: _containers.RepeatedCompositeFieldContainer[_fee_profile_pb2.FeeProfile]
    def __init__(self, fee_profiles: _Optional[_Iterable[_Union[_fee_profile_pb2.FeeProfile, _Mapping]]] = ...) -> None: ...

class GetRequest(_message.Message):
    __slots__ = ("instrument_id",)
    INSTRUMENT_ID_FIELD_NUMBER: _ClassVar[int]
    instrument_id: str
    def __init__(self, instrument_id: _Optional[str] = ...) -> None: ...

class GetResponse(_message.Message):
    __slots__ = ("fee_profile",)
    FEE_PROFILE_FIELD_NUMBER: _ClassVar[int]
    fee_profile: _fee_profile_pb2.FeeProfile
    def __init__(self, fee_profile: _Optional[_Union[_fee_profile_pb2.FeeProfile, _Mapping]] = ...) -> None: ...
