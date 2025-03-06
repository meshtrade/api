from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class Environment(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_ENVIRONMENT: _ClassVar[Environment]
    LOCAL_ENVIRONMENT: _ClassVar[Environment]
    DEVELOPMENT_ENVIRONMENT: _ClassVar[Environment]
    TESTING_ENVIRONMENT: _ClassVar[Environment]
    STAGING_ENVIRONMENT: _ClassVar[Environment]
    PRODUCTION_ENVIRONMENT: _ClassVar[Environment]
UNDEFINED_ENVIRONMENT: Environment
LOCAL_ENVIRONMENT: Environment
DEVELOPMENT_ENVIRONMENT: Environment
TESTING_ENVIRONMENT: Environment
STAGING_ENVIRONMENT: Environment
PRODUCTION_ENVIRONMENT: Environment
