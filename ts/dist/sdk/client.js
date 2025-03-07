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
    }
    get instrument() {
        return this._instrument;
    }
}
exports.Client = Client;
