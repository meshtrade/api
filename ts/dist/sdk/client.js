/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const config_1 = require("./config");
const services_1 = require("./services");
const connect_web_1 = require("@connectrpc/connect-web");
class Client {
    constructor(config) {
        // process config
        const _config = (0, config_1.getConfigFromOpts)(config);
        // construct service constructor args
        const args = {
            transport: (0, connect_web_1.createGrpcWebTransport)({
                baseUrl: _config.apiServerURL,
                // interceptors: [new LoggingInterceptor()],
            }),
        };
        // construct services
        this._instrument = new services_1.Instrument(args);
        this._legal = new services_1.Legal(args);
    }
    get instrument() {
        return this._instrument;
    }
    get legal() {
        return this._legal;
    }
}
exports.Client = Client;
