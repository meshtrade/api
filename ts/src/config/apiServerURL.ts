import { Environment } from "./environment_pb";

export enum APIServerURL {
    Local = "http://localhost:10000",
    Development = "https://development-service-mesh-api-gateway-lb-frontend.mesh.trade",
    Testing = "https://testing-service-mesh-api-gateway-lb-frontend.mesh.trade",
    Staging = "https://staging-service-mesh-api-gateway-lb-frontend.mesh.trade",
    Production = "https://production-service-mesh-api-gateway-lb-frontend.mesh.trade",
};

export function APIServerURLFromEnvironment(env: Environment): APIServerURL {
    switch (env) {
        case Environment.LOCAL_ENVIRONMENT:
            return APIServerURL.Local
        case Environment.DEVELOPMENT_ENVIRONMENT:
            return APIServerURL.Development
        case Environment.TESTING_ENVIRONMENT:
            return APIServerURL.Testing
        case Environment.STAGING_ENVIRONMENT:
            return APIServerURL.Staging
        case Environment.PRODUCTION_ENVIRONMENT:
            return APIServerURL.Production
        default:
            throw new TypeError(`unexpected evironment: ${env}`);
    }
}