# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: api/proto/search/sorting.proto
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
    'api/proto/search/sorting.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x1e\x61pi/proto/search/sorting.proto\x12\napi.search\"A\n\x07Sorting\x12\r\n\x05\x66ield\x18\x01 \x01(\t\x12\'\n\x05order\x18\x02 \x01(\x0e\x32\x18.api.search.SortingOrder*Z\n\x0cSortingOrder\x12\x1b\n\x17UNDEFINED_SORTING_ORDER\x10\x00\x12\x15\n\x11\x41SC_SORTING_ORDER\x10\x01\x12\x16\n\x12\x44\x45SC_SORTING_ORDER\x10\x02\x42$Z\"github.com/meshtrade/api/go/searchb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'api.python.lib.search.sorting_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z\"github.com/meshtrade/api/go/search'
  _globals['_SORTINGORDER']._serialized_start=113
  _globals['_SORTINGORDER']._serialized_end=203
  _globals['_SORTING']._serialized_start=46
  _globals['_SORTING']._serialized_end=111
# @@protoc_insertion_point(module_scope)
