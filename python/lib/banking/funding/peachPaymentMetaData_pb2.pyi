from api.python.lib.banking.funding import bankName_pb2 as _bankName_pb2
from api.python.lib.banking.funding import fee_pb2 as _fee_pb2
from api.python.lib.banking.funding import paymentType_pb2 as _paymentType_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class PeachPaymentMetaData(_message.Message):
    __slots__ = ("externalTransactionID", "externalReference", "bankName", "peachPaymentMethod", "checkoutId", "fee", "customerName", "accountHolder", "paymentType", "userSpecifiedAccount")
    EXTERNALTRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    EXTERNALREFERENCE_FIELD_NUMBER: _ClassVar[int]
    BANKNAME_FIELD_NUMBER: _ClassVar[int]
    PEACHPAYMENTMETHOD_FIELD_NUMBER: _ClassVar[int]
    CHECKOUTID_FIELD_NUMBER: _ClassVar[int]
    FEE_FIELD_NUMBER: _ClassVar[int]
    CUSTOMERNAME_FIELD_NUMBER: _ClassVar[int]
    ACCOUNTHOLDER_FIELD_NUMBER: _ClassVar[int]
    PAYMENTTYPE_FIELD_NUMBER: _ClassVar[int]
    USERSPECIFIEDACCOUNT_FIELD_NUMBER: _ClassVar[int]
    externalTransactionID: str
    externalReference: str
    bankName: _bankName_pb2.BankName
    peachPaymentMethod: _paymentType_pb2.PeachPaymentMethod
    checkoutId: str
    fee: _fee_pb2.Fee
    customerName: str
    accountHolder: str
    paymentType: _paymentType_pb2.PaymentType
    userSpecifiedAccount: str
    def __init__(self, externalTransactionID: _Optional[str] = ..., externalReference: _Optional[str] = ..., bankName: _Optional[_Union[_bankName_pb2.BankName, str]] = ..., peachPaymentMethod: _Optional[_Union[_paymentType_pb2.PeachPaymentMethod, str]] = ..., checkoutId: _Optional[str] = ..., fee: _Optional[_Union[_fee_pb2.Fee, _Mapping]] = ..., customerName: _Optional[str] = ..., accountHolder: _Optional[str] = ..., paymentType: _Optional[_Union[_paymentType_pb2.PaymentType, str]] = ..., userSpecifiedAccount: _Optional[str] = ...) -> None: ...
