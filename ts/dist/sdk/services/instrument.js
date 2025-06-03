/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instrument = void 0;
const service_pb_1 = require("../../instrument/feeprofile/service_pb");
const service_pb_2 = require("../../instrument/fee/service_pb");
const connect_1 = require("@connectrpc/connect");
// export class Instrument implements InstrumentService {
class Instrument {
    constructor(args) {
        this._feeProfile = (0, connect_1.createClient)(service_pb_1.Service, args.transport);
        this._fee = (0, connect_1.createClient)(service_pb_2.Service, args.transport);
    }
    get feeProfile() {
        return this._feeProfile;
    }
    get fee() {
        return this._fee;
    }
}
exports.Instrument = Instrument;
