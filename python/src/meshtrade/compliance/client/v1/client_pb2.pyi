import datetime

from google.protobuf import timestamp_pb2 as _timestamp_pb2
from meshtrade.compliance.client.v1 import kyb_info_pb2 as _kyb_info_pb2
from meshtrade.compliance.client.v1 import kyc_info_pb2 as _kyc_info_pb2
from meshtrade.compliance.client.v1 import verification_status_pb2 as _verification_status_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Client(_message.Message):
    __slots__ = ("name", "owner_group", "display_name", "kyc_info", "kyb_info", "verification_status", "verification_authority_name", "verification_date", "next_verification_date")
    NAME_FIELD_NUMBER: _ClassVar[int]
    OWNER_GROUP_FIELD_NUMBER: _ClassVar[int]
    DISPLAY_NAME_FIELD_NUMBER: _ClassVar[int]
    KYC_INFO_FIELD_NUMBER: _ClassVar[int]
    KYB_INFO_FIELD_NUMBER: _ClassVar[int]
    VERIFICATION_STATUS_FIELD_NUMBER: _ClassVar[int]
    VERIFICATION_AUTHORITY_NAME_FIELD_NUMBER: _ClassVar[int]
    VERIFICATION_DATE_FIELD_NUMBER: _ClassVar[int]
    NEXT_VERIFICATION_DATE_FIELD_NUMBER: _ClassVar[int]
    name: str
    owner_group: str
    display_name: str
    kyc_info: _kyc_info_pb2.KYCInfo
    kyb_info: _kyb_info_pb2.KYBInfo
    verification_status: _verification_status_pb2.VerificationStatus
    verification_authority_name: str
    verification_date: _timestamp_pb2.Timestamp
    next_verification_date: _timestamp_pb2.Timestamp
    def __init__(self, name: _Optional[str] = ..., owner_group: _Optional[str] = ..., display_name: _Optional[str] = ..., kyc_info: _Optional[_Union[_kyc_info_pb2.KYCInfo, _Mapping]] = ..., kyb_info: _Optional[_Union[_kyb_info_pb2.KYBInfo, _Mapping]] = ..., verification_status: _Optional[_Union[_verification_status_pb2.VerificationStatus, str]] = ..., verification_authority_name: _Optional[str] = ..., verification_date: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ..., next_verification_date: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ...) -> None: ...
