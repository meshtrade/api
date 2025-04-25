from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class CompanyPublicContactInfo(_message.Message):
    __slots__ = ("firstName", "middleNames", "lastName", "telephoneNumber", "cellphoneNumber", "emailAddress")
    FIRSTNAME_FIELD_NUMBER: _ClassVar[int]
    MIDDLENAMES_FIELD_NUMBER: _ClassVar[int]
    LASTNAME_FIELD_NUMBER: _ClassVar[int]
    TELEPHONENUMBER_FIELD_NUMBER: _ClassVar[int]
    CELLPHONENUMBER_FIELD_NUMBER: _ClassVar[int]
    EMAILADDRESS_FIELD_NUMBER: _ClassVar[int]
    firstName: str
    middleNames: str
    lastName: str
    telephoneNumber: str
    cellphoneNumber: str
    emailAddress: str
    def __init__(self, firstName: _Optional[str] = ..., middleNames: _Optional[str] = ..., lastName: _Optional[str] = ..., telephoneNumber: _Optional[str] = ..., cellphoneNumber: _Optional[str] = ..., emailAddress: _Optional[str] = ...) -> None: ...
