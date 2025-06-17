from meshtrade.type.v1 import amount_pb2 as _amount_pb2
from meshtrade.type.v1 import decimal_pb2 as _decimal_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class PerUnitData(_message.Message):
    __slots__ = ("no_units", "per_unit_amount", "amount_excl_vat", "vat_rate")
    NO_UNITS_FIELD_NUMBER: _ClassVar[int]
    PER_UNIT_AMOUNT_FIELD_NUMBER: _ClassVar[int]
    AMOUNT_EXCL_VAT_FIELD_NUMBER: _ClassVar[int]
    VAT_RATE_FIELD_NUMBER: _ClassVar[int]
    no_units: _decimal_pb2.Decimal
    per_unit_amount: _amount_pb2.Amount
    amount_excl_vat: _amount_pb2.Amount
    vat_rate: _decimal_pb2.Decimal
    def __init__(self, no_units: _Optional[_Union[_decimal_pb2.Decimal, _Mapping]] = ..., per_unit_amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., amount_excl_vat: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., vat_rate: _Optional[_Union[_decimal_pb2.Decimal, _Mapping]] = ...) -> None: ...
