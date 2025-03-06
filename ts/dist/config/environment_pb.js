// source: api/proto/config/environment.proto
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

goog.exportSymbol('proto.api.config.Environment', null, global);
/**
 * @enum {number}
 */
proto.api.config.Environment = {
  UNDEFINED_ENVIRONMENT: 0,
  LOCAL_ENVIRONMENT: 1,
  DEVELOPMENT_ENVIRONMENT: 2,
  TESTING_ENVIRONMENT: 3,
  STAGING_ENVIRONMENT: 4,
  PRODUCTION_ENVIRONMENT: 5
};

goog.object.extend(exports, proto.api.config);
