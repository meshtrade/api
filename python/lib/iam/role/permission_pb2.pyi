from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class Permission(_message.Message):
    __slots__ = ("serviceProvider", "service", "description")
    SERVICEPROVIDER_FIELD_NUMBER: _ClassVar[int]
    SERVICE_FIELD_NUMBER: _ClassVar[int]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    serviceProvider: str
    service: str
    description: str
    def __init__(self, serviceProvider: _Optional[str] = ..., service: _Optional[str] = ..., description: _Optional[str] = ...) -> None: ...
