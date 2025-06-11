/* eslint-disable */
// @ts-nocheck
// source: api/proto/client/clientType.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

goog.exportSymbol('proto.api.client.ClientType', null, global);
/**
 * @enum {number}
 */
proto.api.client.ClientType = {
  UNDEFINED_COMPANY_CLIENT_TYPE: 0,
  ISSUER_COMPANY_CLIENT_TYPE: 1,
  INVESTOR_COMPANY_CLIENT_TYPE: 2,
  MANAGING_COMPANY_CLIENT_TYPE: 3
};

goog.object.extend(exports, proto.api.client);
