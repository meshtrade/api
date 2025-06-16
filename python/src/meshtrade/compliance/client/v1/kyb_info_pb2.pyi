from meshtrade.compliance.client.v1 import company_representative_pb2 as _company_representative_pb2
from meshtrade.compliance.client.v1 import connected_legal_person_pb2 as _connected_legal_person_pb2
from meshtrade.compliance.client.v1 import connected_natural_person_pb2 as _connected_natural_person_pb2
from meshtrade.compliance.client.v1 import industry_classification_pb2 as _industry_classification_pb2
from meshtrade.compliance.client.v1 import legal_person_pb2 as _legal_person_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class KYBInfo(_message.Message):
    __slots__ = ("legal_person", "company_representatives", "connected_natural_persons", "connected_legal_persons", "industry_classification", "listed_exchange_code", "listing_reference")
    LEGAL_PERSON_FIELD_NUMBER: _ClassVar[int]
    COMPANY_REPRESENTATIVES_FIELD_NUMBER: _ClassVar[int]
    CONNECTED_NATURAL_PERSONS_FIELD_NUMBER: _ClassVar[int]
    CONNECTED_LEGAL_PERSONS_FIELD_NUMBER: _ClassVar[int]
    INDUSTRY_CLASSIFICATION_FIELD_NUMBER: _ClassVar[int]
    LISTED_EXCHANGE_CODE_FIELD_NUMBER: _ClassVar[int]
    LISTING_REFERENCE_FIELD_NUMBER: _ClassVar[int]
    legal_person: _legal_person_pb2.LegalPerson
    company_representatives: _containers.RepeatedCompositeFieldContainer[_company_representative_pb2.CompanyRepresentative]
    connected_natural_persons: _containers.RepeatedCompositeFieldContainer[_connected_natural_person_pb2.ConnectedNaturalPerson]
    connected_legal_persons: _containers.RepeatedCompositeFieldContainer[_connected_legal_person_pb2.ConnectedLegalPerson]
    industry_classification: _industry_classification_pb2.IndustryClassification
    listed_exchange_code: str
    listing_reference: str
    def __init__(self, legal_person: _Optional[_Union[_legal_person_pb2.LegalPerson, _Mapping]] = ..., company_representatives: _Optional[_Iterable[_Union[_company_representative_pb2.CompanyRepresentative, _Mapping]]] = ..., connected_natural_persons: _Optional[_Iterable[_Union[_connected_natural_person_pb2.ConnectedNaturalPerson, _Mapping]]] = ..., connected_legal_persons: _Optional[_Iterable[_Union[_connected_legal_person_pb2.ConnectedLegalPerson, _Mapping]]] = ..., industry_classification: _Optional[_Union[_industry_classification_pb2.IndustryClassification, _Mapping]] = ..., listed_exchange_code: _Optional[str] = ..., listing_reference: _Optional[str] = ...) -> None: ...
