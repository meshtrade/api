// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var api_proto_auth_service_pb = require('../auth/service_pb.js');

function serialize_api_auth_LoginWithFirebaseTokenRequest(arg) {
  if (!(arg instanceof api_proto_auth_service_pb.LoginWithFirebaseTokenRequest)) {
    throw new Error('Expected argument of type api.auth.LoginWithFirebaseTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_auth_LoginWithFirebaseTokenRequest(buffer_arg) {
  return api_proto_auth_service_pb.LoginWithFirebaseTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_auth_LoginWithFirebaseTokenResponse(arg) {
  if (!(arg instanceof api_proto_auth_service_pb.LoginWithFirebaseTokenResponse)) {
    throw new Error('Expected argument of type api.auth.LoginWithFirebaseTokenResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_auth_LoginWithFirebaseTokenResponse(buffer_arg) {
  return api_proto_auth_service_pb.LoginWithFirebaseTokenResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


//
// Service is the Auth Service.
var ServiceService = exports.ServiceService = {
  loginWithFirebaseToken: {
    path: '/api.auth.Service/LoginWithFirebaseToken',
    requestStream: false,
    responseStream: false,
    requestType: api_proto_auth_service_pb.LoginWithFirebaseTokenRequest,
    responseType: api_proto_auth_service_pb.LoginWithFirebaseTokenResponse,
    requestSerialize: serialize_api_auth_LoginWithFirebaseTokenRequest,
    requestDeserialize: deserialize_api_auth_LoginWithFirebaseTokenRequest,
    responseSerialize: serialize_api_auth_LoginWithFirebaseTokenResponse,
    responseDeserialize: deserialize_api_auth_LoginWithFirebaseTokenResponse,
  },
};

exports.ServiceClient = grpc.makeGenericClientConstructor(ServiceService, 'Service');
