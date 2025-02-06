"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var ServiceServiceClientPb_1 = require("../instrument/feeprofile/ServiceServiceClientPb");
var InstrumentDomain = /** @class */ (function () {
    function InstrumentDomain() {
        this._feeProfile = new ServiceServiceClientPb_1.ServiceClient("");
    }
    Object.defineProperty(InstrumentDomain.prototype, "feeProfile", {
        get: function () {
            return this._feeProfile;
        },
        enumerable: false,
        configurable: true
    });
    return InstrumentDomain;
}());
var Client = /** @class */ (function () {
    function Client() {
        this._instrument = new InstrumentDomain();
    }
    Object.defineProperty(Client.prototype, "instrument", {
        get: function () {
            return this._instrument;
        },
        enumerable: false,
        configurable: true
    });
    return Client;
}());
exports.Client = Client;
