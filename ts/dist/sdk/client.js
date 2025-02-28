"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const service_grpc_web_pb_1 = require("../instrument/feeprofile/service_grpc_web_pb");
class InstrumentDomain {
    constructor() {
        this._feeProfile = new service_grpc_web_pb_1.ServicePromiseClient("");
    }
    get feeProfile() {
        return this._feeProfile;
    }
}
class Client {
    constructor() {
        this._instrument = new InstrumentDomain();
    }
    get instrument() {
        return this._instrument;
    }
}
exports.Client = Client;
