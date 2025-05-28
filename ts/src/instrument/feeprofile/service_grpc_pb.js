// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var api_proto_instrument_feeprofile_service_pb = require('../../instrument/feeprofile/service_pb.js');
var api_proto_instrument_feeprofile_feeProfile_pb = require('../../instrument/feeprofile/feeProfile_pb.js');
var api_proto_search_criterion_pb = require('../../search/criterion_pb.js');
var api_proto_search_query_pb = require('../../search/query_pb.js');

function serialize_api_instrument_feeprofile_CreateRequest(arg) {
  if (!(arg instanceof api_proto_instrument_feeprofile_service_pb.CreateRequest)) {
    throw new Error('Expected argument of type api.instrument.feeprofile.CreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_feeprofile_CreateRequest(buffer_arg) {
  return api_proto_instrument_feeprofile_service_pb.CreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_feeprofile_CreateResponse(arg) {
  if (!(arg instanceof api_proto_instrument_feeprofile_service_pb.CreateResponse)) {
    throw new Error('Expected argument of type api.instrument.feeprofile.CreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_feeprofile_CreateResponse(buffer_arg) {
  return api_proto_instrument_feeprofile_service_pb.CreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_feeprofile_GetRequest(arg) {
  if (!(arg instanceof api_proto_instrument_feeprofile_service_pb.GetRequest)) {
    throw new Error('Expected argument of type api.instrument.feeprofile.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_feeprofile_GetRequest(buffer_arg) {
  return api_proto_instrument_feeprofile_service_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_feeprofile_GetResponse(arg) {
  if (!(arg instanceof api_proto_instrument_feeprofile_service_pb.GetResponse)) {
    throw new Error('Expected argument of type api.instrument.feeprofile.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_feeprofile_GetResponse(buffer_arg) {
  return api_proto_instrument_feeprofile_service_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_feeprofile_ListRequest(arg) {
  if (!(arg instanceof api_proto_instrument_feeprofile_service_pb.ListRequest)) {
    throw new Error('Expected argument of type api.instrument.feeprofile.ListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_feeprofile_ListRequest(buffer_arg) {
  return api_proto_instrument_feeprofile_service_pb.ListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_feeprofile_ListResponse(arg) {
  if (!(arg instanceof api_proto_instrument_feeprofile_service_pb.ListResponse)) {
    throw new Error('Expected argument of type api.instrument.feeprofile.ListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_feeprofile_ListResponse(buffer_arg) {
  return api_proto_instrument_feeprofile_service_pb.ListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_feeprofile_UpdateRequest(arg) {
  if (!(arg instanceof api_proto_instrument_feeprofile_service_pb.UpdateRequest)) {
    throw new Error('Expected argument of type api.instrument.feeprofile.UpdateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_feeprofile_UpdateRequest(buffer_arg) {
  return api_proto_instrument_feeprofile_service_pb.UpdateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_instrument_feeprofile_UpdateResponse(arg) {
  if (!(arg instanceof api_proto_instrument_feeprofile_service_pb.UpdateResponse)) {
    throw new Error('Expected argument of type api.instrument.feeprofile.UpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_instrument_feeprofile_UpdateResponse(buffer_arg) {
  return api_proto_instrument_feeprofile_service_pb.UpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


//
// Service is the Fee Profile Service.
var ServiceService = exports.ServiceService = {
  create: {
    path: '/api.instrument.feeprofile.Service/Create',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_instrument_feeprofile_service_pb.CreateRequest,
    responseType: api_proto_instrument_feeprofile_service_pb.CreateResponse,
    requestSerialize: serialize_api_instrument_feeprofile_CreateRequest,
    requestDeserialize: deserialize_api_instrument_feeprofile_CreateRequest,
    responseSerialize: serialize_api_instrument_feeprofile_CreateResponse,
    responseDeserialize: deserialize_api_instrument_feeprofile_CreateResponse,
  },
  update: {
    path: '/api.instrument.feeprofile.Service/Update',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_instrument_feeprofile_service_pb.UpdateRequest,
    responseType: api_proto_instrument_feeprofile_service_pb.UpdateResponse,
    requestSerialize: serialize_api_instrument_feeprofile_UpdateRequest,
    requestDeserialize: deserialize_api_instrument_feeprofile_UpdateRequest,
    responseSerialize: serialize_api_instrument_feeprofile_UpdateResponse,
    responseDeserialize: deserialize_api_instrument_feeprofile_UpdateResponse,
  },
  list: {
    path: '/api.instrument.feeprofile.Service/List',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_instrument_feeprofile_service_pb.ListRequest,
    responseType: api_proto_instrument_feeprofile_service_pb.ListResponse,
    requestSerialize: serialize_api_instrument_feeprofile_ListRequest,
    requestDeserialize: deserialize_api_instrument_feeprofile_ListRequest,
    responseSerialize: serialize_api_instrument_feeprofile_ListResponse,
    responseDeserialize: deserialize_api_instrument_feeprofile_ListResponse,
  },
  get: {
    path: '/api.instrument.feeprofile.Service/Get',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_instrument_feeprofile_service_pb.GetRequest,
    responseType: api_proto_instrument_feeprofile_service_pb.GetResponse,
    requestSerialize: serialize_api_instrument_feeprofile_GetRequest,
    requestDeserialize: deserialize_api_instrument_feeprofile_GetRequest,
    responseSerialize: serialize_api_instrument_feeprofile_GetResponse,
    responseDeserialize: deserialize_api_instrument_feeprofile_GetResponse,
  },
};

exports.ServiceClient = grpc.makeGenericClientConstructor(ServiceService, 'Service');
