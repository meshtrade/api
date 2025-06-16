from meshtrade.compliance.client.v1 import legal_person_pb2 as _legal_person_pb2
from meshtrade.compliance.client.v1 import legal_person_connection_type_pb2 as _legal_person_connection_type_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class ConnectedLegalPerson(_message.Message):
    __slots__ = ("legal_person", "connection_types", "ownership_percentage", "voting_rights_percentage", "connection_description")
    LEGAL_PERSON_FIELD_NUMBER: _ClassVar[int]
    CONNECTION_TYPES_FIELD_NUMBER: _ClassVar[int]
    OWNERSHIP_PERCENTAGE_FIELD_NUMBER: _ClassVar[int]
    VOTING_RIGHTS_PERCENTAGE_FIELD_NUMBER: _ClassVar[int]
    CONNECTION_DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    legal_person: _legal_person_pb2.LegalPerson
    connection_types: _containers.RepeatedScalarFieldContainer[_legal_person_connection_type_pb2.LegalPersonConnectionType]
    ownership_percentage: float
    voting_rights_percentage: float
    connection_description: str
    def __init__(self, legal_person: _Optional[_Union[_legal_person_pb2.LegalPerson, _Mapping]] = ..., connection_types: _Optional[_Iterable[_Union[_legal_person_connection_type_pb2.LegalPersonConnectionType, str]]] = ..., ownership_percentage: _Optional[float] = ..., voting_rights_percentage: _Optional[float] = ..., connection_description: _Optional[str] = ...) -> None: ...
