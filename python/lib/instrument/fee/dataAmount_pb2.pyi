from api.python.lib.ledger import amount_pb2 as _amount_pb2
from api.python.lib.num import decimal_pb2 as _decimal_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class AmountData(_message.Message):
    __slots__ = ("amountExclVAT", "vatRate")
    AMOUNTEXCLVAT_FIELD_NUMBER: _ClassVar[int]
    VATRATE_FIELD_NUMBER: _ClassVar[int]
    amountExclVAT: _amount_pb2.Amount
    vatRate: _decimal_pb2.Decimal
    def __init__(self, amountExclVAT: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., vatRate: _Optional[_Union[_decimal_pb2.Decimal, _Mapping]] = ...) -> None: ...
