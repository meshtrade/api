from api.python.lib.ledger import amount_pb2 as _amount_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Tokenisation(_message.Message):
    __slots__ = ("firstTimeMintingAmount", "mintingAmount", "burningAmount")
    FIRSTTIMEMINTINGAMOUNT_FIELD_NUMBER: _ClassVar[int]
    MINTINGAMOUNT_FIELD_NUMBER: _ClassVar[int]
    BURNINGAMOUNT_FIELD_NUMBER: _ClassVar[int]
    firstTimeMintingAmount: _amount_pb2.Amount
    mintingAmount: _amount_pb2.Amount
    burningAmount: _amount_pb2.Amount
    def __init__(self, firstTimeMintingAmount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., mintingAmount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., burningAmount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ...) -> None: ...
