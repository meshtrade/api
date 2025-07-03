from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class ContactDetails(_message.Message):
    __slots__ = ("email_address", "phone_number", "mobile_number", "website", "linkedin", "facebook", "instagram", "x_twitter", "youtube")
    EMAIL_ADDRESS_FIELD_NUMBER: _ClassVar[int]
    PHONE_NUMBER_FIELD_NUMBER: _ClassVar[int]
    MOBILE_NUMBER_FIELD_NUMBER: _ClassVar[int]
    WEBSITE_FIELD_NUMBER: _ClassVar[int]
    LINKEDIN_FIELD_NUMBER: _ClassVar[int]
    FACEBOOK_FIELD_NUMBER: _ClassVar[int]
    INSTAGRAM_FIELD_NUMBER: _ClassVar[int]
    X_TWITTER_FIELD_NUMBER: _ClassVar[int]
    YOUTUBE_FIELD_NUMBER: _ClassVar[int]
    email_address: str
    phone_number: str
    mobile_number: str
    website: str
    linkedin: str
    facebook: str
    instagram: str
    x_twitter: str
    youtube: str
    def __init__(self, email_address: _Optional[str] = ..., phone_number: _Optional[str] = ..., mobile_number: _Optional[str] = ..., website: _Optional[str] = ..., linkedin: _Optional[str] = ..., facebook: _Optional[str] = ..., instagram: _Optional[str] = ..., x_twitter: _Optional[str] = ..., youtube: _Optional[str] = ...) -> None: ...
