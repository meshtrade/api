from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class PaymentType(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_PAYMENT_TYPE: _ClassVar[PaymentType]
    DB_PAYMENT_TYPE: _ClassVar[PaymentType]
    RG_PAYMENT_TYPE: _ClassVar[PaymentType]
    PA_PAYMENT_TYPE: _ClassVar[PaymentType]
    RF_PAYMENT_TYPE: _ClassVar[PaymentType]
    CP_PAYMENT_TYPE: _ClassVar[PaymentType]
    RV_PAYMENT_TYPE: _ClassVar[PaymentType]
    CD_PAYMENT_TYPE: _ClassVar[PaymentType]
    RB_PAYMENT_TYPE: _ClassVar[PaymentType]

class PeachPaymentMethod(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_PEACH_PAYMENT_METHOD: _ClassVar[PeachPaymentMethod]
    PEACH_PAY_BY_BANK_PAYMENT_METHOD: _ClassVar[PeachPaymentMethod]
    PEACH_PAY_BY_CARD_PAYMENT_METHOD: _ClassVar[PeachPaymentMethod]
UNDEFINED_PAYMENT_TYPE: PaymentType
DB_PAYMENT_TYPE: PaymentType
RG_PAYMENT_TYPE: PaymentType
PA_PAYMENT_TYPE: PaymentType
RF_PAYMENT_TYPE: PaymentType
CP_PAYMENT_TYPE: PaymentType
RV_PAYMENT_TYPE: PaymentType
CD_PAYMENT_TYPE: PaymentType
RB_PAYMENT_TYPE: PaymentType
UNDEFINED_PEACH_PAYMENT_METHOD: PeachPaymentMethod
PEACH_PAY_BY_BANK_PAYMENT_METHOD: PeachPaymentMethod
PEACH_PAY_BY_CARD_PAYMENT_METHOD: PeachPaymentMethod
