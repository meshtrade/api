// source: api/proto/banking/funding/paymentType.proto
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

goog.exportSymbol('proto.api.banking.funding.PaymentType', null, global);
goog.exportSymbol('proto.api.banking.funding.PeachPaymentMethod', null, global);
/**
 * @enum {number}
 */
proto.api.banking.funding.PaymentType = {
  UNDEFINED_PAYMENT_TYPE: 0,
  DB: 1,
  RG: 2,
  PA: 3,
  RF: 4,
  CP: 5,
  RV: 6,
  CD: 7,
  RB: 8
};

/**
 * @enum {number}
 */
proto.api.banking.funding.PeachPaymentMethod = {
  UNDEFINED_PEACH_FUNDING_CATEGORY: 0,
  PEACH_PAY_BY_BANK: 1,
  PEACH_PAY_BY_CARD: 2
};

goog.object.extend(exports, proto.api.banking.funding);
