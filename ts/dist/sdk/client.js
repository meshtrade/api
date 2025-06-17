/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const grpc_web_1 = require("../grpc_web");
const config_1 = require("./config");
const services_1 = require("./services");
class Client {
    constructor(config) {
        // process config
        const _config = (0, config_1.getConfigFromOpts)(config);
        // construct service constructor args
        const args = [
            _config.apiServerURL,
            null,
            {
                withCredentials: true,
                unaryInterceptors: [new grpc_web_1.LoggingInterceptor()],
            },
        ];
        // construct services
        this._instrument = new services_1.Instrument(args);
        this._legal = new services_1.Legal(args);
        // TODO funding client
    }
    get instrument() {
        return this._instrument;
    }
    get legal() {
        return this._legal;
    }
}
exports.Client = Client;
