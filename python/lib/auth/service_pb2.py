# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: api/proto/auth/service.proto
# Protobuf Python Version: 5.29.0
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    29,
    0,
    '',
    'api/proto/auth/service.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x1c\x61pi/proto/auth/service.proto\x12\x08\x61pi.auth\"6\n\x1dLoginWithFirebaseTokenRequest\x12\x15\n\rfirebaseToken\x18\x01 \x01(\t\"6\n\x1eLoginWithFirebaseTokenResponse\x12\x14\n\x0csessionToken\x18\x01 \x01(\t2v\n\x07Service\x12k\n\x16LoginWithFirebaseToken\x12\'.api.auth.LoginWithFirebaseTokenRequest\x1a(.api.auth.LoginWithFirebaseTokenResponseB\"Z github.com/meshtrade/api/go/authb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'api.python.lib.auth.service_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z github.com/meshtrade/api/go/auth'
  _globals['_LOGINWITHFIREBASETOKENREQUEST']._serialized_start=42
  _globals['_LOGINWITHFIREBASETOKENREQUEST']._serialized_end=96
  _globals['_LOGINWITHFIREBASETOKENRESPONSE']._serialized_start=98
  _globals['_LOGINWITHFIREBASETOKENRESPONSE']._serialized_end=152
  _globals['_SERVICE']._serialized_start=154
  _globals['_SERVICE']._serialized_end=272
# @@protoc_insertion_point(module_scope)
