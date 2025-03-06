// source: api/proto/ledger/network.proto
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

goog.exportSymbol('proto.api.ledger.Network', null, global);
/**
 * @enum {number}
 */
proto.api.ledger.Network = {
  UNDEFINED_NETWORK: 0,
  STELLAR_NETWORK: 1,
  BITCOIN_NETWORK: 2,
  LITECOIN_NETWORK: 3,
  ETHEREUM_NETWORK: 4,
  RIPPLE_NETWORK: 5,
  SA_STOCK_BROKERS_NETWORK: 6,
  NULL_NETWORK: 7
};

goog.object.extend(exports, proto.api.ledger);
