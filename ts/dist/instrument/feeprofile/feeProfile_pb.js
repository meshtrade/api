/* eslint-disable */
// @ts-nocheck
// source: api/proto/instrument/feeprofile/feeProfile.proto
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

var api_proto_instrument_feeprofile_tokenisation_pb = require('../../instrument/feeprofile/tokenisation_pb.js');
goog.object.extend(proto, api_proto_instrument_feeprofile_tokenisation_pb);
var api_proto_instrument_feeprofile_lifecycleEvent_pb = require('../../instrument/feeprofile/lifecycleEvent_pb.js');
goog.object.extend(proto, api_proto_instrument_feeprofile_lifecycleEvent_pb);
var api_proto_instrument_feeprofile_aum_pb = require('../../instrument/feeprofile/aum_pb.js');
goog.object.extend(proto, api_proto_instrument_feeprofile_aum_pb);
goog.exportSymbol('proto.api.instrument.feeprofile.FeeProfile', null, global);
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
proto.api.instrument.feeprofile.FeeProfile = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.api.instrument.feeprofile.FeeProfile.repeatedFields_, null);
};
goog.inherits(proto.api.instrument.feeprofile.FeeProfile, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.feeprofile.FeeProfile.displayName = 'proto.api.instrument.feeprofile.FeeProfile';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.api.instrument.feeprofile.FeeProfile.repeatedFields_ = [3];



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
proto.api.instrument.feeprofile.FeeProfile.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.feeprofile.FeeProfile.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.feeprofile.FeeProfile} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.FeeProfile.toObject = function(includeInstance, msg) {
  var f, obj = {
instrumentid: jspb.Message.getFieldWithDefault(msg, 1, ""),
tokenisation: (f = msg.getTokenisation()) && api_proto_instrument_feeprofile_tokenisation_pb.Tokenisation.toObject(includeInstance, f),
lifecycleeventsList: jspb.Message.toObjectList(msg.getLifecycleeventsList(),
    api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent.toObject, includeInstance),
aum: (f = msg.getAum()) && api_proto_instrument_feeprofile_aum_pb.AUM.toObject(includeInstance, f)
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
 * @return {!proto.api.instrument.feeprofile.FeeProfile}
 */
proto.api.instrument.feeprofile.FeeProfile.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.feeprofile.FeeProfile;
  return proto.api.instrument.feeprofile.FeeProfile.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.feeprofile.FeeProfile} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.feeprofile.FeeProfile}
 */
proto.api.instrument.feeprofile.FeeProfile.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setInstrumentid(value);
      break;
    case 2:
      var value = new api_proto_instrument_feeprofile_tokenisation_pb.Tokenisation;
      reader.readMessage(value,api_proto_instrument_feeprofile_tokenisation_pb.Tokenisation.deserializeBinaryFromReader);
      msg.setTokenisation(value);
      break;
    case 3:
      var value = new api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent;
      reader.readMessage(value,api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent.deserializeBinaryFromReader);
      msg.addLifecycleevents(value);
      break;
    case 4:
      var value = new api_proto_instrument_feeprofile_aum_pb.AUM;
      reader.readMessage(value,api_proto_instrument_feeprofile_aum_pb.AUM.deserializeBinaryFromReader);
      msg.setAum(value);
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
proto.api.instrument.feeprofile.FeeProfile.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.feeprofile.FeeProfile.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.feeprofile.FeeProfile} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.FeeProfile.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getInstrumentid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTokenisation();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      api_proto_instrument_feeprofile_tokenisation_pb.Tokenisation.serializeBinaryToWriter
    );
  }
  f = message.getLifecycleeventsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent.serializeBinaryToWriter
    );
  }
  f = message.getAum();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      api_proto_instrument_feeprofile_aum_pb.AUM.serializeBinaryToWriter
    );
  }
};


/**
 * optional string instrumentID = 1;
 * @return {string}
 */
proto.api.instrument.feeprofile.FeeProfile.prototype.getInstrumentid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.instrument.feeprofile.FeeProfile} returns this
 */
proto.api.instrument.feeprofile.FeeProfile.prototype.setInstrumentid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Tokenisation tokenisation = 2;
 * @return {?proto.api.instrument.feeprofile.Tokenisation}
 */
proto.api.instrument.feeprofile.FeeProfile.prototype.getTokenisation = function() {
  return /** @type{?proto.api.instrument.feeprofile.Tokenisation} */ (
    jspb.Message.getWrapperField(this, api_proto_instrument_feeprofile_tokenisation_pb.Tokenisation, 2));
};


/**
 * @param {?proto.api.instrument.feeprofile.Tokenisation|undefined} value
 * @return {!proto.api.instrument.feeprofile.FeeProfile} returns this
*/
proto.api.instrument.feeprofile.FeeProfile.prototype.setTokenisation = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.feeprofile.FeeProfile} returns this
 */
proto.api.instrument.feeprofile.FeeProfile.prototype.clearTokenisation = function() {
  return this.setTokenisation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.feeprofile.FeeProfile.prototype.hasTokenisation = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated LifecycleEvent lifecycleEvents = 3;
 * @return {!Array<!proto.api.instrument.feeprofile.LifecycleEvent>}
 */
proto.api.instrument.feeprofile.FeeProfile.prototype.getLifecycleeventsList = function() {
  return /** @type{!Array<!proto.api.instrument.feeprofile.LifecycleEvent>} */ (
    jspb.Message.getRepeatedWrapperField(this, api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent, 3));
};


/**
 * @param {!Array<!proto.api.instrument.feeprofile.LifecycleEvent>} value
 * @return {!proto.api.instrument.feeprofile.FeeProfile} returns this
*/
proto.api.instrument.feeprofile.FeeProfile.prototype.setLifecycleeventsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.api.instrument.feeprofile.LifecycleEvent=} opt_value
 * @param {number=} opt_index
 * @return {!proto.api.instrument.feeprofile.LifecycleEvent}
 */
proto.api.instrument.feeprofile.FeeProfile.prototype.addLifecycleevents = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.api.instrument.feeprofile.LifecycleEvent, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.api.instrument.feeprofile.FeeProfile} returns this
 */
proto.api.instrument.feeprofile.FeeProfile.prototype.clearLifecycleeventsList = function() {
  return this.setLifecycleeventsList([]);
};


/**
 * optional AUM aum = 4;
 * @return {?proto.api.instrument.feeprofile.AUM}
 */
proto.api.instrument.feeprofile.FeeProfile.prototype.getAum = function() {
  return /** @type{?proto.api.instrument.feeprofile.AUM} */ (
    jspb.Message.getWrapperField(this, api_proto_instrument_feeprofile_aum_pb.AUM, 4));
};


/**
 * @param {?proto.api.instrument.feeprofile.AUM|undefined} value
 * @return {!proto.api.instrument.feeprofile.FeeProfile} returns this
*/
proto.api.instrument.feeprofile.FeeProfile.prototype.setAum = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.feeprofile.FeeProfile} returns this
 */
proto.api.instrument.feeprofile.FeeProfile.prototype.clearAum = function() {
  return this.setAum(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.feeprofile.FeeProfile.prototype.hasAum = function() {
  return jspb.Message.getField(this, 4) != null;
};


goog.object.extend(exports, proto.api.instrument.feeprofile);
