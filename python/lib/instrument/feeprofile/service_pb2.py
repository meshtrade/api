# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: api/proto/instrument/feeprofile/service.proto
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
    'api/proto/instrument/feeprofile/service.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from api.python.lib.instrument.feeprofile import feeProfile_pb2 as api_dot_proto_dot_instrument_dot_feeprofile_dot_feeProfile__pb2
from api.python.lib.search import criterion_pb2 as api_dot_proto_dot_search_dot_criterion__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n-api/proto/instrument/feeprofile/service.proto\x12\x19\x61pi.instrument.feeprofile\x1a\x30\x61pi/proto/instrument/feeprofile/feeProfile.proto\x1a api/proto/search/criterion.proto\"J\n\rCreateRequest\x12\x39\n\nfeeProfile\x18\x01 \x01(\x0b\x32%.api.instrument.feeprofile.FeeProfile\"K\n\x0e\x43reateResponse\x12\x39\n\nfeeProfile\x18\x01 \x01(\x0b\x32%.api.instrument.feeprofile.FeeProfile\"J\n\rUpdateRequest\x12\x39\n\nfeeProfile\x18\x01 \x01(\x0b\x32%.api.instrument.feeprofile.FeeProfile\"K\n\x0eUpdateResponse\x12\x39\n\nfeeProfile\x18\x01 \x01(\x0b\x32%.api.instrument.feeprofile.FeeProfile\"6\n\x0bListRequest\x12\'\n\x08\x63riteria\x18\x01 \x03(\x0b\x32\x15.api.search.Criterion\"J\n\x0cListResponse\x12:\n\x0b\x66\x65\x65Profiles\x18\x01 \x03(\x0b\x32%.api.instrument.feeprofile.FeeProfile2\xa0\x02\n\x07Service\x12]\n\x06\x43reate\x12(.api.instrument.feeprofile.CreateRequest\x1a).api.instrument.feeprofile.CreateResponse\x12]\n\x06Update\x12(.api.instrument.feeprofile.UpdateRequest\x1a).api.instrument.feeprofile.UpdateResponse\x12W\n\x04List\x12&.api.instrument.feeprofile.ListRequest\x1a\'.api.instrument.feeprofile.ListResponseB3Z1github.com/meshtrade/api/go/instrument/feeprofileb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'api.python.lib.instrument.feeprofile.service_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z1github.com/meshtrade/api/go/instrument/feeprofile'
  _globals['_CREATEREQUEST']._serialized_start=160
  _globals['_CREATEREQUEST']._serialized_end=234
  _globals['_CREATERESPONSE']._serialized_start=236
  _globals['_CREATERESPONSE']._serialized_end=311
  _globals['_UPDATEREQUEST']._serialized_start=313
  _globals['_UPDATEREQUEST']._serialized_end=387
  _globals['_UPDATERESPONSE']._serialized_start=389
  _globals['_UPDATERESPONSE']._serialized_end=464
  _globals['_LISTREQUEST']._serialized_start=466
  _globals['_LISTREQUEST']._serialized_end=520
  _globals['_LISTRESPONSE']._serialized_start=522
  _globals['_LISTRESPONSE']._serialized_end=596
  _globals['_SERVICE']._serialized_start=599
  _globals['_SERVICE']._serialized_end=887
# @@protoc_insertion_point(module_scope)
