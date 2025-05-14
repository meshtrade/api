/* eslint-disable */
// @ts-nocheck
// source: api/proto/legal/legalform.proto
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

goog.exportSymbol('proto.api.legal.LegalForm', null, global);
/**
 * @enum {number}
 */
proto.api.legal.LegalForm = {
  UNDEFINED_LEGAL_FORM: 0,
  SOUTH_AFRICAN_COMPANY_LEGAL_FORM: 1,
  SOLE_PROPRIETORSHIP_LEGAL_FORM: 2,
  CLOSE_CORPORATION_LEGAL_FORM: 3,
  FOREIGN_COMPANY_LEGAL_FORM: 4,
  LISTED_COMPANY_LEGAL_FORM: 5,
  PARTNERSHIP_LEGAL_FORM: 6,
  TRUST_LEGAL_FORM: 7,
  OTHER_LEGAL_FORM: 8
};

goog.object.extend(exports, proto.api.legal);
