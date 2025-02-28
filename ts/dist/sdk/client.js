"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const ServiceServiceClientPb_1 = require("../instrument/feeprofile/ServiceServiceClientPb");
class InstrumentDomain {
    constructor() {
        this._feeProfile = new ServiceServiceClientPb_1.ServiceClient("");
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
