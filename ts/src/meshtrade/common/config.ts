export type ConfigOpts = {
  apiServerURL?: string;
};

export type Config = {
  apiServerURL: string;
};

export function getConfigFromOpts(config?: ConfigOpts): Config {
  const apiServerURL = config?.apiServerURL ?? "http://localhost:10000";

  return {
    apiServerURL,
  };
}
