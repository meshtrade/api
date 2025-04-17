from api.python.lib.instrument.fee import fee_pb2 as _fee_pb2
from api.python.lib.ledger import amount_pb2 as _amount_pb2
from api.python.lib.search import criterion_pb2 as _criterion_pb2
from api.python.lib.search import query_pb2 as _query_pb2
from api.python.lib.instrument.feeprofile import lifecycleEventCategory_pb2 as _lifecycleEventCategory_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class GetRequest(_message.Message):
    __slots__ = ("criteria",)
    CRITERIA_FIELD_NUMBER: _ClassVar[int]
    criteria: _containers.RepeatedCompositeFieldContainer[_criterion_pb2.Criterion]
    def __init__(self, criteria: _Optional[_Iterable[_Union[_criterion_pb2.Criterion, _Mapping]]] = ...) -> None: ...

class GetResponse(_message.Message):
    __slots__ = ("fee",)
    FEE_FIELD_NUMBER: _ClassVar[int]
    fee: _fee_pb2.Fee
    def __init__(self, fee: _Optional[_Union[_fee_pb2.Fee, _Mapping]] = ...) -> None: ...

class ListRequest(_message.Message):
    __slots__ = ("criteria", "query")
    CRITERIA_FIELD_NUMBER: _ClassVar[int]
    QUERY_FIELD_NUMBER: _ClassVar[int]
    criteria: _containers.RepeatedCompositeFieldContainer[_criterion_pb2.Criterion]
    query: _query_pb2.Query
    def __init__(self, criteria: _Optional[_Iterable[_Union[_criterion_pb2.Criterion, _Mapping]]] = ..., query: _Optional[_Union[_query_pb2.Query, _Mapping]] = ...) -> None: ...

class ListResponse(_message.Message):
    __slots__ = ("fees", "total")
    FEES_FIELD_NUMBER: _ClassVar[int]
    TOTAL_FIELD_NUMBER: _ClassVar[int]
    fees: _containers.RepeatedCompositeFieldContainer[_fee_pb2.Fee]
    total: int
    def __init__(self, fees: _Optional[_Iterable[_Union[_fee_pb2.Fee, _Mapping]]] = ..., total: _Optional[int] = ...) -> None: ...

class CalculateMintingFeesRequest(_message.Message):
    __slots__ = ("Amount",)
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    Amount: _amount_pb2.Amount
    def __init__(self, Amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ...) -> None: ...

class CalculateMintingFeesResponse(_message.Message):
    __slots__ = ("Fees",)
    FEES_FIELD_NUMBER: _ClassVar[int]
    Fees: _containers.RepeatedCompositeFieldContainer[_fee_pb2.Fee]
    def __init__(self, Fees: _Optional[_Iterable[_Union[_fee_pb2.Fee, _Mapping]]] = ...) -> None: ...

class CalculateBurningFeesRequest(_message.Message):
    __slots__ = ("Amount",)
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    Amount: _amount_pb2.Amount
    def __init__(self, Amount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ...) -> None: ...

class CalculateBurningFeesResponse(_message.Message):
    __slots__ = ("Fees",)
    FEES_FIELD_NUMBER: _ClassVar[int]
    Fees: _containers.RepeatedCompositeFieldContainer[_fee_pb2.Fee]
    def __init__(self, Fees: _Optional[_Iterable[_Union[_fee_pb2.Fee, _Mapping]]] = ...) -> None: ...

class CalculateLifecycleFeesRequest(_message.Message):
    __slots__ = ("instrumentName", "lifecycleEventCategory")
    INSTRUMENTNAME_FIELD_NUMBER: _ClassVar[int]
    LIFECYCLEEVENTCATEGORY_FIELD_NUMBER: _ClassVar[int]
    instrumentName: str
    lifecycleEventCategory: _lifecycleEventCategory_pb2.LifecycleEventCategory
    def __init__(self, instrumentName: _Optional[str] = ..., lifecycleEventCategory: _Optional[_Union[_lifecycleEventCategory_pb2.LifecycleEventCategory, str]] = ...) -> None: ...

class CalculateLifecycleFeesResponse(_message.Message):
    __slots__ = ("Fees",)
    FEES_FIELD_NUMBER: _ClassVar[int]
    Fees: _containers.RepeatedCompositeFieldContainer[_fee_pb2.Fee]
    def __init__(self, Fees: _Optional[_Iterable[_Union[_fee_pb2.Fee, _Mapping]]] = ...) -> None: ...

class FullUpdateRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class FullUpdateResponse(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...
