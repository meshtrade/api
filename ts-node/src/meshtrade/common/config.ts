/**
 * Configuration options for Meshtrade API clients.
 *
 * Supports three authentication modes:
 *
 * 1. **No Authentication** (public APIs):
 *    ```typescript
 *    const client = new ServiceNode({ apiServerURL: "http://localhost:10000" });
 *    ```
 *
 * 2. **API Key Authentication** (backend services):
 *    ```typescript
 *    const client = new ServiceNode({
 *      apiServerURL: "https://api.example.com",
 *      apiKey: "your-api-key",
 *      group: "groups/01ARZ3NDEKTSV4YWVF8F5BH32"
 *    });
 *    ```
 *
 * 3. **JWT Token Authentication** (Next.js backend with user session):
 *    ```typescript
 *    const client = new ServiceNode({
 *      apiServerURL: "https://api.example.com",
 *      jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *    });
 *    ```
 */
export type ConfigOpts = {
  /** API server URL (default: "http://localhost:10000") */
  apiServerURL?: string;

  /** API key for service-to-service authentication (requires group) */
  apiKey?: string;

  /** Group context for API key authentication in format "groups/{ulid}" */
  group?: string;

  /** JWT token for user session authentication (injected as AccessToken cookie) */
  jwtToken?: string;
};

export type Config = {
  apiServerURL: string;
  apiKey?: string;
  group?: string;
  jwtToken?: string;
};

/**
 * Validates and creates configuration from options.
 *
 * @throws {Error} If API key is provided without group, or vice versa
 * @throws {Error} If both API key and JWT token are provided (mutually exclusive)
 */
export function getConfigFromOpts(config?: ConfigOpts): Config {
  const apiServerURL = config?.apiServerURL ?? "http://localhost:10000";
  const apiKey = config?.apiKey;
  const group = config?.group;
  const jwtToken = config?.jwtToken;

  // Validate authentication configuration
  if (apiKey && jwtToken) {
    throw new Error(
      "API key and JWT token authentication are mutually exclusive. " +
        "Please provide either apiKey+group OR jwtToken, not both."
    );
  }

  if (apiKey && !group) {
    throw new Error(
      "API key authentication requires a group. " +
        "Please provide both 'apiKey' and 'group' options."
    );
  }

  if (group && !apiKey) {
    throw new Error(
      "Group context requires API key authentication. " +
        "Please provide both 'apiKey' and 'group' options."
    );
  }

  return {
    apiServerURL,
    apiKey,
    group,
    jwtToken,
  };
}
