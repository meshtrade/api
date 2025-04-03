/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigFromOpts = void 0;
const config_1 = require("../config");
const apiServerURL_1 = require("../config/apiServerURL");
function getConfigFromOpts(config) {
    var _a, _b;
    const environment = (_a = config === null || config === void 0 ? void 0 : config.environment) !== null && _a !== void 0 ? _a : config_1.Environment.PRODUCTION_ENVIRONMENT;
    const apiServerURL = (_b = config === null || config === void 0 ? void 0 : config.apiServerURL) !== null && _b !== void 0 ? _b : (0, apiServerURL_1.APIServerURLFromEnvironment)(environment);
    return {
        environment,
        apiServerURL,
    };
}
exports.getConfigFromOpts = getConfigFromOpts;
