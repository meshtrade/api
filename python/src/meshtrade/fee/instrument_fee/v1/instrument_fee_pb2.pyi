import datetime

from google.protobuf import timestamp_pb2 as _timestamp_pb2
from meshtrade.fee.instrument_fee.v1 import data_pb2 as _data_pb2
from meshtrade.type.v1 import amount_pb2 as _amount_pb2
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class State(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    STATE_UNSPECIFIED: _ClassVar[State]
    STATE_UPCOMING: _ClassVar[State]
    STATE_DUE: _ClassVar[State]
    STATE_PAYMENT_IN_PROGRESS: _ClassVar[State]
    STATE_FAILED: _ClassVar[State]
    STATE_CANCELLED: _ClassVar[State]
    STATE_PAID: _ClassVar[State]

class Category(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    CATEGORY_UNSPECIFIED: _ClassVar[Category]
    CATEGORY_TOKENISATION: _ClassVar[Category]
    CATEGORY_LISTING: _ClassVar[Category]
    CATEGORY_PRIMARY_MARKET_SETTLEMENT: _ClassVar[Category]
    CATEGORY_AUM: _ClassVar[Category]
STATE_UNSPECIFIED: State
STATE_UPCOMING: State
STATE_DUE: State
STATE_PAYMENT_IN_PROGRESS: State
STATE_FAILED: State
STATE_CANCELLED: State
STATE_PAID: State
CATEGORY_UNSPECIFIED: Category
CATEGORY_TOKENISATION: Category
CATEGORY_LISTING: Category
CATEGORY_PRIMARY_MARKET_SETTLEMENT: Category
CATEGORY_AUM: Category

class InstrumentFee(_message.Message):
    __slots__ = ("id", "instrument_name", "state", "description", "amount_incl_vat", "vat_amount", "category", "payment_date", "data")
    ID_FIELD_NUMBER: _ClassVar[int]
    INSTRUMENT_NAME_FIELD_NUMBER: _ClassVar[int]
    STATE_FIELD_NUMBER: _ClassVar[int]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    AMOUNT_INCL_VAT_FIELD_NUMBER: _ClassVar[int]
    VAT_AMOUNT_FIELD_NUMBER: _ClassVar[int]
    CATEGORY_FIELD_NUMBER: _ClassVar[int]
    PAYMENT_DATE_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    id: str
    instrument_name: str
    state: State
    description: str
    amount_incl_vat: _amount_pb2.Amount
    vat_amount: _amount_pb2.Amount
    category: Category
    payment_date: _timestamp_pb2.Timestamp
    data: _data_pb2.Data
    def __init__(self, id: _Optional[str] = ..., instrument_name: _Optional[str] = ..., state: _Optional[_Union[State, str]] = ..., description: _Optional[str] = ..., amount_incl_vat: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., vat_amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., category: _Optional[_Union[Category, str]] = ..., payment_date: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ..., data: _Optional[_Union[_data_pb2.Data, _Mapping]] = ...) -> None: ...
