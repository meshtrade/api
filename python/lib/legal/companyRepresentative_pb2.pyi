from api.python.lib.location import address_pb2 as _address_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class CompanyRepresentative(_message.Message):
    __slots__ = ("firstName", "middleNames", "lastName", "telephoneNumber", "cellphoneNumber", "emailAddress", "physicalAddress", "postalAddress")
    FIRSTNAME_FIELD_NUMBER: _ClassVar[int]
    MIDDLENAMES_FIELD_NUMBER: _ClassVar[int]
    LASTNAME_FIELD_NUMBER: _ClassVar[int]
    TELEPHONENUMBER_FIELD_NUMBER: _ClassVar[int]
    CELLPHONENUMBER_FIELD_NUMBER: _ClassVar[int]
    EMAILADDRESS_FIELD_NUMBER: _ClassVar[int]
    PHYSICALADDRESS_FIELD_NUMBER: _ClassVar[int]
    POSTALADDRESS_FIELD_NUMBER: _ClassVar[int]
    firstName: str
    middleNames: str
    lastName: str
    telephoneNumber: str
    cellphoneNumber: str
    emailAddress: str
    physicalAddress: _address_pb2.Address
    postalAddress: _address_pb2.Address
    def __init__(self, firstName: _Optional[str] = ..., middleNames: _Optional[str] = ..., lastName: _Optional[str] = ..., telephoneNumber: _Optional[str] = ..., cellphoneNumber: _Optional[str] = ..., emailAddress: _Optional[str] = ..., physicalAddress: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., postalAddress: _Optional[_Union[_address_pb2.Address, _Mapping]] = ...) -> None: ...
