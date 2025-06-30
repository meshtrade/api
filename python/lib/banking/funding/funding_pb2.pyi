from api.python.lib.ledger import amount_pb2 as _amount_pb2
from google.protobuf import timestamp_pb2 as _timestamp_pb2
from api.python.lib.banking.funding import fundingOrderMetadata_pb2 as _fundingOrderMetadata_pb2
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
    DIRECT_EFT: _ClassVar[FundingOrigin]
    PEACH_SETTLEMENT: _ClassVar[FundingOrigin]
    PEACH_PAYMENT: _ClassVar[FundingOrigin]

class FundingAction(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    DO_NOTHING_FUNDING_ACTION: _ClassVar[FundingAction]
    MARK_AWAITING_CONFIRMATION_ACTION: _ClassVar[FundingAction]
UNDEFINED_FUNDING_ORDER_STATE: FundingState
PENDING_CONFIRMATION_FUNDING_ORDER_STATE: FundingState
AWAITING_APPROVAL_FUNDING_ORDER_STATE: FundingState
SETTLEMENT_IN_PROGRESS_FUNDING_ORDER_STATE: FundingState
CANCELLED_FUNDING_ORDER_STATE: FundingState
FAILED_FUNDING_ORDER_STATE: FundingState
SETTLED_FUNDING_ORDER_STATE: FundingState
UNDER_INVESTIGATION_FUNDING_ORDER_STATE: FundingState
UNDEFINED_FUNDING_ORIGIN: FundingOrigin
DIRECT_EFT: FundingOrigin
PEACH_SETTLEMENT: FundingOrigin
PEACH_PAYMENT: FundingOrigin
DO_NOTHING_FUNDING_ACTION: FundingAction
MARK_AWAITING_CONFIRMATION_ACTION: FundingAction

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
    metaData: _fundingOrderMetadata_pb2.MetaData
    accountNumber: str
    state: FundingState
    stateReason: str
    valueDate: _timestamp_pb2.Timestamp
    def __init__(self, number: _Optional[str] = ..., amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., fundingOrigin: _Optional[_Union[FundingOrigin, str]] = ..., metaData: _Optional[_Union[_fundingOrderMetadata_pb2.MetaData, _Mapping]] = ..., accountNumber: _Optional[str] = ..., state: _Optional[_Union[FundingState, str]] = ..., stateReason: _Optional[str] = ..., valueDate: _Optional[_Union[_timestamp_pb2.Timestamp, _Mapping]] = ...) -> None: ...
