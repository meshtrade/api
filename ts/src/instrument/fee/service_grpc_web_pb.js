/**
 * @fileoverview gRPC-Web generated client stub for api.instrument.fee
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v5.28.0
// source: api/proto/instrument/fee/service.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var api_proto_instrument_fee_fee_pb = require('../../instrument/fee/fee_pb.js')

var api_proto_ledger_amount_pb = require('../../ledger/amount_pb.js')

var api_proto_search_criterion_pb = require('../../search/criterion_pb.js')

var api_proto_search_query_pb = require('../../search/query_pb.js')
const proto = {};
proto.api = {};
proto.api.instrument = {};
proto.api.instrument.fee = require('./service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.api.instrument.fee.ServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.api.instrument.fee.ServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.instrument.fee.GetRequest,
 *   !proto.api.instrument.fee.GetResponse>}
 */
const methodDescriptor_Service_Get = new grpc.web.MethodDescriptor(
  '/api.instrument.fee.Service/Get',
  grpc.web.MethodType.UNARY,
  proto.api.instrument.fee.GetRequest,
  proto.api.instrument.fee.GetResponse,
  /**
   * @param {!proto.api.instrument.fee.GetRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.instrument.fee.GetResponse.deserializeBinary
);


/**
 * @param {!proto.api.instrument.fee.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.instrument.fee.GetResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.instrument.fee.GetResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.instrument.fee.ServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.instrument.fee.Service/Get',
      request,
      metadata || {},
      methodDescriptor_Service_Get,
      callback);
};


/**
 * @param {!proto.api.instrument.fee.GetRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.instrument.fee.GetResponse>}
 *     Promise that resolves to the response
 */
proto.api.instrument.fee.ServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.instrument.fee.Service/Get',
      request,
      metadata || {},
      methodDescriptor_Service_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.instrument.fee.ListRequest,
 *   !proto.api.instrument.fee.ListResponse>}
 */
const methodDescriptor_Service_List = new grpc.web.MethodDescriptor(
  '/api.instrument.fee.Service/List',
  grpc.web.MethodType.UNARY,
  proto.api.instrument.fee.ListRequest,
  proto.api.instrument.fee.ListResponse,
  /**
   * @param {!proto.api.instrument.fee.ListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.instrument.fee.ListResponse.deserializeBinary
);


/**
 * @param {!proto.api.instrument.fee.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.instrument.fee.ListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.instrument.fee.ListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.instrument.fee.ServiceClient.prototype.list =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.instrument.fee.Service/List',
      request,
      metadata || {},
      methodDescriptor_Service_List,
      callback);
};


/**
 * @param {!proto.api.instrument.fee.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.instrument.fee.ListResponse>}
 *     Promise that resolves to the response
 */
proto.api.instrument.fee.ServicePromiseClient.prototype.list =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.instrument.fee.Service/List',
      request,
      metadata || {},
      methodDescriptor_Service_List);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.instrument.fee.CalculateMintingFeesRequest,
 *   !proto.api.instrument.fee.CalculateMintingFeesResponse>}
 */
const methodDescriptor_Service_CalculateMintingFees = new grpc.web.MethodDescriptor(
  '/api.instrument.fee.Service/CalculateMintingFees',
  grpc.web.MethodType.UNARY,
  proto.api.instrument.fee.CalculateMintingFeesRequest,
  proto.api.instrument.fee.CalculateMintingFeesResponse,
  /**
   * @param {!proto.api.instrument.fee.CalculateMintingFeesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.instrument.fee.CalculateMintingFeesResponse.deserializeBinary
);


/**
 * @param {!proto.api.instrument.fee.CalculateMintingFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.instrument.fee.CalculateMintingFeesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.instrument.fee.CalculateMintingFeesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.instrument.fee.ServiceClient.prototype.calculateMintingFees =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.instrument.fee.Service/CalculateMintingFees',
      request,
      metadata || {},
      methodDescriptor_Service_CalculateMintingFees,
      callback);
};


/**
 * @param {!proto.api.instrument.fee.CalculateMintingFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.instrument.fee.CalculateMintingFeesResponse>}
 *     Promise that resolves to the response
 */
proto.api.instrument.fee.ServicePromiseClient.prototype.calculateMintingFees =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.instrument.fee.Service/CalculateMintingFees',
      request,
      metadata || {},
      methodDescriptor_Service_CalculateMintingFees);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.instrument.fee.CalculateBurningFeesRequest,
 *   !proto.api.instrument.fee.CalculateBurningFeesResponse>}
 */
