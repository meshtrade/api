from api.python.lib.ledger import network_pb2 as _network_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Token(_message.Message):
    __slots__ = ("code", "issuer", "network")
    CODE_FIELD_NUMBER: _ClassVar[int]
    ISSUER_FIELD_NUMBER: _ClassVar[int]
    NETWORK_FIELD_NUMBER: _ClassVar[int]
    code: str
    issuer: str
    network: _network_pb2.Network
    def __init__(self, code: _Optional[str] = ..., issuer: _Optional[str] = ..., network: _Optional[_Union[_network_pb2.Network, str]] = ...) -> None: ...
