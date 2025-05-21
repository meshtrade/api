/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Legal = void 0;
const service_grpc_web_pb_1 = require("../../legal/company/service_grpc_web_pb");
class Legal {
    constructor(args) {
        this._company = new service_grpc_web_pb_1.ServicePromiseClient(...args);
    }
    get company() {
        return this._company;
    }
}
exports.Legal = Legal;
