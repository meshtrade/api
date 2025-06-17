from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class LifecycleEventCategory(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    LIFECYCLE_EVENT_CATEGORY_UNSPECIFIED: _ClassVar[LifecycleEventCategory]
    LIFECYCLE_EVENT_CATEGORY_LISTING: _ClassVar[LifecycleEventCategory]
    LIFECYCLE_EVENT_CATEGORY_PRIMARY_MARKET_SETTLEMENT: _ClassVar[LifecycleEventCategory]
LIFECYCLE_EVENT_CATEGORY_UNSPECIFIED: LifecycleEventCategory
LIFECYCLE_EVENT_CATEGORY_LISTING: LifecycleEventCategory
LIFECYCLE_EVENT_CATEGORY_PRIMARY_MARKET_SETTLEMENT: LifecycleEventCategory
