# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: api/proto/instrument/feeprofile/lifecycleEventCalculationConfigAmount.proto
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
    'api/proto/instrument/feeprofile/lifecycleEventCalculationConfigAmount.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from api.python.lib.ledger import amount_pb2 as api_dot_proto_dot_ledger_dot_amount__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\nKapi/proto/instrument/feeprofile/lifecycleEventCalculationConfigAmount.proto\x12\x19\x61pi.instrument.feeprofile\x1a\x1d\x61pi/proto/ledger/amount.proto\"K\n%AmountLifecycleEventCalculationConfig\x12\"\n\x06\x61mount\x18\x01 \x01(\x0b\x32\x12.api.ledger.AmountB3Z1github.com/meshtrade/api/go/instrument/feeprofileb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'api.python.lib.instrument.feeprofile.lifecycleEventCalculationConfigAmount_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z1github.com/meshtrade/api/go/instrument/feeprofile'
  _globals['_AMOUNTLIFECYCLEEVENTCALCULATIONCONFIG']._serialized_start=137
  _globals['_AMOUNTLIFECYCLEEVENTCALCULATIONCONFIG']._serialized_end=212
# @@protoc_insertion_point(module_scope)
