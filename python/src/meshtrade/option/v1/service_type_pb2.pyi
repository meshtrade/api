from google.protobuf import descriptor_pb2 as _descriptor_pb2
from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class ServiceType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    SERVICE_TYPE_UNSPECIFIED: _ClassVar[ServiceType]
    SERVICE_TYPE_READ: _ClassVar[ServiceType]
    SERVICE_TYPE_WRITE: _ClassVar[ServiceType]
SERVICE_TYPE_UNSPECIFIED: ServiceType
SERVICE_TYPE_READ: ServiceType
SERVICE_TYPE_WRITE: ServiceType
SERVICE_TYPE_FIELD_NUMBER: _ClassVar[int]
service_type: _descriptor.FieldDescriptor
