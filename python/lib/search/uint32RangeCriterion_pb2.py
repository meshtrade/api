# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: api/proto/search/uint32RangeCriterion.proto
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
    'api/proto/search/uint32RangeCriterion.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import timestamp_pb2 as google_dot_protobuf_dot_timestamp__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n+api/proto/search/uint32RangeCriterion.proto\x12\napi.search\x1a\x1fgoogle/protobuf/timestamp.proto\"}\n\x14Uint32RangeCriterion\x12\r\n\x05\x66ield\x18\x01 \x01(\t\x12+\n\x05start\x18\x02 \x01(\x0b\x32\x1c.api.search.Uint32RangeValue\x12)\n\x03\x65nd\x18\x03 \x01(\x0b\x32\x1c.api.search.Uint32RangeValue\"D\n\x10Uint32RangeValue\x12\r\n\x05value\x18\x01 \x01(\r\x12\x11\n\tinclusive\x18\x02 \x01(\x08\x12\x0e\n\x06ignore\x18\x03 \x01(\x08\x42$Z\"github.com/meshtrade/api/go/searchb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'api.python.lib.search.uint32RangeCriterion_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z\"github.com/meshtrade/api/go/search'
  _globals['_UINT32RANGECRITERION']._serialized_start=92
  _globals['_UINT32RANGECRITERION']._serialized_end=217
  _globals['_UINT32RANGEVALUE']._serialized_start=219
  _globals['_UINT32RANGEVALUE']._serialized_end=287
# @@protoc_insertion_point(module_scope)
