from buf.validate import validate_pb2 as _validate_pb2
from meshtrade.option.v1 import auth_pb2 as _auth_pb2
from meshtrade.option.v1 import service_type_pb2 as _service_type_pb2
from meshtrade.type.v1 import ledger_pb2 as _ledger_pb2
from meshtrade.wallet.account.v1 import account_pb2 as _account_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class CreateAccountRequest(_message.Message):
    __slots__ = ("label", "ledger", "open")
    LABEL_FIELD_NUMBER: _ClassVar[int]
    LEDGER_FIELD_NUMBER: _ClassVar[int]
    OPEN_FIELD_NUMBER: _ClassVar[int]
    label: str
    ledger: _ledger_pb2.Ledger
    open: bool
    def __init__(self, label: _Optional[str] = ..., ledger: _Optional[_Union[_ledger_pb2.Ledger, str]] = ..., open: bool = ...) -> None: ...

class CreateAccountResponse(_message.Message):
    __slots__ = ("account", "transaction_id")
    ACCOUNT_FIELD_NUMBER: _ClassVar[int]
    TRANSACTION_ID_FIELD_NUMBER: _ClassVar[int]
    account: _account_pb2.Account
    transaction_id: str
    def __init__(self, account: _Optional[_Union[_account_pb2.Account, _Mapping]] = ..., transaction_id: _Optional[str] = ...) -> None: ...

class GetAccountRequest(_message.Message):
    __slots__ = ("number",)
    NUMBER_FIELD_NUMBER: _ClassVar[int]
    number: str
    def __init__(self, number: _Optional[str] = ...) -> None: ...

class GetAccountResponse(_message.Message):
    __slots__ = ("account",)
    ACCOUNT_FIELD_NUMBER: _ClassVar[int]
    account: _account_pb2.Account
    def __init__(self, account: _Optional[_Union[_account_pb2.Account, _Mapping]] = ...) -> None: ...

class ListAccountsRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class ListAccountsResponse(_message.Message):
    __slots__ = ("accounts",)
    ACCOUNTS_FIELD_NUMBER: _ClassVar[int]
    accounts: _containers.RepeatedCompositeFieldContainer[_account_pb2.Account]
    def __init__(self, accounts: _Optional[_Iterable[_Union[_account_pb2.Account, _Mapping]]] = ...) -> None: ...

class SearchAccountsRequest(_message.Message):
    __slots__ = ("label",)
    LABEL_FIELD_NUMBER: _ClassVar[int]
    label: str
    def __init__(self, label: _Optional[str] = ...) -> None: ...

class SearchAccountsResponse(_message.Message):
    __slots__ = ("accounts",)
    ACCOUNTS_FIELD_NUMBER: _ClassVar[int]
    accounts: _containers.RepeatedCompositeFieldContainer[_account_pb2.Account]
    def __init__(self, accounts: _Optional[_Iterable[_Union[_account_pb2.Account, _Mapping]]] = ...) -> None: ...
