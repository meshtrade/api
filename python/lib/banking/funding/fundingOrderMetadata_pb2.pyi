from api.python.lib.banking.funding import directEFTMetaData_pb2 as _directEFTMetaData_pb2
from api.python.lib.banking.funding import peachPaymentMetaData_pb2 as _peachPaymentMetaData_pb2
from api.python.lib.banking.funding import peachSettlementMetadata_pb2 as _peachSettlementMetadata_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class MetaData(_message.Message):
    __slots__ = ("PeachPaymentMetaData", "PeachSettlementMetaData", "DirectEFTMetaData")
    PEACHPAYMENTMETADATA_FIELD_NUMBER: _ClassVar[int]
    PEACHSETTLEMENTMETADATA_FIELD_NUMBER: _ClassVar[int]
    DIRECTEFTMETADATA_FIELD_NUMBER: _ClassVar[int]
    PeachPaymentMetaData: _peachPaymentMetaData_pb2.PeachPaymentMetaData
    PeachSettlementMetaData: _peachSettlementMetadata_pb2.PeachSettlementMetaData
    DirectEFTMetaData: _directEFTMetaData_pb2.DirectEFTMetaData
    def __init__(self, PeachPaymentMetaData: _Optional[_Union[_peachPaymentMetaData_pb2.PeachPaymentMetaData, _Mapping]] = ..., PeachSettlementMetaData: _Optional[_Union[_peachSettlementMetadata_pb2.PeachSettlementMetaData, _Mapping]] = ..., DirectEFTMetaData: _Optional[_Union[_directEFTMetaData_pb2.DirectEFTMetaData, _Mapping]] = ...) -> None: ...
