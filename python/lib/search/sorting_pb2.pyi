from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class SortingOrder(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_SORTING_ORDER: _ClassVar[SortingOrder]
    ASC_SORTING_ORDER: _ClassVar[SortingOrder]
    DESC_SORTING_ORDER: _ClassVar[SortingOrder]
UNDEFINED_SORTING_ORDER: SortingOrder
ASC_SORTING_ORDER: SortingOrder
DESC_SORTING_ORDER: SortingOrder

class Sorting(_message.Message):
    __slots__ = ("field", "order")
    FIELD_FIELD_NUMBER: _ClassVar[int]
    ORDER_FIELD_NUMBER: _ClassVar[int]
    field: str
    order: SortingOrder
    def __init__(self, field: _Optional[str] = ..., order: _Optional[_Union[SortingOrder, str]] = ...) -> None: ...
