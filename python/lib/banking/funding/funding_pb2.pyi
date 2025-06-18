from api.python.lib.ledger import amount_pb2 as _amount_pb2
from google.protobuf import timestamp_pb2 as _timestamp_pb2
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class FundingState(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_FUNDING_ORDER_STATE: _ClassVar[FundingState]
    PENDING_CONFIRMATION_FUNDING_ORDER_STATE: _ClassVar[FundingState]
    AWAITING_APPROVAL_FUNDING_ORDER_STATE: _ClassVar[FundingState]
    SETTLEMENT_IN_PROGRESS_FUNDING_ORDER_STATE: _ClassVar[FundingState]
    CANCELLED_FUNDING_ORDER_STATE: _ClassVar[FundingState]
    FAILED_FUNDING_ORDER_STATE: _ClassVar[FundingState]
    SETTLED_FUNDING_ORDER_STATE: _ClassVar[FundingState]
    UNDER_INVESTIGATION_FUNDING_ORDER_STATE: _ClassVar[FundingState]

class FundingOrigin(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_FUNDING_ORIGIN: _ClassVar[FundingOrigin]
    INVESTEC_DIRECT_EFT: _ClassVar[FundingOrigin]
    PEACH_SETTLEMENT: _ClassVar[FundingOrigin]
    PEACH_PAYMENT: _ClassVar[FundingOrigin]

class PeachPaymentMethod(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_PEACH_FUNDING_CATEGORY: _ClassVar[PeachPaymentMethod]
    PEACH_PAY_BY_BANK: _ClassVar[PeachPaymentMethod]
    PEACH_PAY_BY_CARD: _ClassVar[PeachPaymentMethod]

class PaymentType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_PAYMENT_TYPE: _ClassVar[PaymentType]
    DB: _ClassVar[PaymentType]
    RG: _ClassVar[PaymentType]
    PA: _ClassVar[PaymentType]
    RF: _ClassVar[PaymentType]
    CP: _ClassVar[PaymentType]
    RV: _ClassVar[PaymentType]
    CD: _ClassVar[PaymentType]
    RB: _ClassVar[PaymentType]
UNDEFINED_FUNDING_ORDER_STATE: FundingState
PENDING_CONFIRMATION_FUNDING_ORDER_STATE: FundingState
AWAITING_APPROVAL_FUNDING_ORDER_STATE: FundingState
SETTLEMENT_IN_PROGRESS_FUNDING_ORDER_STATE: FundingState
CANCELLED_FUNDING_ORDER_STATE: FundingState
FAILED_FUNDING_ORDER_STATE: FundingState
SETTLED_FUNDING_ORDER_STATE: FundingState
UNDER_INVESTIGATION_FUNDING_ORDER_STATE: FundingState
UNDEFINED_FUNDING_ORIGIN: FundingOrigin
INVESTEC_DIRECT_EFT: FundingOrigin
PEACH_SETTLEMENT: FundingOrigin
PEACH_PAYMENT: FundingOrigin
UNDEFINED_PEACH_FUNDING_CATEGORY: PeachPaymentMethod
PEACH_PAY_BY_BANK: PeachPaymentMethod
PEACH_PAY_BY_CARD: PeachPaymentMethod
UNDEFINED_PAYMENT_TYPE: PaymentType
DB: PaymentType
RG: PaymentType
PA: PaymentType
RF: PaymentType
CP: PaymentType
RV: PaymentType
CD: PaymentType
RB: PaymentType

class Funding(_message.Message):
    __slots__ = ("number", "amount", "fundingOrigin", "metaData", "accountNumber", "state", "stateReason", "valueDate")
    NUMBER_FIELD_NUMBER: _ClassVar[int]
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    FUNDINGORIGIN_FIELD_NUMBER: _ClassVar[int]
    METADATA_FIELD_NUMBER: _ClassVar[int]
    ACCOUNTNUMBER_FIELD_NUMBER: _ClassVar[int]
    STATE_FIELD_NUMBER: _ClassVar[int]
    STATEREASON_FIELD_NUMBER: _ClassVar[int]
    VALUEDATE_FIELD_NUMBER: _ClassVar[int]
    number: str
    amount: _amount_pb2.Amount
    fundingOrigin: FundingOrigin
    metaData: FundingOrderMetaData
    accountNumber: str
    state: FundingState
    stateReason: str
    valueDate: _timestamp_pb2.Timestamp
    def __init__(self, number: _Optional[str] = ..., amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., fundingOrigin: _Optional[_Union[FundingOrigin, str]] = ..., metaData: _Optional[_Union[FundingOrderMetaData, _Mapping]] = ..., accountNumber: _Optional[str] = ..., state: _Optional[_Union[FundingState, str]] = ..., stateReason: _Optional[str] = ..., valueDate: _Optional[_Union[_timestamp_pb2.Timestamp, _Mapping]] = ...) -> None: ...

class FundingOrderMetaData(_message.Message):
    __slots__ = ("PeachPayment", "PeachSettlement", "InvestecDirectEFT")
    PEACHPAYMENT_FIELD_NUMBER: _ClassVar[int]
    PEACHSETTLEMENT_FIELD_NUMBER: _ClassVar[int]
    INVESTECDIRECTEFT_FIELD_NUMBER: _ClassVar[int]
    PeachPayment: PeachPaymentMetaData
    PeachSettlement: PeachSettlementMetaData
    InvestecDirectEFT: InvestecDirectEFTMetaData
    def __init__(self, PeachPayment: _Optional[_Union[PeachPaymentMetaData, _Mapping]] = ..., PeachSettlement: _Optional[_Union[PeachSettlementMetaData, _Mapping]] = ..., InvestecDirectEFT: _Optional[_Union[InvestecDirectEFTMetaData, _Mapping]] = ...) -> None: ...

class InvestecDirectEFTMetaData(_message.Message):
    __slots__ = ("externalTransactionID", "externalReference", "bankName")
    EXTERNALTRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    EXTERNALREFERENCE_FIELD_NUMBER: _ClassVar[int]
    BANKNAME_FIELD_NUMBER: _ClassVar[int]
    externalTransactionID: str
    externalReference: str
    bankName: str
    def __init__(self, externalTransactionID: _Optional[str] = ..., externalReference: _Optional[str] = ..., bankName: _Optional[str] = ...) -> None: ...

class PeachSettlementMetaData(_message.Message):
    __slots__ = ("externalTransactionID", "externalSettlementReference", "bankName")
    EXTERNALTRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    EXTERNALSETTLEMENTREFERENCE_FIELD_NUMBER: _ClassVar[int]
    BANKNAME_FIELD_NUMBER: _ClassVar[int]
    externalTransactionID: str
    externalSettlementReference: str
    bankName: str
    def __init__(self, externalTransactionID: _Optional[str] = ..., externalSettlementReference: _Optional[str] = ..., bankName: _Optional[str] = ...) -> None: ...

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
    bankName: str
    peachPaymentMethod: PeachPaymentMethod
    checkoutId: str
    fee: PeachFee
    customerName: str
    accountHolder: str
    paymentType: PaymentType
    userSpecifiedAccount: str
    def __init__(self, externalTransactionID: _Optional[str] = ..., externalReference: _Optional[str] = ..., bankName: _Optional[str] = ..., peachPaymentMethod: _Optional[_Union[PeachPaymentMethod, str]] = ..., checkoutId: _Optional[str] = ..., fee: _Optional[_Union[PeachFee, _Mapping]] = ..., customerName: _Optional[str] = ..., accountHolder: _Optional[str] = ..., paymentType: _Optional[_Union[PaymentType, str]] = ..., userSpecifiedAccount: _Optional[str] = ...) -> None: ...

class PeachFee(_message.Message):
    __slots__ = ("FeeIncVat", "FeeExlVat", "VatAmount")
    FEEINCVAT_FIELD_NUMBER: _ClassVar[int]
    FEEEXLVAT_FIELD_NUMBER: _ClassVar[int]
    VATAMOUNT_FIELD_NUMBER: _ClassVar[int]
    FeeIncVat: _amount_pb2.Amount
    FeeExlVat: _amount_pb2.Amount
    VatAmount: _amount_pb2.Amount
    def __init__(self, FeeIncVat: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., FeeExlVat: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., VatAmount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ...) -> None: ...
