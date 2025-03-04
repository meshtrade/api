from api.python.lib.ledger import token_pb2 as _token_pb2
from api.python.lib.num import decimal_pb2 as _decimal_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Amount(_message.Message):
    __slots__ = ("token", "value")
    TOKEN_FIELD_NUMBER: _ClassVar[int]
    VALUE_FIELD_NUMBER: _ClassVar[int]
    token: _token_pb2.Token
    value: _decimal_pb2.Decimal
    def __init__(self, token: _Optional[_Union[_token_pb2.Token, _Mapping]] = ..., value: _Optional[_Union[_decimal_pb2.Decimal, _Mapping]] = ...) -> None: ...
