from api.python.lib.instrument.feeprofile import feeProfile_pb2 as _feeProfile_pb2
from api.python.lib.search import criterion_pb2 as _criterion_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class CreateRequest(_message.Message):
    __slots__ = ("feeProfile",)
    FEEPROFILE_FIELD_NUMBER: _ClassVar[int]
    feeProfile: _feeProfile_pb2.FeeProfile
    def __init__(self, feeProfile: _Optional[_Union[_feeProfile_pb2.FeeProfile, _Mapping]] = ...) -> None: ...

class CreateResponse(_message.Message):
    __slots__ = ("feeProfile",)
    FEEPROFILE_FIELD_NUMBER: _ClassVar[int]
    feeProfile: _feeProfile_pb2.FeeProfile
    def __init__(self, feeProfile: _Optional[_Union[_feeProfile_pb2.FeeProfile, _Mapping]] = ...) -> None: ...

class UpdateRequest(_message.Message):
    __slots__ = ("feeProfile",)
    FEEPROFILE_FIELD_NUMBER: _ClassVar[int]
    feeProfile: _feeProfile_pb2.FeeProfile
    def __init__(self, feeProfile: _Optional[_Union[_feeProfile_pb2.FeeProfile, _Mapping]] = ...) -> None: ...

class UpdateResponse(_message.Message):
    __slots__ = ("feeProfile",)
    FEEPROFILE_FIELD_NUMBER: _ClassVar[int]
    feeProfile: _feeProfile_pb2.FeeProfile
    def __init__(self, feeProfile: _Optional[_Union[_feeProfile_pb2.FeeProfile, _Mapping]] = ...) -> None: ...

class ListRequest(_message.Message):
    __slots__ = ("criteria",)
    CRITERIA_FIELD_NUMBER: _ClassVar[int]
    criteria: _containers.RepeatedCompositeFieldContainer[_criterion_pb2.Criterion]
    def __init__(self, criteria: _Optional[_Iterable[_Union[_criterion_pb2.Criterion, _Mapping]]] = ...) -> None: ...

class ListResponse(_message.Message):
    __slots__ = ("feeProfiles",)
    FEEPROFILES_FIELD_NUMBER: _ClassVar[int]
    feeProfiles: _containers.RepeatedCompositeFieldContainer[_feeProfile_pb2.FeeProfile]
    def __init__(self, feeProfiles: _Optional[_Iterable[_Union[_feeProfile_pb2.FeeProfile, _Mapping]]] = ...) -> None: ...
