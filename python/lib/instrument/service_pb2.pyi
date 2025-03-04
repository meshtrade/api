from api.python.lib.ledger import amount_pb2 as _amount_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class MintRequest(_message.Message):
    __slots__ = ("amount", "feeAccountNumber", "destinationAccountNumber")
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    FEEACCOUNTNUMBER_FIELD_NUMBER: _ClassVar[int]
    DESTINATIONACCOUNTNUMBER_FIELD_NUMBER: _ClassVar[int]
    amount: _amount_pb2.Amount
    feeAccountNumber: str
    destinationAccountNumber: str
    def __init__(self, amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., feeAccountNumber: _Optional[str] = ..., destinationAccountNumber: _Optional[str] = ...) -> None: ...

class MintResponse(_message.Message):
    __slots__ = ("transactionID",)
    TRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    transactionID: str
    def __init__(self, transactionID: _Optional[str] = ...) -> None: ...

class BurnRequest(_message.Message):
    __slots__ = ("amount", "feeAccountNumber", "sourceAccountNumber")
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    FEEACCOUNTNUMBER_FIELD_NUMBER: _ClassVar[int]
    SOURCEACCOUNTNUMBER_FIELD_NUMBER: _ClassVar[int]
    amount: _amount_pb2.Amount
    feeAccountNumber: str
    sourceAccountNumber: str
    def __init__(self, amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., feeAccountNumber: _Optional[str] = ..., sourceAccountNumber: _Optional[str] = ...) -> None: ...

class BurnResponse(_message.Message):
    __slots__ = ("transactionID",)
    TRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    transactionID: str
    def __init__(self, transactionID: _Optional[str] = ...) -> None: ...
