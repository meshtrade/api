/* eslint-disable */
// @ts-nocheck
// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var api_proto_legal_company_service_pb = require('../../legal/company/service_pb.js');
var api_proto_search_criterion_pb = require('../../search/criterion_pb.js');
var api_proto_search_query_pb = require('../../search/query_pb.js');
var api_proto_legal_company_company_pb = require('../../legal/company/company_pb.js');

function serialize_api_legal_company_ListRequest(arg) {
  if (!(arg instanceof api_proto_legal_company_service_pb.ListRequest)) {
    throw new Error('Expected argument of type api.legal.company.ListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_legal_company_ListRequest(buffer_arg) {
  return api_proto_legal_company_service_pb.ListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_legal_company_ListResponse(arg) {
  if (!(arg instanceof api_proto_legal_company_service_pb.ListResponse)) {
    throw new Error('Expected argument of type api.legal.company.ListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_legal_company_ListResponse(buffer_arg) {
  return api_proto_legal_company_service_pb.ListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ServiceService = exports.ServiceService = {
  list: {
    path: '/api.legal.company.Service/List',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_legal_company_service_pb.ListRequest,
    responseType: api_proto_legal_company_service_pb.ListResponse,
    requestSerialize: serialize_api_legal_company_ListRequest,
    requestDeserialize: deserialize_api_legal_company_ListRequest,
    responseSerialize: serialize_api_legal_company_ListResponse,
    responseDeserialize: deserialize_api_legal_company_ListResponse,
  },
};

exports.ServiceClient = grpc.makeGenericClientConstructor(ServiceService, 'Service');
