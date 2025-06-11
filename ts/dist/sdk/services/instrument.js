/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instrument = void 0;
const service_grpc_web_pb_1 = require("../../instrument/service_grpc_web_pb");
const service_grpc_web_pb_2 = require("../../instrument/feeprofile/service_grpc_web_pb");
const service_grpc_web_pb_3 = require("../../instrument/fee/service_grpc_web_pb");
class Instrument extends service_grpc_web_pb_1.ServicePromiseClient {
    constructor(args) {
        super(...args);
        this._feeProfile = new service_grpc_web_pb_2.ServicePromiseClient(...args);
        this._fee = new service_grpc_web_pb_3.ServicePromiseClient(...args);
    }
    get feeProfile() {
        return this._feeProfile;
    }
    get fee() {
        return this._fee;
    }
}
exports.Instrument = Instrument;
