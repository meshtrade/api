import { Environment } from "../config";
import {
  APIServerURL,
  APIServerURLFromEnvironment,
} from "../config/apiServerURL";

export type ConfigOpts = {
  environment?: Environment;
  apiServerURL?: APIServerURL;
};

export type Config = {
  environment: Environment;
  apiServerURL: string;
};

export function getConfigFromOpts(config?: ConfigOpts): Config {
  const environment = config?.environment ?? Environment.PRODUCTION_ENVIRONMENT;
  const apiServerURL =
    config?.apiServerURL ?? APIServerURLFromEnvironment(environment);

  return {
    environment,
    apiServerURL,
  };
}
