from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class Network(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_NETWORK: _ClassVar[Network]
    STELLAR_NETWORK: _ClassVar[Network]
    BITCOIN_NETWORK: _ClassVar[Network]
    LITECOIN_NETWORK: _ClassVar[Network]
    ETHEREUM_NETWORK: _ClassVar[Network]
    RIPPLE_NETWORK: _ClassVar[Network]
    SA_STOCK_BROKERS_NETWORK: _ClassVar[Network]
    NULL_NETWORK: _ClassVar[Network]
UNDEFINED_NETWORK: Network
STELLAR_NETWORK: Network
BITCOIN_NETWORK: Network
LITECOIN_NETWORK: Network
ETHEREUM_NETWORK: Network
RIPPLE_NETWORK: Network
SA_STOCK_BROKERS_NETWORK: Network
NULL_NETWORK: Network
