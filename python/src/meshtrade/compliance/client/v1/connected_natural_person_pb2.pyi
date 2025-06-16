from meshtrade.compliance.client.v1 import natural_person_pb2 as _natural_person_pb2
from meshtrade.compliance.client.v1 import natural_person_connection_type_pb2 as _natural_person_connection_type_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class ConnectedNaturalPerson(_message.Message):
    __slots__ = ("natural_person", "connection_types", "ownership_percentage", "voting_rights_percentage")
    NATURAL_PERSON_FIELD_NUMBER: _ClassVar[int]
    CONNECTION_TYPES_FIELD_NUMBER: _ClassVar[int]
    OWNERSHIP_PERCENTAGE_FIELD_NUMBER: _ClassVar[int]
    VOTING_RIGHTS_PERCENTAGE_FIELD_NUMBER: _ClassVar[int]
    natural_person: _natural_person_pb2.NaturalPerson
    connection_types: _containers.RepeatedScalarFieldContainer[_natural_person_connection_type_pb2.NaturalPersonConnectionType]
    ownership_percentage: float
    voting_rights_percentage: float
    def __init__(self, natural_person: _Optional[_Union[_natural_person_pb2.NaturalPerson, _Mapping]] = ..., connection_types: _Optional[_Iterable[_Union[_natural_person_connection_type_pb2.NaturalPersonConnectionType, str]]] = ..., ownership_percentage: _Optional[float] = ..., voting_rights_percentage: _Optional[float] = ...) -> None: ...
