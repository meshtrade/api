// source: instrument/feeprofile/lifecycleEventFeeCalculationConfig.proto
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

var instrument_feeprofile_lifecycleEventFeeCalculationConfigAmount_pb = require('../../instrument/feeprofile/lifecycleEventFeeCalculationConfigAmount_pb.js');
goog.object.extend(proto, instrument_feeprofile_lifecycleEventFeeCalculationConfigAmount_pb);
var instrument_feeprofile_lifecycleEventFeeCalculationConfigRate_pb = require('../../instrument/feeprofile/lifecycleEventFeeCalculationConfigRate_pb.js');
goog.object.extend(proto, instrument_feeprofile_lifecycleEventFeeCalculationConfigRate_pb);
goog.exportSymbol('proto.feeprofile.LifecycleEventFeeCalculationConfig', null, global);
goog.exportSymbol('proto.feeprofile.LifecycleEventFeeCalculationConfig.LifecycleeventfeecalculationconfigCase', null, global);
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
proto.feeprofile.LifecycleEventFeeCalculationConfig = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.feeprofile.LifecycleEventFeeCalculationConfig.oneofGroups_);
};
goog.inherits(proto.feeprofile.LifecycleEventFeeCalculationConfig, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.feeprofile.LifecycleEventFeeCalculationConfig.displayName = 'proto.feeprofile.LifecycleEventFeeCalculationConfig';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.LifecycleeventfeecalculationconfigCase = {
  LIFECYCLEEVENTFEECALCULATIONCONFIG_NOT_SET: 0,
  AMOUNTLIFECYCLEEVENTFEECALCULATIONCONFIG: 1,
  RATELIFECYCLEEVENTFEECALCULATIONCONFIG: 2
};

/**
 * @return {proto.feeprofile.LifecycleEventFeeCalculationConfig.LifecycleeventfeecalculationconfigCase}
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.prototype.getLifecycleeventfeecalculationconfigCase = function() {
  return /** @type {proto.feeprofile.LifecycleEventFeeCalculationConfig.LifecycleeventfeecalculationconfigCase} */(jspb.Message.computeOneofCase(this, proto.feeprofile.LifecycleEventFeeCalculationConfig.oneofGroups_[0]));
};



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
proto.feeprofile.LifecycleEventFeeCalculationConfig.prototype.toObject = function(opt_includeInstance) {
  return proto.feeprofile.LifecycleEventFeeCalculationConfig.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.feeprofile.LifecycleEventFeeCalculationConfig} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.toObject = function(includeInstance, msg) {
  var f, obj = {
amountlifecycleeventfeecalculationconfig: (f = msg.getAmountlifecycleeventfeecalculationconfig()) && instrument_feeprofile_lifecycleEventFeeCalculationConfigAmount_pb.AmountLifecycleEventFeeCalculationConfig.toObject(includeInstance, f),
ratelifecycleeventfeecalculationconfig: (f = msg.getRatelifecycleeventfeecalculationconfig()) && instrument_feeprofile_lifecycleEventFeeCalculationConfigRate_pb.RateLifecycleEventFeeCalculationConfig.toObject(includeInstance, f)
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
 * @return {!proto.feeprofile.LifecycleEventFeeCalculationConfig}
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.feeprofile.LifecycleEventFeeCalculationConfig;
  return proto.feeprofile.LifecycleEventFeeCalculationConfig.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.feeprofile.LifecycleEventFeeCalculationConfig} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.feeprofile.LifecycleEventFeeCalculationConfig}
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new instrument_feeprofile_lifecycleEventFeeCalculationConfigAmount_pb.AmountLifecycleEventFeeCalculationConfig;
      reader.readMessage(value,instrument_feeprofile_lifecycleEventFeeCalculationConfigAmount_pb.AmountLifecycleEventFeeCalculationConfig.deserializeBinaryFromReader);
      msg.setAmountlifecycleeventfeecalculationconfig(value);
      break;
    case 2:
      var value = new instrument_feeprofile_lifecycleEventFeeCalculationConfigRate_pb.RateLifecycleEventFeeCalculationConfig;
      reader.readMessage(value,instrument_feeprofile_lifecycleEventFeeCalculationConfigRate_pb.RateLifecycleEventFeeCalculationConfig.deserializeBinaryFromReader);
      msg.setRatelifecycleeventfeecalculationconfig(value);
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
proto.feeprofile.LifecycleEventFeeCalculationConfig.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.feeprofile.LifecycleEventFeeCalculationConfig.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.feeprofile.LifecycleEventFeeCalculationConfig} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAmountlifecycleeventfeecalculationconfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      instrument_feeprofile_lifecycleEventFeeCalculationConfigAmount_pb.AmountLifecycleEventFeeCalculationConfig.serializeBinaryToWriter
    );
  }
  f = message.getRatelifecycleeventfeecalculationconfig();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      instrument_feeprofile_lifecycleEventFeeCalculationConfigRate_pb.RateLifecycleEventFeeCalculationConfig.serializeBinaryToWriter
    );
  }
};


