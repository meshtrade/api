from meshtrade.compliance.client.v1 import natural_person_pb2 as _natural_person_pb2
from meshtrade.compliance.client.v1 import source_of_income_and_wealth_pb2 as _source_of_income_and_wealth_pb2
from meshtrade.compliance.client.v1 import tax_residency_pb2 as _tax_residency_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from collections.abc import Iterable as _Iterable, Mapping as _Mapping
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class KYCInfo(_message.Message):
    __slots__ = ("natural_person", "sources_of_income", "sources_of_wealth", "tax_residencies")
    NATURAL_PERSON_FIELD_NUMBER: _ClassVar[int]
    SOURCES_OF_INCOME_FIELD_NUMBER: _ClassVar[int]
    SOURCES_OF_WEALTH_FIELD_NUMBER: _ClassVar[int]
    TAX_RESIDENCIES_FIELD_NUMBER: _ClassVar[int]
    natural_person: _natural_person_pb2.NaturalPerson
    sources_of_income: _containers.RepeatedScalarFieldContainer[_source_of_income_and_wealth_pb2.SourceOfIncomeAndWealth]
    sources_of_wealth: _containers.RepeatedScalarFieldContainer[_source_of_income_and_wealth_pb2.SourceOfIncomeAndWealth]
    tax_residencies: _containers.RepeatedCompositeFieldContainer[_tax_residency_pb2.TaxResidency]
    def __init__(self, natural_person: _Optional[_Union[_natural_person_pb2.NaturalPerson, _Mapping]] = ..., sources_of_income: _Optional[_Iterable[_Union[_source_of_income_and_wealth_pb2.SourceOfIncomeAndWealth, str]]] = ..., sources_of_wealth: _Optional[_Iterable[_Union[_source_of_income_and_wealth_pb2.SourceOfIncomeAndWealth, str]]] = ..., tax_residencies: _Optional[_Iterable[_Union[_tax_residency_pb2.TaxResidency, _Mapping]]] = ...) -> None: ...
