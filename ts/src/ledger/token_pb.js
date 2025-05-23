// source: api/proto/ledger/token.proto
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

var api_proto_ledger_network_pb = require('../ledger/network_pb.js');
goog.object.extend(proto, api_proto_ledger_network_pb);
goog.exportSymbol('proto.api.ledger.Token', null, global);
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
proto.api.ledger.Token = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.ledger.Token, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.ledger.Token.displayName = 'proto.api.ledger.Token';
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
proto.api.ledger.Token.prototype.toObject = function(opt_includeInstance) {
  return proto.api.ledger.Token.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.ledger.Token} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.ledger.Token.toObject = function(includeInstance, msg) {
  var f, obj = {
code: jspb.Message.getFieldWithDefault(msg, 1, ""),
issuer: jspb.Message.getFieldWithDefault(msg, 2, ""),
network: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
 * @return {!proto.api.ledger.Token}
 */
proto.api.ledger.Token.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.ledger.Token;
  return proto.api.ledger.Token.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.ledger.Token} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.ledger.Token}
 */
proto.api.ledger.Token.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setIssuer(value);
      break;
    case 3:
      var value = /** @type {!proto.api.ledger.Network} */ (reader.readEnum());
      msg.setNetwork(value);
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
proto.api.ledger.Token.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.ledger.Token.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.ledger.Token} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.ledger.Token.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getIssuer();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNetwork();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * optional string code = 1;
 * @return {string}
 */
proto.api.ledger.Token.prototype.getCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.ledger.Token} returns this
 */
proto.api.ledger.Token.prototype.setCode = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string issuer = 2;
 * @return {string}
 */
proto.api.ledger.Token.prototype.getIssuer = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.ledger.Token} returns this
 */
proto.api.ledger.Token.prototype.setIssuer = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional Network network = 3;
 * @return {!proto.api.ledger.Network}
 */
proto.api.ledger.Token.prototype.getNetwork = function() {
  return /** @type {!proto.api.ledger.Network} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.api.ledger.Network} value
 * @return {!proto.api.ledger.Token} returns this
 */
proto.api.ledger.Token.prototype.setNetwork = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


goog.object.extend(exports, proto.api.ledger);
