from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class LoginWithFirebaseTokenRequest(_message.Message):
    __slots__ = ("firebaseToken",)
    FIREBASETOKEN_FIELD_NUMBER: _ClassVar[int]
    firebaseToken: str
    def __init__(self, firebaseToken: _Optional[str] = ...) -> None: ...

class LoginWithFirebaseTokenResponse(_message.Message):
    __slots__ = ("sessionToken",)
    SESSIONTOKEN_FIELD_NUMBER: _ClassVar[int]
    sessionToken: str
    def __init__(self, sessionToken: _Optional[str] = ...) -> None: ...
