from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class Ledger(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    LEDGER_UNSPECIFIED: _ClassVar[Ledger]
    LEDGER_STELLAR: _ClassVar[Ledger]
    LEDGER_BITCOIN: _ClassVar[Ledger]
    LEDGER_LITECOIN: _ClassVar[Ledger]
    LEDGER_ETHEREUM: _ClassVar[Ledger]
    LEDGER_XRP: _ClassVar[Ledger]
    LEDGER_SA_STOCK_BROKERS: _ClassVar[Ledger]
    LEDGER_NULL: _ClassVar[Ledger]
LEDGER_UNSPECIFIED: Ledger
LEDGER_STELLAR: Ledger
LEDGER_BITCOIN: Ledger
LEDGER_LITECOIN: Ledger
LEDGER_ETHEREUM: Ledger
LEDGER_XRP: Ledger
LEDGER_SA_STOCK_BROKERS: Ledger
LEDGER_NULL: Ledger
