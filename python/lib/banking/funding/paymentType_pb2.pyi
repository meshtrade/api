from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class PaymentType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_PAYMENT_TYPE: _ClassVar[PaymentType]
    DB: _ClassVar[PaymentType]
    RG: _ClassVar[PaymentType]
    PA: _ClassVar[PaymentType]
    RF: _ClassVar[PaymentType]
    CP: _ClassVar[PaymentType]
    RV: _ClassVar[PaymentType]
    CD: _ClassVar[PaymentType]
    RB: _ClassVar[PaymentType]

class PeachPaymentMethod(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_PEACH_FUNDING_CATEGORY: _ClassVar[PeachPaymentMethod]
    PEACH_PAY_BY_BANK: _ClassVar[PeachPaymentMethod]
    PEACH_PAY_BY_CARD: _ClassVar[PeachPaymentMethod]
UNDEFINED_PAYMENT_TYPE: PaymentType
DB: PaymentType
RG: PaymentType
PA: PaymentType
RF: PaymentType
CP: PaymentType
RV: PaymentType
CD: PaymentType
RB: PaymentType
UNDEFINED_PEACH_FUNDING_CATEGORY: PeachPaymentMethod
PEACH_PAY_BY_BANK: PeachPaymentMethod
PEACH_PAY_BY_CARD: PeachPaymentMethod
