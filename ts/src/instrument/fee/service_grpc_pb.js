// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var api_proto_instrument_fee_service_pb = require('../../instrument/fee/service_pb.js');
var api_proto_instrument_fee_fee_pb = require('../../instrument/fee/fee_pb.js');
var api_proto_ledger_amount_pb = require('../../ledger/amount_pb.js');
var api_proto_search_criterion_pb = require('../../search/criterion_pb.js');

function serialize_api_instrument_fee_CalculateBurningFeesRequest(arg) {
  if (!(arg instanceof api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest)) {
    throw new Error('Expected argument of type api.instrument.fee.CalculateBurningFeesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_fee_CalculateBurningFeesRequest(buffer_arg) {
  return api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_fee_CalculateBurningFeesResponse(arg) {
  if (!(arg instanceof api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse)) {
    throw new Error('Expected argument of type api.instrument.fee.CalculateBurningFeesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_fee_CalculateBurningFeesResponse(buffer_arg) {
  return api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_fee_CalculateMintingFeesRequest(arg) {
  if (!(arg instanceof api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest)) {
    throw new Error('Expected argument of type api.instrument.fee.CalculateMintingFeesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_fee_CalculateMintingFeesRequest(buffer_arg) {
  return api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_fee_CalculateMintingFeesResponse(arg) {
  if (!(arg instanceof api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse)) {
    throw new Error('Expected argument of type api.instrument.fee.CalculateMintingFeesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_fee_CalculateMintingFeesResponse(buffer_arg) {
  return api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_fee_GetRequest(arg) {
  if (!(arg instanceof api_proto_instrument_fee_service_pb.GetRequest)) {
    throw new Error('Expected argument of type api.instrument.fee.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_fee_GetRequest(buffer_arg) {
  return api_proto_instrument_fee_service_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_fee_GetResponse(arg) {
  if (!(arg instanceof api_proto_instrument_fee_service_pb.GetResponse)) {
    throw new Error('Expected argument of type api.instrument.fee.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_fee_GetResponse(buffer_arg) {
  return api_proto_instrument_fee_service_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_fee_ListRequest(arg) {
  if (!(arg instanceof api_proto_instrument_fee_service_pb.ListRequest)) {
    throw new Error('Expected argument of type api.instrument.fee.ListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_fee_ListRequest(buffer_arg) {
  return api_proto_instrument_fee_service_pb.ListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_fee_ListResponse(arg) {
  if (!(arg instanceof api_proto_instrument_fee_service_pb.ListResponse)) {
    throw new Error('Expected argument of type api.instrument.fee.ListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_fee_ListResponse(buffer_arg) {
  return api_proto_instrument_fee_service_pb.ListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


//
// Service is the Fee Service.
var ServiceService = exports.ServiceService = {
  get: {
    path: '/api.instrument.fee.Service/Get',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_instrument_fee_service_pb.GetRequest,
    responseType: api_proto_instrument_fee_service_pb.GetResponse,
    requestSerialize: serialize_api_instrument_fee_GetRequest,
    requestDeserialize: deserialize_api_instrument_fee_GetRequest,
    responseSerialize: serialize_api_instrument_fee_GetResponse,
    responseDeserialize: deserialize_api_instrument_fee_GetResponse,
  },
  list: {
    path: '/api.instrument.fee.Service/List',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_instrument_fee_service_pb.ListRequest,
    responseType: api_proto_instrument_fee_service_pb.ListResponse,
    requestSerialize: serialize_api_instrument_fee_ListRequest,
    requestDeserialize: deserialize_api_instrument_fee_ListRequest,
    responseSerialize: serialize_api_instrument_fee_ListResponse,
    responseDeserialize: deserialize_api_instrument_fee_ListResponse,
  },
  calculateMintingFees: {
    path: '/api.instrument.fee.Service/CalculateMintingFees',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_instrument_fee_service_pb.CalculateMintingFeesRequest,
    responseType: api_proto_instrument_fee_service_pb.CalculateMintingFeesResponse,
    requestSerialize: serialize_api_instrument_fee_CalculateMintingFeesRequest,
    requestDeserialize: deserialize_api_instrument_fee_CalculateMintingFeesRequest,
    responseSerialize: serialize_api_instrument_fee_CalculateMintingFeesResponse,
    responseDeserialize: deserialize_api_instrument_fee_CalculateMintingFeesResponse,
  },
  calculateBurningFees: {
    path: '/api.instrument.fee.Service/CalculateBurningFees',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_instrument_fee_service_pb.CalculateBurningFeesRequest,
    responseType: api_proto_instrument_fee_service_pb.CalculateBurningFeesResponse,
    requestSerialize: serialize_api_instrument_fee_CalculateBurningFeesRequest,
    requestDeserialize: deserialize_api_instrument_fee_CalculateBurningFeesRequest,
    responseSerialize: serialize_api_instrument_fee_CalculateBurningFeesResponse,
    responseDeserialize: deserialize_api_instrument_fee_CalculateBurningFeesResponse,
  },
};

exports.ServiceClient = grpc.makeGenericClientConstructor(ServiceService, 'Service');
