from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class LifecycleEventCategory(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_LIFECYCLE_EVENT_CATEGORY: _ClassVar[LifecycleEventCategory]
    LISTING_LIFECYCLE_EVENT_CATEGORY: _ClassVar[LifecycleEventCategory]
    PRIMARY_MARKET_SETTLEMENT_LIFECYCLE_EVENT_CATEGORY: _ClassVar[LifecycleEventCategory]
UNDEFINED_LIFECYCLE_EVENT_CATEGORY: LifecycleEventCategory
LISTING_LIFECYCLE_EVENT_CATEGORY: LifecycleEventCategory
PRIMARY_MARKET_SETTLEMENT_LIFECYCLE_EVENT_CATEGORY: LifecycleEventCategory
