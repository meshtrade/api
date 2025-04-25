from api.python.lib.search import criterion_pb2 as _criterion_pb2
from api.python.lib.search import query_pb2 as _query_pb2
from api.python.lib.legal.company import company_pb2 as _company_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class ListRequest(_message.Message):
    __slots__ = ("criteria", "query")
    CRITERIA_FIELD_NUMBER: _ClassVar[int]
    QUERY_FIELD_NUMBER: _ClassVar[int]
    criteria: _containers.RepeatedCompositeFieldContainer[_criterion_pb2.Criterion]
    query: _query_pb2.Query
    def __init__(self, criteria: _Optional[_Iterable[_Union[_criterion_pb2.Criterion, _Mapping]]] = ..., query: _Optional[_Union[_query_pb2.Query, _Mapping]] = ...) -> None: ...

class ListResponse(_message.Message):
    __slots__ = ("companies", "total")
    COMPANIES_FIELD_NUMBER: _ClassVar[int]
    TOTAL_FIELD_NUMBER: _ClassVar[int]
    companies: _containers.RepeatedCompositeFieldContainer[_company_pb2.Company]
    total: int
    def __init__(self, companies: _Optional[_Iterable[_Union[_company_pb2.Company, _Mapping]]] = ..., total: _Optional[int] = ...) -> None: ...
