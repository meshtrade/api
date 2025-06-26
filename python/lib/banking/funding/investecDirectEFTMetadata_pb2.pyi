from api.python.lib.banking.funding import bankName_pb2 as _bankName_pb2
from api.python.lib.banking.funding import fee_pb2 as _fee_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class InvestecDirectEFTMetaData(_message.Message):
    __slots__ = ("externalTransactionID", "externalReference", "bankName", "fee")
    EXTERNALTRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    EXTERNALREFERENCE_FIELD_NUMBER: _ClassVar[int]
    BANKNAME_FIELD_NUMBER: _ClassVar[int]
    FEE_FIELD_NUMBER: _ClassVar[int]
    externalTransactionID: str
    externalReference: str
    bankName: _bankName_pb2.BankName
    fee: _fee_pb2.Fee
    def __init__(self, externalTransactionID: _Optional[str] = ..., externalReference: _Optional[str] = ..., bankName: _Optional[_Union[_bankName_pb2.BankName, str]] = ..., fee: _Optional[_Union[_fee_pb2.Fee, _Mapping]] = ...) -> None: ...
