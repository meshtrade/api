from api.python.lib.ledger import amount_pb2 as _amount_pb2
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class FundingState(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_FUNDING_STATE: _ClassVar[FundingState]

class FundingOrderState(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_FUNDING_ORDER_STATE: _ClassVar[FundingOrderState]
    AWAITING_APPROVAL_FUNDING_ORDER_STATE: _ClassVar[FundingOrderState]
    SETTLEMENT_IN_PROGRESS_FUNDING_ORDER_STATE: _ClassVar[FundingOrderState]
    CANCELLED_FUNDING_ORDER_STATE: _ClassVar[FundingOrderState]
    FAILED_FUNDING_ORDER_STATE: _ClassVar[FundingOrderState]
    SETTLED_FUNDING_ORDER_STATE: _ClassVar[FundingOrderState]
    UNDER_INVESTIGATION_FUNDING_ORDER_STATE: _ClassVar[FundingOrderState]

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
UNDEFINED_FUNDING_STATE: FundingState
UNDEFINED_FUNDING_ORDER_STATE: FundingOrderState
AWAITING_APPROVAL_FUNDING_ORDER_STATE: FundingOrderState
SETTLEMENT_IN_PROGRESS_FUNDING_ORDER_STATE: FundingOrderState
CANCELLED_FUNDING_ORDER_STATE: FundingOrderState
FAILED_FUNDING_ORDER_STATE: FundingOrderState
SETTLED_FUNDING_ORDER_STATE: FundingOrderState
UNDER_INVESTIGATION_FUNDING_ORDER_STATE: FundingOrderState
UNDEFINED_FUNDING_ORIGIN: FundingOrigin
INVESTEC_DIRECT_EFT: FundingOrigin
PEACH_SETTLEMENT: FundingOrigin
PEACH_PAYMENT: FundingOrigin
UNDEFINED_PEACH_FUNDING_CATEGORY: PeachPaymentMethod
PEACH_PAY_BY_BANK: PeachPaymentMethod
PEACH_PAY_BY_CARD: PeachPaymentMethod

class Funding(_message.Message):
    __slots__ = ("number", "amount", "fundingOrigin", "metaData", "accountNumber", "state")
    NUMBER_FIELD_NUMBER: _ClassVar[int]
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    FUNDINGORIGIN_FIELD_NUMBER: _ClassVar[int]
    METADATA_FIELD_NUMBER: _ClassVar[int]
    ACCOUNTNUMBER_FIELD_NUMBER: _ClassVar[int]
    STATE_FIELD_NUMBER: _ClassVar[int]
    number: str
    amount: _amount_pb2.Amount
    fundingOrigin: FundingOrigin
    metaData: FundingOrderMetaData
    accountNumber: str
    state: FundingState
    def __init__(self, number: _Optional[str] = ..., amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., fundingOrigin: _Optional[_Union[FundingOrigin, str]] = ..., metaData: _Optional[_Union[FundingOrderMetaData, _Mapping]] = ..., accountNumber: _Optional[str] = ..., state: _Optional[_Union[FundingState, str]] = ...) -> None: ...

class FundingOrderMetaData(_message.Message):
    __slots__ = ("PeachPayment", "PeachSettlement", "InvestecDirectEFT")
    PEACHPAYMENT_FIELD_NUMBER: _ClassVar[int]
    PEACHSETTLEMENT_FIELD_NUMBER: _ClassVar[int]
    INVESTECDIRECTEFT_FIELD_NUMBER: _ClassVar[int]
    PeachPayment: PeachPaymentMetaData
    PeachSettlement: PeachSettlementMetaData
    InvestecDirectEFT: InvestecDirectEFTMetaData
    def __init__(self, PeachPayment: _Optional[_Union[PeachPaymentMetaData, _Mapping]] = ..., PeachSettlement: _Optional[_Union[PeachSettlementMetaData, _Mapping]] = ..., InvestecDirectEFT: _Optional[_Union[InvestecDirectEFTMetaData, _Mapping]] = ...) -> None: ...

class PeachSettlementMetaData(_message.Message):
    __slots__ = ("transactionID", "externalTransactionID", "externalReference")
    TRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    EXTERNALTRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    EXTERNALREFERENCE_FIELD_NUMBER: _ClassVar[int]
    transactionID: str
    externalTransactionID: str
    externalReference: str
    def __init__(self, transactionID: _Optional[str] = ..., externalTransactionID: _Optional[str] = ..., externalReference: _Optional[str] = ...) -> None: ...

class PeachPaymentMetaData(_message.Message):
    __slots__ = ("transactionID", "externalTransactionID", "externalReference", "peachPaymentMethod", "checkoutId", "fee", "clientDetails", "userSpecifiedAccount")
    TRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    EXTERNALTRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    EXTERNALREFERENCE_FIELD_NUMBER: _ClassVar[int]
    PEACHPAYMENTMETHOD_FIELD_NUMBER: _ClassVar[int]
    CHECKOUTID_FIELD_NUMBER: _ClassVar[int]
    FEE_FIELD_NUMBER: _ClassVar[int]
    CLIENTDETAILS_FIELD_NUMBER: _ClassVar[int]
    USERSPECIFIEDACCOUNT_FIELD_NUMBER: _ClassVar[int]
    transactionID: str
    externalTransactionID: str
    externalReference: str
    peachPaymentMethod: PeachPaymentMethod
    checkoutId: str
    fee: PeachFee
    clientDetails: PeachClientDetails
    userSpecifiedAccount: str
    def __init__(self, transactionID: _Optional[str] = ..., externalTransactionID: _Optional[str] = ..., externalReference: _Optional[str] = ..., peachPaymentMethod: _Optional[_Union[PeachPaymentMethod, str]] = ..., checkoutId: _Optional[str] = ..., fee: _Optional[_Union[PeachFee, _Mapping]] = ..., clientDetails: _Optional[_Union[PeachClientDetails, _Mapping]] = ..., userSpecifiedAccount: _Optional[str] = ...) -> None: ...

class PeachClientDetails(_message.Message):
    __slots__ = ("name", "surname")
    NAME_FIELD_NUMBER: _ClassVar[int]
    SURNAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    surname: str
    def __init__(self, name: _Optional[str] = ..., surname: _Optional[str] = ...) -> None: ...

class PeachFee(_message.Message):
    __slots__ = ("FeeIncVat", "FeeExlVat", "VatAmount")
    FEEINCVAT_FIELD_NUMBER: _ClassVar[int]
    FEEEXLVAT_FIELD_NUMBER: _ClassVar[int]
    VATAMOUNT_FIELD_NUMBER: _ClassVar[int]
    FeeIncVat: _amount_pb2.Amount
    FeeExlVat: _amount_pb2.Amount
    VatAmount: _amount_pb2.Amount
    def __init__(self, FeeIncVat: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., FeeExlVat: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., VatAmount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ...) -> None: ...

class InvestecDirectEFTMetaData(_message.Message):
    __slots__ = ("transactionID", "externalTransactionID", "externalReference")
    TRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    EXTERNALTRANSACTIONID_FIELD_NUMBER: _ClassVar[int]
    EXTERNALREFERENCE_FIELD_NUMBER: _ClassVar[int]
    transactionID: str
    externalTransactionID: str
    externalReference: str
    def __init__(self, transactionID: _Optional[str] = ..., externalTransactionID: _Optional[str] = ..., externalReference: _Optional[str] = ...) -> None: ...
