from google.protobuf.internal import enum_type_wrapper as _enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from typing import ClassVar as _ClassVar

DESCRIPTOR: _descriptor.FileDescriptor

class LegalForm(int, metaclass=_enum_type_wrapper.EnumTypeWrapper):
    __slots__ = ()
    UNDEFINED_LEGAL_FORM: _ClassVar[LegalForm]
    SOUTH_AFRICAN_COMPANY_LEGAL_FORM: _ClassVar[LegalForm]
    SOLE_PROPRIETORSHIP_LEGAL_FORM: _ClassVar[LegalForm]
    CLOSE_CORPORATION_LEGAL_FORM: _ClassVar[LegalForm]
    FOREIGN_COMPANY_LEGAL_FORM: _ClassVar[LegalForm]
    LISTED_COMPANY_LEGAL_FORM: _ClassVar[LegalForm]
    PARTNERSHIP_LEGAL_FORM: _ClassVar[LegalForm]
    TRUST_LEGAL_FORM: _ClassVar[LegalForm]
    OTHER_LEGAL_FORM: _ClassVar[LegalForm]
UNDEFINED_LEGAL_FORM: LegalForm
SOUTH_AFRICAN_COMPANY_LEGAL_FORM: LegalForm
SOLE_PROPRIETORSHIP_LEGAL_FORM: LegalForm
CLOSE_CORPORATION_LEGAL_FORM: LegalForm
FOREIGN_COMPANY_LEGAL_FORM: LegalForm
LISTED_COMPANY_LEGAL_FORM: LegalForm
PARTNERSHIP_LEGAL_FORM: LegalForm
TRUST_LEGAL_FORM: LegalForm
OTHER_LEGAL_FORM: LegalForm
