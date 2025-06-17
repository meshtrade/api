from meshtrade.type.v1 import ledger_pb2 as _ledger_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Token(_message.Message):
    __slots__ = ("code", "issuer", "ledger")
    CODE_FIELD_NUMBER: _ClassVar[int]
    ISSUER_FIELD_NUMBER: _ClassVar[int]
    LEDGER_FIELD_NUMBER: _ClassVar[int]
    code: str
    issuer: str
    ledger: _ledger_pb2.Ledger
    def __init__(self, code: _Optional[str] = ..., issuer: _Optional[str] = ..., ledger: _Optional[_Union[_ledger_pb2.Ledger, str]] = ...) -> None: ...
