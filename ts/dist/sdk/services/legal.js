/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Legal = void 0;
const service_pb_1 = require("../../legal/company/service_pb");
const connect_1 = require("@connectrpc/connect");
class Legal {
    constructor(args) {
        this._company = (0, connect_1.createClient)(service_pb_1.Service, args.transport);
    }
    get company() {
        return this._company;
    }
}
exports.Legal = Legal;
