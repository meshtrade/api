// source: instrument/fee/category.proto
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

goog.exportSymbol('proto.fee.Category', null, global);
/**
 * @enum {number}
 */
proto.fee.Category = {
  UNDEFINED_CATEGORY: 0,
  TOKENISATION_CATEGORY: 1,
  LISTING_CATEGORY: 2,
  PRIMARY_MARKET_SETTLEMENT_CATEGORY: 3,
  AUM_CATEGORY: 4
};

goog.object.extend(exports, proto.fee);
