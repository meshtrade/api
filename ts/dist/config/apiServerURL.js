/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIServerURL = void 0;
exports.APIServerURLFromEnvironment = APIServerURLFromEnvironment;
const environment_pb_1 = require("./environment_pb");
var APIServerURL;
(function (APIServerURL) {
    APIServerURL["Local"] = "http://localhost:10000";
    APIServerURL["Development"] = "https://development-service-mesh-api-gateway-lb-frontend.mesh.trade";
    APIServerURL["Testing"] = "https://testing-service-mesh-api-gateway-lb-frontend.mesh.trade";
    APIServerURL["Staging"] = "https://staging-service-mesh-api-gateway-lb-frontend.mesh.trade";
    APIServerURL["Production"] = "https://production-service-mesh-api-gateway-lb-frontend.mesh.trade";
})(APIServerURL || (exports.APIServerURL = APIServerURL = {}));
function APIServerURLFromEnvironment(env) {
    switch (env) {
        case environment_pb_1.Environment.LOCAL_ENVIRONMENT:
            return APIServerURL.Local;
        case environment_pb_1.Environment.DEVELOPMENT_ENVIRONMENT:
            return APIServerURL.Development;
        case environment_pb_1.Environment.TESTING_ENVIRONMENT:
            return APIServerURL.Testing;
        case environment_pb_1.Environment.STAGING_ENVIRONMENT:
            return APIServerURL.Staging;
        case environment_pb_1.Environment.PRODUCTION_ENVIRONMENT:
            return APIServerURL.Production;
        default:
            throw new TypeError(`unexpected evironment: ${env}`);
    }
}