/**
 * optional AmountLifecycleEventFeeCalculationConfig amountLifecycleEventFeeCalculationConfig = 1;
 * @return {?proto.feeprofile.AmountLifecycleEventFeeCalculationConfig}
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.prototype.getAmountlifecycleeventfeecalculationconfig = function() {
  return /** @type{?proto.feeprofile.AmountLifecycleEventFeeCalculationConfig} */ (
    jspb.Message.getWrapperField(this, instrument_feeprofile_lifecycleEventFeeCalculationConfigAmount_pb.AmountLifecycleEventFeeCalculationConfig, 1));
};


/**
 * @param {?proto.feeprofile.AmountLifecycleEventFeeCalculationConfig|undefined} value
 * @return {!proto.feeprofile.LifecycleEventFeeCalculationConfig} returns this
*/
proto.feeprofile.LifecycleEventFeeCalculationConfig.prototype.setAmountlifecycleeventfeecalculationconfig = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.feeprofile.LifecycleEventFeeCalculationConfig.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.feeprofile.LifecycleEventFeeCalculationConfig} returns this
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.prototype.clearAmountlifecycleeventfeecalculationconfig = function() {
  return this.setAmountlifecycleeventfeecalculationconfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.prototype.hasAmountlifecycleeventfeecalculationconfig = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional RateLifecycleEventFeeCalculationConfig rateLifecycleEventFeeCalculationConfig = 2;
 * @return {?proto.feeprofile.RateLifecycleEventFeeCalculationConfig}
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.prototype.getRatelifecycleeventfeecalculationconfig = function() {
  return /** @type{?proto.feeprofile.RateLifecycleEventFeeCalculationConfig} */ (
    jspb.Message.getWrapperField(this, instrument_feeprofile_lifecycleEventFeeCalculationConfigRate_pb.RateLifecycleEventFeeCalculationConfig, 2));
};


/**
 * @param {?proto.feeprofile.RateLifecycleEventFeeCalculationConfig|undefined} value
 * @return {!proto.feeprofile.LifecycleEventFeeCalculationConfig} returns this
*/
proto.feeprofile.LifecycleEventFeeCalculationConfig.prototype.setRatelifecycleeventfeecalculationconfig = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.feeprofile.LifecycleEventFeeCalculationConfig.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.feeprofile.LifecycleEventFeeCalculationConfig} returns this
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.prototype.clearRatelifecycleeventfeecalculationconfig = function() {
  return this.setRatelifecycleeventfeecalculationconfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.feeprofile.LifecycleEventFeeCalculationConfig.prototype.hasRatelifecycleeventfeecalculationconfig = function() {
  return jspb.Message.getField(this, 2) != null;
};


goog.object.extend(exports, proto.feeprofile);