const methodDescriptor_Service_CalculateBurningFees = new grpc.web.MethodDescriptor(
  '/api.instrument.fee.Service/CalculateBurningFees',
  grpc.web.MethodType.UNARY,
  proto.api.instrument.fee.CalculateBurningFeesRequest,
  proto.api.instrument.fee.CalculateBurningFeesResponse,
  /**
   * @param {!proto.api.instrument.fee.CalculateBurningFeesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.instrument.fee.CalculateBurningFeesResponse.deserializeBinary
);


/**
 * @param {!proto.api.instrument.fee.CalculateBurningFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.instrument.fee.CalculateBurningFeesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.instrument.fee.CalculateBurningFeesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.instrument.fee.ServiceClient.prototype.calculateBurningFees =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.instrument.fee.Service/CalculateBurningFees',
      request,
      metadata || {},
      methodDescriptor_Service_CalculateBurningFees,
      callback);
};


/**
 * @param {!proto.api.instrument.fee.CalculateBurningFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.instrument.fee.CalculateBurningFeesResponse>}
 *     Promise that resolves to the response
 */
proto.api.instrument.fee.ServicePromiseClient.prototype.calculateBurningFees =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.instrument.fee.Service/CalculateBurningFees',
      request,
      metadata || {},
      methodDescriptor_Service_CalculateBurningFees);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.instrument.fee.CalculateLifecycleFeesRequest,
 *   !proto.api.instrument.fee.CalculateLifecycleFeesResponse>}
 */
const methodDescriptor_Service_CalculateLifecycleFees = new grpc.web.MethodDescriptor(
  '/api.instrument.fee.Service/CalculateLifecycleFees',
  grpc.web.MethodType.UNARY,
  proto.api.instrument.fee.CalculateLifecycleFeesRequest,
  proto.api.instrument.fee.CalculateLifecycleFeesResponse,
  /**
   * @param {!proto.api.instrument.fee.CalculateLifecycleFeesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.instrument.fee.CalculateLifecycleFeesResponse.deserializeBinary
);


/**
 * @param {!proto.api.instrument.fee.CalculateLifecycleFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.instrument.fee.CalculateLifecycleFeesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.instrument.fee.CalculateLifecycleFeesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.instrument.fee.ServiceClient.prototype.calculateLifecycleFees =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.instrument.fee.Service/CalculateLifecycleFees',
      request,
      metadata || {},
      methodDescriptor_Service_CalculateLifecycleFees,
      callback);
};


/**
 * @param {!proto.api.instrument.fee.CalculateLifecycleFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.instrument.fee.CalculateLifecycleFeesResponse>}
 *     Promise that resolves to the response
 */
proto.api.instrument.fee.ServicePromiseClient.prototype.calculateLifecycleFees =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.instrument.fee.Service/CalculateLifecycleFees',
      request,
      metadata || {},
      methodDescriptor_Service_CalculateLifecycleFees);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.instrument.fee.FullUpdateRequest,
 *   !proto.api.instrument.fee.FullUpdateResponse>}
 */
const methodDescriptor_Service_FullUpdate = new grpc.web.MethodDescriptor(
  '/api.instrument.fee.Service/FullUpdate',
  grpc.web.MethodType.UNARY,
  proto.api.instrument.fee.FullUpdateRequest,
  proto.api.instrument.fee.FullUpdateResponse,
  /**
   * @param {!proto.api.instrument.fee.FullUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.instrument.fee.FullUpdateResponse.deserializeBinary
);


/**
 * @param {!proto.api.instrument.fee.FullUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.instrument.fee.FullUpdateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.instrument.fee.FullUpdateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.instrument.fee.ServiceClient.prototype.fullUpdate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.instrument.fee.Service/FullUpdate',
      request,
      metadata || {},
      methodDescriptor_Service_FullUpdate,
      callback);
};


/**
 * @param {!proto.api.instrument.fee.FullUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.instrument.fee.FullUpdateResponse>}
 *     Promise that resolves to the response
 */
proto.api.instrument.fee.ServicePromiseClient.prototype.fullUpdate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.instrument.fee.Service/FullUpdate',
      request,
      metadata || {},
      methodDescriptor_Service_FullUpdate);
};


module.exports = proto.api.instrument.fee;

