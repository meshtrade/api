from meshtrade.issuance_hub.instrument.v1 import instrument_pb2 as _instrument_pb2
from meshtrade.type.v1 import amount_pb2 as _amount_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class GetInstrumentRequest(_message.Message):
    __slots__ = ("name",)
    NAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    def __init__(self, name: _Optional[str] = ...) -> None: ...

class GetInstrumentResponse(_message.Message):
    __slots__ = ("instrument",)
    INSTRUMENT_FIELD_NUMBER: _ClassVar[int]
    instrument: _instrument_pb2.Instrument
    def __init__(self, instrument: _Optional[_Union[_instrument_pb2.Instrument, _Mapping]] = ...) -> None: ...

class MintInstrumentRequest(_message.Message):
    __slots__ = ("amount", "fee_account", "destination_account")
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    FEE_ACCOUNT_FIELD_NUMBER: _ClassVar[int]
    DESTINATION_ACCOUNT_FIELD_NUMBER: _ClassVar[int]
    amount: _amount_pb2.Amount
    fee_account: str
    destination_account: str
    def __init__(self, amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., fee_account: _Optional[str] = ..., destination_account: _Optional[str] = ...) -> None: ...

class MintInstrumentResponse(_message.Message):
    __slots__ = ("transaction_id",)
    TRANSACTION_ID_FIELD_NUMBER: _ClassVar[int]
    transaction_id: str
    def __init__(self, transaction_id: _Optional[str] = ...) -> None: ...

class BurnInstrumentRequest(_message.Message):
    __slots__ = ("amount", "fee_account", "source_account")
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    FEE_ACCOUNT_FIELD_NUMBER: _ClassVar[int]
    SOURCE_ACCOUNT_FIELD_NUMBER: _ClassVar[int]
    amount: _amount_pb2.Amount
    fee_account: str
    source_account: str
    def __init__(self, amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., fee_account: _Optional[str] = ..., source_account: _Optional[str] = ...) -> None: ...

class BurnInstrumentResponse(_message.Message):
    __slots__ = ("transaction_id",)
    TRANSACTION_ID_FIELD_NUMBER: _ClassVar[int]
    transaction_id: str
    def __init__(self, transaction_id: _Optional[str] = ...) -> None: ...
