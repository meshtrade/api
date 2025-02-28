// source: api/proto/instrument/service.proto
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

var api_proto_ledger_amount_pb = require('../ledger/amount_pb.js');
goog.object.extend(proto, api_proto_ledger_amount_pb);
goog.exportSymbol('proto.api.instrument.BurnRequest', null, global);
goog.exportSymbol('proto.api.instrument.BurnResponse', null, global);
goog.exportSymbol('proto.api.instrument.MintRequest', null, global);
goog.exportSymbol('proto.api.instrument.MintResponse', null, global);
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
proto.api.instrument.MintRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.instrument.MintRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.MintRequest.displayName = 'proto.api.instrument.MintRequest';
}
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
proto.api.instrument.MintResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.instrument.MintResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.MintResponse.displayName = 'proto.api.instrument.MintResponse';
}
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
proto.api.instrument.BurnRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.instrument.BurnRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.BurnRequest.displayName = 'proto.api.instrument.BurnRequest';
}
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
proto.api.instrument.BurnResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.instrument.BurnResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.BurnResponse.displayName = 'proto.api.instrument.BurnResponse';
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
proto.api.instrument.MintRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.MintRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.MintRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.MintRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
amount: (f = msg.getAmount()) && api_proto_ledger_amount_pb.Amount.toObject(includeInstance, f),
feeaccountnumber: jspb.Message.getFieldWithDefault(msg, 2, ""),
destinationaccountnumber: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.api.instrument.MintRequest}
 */
proto.api.instrument.MintRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.MintRequest;
  return proto.api.instrument.MintRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.MintRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.MintRequest}
 */
proto.api.instrument.MintRequest.deserializeBinaryFromReader = function(msg, reader) {
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
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFeeaccountnumber(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDestinationaccountnumber(value);
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
proto.api.instrument.MintRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.MintRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.MintRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.MintRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAmount();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      api_proto_ledger_amount_pb.Amount.serializeBinaryToWriter
    );
  }
  f = message.getFeeaccountnumber();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDestinationaccountnumber();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional api.ledger.Amount amount = 1;
 * @return {?proto.api.ledger.Amount}
 */
proto.api.instrument.MintRequest.prototype.getAmount = function() {
  return /** @type{?proto.api.ledger.Amount} */ (
    jspb.Message.getWrapperField(this, api_proto_ledger_amount_pb.Amount, 1));
};


/**
 * @param {?proto.api.ledger.Amount|undefined} value
 * @return {!proto.api.instrument.MintRequest} returns this
*/
proto.api.instrument.MintRequest.prototype.setAmount = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.MintRequest} returns this
 */
proto.api.instrument.MintRequest.prototype.clearAmount = function() {
  return this.setAmount(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.MintRequest.prototype.hasAmount = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string feeAccountNumber = 2;
 * @return {string}
 */
proto.api.instrument.MintRequest.prototype.getFeeaccountnumber = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.instrument.MintRequest} returns this
 */
proto.api.instrument.MintRequest.prototype.setFeeaccountnumber = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string destinationAccountNumber = 3;
 * @return {string}
 */
proto.api.instrument.MintRequest.prototype.getDestinationaccountnumber = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.instrument.MintRequest} returns this
 */
proto.api.instrument.MintRequest.prototype.setDestinationaccountnumber = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
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
proto.api.instrument.MintResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.MintResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.MintResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.MintResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
transactionid: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.api.instrument.MintResponse}
 */
proto.api.instrument.MintResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.MintResponse;
  return proto.api.instrument.MintResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.MintResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.MintResponse}
 */
proto.api.instrument.MintResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTransactionid(value);
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
proto.api.instrument.MintResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.MintResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.MintResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.MintResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransactionid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string transactionID = 1;
 * @return {string}
 */
proto.api.instrument.MintResponse.prototype.getTransactionid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.instrument.MintResponse} returns this
 */
proto.api.instrument.MintResponse.prototype.setTransactionid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
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
proto.api.instrument.BurnRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.BurnRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.BurnRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.BurnRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
amount: (f = msg.getAmount()) && api_proto_ledger_amount_pb.Amount.toObject(includeInstance, f),
feeaccountnumber: jspb.Message.getFieldWithDefault(msg, 2, ""),
sourceaccountnumber: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.api.instrument.BurnRequest}
 */
proto.api.instrument.BurnRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.BurnRequest;
  return proto.api.instrument.BurnRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.BurnRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.BurnRequest}
 */
proto.api.instrument.BurnRequest.deserializeBinaryFromReader = function(msg, reader) {
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
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFeeaccountnumber(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSourceaccountnumber(value);
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
proto.api.instrument.BurnRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.BurnRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.BurnRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.BurnRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAmount();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      api_proto_ledger_amount_pb.Amount.serializeBinaryToWriter
    );
  }
  f = message.getFeeaccountnumber();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSourceaccountnumber();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional api.ledger.Amount amount = 1;
 * @return {?proto.api.ledger.Amount}
 */
proto.api.instrument.BurnRequest.prototype.getAmount = function() {
  return /** @type{?proto.api.ledger.Amount} */ (
    jspb.Message.getWrapperField(this, api_proto_ledger_amount_pb.Amount, 1));
};


/**
 * @param {?proto.api.ledger.Amount|undefined} value
 * @return {!proto.api.instrument.BurnRequest} returns this
*/
proto.api.instrument.BurnRequest.prototype.setAmount = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.BurnRequest} returns this
 */
proto.api.instrument.BurnRequest.prototype.clearAmount = function() {
  return this.setAmount(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.BurnRequest.prototype.hasAmount = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string feeAccountNumber = 2;
 * @return {string}
 */
proto.api.instrument.BurnRequest.prototype.getFeeaccountnumber = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.instrument.BurnRequest} returns this
 */
proto.api.instrument.BurnRequest.prototype.setFeeaccountnumber = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string sourceAccountNumber = 3;
 * @return {string}
 */
proto.api.instrument.BurnRequest.prototype.getSourceaccountnumber = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.instrument.BurnRequest} returns this
 */
proto.api.instrument.BurnRequest.prototype.setSourceaccountnumber = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
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
proto.api.instrument.BurnResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.BurnResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.BurnResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.BurnResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
transactionid: jspb.Message.getFieldWithDefault(msg, 1, "")
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
 * @return {!proto.api.instrument.BurnResponse}
 */
proto.api.instrument.BurnResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.BurnResponse;
  return proto.api.instrument.BurnResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.BurnResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.BurnResponse}
 */
proto.api.instrument.BurnResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTransactionid(value);
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
proto.api.instrument.BurnResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.BurnResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.BurnResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.BurnResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransactionid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string transactionID = 1;
 * @return {string}
 */
proto.api.instrument.BurnResponse.prototype.getTransactionid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.api.instrument.BurnResponse} returns this
 */
proto.api.instrument.BurnResponse.prototype.setTransactionid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


goog.object.extend(exports, proto.api.instrument);
