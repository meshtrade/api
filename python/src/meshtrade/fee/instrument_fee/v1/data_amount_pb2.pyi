from meshtrade.type.v1 import amount_pb2 as _amount_pb2
from meshtrade.type.v1 import decimal_pb2 as _decimal_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class AmountData(_message.Message):
    __slots__ = ("amount_excl_vat", "vat_rate")
    AMOUNT_EXCL_VAT_FIELD_NUMBER: _ClassVar[int]
    VAT_RATE_FIELD_NUMBER: _ClassVar[int]
    amount_excl_vat: _amount_pb2.Amount
    vat_rate: _decimal_pb2.Decimal
    def __init__(self, amount_excl_vat: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., vat_rate: _Optional[_Union[_decimal_pb2.Decimal, _Mapping]] = ...) -> None: ...
