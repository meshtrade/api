// source: api/proto/instrument/feeprofile/service.proto
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

var api_proto_instrument_feeprofile_feeProfile_pb = require('../../instrument/feeprofile/feeProfile_pb.js');
goog.object.extend(proto, api_proto_instrument_feeprofile_feeProfile_pb);
var api_proto_search_criterion_pb = require('../../search/criterion_pb.js');
goog.object.extend(proto, api_proto_search_criterion_pb);
goog.exportSymbol('proto.api.instrument.feeprofile.CreateRequest', null, global);
goog.exportSymbol('proto.api.instrument.feeprofile.CreateResponse', null, global);
goog.exportSymbol('proto.api.instrument.feeprofile.ListRequest', null, global);
goog.exportSymbol('proto.api.instrument.feeprofile.ListResponse', null, global);
goog.exportSymbol('proto.api.instrument.feeprofile.UpdateRequest', null, global);
goog.exportSymbol('proto.api.instrument.feeprofile.UpdateResponse', null, global);
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
proto.api.instrument.feeprofile.CreateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.instrument.feeprofile.CreateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.feeprofile.CreateRequest.displayName = 'proto.api.instrument.feeprofile.CreateRequest';
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
proto.api.instrument.feeprofile.CreateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.instrument.feeprofile.CreateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.feeprofile.CreateResponse.displayName = 'proto.api.instrument.feeprofile.CreateResponse';
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
proto.api.instrument.feeprofile.UpdateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.instrument.feeprofile.UpdateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.feeprofile.UpdateRequest.displayName = 'proto.api.instrument.feeprofile.UpdateRequest';
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
proto.api.instrument.feeprofile.UpdateResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.instrument.feeprofile.UpdateResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.feeprofile.UpdateResponse.displayName = 'proto.api.instrument.feeprofile.UpdateResponse';
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
proto.api.instrument.feeprofile.ListRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.api.instrument.feeprofile.ListRequest.repeatedFields_, null);
};
goog.inherits(proto.api.instrument.feeprofile.ListRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.feeprofile.ListRequest.displayName = 'proto.api.instrument.feeprofile.ListRequest';
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
proto.api.instrument.feeprofile.ListResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.api.instrument.feeprofile.ListResponse.repeatedFields_, null);
};
goog.inherits(proto.api.instrument.feeprofile.ListResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.instrument.feeprofile.ListResponse.displayName = 'proto.api.instrument.feeprofile.ListResponse';
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
proto.api.instrument.feeprofile.CreateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.feeprofile.CreateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.feeprofile.CreateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.CreateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
feeprofile: (f = msg.getFeeprofile()) && api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.toObject(includeInstance, f)
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
 * @return {!proto.api.instrument.feeprofile.CreateRequest}
 */
proto.api.instrument.feeprofile.CreateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.feeprofile.CreateRequest;
  return proto.api.instrument.feeprofile.CreateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.feeprofile.CreateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.feeprofile.CreateRequest}
 */
proto.api.instrument.feeprofile.CreateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile;
      reader.readMessage(value,api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.deserializeBinaryFromReader);
      msg.setFeeprofile(value);
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
proto.api.instrument.feeprofile.CreateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.feeprofile.CreateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.feeprofile.CreateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.CreateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFeeprofile();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.serializeBinaryToWriter
    );
  }
};


/**
 * optional FeeProfile feeProfile = 1;
 * @return {?proto.api.instrument.feeprofile.FeeProfile}
 */
proto.api.instrument.feeprofile.CreateRequest.prototype.getFeeprofile = function() {
  return /** @type{?proto.api.instrument.feeprofile.FeeProfile} */ (
    jspb.Message.getWrapperField(this, api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile, 1));
};


/**
 * @param {?proto.api.instrument.feeprofile.FeeProfile|undefined} value
 * @return {!proto.api.instrument.feeprofile.CreateRequest} returns this
*/
proto.api.instrument.feeprofile.CreateRequest.prototype.setFeeprofile = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.feeprofile.CreateRequest} returns this
 */
proto.api.instrument.feeprofile.CreateRequest.prototype.clearFeeprofile = function() {
  return this.setFeeprofile(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.feeprofile.CreateRequest.prototype.hasFeeprofile = function() {
  return jspb.Message.getField(this, 1) != null;
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
proto.api.instrument.feeprofile.CreateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.feeprofile.CreateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.feeprofile.CreateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.CreateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
feeprofile: (f = msg.getFeeprofile()) && api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.toObject(includeInstance, f)
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
 * @return {!proto.api.instrument.feeprofile.CreateResponse}
 */
proto.api.instrument.feeprofile.CreateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.feeprofile.CreateResponse;
  return proto.api.instrument.feeprofile.CreateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.feeprofile.CreateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.feeprofile.CreateResponse}
 */
proto.api.instrument.feeprofile.CreateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile;
      reader.readMessage(value,api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.deserializeBinaryFromReader);
      msg.setFeeprofile(value);
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
proto.api.instrument.feeprofile.CreateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.feeprofile.CreateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.feeprofile.CreateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.CreateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFeeprofile();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.serializeBinaryToWriter
    );
  }
};


