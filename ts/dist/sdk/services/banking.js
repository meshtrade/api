/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banking = void 0;
const service_grpc_web_pb_1 = require("../../banking/funding/service_grpc_web_pb");
class Banking {
    constructor(args) {
        this._funding = new service_grpc_web_pb_1.ServicePromiseClient(...args);
    }
    get funding() {
        return this._funding;
    }
}
exports.Banking = Banking;
