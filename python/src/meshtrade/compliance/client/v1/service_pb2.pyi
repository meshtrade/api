from meshtrade.compliance.client.v1 import client_pb2 as _client_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class GetClientRequest(_message.Message):
    __slots__ = ("name",)
    NAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    def __init__(self, name: _Optional[str] = ...) -> None: ...

class GetClientResponse(_message.Message):
    __slots__ = ("client",)
    CLIENT_FIELD_NUMBER: _ClassVar[int]
    client: _client_pb2.Client
    def __init__(self, client: _Optional[_Union[_client_pb2.Client, _Mapping]] = ...) -> None: ...

class ListClientsRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class ListClientsResponse(_message.Message):
    __slots__ = ("clients",)
    CLIENTS_FIELD_NUMBER: _ClassVar[int]
    clients: _containers.RepeatedCompositeFieldContainer[_client_pb2.Client]
    def __init__(self, clients: _Optional[_Iterable[_Union[_client_pb2.Client, _Mapping]]] = ...) -> None: ...