/**
 * optional FeeProfile feeProfile = 1;
 * @return {?proto.api.instrument.feeprofile.FeeProfile}
 */
proto.api.instrument.feeprofile.CreateResponse.prototype.getFeeprofile = function() {
  return /** @type{?proto.api.instrument.feeprofile.FeeProfile} */ (
    jspb.Message.getWrapperField(this, api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile, 1));
};


/**
 * @param {?proto.api.instrument.feeprofile.FeeProfile|undefined} value
 * @return {!proto.api.instrument.feeprofile.CreateResponse} returns this
*/
proto.api.instrument.feeprofile.CreateResponse.prototype.setFeeprofile = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.feeprofile.CreateResponse} returns this
 */
proto.api.instrument.feeprofile.CreateResponse.prototype.clearFeeprofile = function() {
  return this.setFeeprofile(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.feeprofile.CreateResponse.prototype.hasFeeprofile = function() {
  return jspb.Message.getField(this, 1) != null;
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
proto.api.instrument.feeprofile.UpdateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.feeprofile.UpdateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.feeprofile.UpdateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.UpdateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
feeprofile: (f = msg.getFeeprofile()) && api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.toObject(includeInstance, f)
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
 * @return {!proto.api.instrument.feeprofile.UpdateRequest}
 */
proto.api.instrument.feeprofile.UpdateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.feeprofile.UpdateRequest;
  return proto.api.instrument.feeprofile.UpdateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.feeprofile.UpdateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.feeprofile.UpdateRequest}
 */
proto.api.instrument.feeprofile.UpdateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile;
      reader.readMessage(value,api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.deserializeBinaryFromReader);
      msg.setFeeprofile(value);
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
proto.api.instrument.feeprofile.UpdateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.feeprofile.UpdateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.feeprofile.UpdateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.UpdateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFeeprofile();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.serializeBinaryToWriter
    );
  }
};


/**
 * optional FeeProfile feeProfile = 1;
 * @return {?proto.api.instrument.feeprofile.FeeProfile}
 */
proto.api.instrument.feeprofile.UpdateRequest.prototype.getFeeprofile = function() {
  return /** @type{?proto.api.instrument.feeprofile.FeeProfile} */ (
    jspb.Message.getWrapperField(this, api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile, 1));
};


/**
 * @param {?proto.api.instrument.feeprofile.FeeProfile|undefined} value
 * @return {!proto.api.instrument.feeprofile.UpdateRequest} returns this
*/
proto.api.instrument.feeprofile.UpdateRequest.prototype.setFeeprofile = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.feeprofile.UpdateRequest} returns this
 */
proto.api.instrument.feeprofile.UpdateRequest.prototype.clearFeeprofile = function() {
  return this.setFeeprofile(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.feeprofile.UpdateRequest.prototype.hasFeeprofile = function() {
  return jspb.Message.getField(this, 1) != null;
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
proto.api.instrument.feeprofile.UpdateResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.feeprofile.UpdateResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.feeprofile.UpdateResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.UpdateResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
feeprofile: (f = msg.getFeeprofile()) && api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.toObject(includeInstance, f)
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
 * @return {!proto.api.instrument.feeprofile.UpdateResponse}
 */
proto.api.instrument.feeprofile.UpdateResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.feeprofile.UpdateResponse;
  return proto.api.instrument.feeprofile.UpdateResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.feeprofile.UpdateResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.feeprofile.UpdateResponse}
 */
proto.api.instrument.feeprofile.UpdateResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile;
      reader.readMessage(value,api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.deserializeBinaryFromReader);
      msg.setFeeprofile(value);
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
proto.api.instrument.feeprofile.UpdateResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.feeprofile.UpdateResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.feeprofile.UpdateResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.UpdateResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFeeprofile();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.serializeBinaryToWriter
    );
  }
};


/**
 * optional FeeProfile feeProfile = 1;
 * @return {?proto.api.instrument.feeprofile.FeeProfile}
 */
proto.api.instrument.feeprofile.UpdateResponse.prototype.getFeeprofile = function() {
  return /** @type{?proto.api.instrument.feeprofile.FeeProfile} */ (
    jspb.Message.getWrapperField(this, api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile, 1));
};


/**
 * @param {?proto.api.instrument.feeprofile.FeeProfile|undefined} value
 * @return {!proto.api.instrument.feeprofile.UpdateResponse} returns this
*/
proto.api.instrument.feeprofile.UpdateResponse.prototype.setFeeprofile = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api.instrument.feeprofile.UpdateResponse} returns this
 */
