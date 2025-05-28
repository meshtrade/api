from api.python.lib.location import address_pb2 as _address_pb2
from api.python.lib.legal import companyRepresentative_pb2 as _companyRepresentative_pb2
from api.python.lib.legal import legalform_pb2 as _legalform_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class ConnectedCompany(_message.Message):
    __slots__ = ("id", "businessName", "legalForm", "registeredName", "registrationNumber", "registeredAddress", "businessAddress", "headOfficeAddress", "companyRepresentative")
    ID_FIELD_NUMBER: _ClassVar[int]
    BUSINESSNAME_FIELD_NUMBER: _ClassVar[int]
    LEGALFORM_FIELD_NUMBER: _ClassVar[int]
    REGISTEREDNAME_FIELD_NUMBER: _ClassVar[int]
    REGISTRATIONNUMBER_FIELD_NUMBER: _ClassVar[int]
    REGISTEREDADDRESS_FIELD_NUMBER: _ClassVar[int]
    BUSINESSADDRESS_FIELD_NUMBER: _ClassVar[int]
    HEADOFFICEADDRESS_FIELD_NUMBER: _ClassVar[int]
    COMPANYREPRESENTATIVE_FIELD_NUMBER: _ClassVar[int]
    id: str
    businessName: str
    legalForm: _legalform_pb2.LegalForm
    registeredName: str
    registrationNumber: str
    registeredAddress: _address_pb2.Address
    businessAddress: _address_pb2.Address
    headOfficeAddress: _address_pb2.Address
    companyRepresentative: _companyRepresentative_pb2.CompanyRepresentative
    def __init__(self, id: _Optional[str] = ..., businessName: _Optional[str] = ..., legalForm: _Optional[_Union[_legalform_pb2.LegalForm, str]] = ..., registeredName: _Optional[str] = ..., registrationNumber: _Optional[str] = ..., registeredAddress: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., businessAddress: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., headOfficeAddress: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., companyRepresentative: _Optional[_Union[_companyRepresentative_pb2.CompanyRepresentative, _Mapping]] = ...) -> None: ...
