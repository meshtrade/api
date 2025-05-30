// source: api/proto/legal/companyPublicContactInfo.proto
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

goog.exportSymbol('proto.api.legal.CompanyPublicContactInfo', null, global);
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
proto.api.legal.CompanyPublicContactInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.legal.CompanyPublicContactInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.legal.CompanyPublicContactInfo.displayName = 'proto.api.legal.CompanyPublicContactInfo';
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
proto.api.legal.CompanyPublicContactInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.api.legal.CompanyPublicContactInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.legal.CompanyPublicContactInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.legal.CompanyPublicContactInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
firstname: jspb.Message.getFieldWithDefault(msg, 1, ""),
middlenames: jspb.Message.getFieldWithDefault(msg, 2, ""),
lastname: jspb.Message.getFieldWithDefault(msg, 3, ""),
telephonenumber: jspb.Message.getFieldWithDefault(msg, 4, ""),
cellphonenumber: jspb.Message.getFieldWithDefault(msg, 5, ""),
emailaddress: jspb.Message.getFieldWithDefault(msg, 6, "")
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
 * @return {!proto.api.legal.CompanyPublicContactInfo}
 */
proto.api.legal.CompanyPublicContactInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.legal.CompanyPublicContactInfo;
  return proto.api.legal.CompanyPublicContactInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.legal.CompanyPublicContactInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.legal.CompanyPublicContactInfo}
 */
proto.api.legal.CompanyPublicContactInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFirstname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMiddlenames(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setLastname(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTelephonenumber(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setCellphonenumber(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmailaddress(value);
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
proto.api.legal.CompanyPublicContactInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.legal.CompanyPublicContactInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.legal.CompanyPublicContactInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.legal.CompanyPublicContactInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFirstname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getMiddlenames();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getLastname();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTelephonenumber();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getCellphonenumber();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getEmailaddress();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional string firstName = 1;
 * @return {string}
 */
proto.api.legal.CompanyPublicContactInfo.prototype.getFirstname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.legal.CompanyPublicContactInfo} returns this
 */
proto.api.legal.CompanyPublicContactInfo.prototype.setFirstname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string middleNames = 2;
 * @return {string}
 */
proto.api.legal.CompanyPublicContactInfo.prototype.getMiddlenames = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.legal.CompanyPublicContactInfo} returns this
 */
proto.api.legal.CompanyPublicContactInfo.prototype.setMiddlenames = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string lastName = 3;
 * @return {string}
 */
proto.api.legal.CompanyPublicContactInfo.prototype.getLastname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.legal.CompanyPublicContactInfo} returns this
 */
proto.api.legal.CompanyPublicContactInfo.prototype.setLastname = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string telephoneNumber = 4;
 * @return {string}
 */
proto.api.legal.CompanyPublicContactInfo.prototype.getTelephonenumber = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.legal.CompanyPublicContactInfo} returns this
 */
proto.api.legal.CompanyPublicContactInfo.prototype.setTelephonenumber = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string cellphoneNumber = 5;
 * @return {string}
 */
proto.api.legal.CompanyPublicContactInfo.prototype.getCellphonenumber = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.legal.CompanyPublicContactInfo} returns this
 */
proto.api.legal.CompanyPublicContactInfo.prototype.setCellphonenumber = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string emailAddress = 6;
 * @return {string}
 */
proto.api.legal.CompanyPublicContactInfo.prototype.getEmailaddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.legal.CompanyPublicContactInfo} returns this
 */
proto.api.legal.CompanyPublicContactInfo.prototype.setEmailaddress = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


goog.object.extend(exports, proto.api.legal);
