// source: api/proto/instrument/feeprofile/lifecycleEventCalculationConfigAmount.proto
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

var api_proto_ledger_amount_pb = require('../../ledger/amount_pb.js');
goog.object.extend(proto, api_proto_ledger_amount_pb);
goog.exportSymbol('proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.displayName = 'proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
amount: (f = msg.getAmount()) && api_proto_ledger_amount_pb.Amount.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig}
 */
proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig;
  return proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig}
 */
proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new api_proto_ledger_amount_pb.Amount;
      reader.readMessage(value,api_proto_ledger_amount_pb.Amount.deserializeBinaryFromReader);
      msg.setAmount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAmount();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      api_proto_ledger_amount_pb.Amount.serializeBinaryToWriter
    );
  }
};


/**
 * optional api.ledger.Amount amount = 1;
 * @return {?proto.api.ledger.Amount}
 */
proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.prototype.getAmount = function() {
  return /** @type{?proto.api.ledger.Amount} */ (
    jspb.Message.getWrapperField(this, api_proto_ledger_amount_pb.Amount, 1));
};


/**
 * @param {?proto.api.ledger.Amount|undefined} value
 * @return {!proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig} returns this
*/
proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.prototype.setAmount = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig} returns this
 */
proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.prototype.clearAmount = function() {
  return this.setAmount(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.prototype.hasAmount = function() {
  return jspb.Message.getField(this, 1) != null;
};


goog.object.extend(exports, proto.api.instrument.feeprofile);
