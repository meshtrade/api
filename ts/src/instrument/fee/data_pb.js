// source: api/proto/instrument/fee/data.proto
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

var api_proto_instrument_fee_dataAmount_pb = require('../../instrument/fee/dataAmount_pb.js');
goog.object.extend(proto, api_proto_instrument_fee_dataAmount_pb);
var api_proto_instrument_fee_dataRate_pb = require('../../instrument/fee/dataRate_pb.js');
goog.object.extend(proto, api_proto_instrument_fee_dataRate_pb);
var api_proto_instrument_fee_dataPerUnit_pb = require('../../instrument/fee/dataPerUnit_pb.js');
goog.object.extend(proto, api_proto_instrument_fee_dataPerUnit_pb);
goog.exportSymbol('proto.api.instrument.fee.Data', null, global);
goog.exportSymbol('proto.api.instrument.fee.Data.DataCase', null, global);
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
proto.api.instrument.fee.Data = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.api.instrument.fee.Data.oneofGroups_);
};
goog.inherits(proto.api.instrument.fee.Data, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.fee.Data.displayName = 'proto.api.instrument.fee.Data';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.api.instrument.fee.Data.oneofGroups_ = [[1,2,3]];

/**
 * @enum {number}
 */
proto.api.instrument.fee.Data.DataCase = {
  DATA_NOT_SET: 0,
  AMOUNTDATA: 1,
  RATEDATA: 2,
  PERUNITDATA: 3
};

/**
 * @return {proto.api.instrument.fee.Data.DataCase}
 */
proto.api.instrument.fee.Data.prototype.getDataCase = function() {
  return /** @type {proto.api.instrument.fee.Data.DataCase} */(jspb.Message.computeOneofCase(this, proto.api.instrument.fee.Data.oneofGroups_[0]));
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
proto.api.instrument.fee.Data.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.fee.Data.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.fee.Data} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.fee.Data.toObject = function(includeInstance, msg) {
  var f, obj = {
amountdata: (f = msg.getAmountdata()) && api_proto_instrument_fee_dataAmount_pb.AmountData.toObject(includeInstance, f),
ratedata: (f = msg.getRatedata()) && api_proto_instrument_fee_dataRate_pb.RateData.toObject(includeInstance, f),
perunitdata: (f = msg.getPerunitdata()) && api_proto_instrument_fee_dataPerUnit_pb.PerUnitData.toObject(includeInstance, f)
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
 * @return {!proto.api.instrument.fee.Data}
 */
proto.api.instrument.fee.Data.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.fee.Data;
  return proto.api.instrument.fee.Data.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.fee.Data} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.fee.Data}
 */
proto.api.instrument.fee.Data.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new api_proto_instrument_fee_dataAmount_pb.AmountData;
      reader.readMessage(value,api_proto_instrument_fee_dataAmount_pb.AmountData.deserializeBinaryFromReader);
      msg.setAmountdata(value);
      break;
    case 2:
      var value = new api_proto_instrument_fee_dataRate_pb.RateData;
      reader.readMessage(value,api_proto_instrument_fee_dataRate_pb.RateData.deserializeBinaryFromReader);
      msg.setRatedata(value);
      break;
    case 3:
      var value = new api_proto_instrument_fee_dataPerUnit_pb.PerUnitData;
      reader.readMessage(value,api_proto_instrument_fee_dataPerUnit_pb.PerUnitData.deserializeBinaryFromReader);
      msg.setPerunitdata(value);
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
proto.api.instrument.fee.Data.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.fee.Data.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.fee.Data} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.fee.Data.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAmountdata();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      api_proto_instrument_fee_dataAmount_pb.AmountData.serializeBinaryToWriter
    );
  }
  f = message.getRatedata();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      api_proto_instrument_fee_dataRate_pb.RateData.serializeBinaryToWriter
    );
  }
  f = message.getPerunitdata();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      api_proto_instrument_fee_dataPerUnit_pb.PerUnitData.serializeBinaryToWriter
    );
  }
};


/**
 * optional AmountData amountData = 1;
 * @return {?proto.api.instrument.fee.AmountData}
 */
proto.api.instrument.fee.Data.prototype.getAmountdata = function() {
  return /** @type{?proto.api.instrument.fee.AmountData} */ (
    jspb.Message.getWrapperField(this, api_proto_instrument_fee_dataAmount_pb.AmountData, 1));
};


/**
 * @param {?proto.api.instrument.fee.AmountData|undefined} value
 * @return {!proto.api.instrument.fee.Data} returns this
*/
proto.api.instrument.fee.Data.prototype.setAmountdata = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.api.instrument.fee.Data.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.fee.Data} returns this
 */
proto.api.instrument.fee.Data.prototype.clearAmountdata = function() {
  return this.setAmountdata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.fee.Data.prototype.hasAmountdata = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional RateData rateData = 2;
 * @return {?proto.api.instrument.fee.RateData}
 */
proto.api.instrument.fee.Data.prototype.getRatedata = function() {
  return /** @type{?proto.api.instrument.fee.RateData} */ (
    jspb.Message.getWrapperField(this, api_proto_instrument_fee_dataRate_pb.RateData, 2));
};


/**
 * @param {?proto.api.instrument.fee.RateData|undefined} value
 * @return {!proto.api.instrument.fee.Data} returns this
*/
proto.api.instrument.fee.Data.prototype.setRatedata = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.api.instrument.fee.Data.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.fee.Data} returns this
 */
proto.api.instrument.fee.Data.prototype.clearRatedata = function() {
  return this.setRatedata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.fee.Data.prototype.hasRatedata = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional PerUnitData perUnitData = 3;
 * @return {?proto.api.instrument.fee.PerUnitData}
 */
proto.api.instrument.fee.Data.prototype.getPerunitdata = function() {
  return /** @type{?proto.api.instrument.fee.PerUnitData} */ (
    jspb.Message.getWrapperField(this, api_proto_instrument_fee_dataPerUnit_pb.PerUnitData, 3));
};


/**
 * @param {?proto.api.instrument.fee.PerUnitData|undefined} value
 * @return {!proto.api.instrument.fee.Data} returns this
*/
proto.api.instrument.fee.Data.prototype.setPerunitdata = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.api.instrument.fee.Data.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.fee.Data} returns this
 */
proto.api.instrument.fee.Data.prototype.clearPerunitdata = function() {
  return this.setPerunitdata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.fee.Data.prototype.hasPerunitdata = function() {
  return jspb.Message.getField(this, 3) != null;
};


goog.object.extend(exports, proto.api.instrument.fee);
