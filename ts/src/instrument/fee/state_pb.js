// source: instrument/fee/state.proto
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

goog.exportSymbol('proto.fee.State', null, global);
/**
 * @enum {number}
 */
proto.fee.State = {
  UNDEFINED_STATE: 0,
  UPCOMING_STATE: 1,
  DUE_STATE: 2,
  PAYMENT_IN_PROGRESS_STATE: 3,
  FAILED_STATE: 4,
  CANCELLED_STATE: 5,
  PAID_STATE: 6
};

goog.object.extend(exports, proto.fee);
