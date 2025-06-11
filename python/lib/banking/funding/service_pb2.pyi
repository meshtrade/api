from api.python.lib.banking.funding import funding_pb2 as _funding_pb2
from api.python.lib.search import criterion_pb2 as _criterion_pb2
from api.python.lib.search import query_pb2 as _query_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class CreateRequest(_message.Message):
    __slots__ = ("funding",)
    FUNDING_FIELD_NUMBER: _ClassVar[int]
    funding: _funding_pb2.Funding
    def __init__(self, funding: _Optional[_Union[_funding_pb2.Funding, _Mapping]] = ...) -> None: ...

class CreateResponse(_message.Message):
    __slots__ = ("funding",)
    FUNDING_FIELD_NUMBER: _ClassVar[int]
    funding: _funding_pb2.Funding
    def __init__(self, funding: _Optional[_Union[_funding_pb2.Funding, _Mapping]] = ...) -> None: ...

class UpdateRequest(_message.Message):
    __slots__ = ("funding",)
    FUNDING_FIELD_NUMBER: _ClassVar[int]
    funding: _funding_pb2.Funding
    def __init__(self, funding: _Optional[_Union[_funding_pb2.Funding, _Mapping]] = ...) -> None: ...

class UpdateResponse(_message.Message):
    __slots__ = ("funding",)
    FUNDING_FIELD_NUMBER: _ClassVar[int]
    funding: _funding_pb2.Funding
    def __init__(self, funding: _Optional[_Union[_funding_pb2.Funding, _Mapping]] = ...) -> None: ...

class ListRequest(_message.Message):
    __slots__ = ("criteria", "query")
    CRITERIA_FIELD_NUMBER: _ClassVar[int]
    QUERY_FIELD_NUMBER: _ClassVar[int]
    criteria: _containers.RepeatedCompositeFieldContainer[_criterion_pb2.Criterion]
    query: _query_pb2.Query
    def __init__(self, criteria: _Optional[_Iterable[_Union[_criterion_pb2.Criterion, _Mapping]]] = ..., query: _Optional[_Union[_query_pb2.Query, _Mapping]] = ...) -> None: ...

class ListResponse(_message.Message):
    __slots__ = ("fundings", "total")
    FUNDINGS_FIELD_NUMBER: _ClassVar[int]
    TOTAL_FIELD_NUMBER: _ClassVar[int]
    fundings: _containers.RepeatedCompositeFieldContainer[_funding_pb2.Funding]
    total: int
    def __init__(self, fundings: _Optional[_Iterable[_Union[_funding_pb2.Funding, _Mapping]]] = ..., total: _Optional[int] = ...) -> None: ...

class GetRequest(_message.Message):
    __slots__ = ("criteria",)
    CRITERIA_FIELD_NUMBER: _ClassVar[int]
    criteria: _containers.RepeatedCompositeFieldContainer[_criterion_pb2.Criterion]
    def __init__(self, criteria: _Optional[_Iterable[_Union[_criterion_pb2.Criterion, _Mapping]]] = ...) -> None: ...

class GetResponse(_message.Message):
    __slots__ = ("funding",)
    FUNDING_FIELD_NUMBER: _ClassVar[int]
    funding: _funding_pb2.Funding
    def __init__(self, funding: _Optional[_Union[_funding_pb2.Funding, _Mapping]] = ...) -> None: ...

class SettleRequest(_message.Message):
    __slots__ = ("fundingNumber", "reason")
    FUNDINGNUMBER_FIELD_NUMBER: _ClassVar[int]
    REASON_FIELD_NUMBER: _ClassVar[int]
    fundingNumber: str
    reason: str
    def __init__(self, fundingNumber: _Optional[str] = ..., reason: _Optional[str] = ...) -> None: ...

class SettleResponse(_message.Message):
    __slots__ = ("funding",)
    FUNDING_FIELD_NUMBER: _ClassVar[int]
    funding: _funding_pb2.Funding
    def __init__(self, funding: _Optional[_Union[_funding_pb2.Funding, _Mapping]] = ...) -> None: ...
