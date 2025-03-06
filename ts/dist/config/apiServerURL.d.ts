import { Environment } from "./environment_pb";
export declare enum APIServerURL {
  Local = "http://localhost:10000",
  Development = "https://development-service-mesh-api-gateway-lb-frontend.mesh.trade",
  Testing = "https://testing-service-mesh-api-gateway-lb-frontend.mesh.trade",
  Staging = "https://staging-service-mesh-api-gateway-lb-frontend.mesh.trade",
  Production = "https://production-service-mesh-api-gateway-lb-frontend.mesh.trade",
}
export declare function APIServerURLFromEnvironment(
  env: Environment,
): APIServerURL;
