from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class Permission(_message.Message):
    __slots__ = ("service_provider", "service", "description")
    SERVICE_PROVIDER_FIELD_NUMBER: _ClassVar[int]
    SERVICE_FIELD_NUMBER: _ClassVar[int]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    service_provider: str
    service: str
    description: str
    def __init__(self, service_provider: _Optional[str] = ..., service: _Optional[str] = ..., description: _Optional[str] = ...) -> None: ...