proto.api.instrument.feeprofile.UpdateResponse.prototype.clearFeeprofile = function() {
  return this.setFeeprofile(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.instrument.feeprofile.UpdateResponse.prototype.hasFeeprofile = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.api.instrument.feeprofile.ListRequest.repeatedFields_ = [1];



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
proto.api.instrument.feeprofile.ListRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.feeprofile.ListRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.feeprofile.ListRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.ListRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
criteriaList: jspb.Message.toObjectList(msg.getCriteriaList(),
    api_proto_search_criterion_pb.Criterion.toObject, includeInstance)
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
 * @return {!proto.api.instrument.feeprofile.ListRequest}
 */
proto.api.instrument.feeprofile.ListRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.feeprofile.ListRequest;
  return proto.api.instrument.feeprofile.ListRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.feeprofile.ListRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.feeprofile.ListRequest}
 */
proto.api.instrument.feeprofile.ListRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new api_proto_search_criterion_pb.Criterion;
      reader.readMessage(value,api_proto_search_criterion_pb.Criterion.deserializeBinaryFromReader);
      msg.addCriteria(value);
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
proto.api.instrument.feeprofile.ListRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.feeprofile.ListRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.feeprofile.ListRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.ListRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCriteriaList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      api_proto_search_criterion_pb.Criterion.serializeBinaryToWriter
    );
  }
};


/**
 * repeated api.search.Criterion criteria = 1;
 * @return {!Array<!proto.api.search.Criterion>}
 */
proto.api.instrument.feeprofile.ListRequest.prototype.getCriteriaList = function() {
  return /** @type{!Array<!proto.api.search.Criterion>} */ (
    jspb.Message.getRepeatedWrapperField(this, api_proto_search_criterion_pb.Criterion, 1));
};


/**
 * @param {!Array<!proto.api.search.Criterion>} value
 * @return {!proto.api.instrument.feeprofile.ListRequest} returns this
*/
proto.api.instrument.feeprofile.ListRequest.prototype.setCriteriaList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.api.search.Criterion=} opt_value
 * @param {number=} opt_index
 * @return {!proto.api.search.Criterion}
 */
proto.api.instrument.feeprofile.ListRequest.prototype.addCriteria = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.api.search.Criterion, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.api.instrument.feeprofile.ListRequest} returns this
 */
proto.api.instrument.feeprofile.ListRequest.prototype.clearCriteriaList = function() {
  return this.setCriteriaList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.api.instrument.feeprofile.ListResponse.repeatedFields_ = [1];



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
proto.api.instrument.feeprofile.ListResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.api.instrument.feeprofile.ListResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.instrument.feeprofile.ListResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.ListResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
feeprofilesList: jspb.Message.toObjectList(msg.getFeeprofilesList(),
    api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.toObject, includeInstance)
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
 * @return {!proto.api.instrument.feeprofile.ListResponse}
 */
proto.api.instrument.feeprofile.ListResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.instrument.feeprofile.ListResponse;
  return proto.api.instrument.feeprofile.ListResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.instrument.feeprofile.ListResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.instrument.feeprofile.ListResponse}
 */
proto.api.instrument.feeprofile.ListResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile;
      reader.readMessage(value,api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.deserializeBinaryFromReader);
      msg.addFeeprofiles(value);
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
proto.api.instrument.feeprofile.ListResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.instrument.feeprofile.ListResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.instrument.feeprofile.ListResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.instrument.feeprofile.ListResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFeeprofilesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile.serializeBinaryToWriter
    );
  }
};


/**
 * repeated FeeProfile feeProfiles = 1;
 * @return {!Array<!proto.api.instrument.feeprofile.FeeProfile>}
 */
proto.api.instrument.feeprofile.ListResponse.prototype.getFeeprofilesList = function() {
  return /** @type{!Array<!proto.api.instrument.feeprofile.FeeProfile>} */ (
    jspb.Message.getRepeatedWrapperField(this, api_proto_instrument_feeprofile_feeProfile_pb.FeeProfile, 1));
};


/**
 * @param {!Array<!proto.api.instrument.feeprofile.FeeProfile>} value
 * @return {!proto.api.instrument.feeprofile.ListResponse} returns this
*/
proto.api.instrument.feeprofile.ListResponse.prototype.setFeeprofilesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.api.instrument.feeprofile.FeeProfile=} opt_value
 * @param {number=} opt_index
 * @return {!proto.api.instrument.feeprofile.FeeProfile}
 */
proto.api.instrument.feeprofile.ListResponse.prototype.addFeeprofiles = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.api.instrument.feeprofile.FeeProfile, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.api.instrument.feeprofile.ListResponse} returns this
 */
proto.api.instrument.feeprofile.ListResponse.prototype.clearFeeprofilesList = function() {
  return this.setFeeprofilesList([]);
};


goog.object.extend(exports, proto.api.instrument.feeprofile);
