from api.python.lib.search import boolExactCriterion_pb2 as _boolExactCriterion_pb2
from api.python.lib.search import textExactCriterion_pb2 as _textExactCriterion_pb2
from api.python.lib.search import textNEExactCriterion_pb2 as _textNEExactCriterion_pb2
from api.python.lib.search import textSubstringCriterion_pb2 as _textSubstringCriterion_pb2
from api.python.lib.search import textListCriterion_pb2 as _textListCriterion_pb2
from api.python.lib.search import textNINListCriterion_pb2 as _textNINListCriterion_pb2
from api.python.lib.search import uint32ExactCriterion_pb2 as _uint32ExactCriterion_pb2
from api.python.lib.search import uint32NEExactCriterion_pb2 as _uint32NEExactCriterion_pb2
from api.python.lib.search import uint32ListCriterion_pb2 as _uint32ListCriterion_pb2
from api.python.lib.search import uint32RangeCriterion_pb2 as _uint32RangeCriterion_pb2
from api.python.lib.search import uint32NINListCriterion_pb2 as _uint32NINListCriterion_pb2
from api.python.lib.search import dateRangeCriterion_pb2 as _dateRangeCriterion_pb2
from api.python.lib.search import int64ExactCriterion_pb2 as _int64ExactCriterion_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Criterion(_message.Message):
    __slots__ = ("orCriterion", "boolExactCriterion", "textExactCriterion", "textNEExactCriterion", "textSubstringCriterion", "textListCriterion", "textNINListCriterion", "uint32ExactCriterion", "uint32NEExactCriterion", "uint32ListCriterion", "uint32RangeCriterion", "uint32NINListCriterion", "dateRangeCriterion", "int64ExactCriterion")
    ORCRITERION_FIELD_NUMBER: _ClassVar[int]
    BOOLEXACTCRITERION_FIELD_NUMBER: _ClassVar[int]
    TEXTEXACTCRITERION_FIELD_NUMBER: _ClassVar[int]
    TEXTNEEXACTCRITERION_FIELD_NUMBER: _ClassVar[int]
    TEXTSUBSTRINGCRITERION_FIELD_NUMBER: _ClassVar[int]
    TEXTLISTCRITERION_FIELD_NUMBER: _ClassVar[int]
    TEXTNINLISTCRITERION_FIELD_NUMBER: _ClassVar[int]
    UINT32EXACTCRITERION_FIELD_NUMBER: _ClassVar[int]
    UINT32NEEXACTCRITERION_FIELD_NUMBER: _ClassVar[int]
    UINT32LISTCRITERION_FIELD_NUMBER: _ClassVar[int]
    UINT32RANGECRITERION_FIELD_NUMBER: _ClassVar[int]
    UINT32NINLISTCRITERION_FIELD_NUMBER: _ClassVar[int]
    DATERANGECRITERION_FIELD_NUMBER: _ClassVar[int]
    INT64EXACTCRITERION_FIELD_NUMBER: _ClassVar[int]
    orCriterion: ORCriterion
    boolExactCriterion: _boolExactCriterion_pb2.BoolExactCriterion
    textExactCriterion: _textExactCriterion_pb2.TextExactCriterion
    textNEExactCriterion: _textNEExactCriterion_pb2.TextNEExactCriterion
    textSubstringCriterion: _textSubstringCriterion_pb2.TextSubstringCriterion
    textListCriterion: _textListCriterion_pb2.TextListCriterion
    textNINListCriterion: _textNINListCriterion_pb2.TextNINListCriterion
    uint32ExactCriterion: _uint32ExactCriterion_pb2.Uint32ExactCriterion
    uint32NEExactCriterion: _uint32NEExactCriterion_pb2.Uint32NEExactCriterion
    uint32ListCriterion: _uint32ListCriterion_pb2.Uint32ListCriterion
    uint32RangeCriterion: _uint32ListCriterion_pb2.Uint32ListCriterion
    uint32NINListCriterion: _uint32NINListCriterion_pb2.Uint32NINListCriterion
    dateRangeCriterion: _dateRangeCriterion_pb2.DateRangeCriterion
    int64ExactCriterion: _int64ExactCriterion_pb2.Int64ExactCriterion
    def __init__(self, orCriterion: _Optional[_Union[ORCriterion, _Mapping]] = ..., boolExactCriterion: _Optional[_Union[_boolExactCriterion_pb2.BoolExactCriterion, _Mapping]] = ..., textExactCriterion: _Optional[_Union[_textExactCriterion_pb2.TextExactCriterion, _Mapping]] = ..., textNEExactCriterion: _Optional[_Union[_textNEExactCriterion_pb2.TextNEExactCriterion, _Mapping]] = ..., textSubstringCriterion: _Optional[_Union[_textSubstringCriterion_pb2.TextSubstringCriterion, _Mapping]] = ..., textListCriterion: _Optional[_Union[_textListCriterion_pb2.TextListCriterion, _Mapping]] = ..., textNINListCriterion: _Optional[_Union[_textNINListCriterion_pb2.TextNINListCriterion, _Mapping]] = ..., uint32ExactCriterion: _Optional[_Union[_uint32ExactCriterion_pb2.Uint32ExactCriterion, _Mapping]] = ..., uint32NEExactCriterion: _Optional[_Union[_uint32NEExactCriterion_pb2.Uint32NEExactCriterion, _Mapping]] = ..., uint32ListCriterion: _Optional[_Union[_uint32ListCriterion_pb2.Uint32ListCriterion, _Mapping]] = ..., uint32RangeCriterion: _Optional[_Union[_uint32ListCriterion_pb2.Uint32ListCriterion, _Mapping]] = ..., uint32NINListCriterion: _Optional[_Union[_uint32NINListCriterion_pb2.Uint32NINListCriterion, _Mapping]] = ..., dateRangeCriterion: _Optional[_Union[_dateRangeCriterion_pb2.DateRangeCriterion, _Mapping]] = ..., int64ExactCriterion: _Optional[_Union[_int64ExactCriterion_pb2.Int64ExactCriterion, _Mapping]] = ...) -> None: ...

class ORCriterion(_message.Message):
    __slots__ = ("criteria",)
    CRITERIA_FIELD_NUMBER: _ClassVar[int]
    criteria: _containers.RepeatedCompositeFieldContainer[Criterion]
    def __init__(self, criteria: _Optional[_Iterable[_Union[Criterion, _Mapping]]] = ...) -> None: ...
