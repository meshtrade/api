export type ConfigOpts = {
  apiServerURL?: string;
};

export type Config = {
  apiServerURL: string;
};

export function getConfigFromOpts(config?: ConfigOpts): Config {
  const apiServerURL = config?.apiServerURL ?? "https://production-service-mesh-api-gateway-lb-frontend.mesh.trade";

  return {
    apiServerURL,
  };
}
