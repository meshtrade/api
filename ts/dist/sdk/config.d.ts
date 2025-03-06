import { Environment } from "../config";
import { APIServerURL } from "../config/apiServerURL";
export type ConfigOpts = {
  environment?: Environment;
  apiServerURL?: APIServerURL;
};
export type Config = {
  environment: Environment;
  apiServerURL: string;
};
export declare function getConfigFromOpts(config?: ConfigOpts): Config;
