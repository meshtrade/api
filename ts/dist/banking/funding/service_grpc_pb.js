/* eslint-disable */
// @ts-nocheck
// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var api_proto_banking_funding_service_pb = require('../../banking/funding/service_pb.js');
var api_proto_banking_funding_funding_pb = require('../../banking/funding/funding_pb.js');
var api_proto_search_criterion_pb = require('../../search/criterion_pb.js');
var api_proto_search_query_pb = require('../../search/query_pb.js');

function serialize_api_banking_funding_CreateRequest(arg) {
  if (!(arg instanceof api_proto_banking_funding_service_pb.CreateRequest)) {
    throw new Error('Expected argument of type api.banking.funding.CreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_banking_funding_CreateRequest(buffer_arg) {
  return api_proto_banking_funding_service_pb.CreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_banking_funding_CreateResponse(arg) {
  if (!(arg instanceof api_proto_banking_funding_service_pb.CreateResponse)) {
    throw new Error('Expected argument of type api.banking.funding.CreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_banking_funding_CreateResponse(buffer_arg) {
  return api_proto_banking_funding_service_pb.CreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_banking_funding_GetRequest(arg) {
  if (!(arg instanceof api_proto_banking_funding_service_pb.GetRequest)) {
    throw new Error('Expected argument of type api.banking.funding.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_banking_funding_GetRequest(buffer_arg) {
  return api_proto_banking_funding_service_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_banking_funding_GetResponse(arg) {
  if (!(arg instanceof api_proto_banking_funding_service_pb.GetResponse)) {
    throw new Error('Expected argument of type api.banking.funding.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_banking_funding_GetResponse(buffer_arg) {
  return api_proto_banking_funding_service_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_banking_funding_ListRequest(arg) {
  if (!(arg instanceof api_proto_banking_funding_service_pb.ListRequest)) {
    throw new Error('Expected argument of type api.banking.funding.ListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_banking_funding_ListRequest(buffer_arg) {
  return api_proto_banking_funding_service_pb.ListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_banking_funding_ListResponse(arg) {
  if (!(arg instanceof api_proto_banking_funding_service_pb.ListResponse)) {
    throw new Error('Expected argument of type api.banking.funding.ListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_banking_funding_ListResponse(buffer_arg) {
  return api_proto_banking_funding_service_pb.ListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_banking_funding_SettleRequest(arg) {
  if (!(arg instanceof api_proto_banking_funding_service_pb.SettleRequest)) {
    throw new Error('Expected argument of type api.banking.funding.SettleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_banking_funding_SettleRequest(buffer_arg) {
  return api_proto_banking_funding_service_pb.SettleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_banking_funding_SettleResponse(arg) {
  if (!(arg instanceof api_proto_banking_funding_service_pb.SettleResponse)) {
    throw new Error('Expected argument of type api.banking.funding.SettleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_banking_funding_SettleResponse(buffer_arg) {
  return api_proto_banking_funding_service_pb.SettleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_banking_funding_UpdateRequest(arg) {
  if (!(arg instanceof api_proto_banking_funding_service_pb.UpdateRequest)) {
    throw new Error('Expected argument of type api.banking.funding.UpdateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_banking_funding_UpdateRequest(buffer_arg) {
  return api_proto_banking_funding_service_pb.UpdateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_banking_funding_UpdateResponse(arg) {
  if (!(arg instanceof api_proto_banking_funding_service_pb.UpdateResponse)) {
    throw new Error('Expected argument of type api.banking.funding.UpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_banking_funding_UpdateResponse(buffer_arg) {
  return api_proto_banking_funding_service_pb.UpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


//
// Service is the Funding Service.
//
// @go-impl
var ServiceService = exports.ServiceService = {
  create: {
    path: '/api.banking.funding.Service/Create',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_banking_funding_service_pb.CreateRequest,
    responseType: api_proto_banking_funding_service_pb.CreateResponse,
    requestSerialize: serialize_api_banking_funding_CreateRequest,
    requestDeserialize: deserialize_api_banking_funding_CreateRequest,
    responseSerialize: serialize_api_banking_funding_CreateResponse,
    responseDeserialize: deserialize_api_banking_funding_CreateResponse,
  },
  get: {
    path: '/api.banking.funding.Service/Get',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_banking_funding_service_pb.GetRequest,
    responseType: api_proto_banking_funding_service_pb.GetResponse,
    requestSerialize: serialize_api_banking_funding_GetRequest,
    requestDeserialize: deserialize_api_banking_funding_GetRequest,
    responseSerialize: serialize_api_banking_funding_GetResponse,
    responseDeserialize: deserialize_api_banking_funding_GetResponse,
  },
  list: {
    path: '/api.banking.funding.Service/List',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_banking_funding_service_pb.ListRequest,
    responseType: api_proto_banking_funding_service_pb.ListResponse,
    requestSerialize: serialize_api_banking_funding_ListRequest,
    requestDeserialize: deserialize_api_banking_funding_ListRequest,
    responseSerialize: serialize_api_banking_funding_ListResponse,
    responseDeserialize: deserialize_api_banking_funding_ListResponse,
  },
  update: {
    path: '/api.banking.funding.Service/Update',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_banking_funding_service_pb.UpdateRequest,
    responseType: api_proto_banking_funding_service_pb.UpdateResponse,
    requestSerialize: serialize_api_banking_funding_UpdateRequest,
    requestDeserialize: deserialize_api_banking_funding_UpdateRequest,
    responseSerialize: serialize_api_banking_funding_UpdateResponse,
    responseDeserialize: deserialize_api_banking_funding_UpdateResponse,
  },
  settle: {
    path: '/api.banking.funding.Service/Settle',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_banking_funding_service_pb.SettleRequest,
    responseType: api_proto_banking_funding_service_pb.SettleResponse,
    requestSerialize: serialize_api_banking_funding_SettleRequest,
    requestDeserialize: deserialize_api_banking_funding_SettleRequest,
    responseSerialize: serialize_api_banking_funding_SettleResponse,
    responseDeserialize: deserialize_api_banking_funding_SettleResponse,
  },
};

exports.ServiceClient = grpc.makeGenericClientConstructor(ServiceService, 'Service');
