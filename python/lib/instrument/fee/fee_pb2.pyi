from api.python.lib.instrument.fee import data_pb2 as _data_pb2
from api.python.lib.ledger import amount_pb2 as _amount_pb2
from google.protobuf import timestamp_pb2 as _timestamp_pb2
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class State(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_STATE: _ClassVar[State]
    UPCOMING_STATE: _ClassVar[State]
    DUE_STATE: _ClassVar[State]
    PAYMENT_IN_PROGRESS_STATE: _ClassVar[State]
    FAILED_STATE: _ClassVar[State]
    CANCELLED_STATE: _ClassVar[State]
    PAID_STATE: _ClassVar[State]

class Category(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_CATEGORY: _ClassVar[Category]
    TOKENISATION_CATEGORY: _ClassVar[Category]
    LISTING_CATEGORY: _ClassVar[Category]
    PRIMARY_MARKET_SETTLEMENT_CATEGORY: _ClassVar[Category]
    AUM_CATEGORY: _ClassVar[Category]
UNDEFINED_STATE: State
UPCOMING_STATE: State
DUE_STATE: State
PAYMENT_IN_PROGRESS_STATE: State
FAILED_STATE: State
CANCELLED_STATE: State
PAID_STATE: State
UNDEFINED_CATEGORY: Category
TOKENISATION_CATEGORY: Category
LISTING_CATEGORY: Category
PRIMARY_MARKET_SETTLEMENT_CATEGORY: Category
AUM_CATEGORY: Category

class Fee(_message.Message):
    __slots__ = ("id", "instrumentName", "state", "description", "amountInclVAT", "vatAmount", "category", "paymentDate", "data")
    ID_FIELD_NUMBER: _ClassVar[int]
    INSTRUMENTNAME_FIELD_NUMBER: _ClassVar[int]
    STATE_FIELD_NUMBER: _ClassVar[int]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    AMOUNTINCLVAT_FIELD_NUMBER: _ClassVar[int]
    VATAMOUNT_FIELD_NUMBER: _ClassVar[int]
    CATEGORY_FIELD_NUMBER: _ClassVar[int]
    PAYMENTDATE_FIELD_NUMBER: _ClassVar[int]
    DATA_FIELD_NUMBER: _ClassVar[int]
    id: str
    instrumentName: str
    state: State
    description: str
    amountInclVAT: _amount_pb2.Amount
    vatAmount: _amount_pb2.Amount
    category: Category
    paymentDate: _timestamp_pb2.Timestamp
    data: _data_pb2.Data
    def __init__(self, id: _Optional[str] = ..., instrumentName: _Optional[str] = ..., state: _Optional[_Union[State, str]] = ..., description: _Optional[str] = ..., amountInclVAT: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., vatAmount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., category: _Optional[_Union[Category, str]] = ..., paymentDate: _Optional[_Union[_timestamp_pb2.Timestamp, _Mapping]] = ..., data: _Optional[_Union[_data_pb2.Data, _Mapping]] = ...) -> None: ...
