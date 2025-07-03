import datetime

from google.protobuf import timestamp_pb2 as _timestamp_pb2
from meshtrade.compliance.client.v1 import company_pb2 as _company_pb2
from meshtrade.compliance.client.v1 import fund_pb2 as _fund_pb2
from meshtrade.compliance.client.v1 import natural_person_pb2 as _natural_person_pb2
from meshtrade.compliance.client.v1 import trust_pb2 as _trust_pb2
from meshtrade.compliance.client.v1 import verification_status_pb2 as _verification_status_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Client(_message.Message):
    __slots__ = ("name", "owner", "display_name", "natural_person", "company", "fund", "trust", "verification_status", "verification_authority", "verification_date", "next_verification_date")
    NAME_FIELD_NUMBER: _ClassVar[int]
    OWNER_FIELD_NUMBER: _ClassVar[int]
    DISPLAY_NAME_FIELD_NUMBER: _ClassVar[int]
    NATURAL_PERSON_FIELD_NUMBER: _ClassVar[int]
    COMPANY_FIELD_NUMBER: _ClassVar[int]
    FUND_FIELD_NUMBER: _ClassVar[int]
    TRUST_FIELD_NUMBER: _ClassVar[int]
    VERIFICATION_STATUS_FIELD_NUMBER: _ClassVar[int]
    VERIFICATION_AUTHORITY_FIELD_NUMBER: _ClassVar[int]
    VERIFICATION_DATE_FIELD_NUMBER: _ClassVar[int]
    NEXT_VERIFICATION_DATE_FIELD_NUMBER: _ClassVar[int]
    name: str
    owner: str
    display_name: str
    natural_person: _natural_person_pb2.NaturalPerson
    company: _company_pb2.Company
    fund: _fund_pb2.Fund
    trust: _trust_pb2.Trust
    verification_status: _verification_status_pb2.VerificationStatus
    verification_authority: str
    verification_date: _timestamp_pb2.Timestamp
    next_verification_date: _timestamp_pb2.Timestamp
    def __init__(self, name: _Optional[str] = ..., owner: _Optional[str] = ..., display_name: _Optional[str] = ..., natural_person: _Optional[_Union[_natural_person_pb2.NaturalPerson, _Mapping]] = ..., company: _Optional[_Union[_company_pb2.Company, _Mapping]] = ..., fund: _Optional[_Union[_fund_pb2.Fund, _Mapping]] = ..., trust: _Optional[_Union[_trust_pb2.Trust, _Mapping]] = ..., verification_status: _Optional[_Union[_verification_status_pb2.VerificationStatus, str]] = ..., verification_authority: _Optional[str] = ..., verification_date: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ..., next_verification_date: _Optional[_Union[datetime.datetime, _timestamp_pb2.Timestamp, _Mapping]] = ...) -> None: ...
