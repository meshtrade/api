from api.python.lib.location import address_pb2 as _address_pb2
from api.python.lib.legal import connectedIndividialConnectionType_pb2 as _connectedIndividialConnectionType_pb2
from api.python.lib.legal import identificationType_pb2 as _identificationType_pb2
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class ConnectedIndividual(_message.Message):
    __slots__ = ("connectionType", "firstName", "middleNames", "lastName", "dateOfBirth", "nationality", "identificationType", "identificationNumber", "physicalAddress", "postalAddress", "telephoneNumber", "cellphoneNumber", "emailAddress")
    CONNECTIONTYPE_FIELD_NUMBER: _ClassVar[int]
    FIRSTNAME_FIELD_NUMBER: _ClassVar[int]
    MIDDLENAMES_FIELD_NUMBER: _ClassVar[int]
    LASTNAME_FIELD_NUMBER: _ClassVar[int]
    DATEOFBIRTH_FIELD_NUMBER: _ClassVar[int]
    NATIONALITY_FIELD_NUMBER: _ClassVar[int]
    IDENTIFICATIONTYPE_FIELD_NUMBER: _ClassVar[int]
    IDENTIFICATIONNUMBER_FIELD_NUMBER: _ClassVar[int]
    PHYSICALADDRESS_FIELD_NUMBER: _ClassVar[int]
    POSTALADDRESS_FIELD_NUMBER: _ClassVar[int]
    TELEPHONENUMBER_FIELD_NUMBER: _ClassVar[int]
    CELLPHONENUMBER_FIELD_NUMBER: _ClassVar[int]
    EMAILADDRESS_FIELD_NUMBER: _ClassVar[int]
    connectionType: _connectedIndividialConnectionType_pb2.ConnectedIndividualConnectionType
    firstName: str
    middleNames: str
    lastName: str
    dateOfBirth: str
    nationality: str
    identificationType: _identificationType_pb2.IdentificationType
    identificationNumber: str
    physicalAddress: _address_pb2.Address
    postalAddress: _address_pb2.Address
    telephoneNumber: str
    cellphoneNumber: str
    emailAddress: str
    def __init__(self, connectionType: _Optional[_Union[_connectedIndividialConnectionType_pb2.ConnectedIndividualConnectionType, str]] = ..., firstName: _Optional[str] = ..., middleNames: _Optional[str] = ..., lastName: _Optional[str] = ..., dateOfBirth: _Optional[str] = ..., nationality: _Optional[str] = ..., identificationType: _Optional[_Union[_identificationType_pb2.IdentificationType, str]] = ..., identificationNumber: _Optional[str] = ..., physicalAddress: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., postalAddress: _Optional[_Union[_address_pb2.Address, _Mapping]] = ..., telephoneNumber: _Optional[str] = ..., cellphoneNumber: _Optional[str] = ..., emailAddress: _Optional[str] = ...) -> None: ...
