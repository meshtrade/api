from api.python.lib.ledger import amount_pb2 as _amount_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Fee(_message.Message):
    __slots__ = ("FeeIncVat", "FeeExlVat", "VatAmount")
    FEEINCVAT_FIELD_NUMBER: _ClassVar[int]
    FEEEXLVAT_FIELD_NUMBER: _ClassVar[int]
    VATAMOUNT_FIELD_NUMBER: _ClassVar[int]
    FeeIncVat: _amount_pb2.Amount
    FeeExlVat: _amount_pb2.Amount
    VatAmount: _amount_pb2.Amount
    def __init__(self, FeeIncVat: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., FeeExlVat: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ..., VatAmount: _Optional[_Union[_amount_pb2.Amount, _Mapping]] = ...) -> None: ...
