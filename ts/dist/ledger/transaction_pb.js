/* eslint-disable */
// @ts-nocheck
// source: api/proto/ledger/transaction.proto
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

goog.exportSymbol('proto.api.ledger.TransactionAction', null, global);
goog.exportSymbol('proto.api.ledger.TransactionState', null, global);
/**
 * @enum {number}
 */
proto.api.ledger.TransactionState = {
  UNDEFINED_TRANSACTION_STATE: 0,
  DRAFT_TRANSACTION_STATE: 1,
  SIGNING_IN_PROGRESS_TRANSACTION_STATE: 2,
  PENDING_TRANSACTION_STATE: 3,
  SUBMISSION_IN_PROGRESS_TRANSACTION_STATE: 4,
  FAILED_TRANSACTION_STATE: 5,
  INDETERMINATE_TRANSACTION_STATE: 6,
  SUCCESSFUL_TRANSACTION_STATE: 7
};

/**
 * @enum {number}
 */
proto.api.ledger.TransactionAction = {
  UNDEFINED_TRANSACTION_ACTION: 0,
  DO_NOTHING_TRANSACTION_ACTION: 1,
  BUILD_TRANSACTION_ACTION: 2,
  COMMIT_TRANSACTION_ACTION: 3,
  SIGN_TRANSACTION_ACTION: 4,
  MARK_PENDING_TRANSACTION_ACTION: 5,
  SUBMIT_TRANSACTION_ACTION: 6
};

goog.object.extend(exports, proto.api.ledger);
