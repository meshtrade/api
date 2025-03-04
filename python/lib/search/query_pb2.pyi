from api.python.lib.search import sorting_pb2 as _sorting_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Query(_message.Message):
    __slots__ = ("limit", "offset", "sorting")
    LIMIT_FIELD_NUMBER: _ClassVar[int]
    OFFSET_FIELD_NUMBER: _ClassVar[int]
    SORTING_FIELD_NUMBER: _ClassVar[int]
    limit: int
    offset: int
    sorting: _containers.RepeatedCompositeFieldContainer[_sorting_pb2.Sorting]
    def __init__(self, limit: _Optional[int] = ..., offset: _Optional[int] = ..., sorting: _Optional[_Iterable[_Union[_sorting_pb2.Sorting, _Mapping]]] = ...) -> None: ...
