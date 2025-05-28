// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var api_proto_instrument_service_pb = require('../instrument/service_pb.js');
var api_proto_ledger_amount_pb = require('../ledger/amount_pb.js');

function serialize_api_instrument_BurnRequest(arg) {
  if (!(arg instanceof api_proto_instrument_service_pb.BurnRequest)) {
    throw new Error('Expected argument of type api.instrument.BurnRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_BurnRequest(buffer_arg) {
  return api_proto_instrument_service_pb.BurnRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_BurnResponse(arg) {
  if (!(arg instanceof api_proto_instrument_service_pb.BurnResponse)) {
    throw new Error('Expected argument of type api.instrument.BurnResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_BurnResponse(buffer_arg) {
  return api_proto_instrument_service_pb.BurnResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_MintRequest(arg) {
  if (!(arg instanceof api_proto_instrument_service_pb.MintRequest)) {
    throw new Error('Expected argument of type api.instrument.MintRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_MintRequest(buffer_arg) {
  return api_proto_instrument_service_pb.MintRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_MintResponse(arg) {
  if (!(arg instanceof api_proto_instrument_service_pb.MintResponse)) {
    throw new Error('Expected argument of type api.instrument.MintResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_MintResponse(buffer_arg) {
  return api_proto_instrument_service_pb.MintResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


//
// Service is the Instrument Service.
var ServiceService = exports.ServiceService = {
  mint: {
    path: '/api.instrument.Service/Mint',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_instrument_service_pb.MintRequest,
    responseType: api_proto_instrument_service_pb.MintResponse,
    requestSerialize: serialize_api_instrument_MintRequest,
    requestDeserialize: deserialize_api_instrument_MintRequest,
    responseSerialize: serialize_api_instrument_MintResponse,
    responseDeserialize: deserialize_api_instrument_MintResponse,
  },
  burn: {
    path: '/api.instrument.Service/Burn',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_instrument_service_pb.BurnRequest,
    responseType: api_proto_instrument_service_pb.BurnResponse,
    requestSerialize: serialize_api_instrument_BurnRequest,
    requestDeserialize: deserialize_api_instrument_BurnRequest,
    responseSerialize: serialize_api_instrument_BurnResponse,
    responseDeserialize: deserialize_api_instrument_BurnResponse,
  },
};

exports.ServiceClient = grpc.makeGenericClientConstructor(ServiceService, 'Service');
