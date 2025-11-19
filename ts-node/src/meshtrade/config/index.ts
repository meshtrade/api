/**
 * Configuration options for Meshtrade API clients using functional options pattern.
 *
 * Supports flexible authentication modes with optional group context:
 *
 * 1. **No Authentication** (public APIs):
 *    ```typescript
 *    const client = new ServiceNode(
 *      WithServerUrl("http://localhost:10000")
 *    );
 *    ```
 *
 * 2. **API Key Authentication** (backend services):
 *    ```typescript
 *    const client = new ServiceNode(
 *      WithAPIKey("your-api-key"),
 *      WithGroup("groups/01ARZ3NDEKTSV4YWVF8F5BH32"),
 *      WithServerUrl("https://api.example.com")
 *    );
 *    ```
 *
 * 3. **JWT Token Authentication** (Next.js backend with user session):
 *    ```typescript
 *    const client = new ServiceNode(
 *      WithJWTAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."),
 *      WithServerUrl("https://api.example.com")
 *    );
 *    ```
 *
 * 4. **JWT with Group Context** (user session with specific group):
 *    ```typescript
 *    const client = new ServiceNode(
 *      WithJWTAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."),
 *      WithGroup("groups/01ARZ3NDEKTSV4YWVF8F5BH32"),
 *      WithServerUrl("https://api.example.com")
 *    );
 *    ```
 */

/**
 * Internal configuration class used to build client configuration.
 */
export class ClientConfig {
  /** API server URL (default: production) */
  apiServerURL: string = "http://localhost:10000";

  /** API key for service-to-service authentication */
  apiKey?: string;

  /** JWT token for user session authentication */
  jwtToken?: string;

  /** Group context in format "groups/{ulid}" */
  group?: string;

  /**
   * Validates the configuration.
   * @throws {Error} If both API key and JWT token are provided (mutually exclusive)
   */
  validate(): void {
    if (this.apiKey && this.jwtToken) {
      throw new Error(
        "API key and JWT token authentication are mutually exclusive. " +
          "Please use WithAPIKey() OR WithJWTAccessToken(), not both."
      );
    }
  }
}

/**
 * Client option function type for functional options pattern.
 * Each option function modifies the ClientConfig.
 */
export type ClientOption = (config: ClientConfig) => void;

/**
 * Configures the client with an API key for service-to-service authentication.
 *
 * **Mutually Exclusive**: Cannot be used with WithJWTAccessToken().
 * **Optional**: Can be combined with WithGroup() for group-specific operations.
 *
 * @param apiKey - The API key for authentication
 * @returns A client option function
 *
 * @example
 * ```typescript
 * const client = new ServiceNode(
 *   WithAPIKey("your-api-key"),
 *   WithGroup("groups/01ARZ3NDEKTSV4YWVF8F5BH32")
 * );
 * ```
 */
export function WithAPIKey(apiKey: string): ClientOption {
  return (config: ClientConfig) => {
    if (!apiKey || apiKey.trim() === "") {
      throw new Error("API key cannot be empty");
    }
    if (config.jwtToken) {
      throw new Error(
        "Cannot use both WithAPIKey() and WithJWTAccessToken(). " +
          "Please choose one authentication method."
      );
    }
    config.apiKey = apiKey;
  };
}

/**
 * Configures the client with a JWT access token for user session authentication.
 *
 * **Mutually Exclusive**: Cannot be used with WithAPIKey().
 * **Optional**: Can be combined with WithGroup() for group-specific operations.
 *
 * The JWT is injected as a cookie header (Cookie: AccessToken=<jwt>)
 * so the server can extract it from the request.
 *
 * @param token - The JWT access token from the user's session
 * @returns A client option function
 *
 * @example
 * ```typescript
 * const client = new ServiceNode(
 *   WithJWTAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."),
 *   WithGroup("groups/01ARZ3NDEKTSV4YWVF8F5BH32")
 * );
 * ```
 */
export function WithJWTAccessToken(token: string): ClientOption {
  return (config: ClientConfig) => {
    if (!token || token.trim() === "") {
      throw new Error("JWT token cannot be empty");
    }
    if (config.apiKey) {
      throw new Error(
        "Cannot use both WithJWTAccessToken() and WithAPIKey(). " +
          "Please choose one authentication method."
      );
    }
    config.jwtToken = token;
  };
}

/**
 * Configures the client with a group context for operations.
 *
 * **Optional**: Can be used with WithAPIKey() or WithJWTAccessToken().
 * When used alone without authentication, adds group header to requests.
 *
 * @param group - The group resource name in format "groups/{ulid}"
 * @returns A client option function
 *
 * @example
 * ```typescript
 * // With API Key
 * const client = new ServiceNode(
 *   WithAPIKey("your-api-key"),
 *   WithGroup("groups/01ARZ3NDEKTSV4YWVF8F5BH32")
 * );
 *
 * // With JWT
 * const client = new ServiceNode(
 *   WithJWTAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."),
 *   WithGroup("groups/01ARZ3NDEKTSV4YWVF8F5BH32")
 * );
 * ```
 */
export function WithGroup(group: string): ClientOption {
  return (config: ClientConfig) => {
    if (!group || group.trim() === "") {
      throw new Error("Group cannot be empty");
    }
    config.group = group;
  };
}

/**
 * Configures the client with a custom server URL.
 *
 * **Optional**: If not provided, defaults to localhost:10000.
 *
 * @param url - The API server URL
 * @returns A client option function
 *
 * @example
 * ```typescript
 * const client = new ServiceNode(
 *   WithServerUrl("http://localhost:10000"),
 *   WithAPIKey("your-api-key"),
 *   WithGroup("groups/01ARZ3NDEKTSV4YWVF8F5BH32")
 * );
 * ```
 */
export function WithServerUrl(url: string): ClientOption {
  return (config: ClientConfig) => {
    if (!url || url.trim() === "") {
      throw new Error("Server URL cannot be empty");
    }
    config.apiServerURL = url;
  };
}

/**
 * Builds client configuration from an array of option functions.
 *
 * @param opts - Variable number of option functions
 * @returns A validated ClientConfig instance
 * @throws {Error} If configuration is invalid (e.g., both API key and JWT provided)
 *
 * @example
 * ```typescript
 * const config = buildConfigFromOptions(
 *   WithAPIKey("your-api-key"),
 *   WithGroup("groups/01ARZ3NDEKTSV4YWVF8F5BH32"),
 *   WithServerUrl("https://api.example.com")
 * );
 * ```
 */
export function buildConfigFromOptions(...opts: ClientOption[]): ClientConfig {
  const config = new ClientConfig();

  // Apply each option
  for (const opt of opts) {
    opt(config);
  }

  // Validate the final configuration
  config.validate();

  return config;
}
