/**
 * Connect-ES interceptors for the Meshtrade API client.
 *
 * Provides interceptor utilities for use with @connectrpc/connect clients,
 * including authentication (API key, JWT) and group context injection for
 * multi-tenant operations.
 */

import { Interceptor } from "@connectrpc/connect";
import { isValidGroupResourceName } from "./validation";

/**
 * HTTP header names for authentication.
 * Must match the server-side header constants.
 */
const API_KEY_HEADER = "x-api-key";
const GROUP_HEADER = "x-group";
const COOKIE_HEADER = "cookie";
const ACCESS_TOKEN_COOKIE_NAME = "AccessToken";

/**
 * Creates a Connect-ES interceptor that injects operating group context
 * into API requests by adding an `x-group` header.
 *
 * The group context determines the scope of operations and resource access
 * within the Meshtrade platform's hierarchical group ownership model.
 *
 * This interceptor validates that the provided group follows the correct
 * resource name format: `groups/{ulid}` where {ulid} is a 26-character
 * ULID (Universally Unique Lexicographically Sortable Identifier).
 *
 * @param group - The group resource name in the format `groups/{ulid}` where
 *                {ulid} is a 26-character ULID identifier. This determines
 *                the operating group context for all API requests.
 * @returns An interceptor function that adds the group header to all requests
 * @throws {Error} If the group format is invalid
 *
 * @example
 * ```typescript
 * // Create an interceptor with a valid group resource name
 * const groupInterceptor = createGroupInterceptor('groups/01ARZ3NDEKTSV4YWVF8F5BH32');
 *
 * // Use with a Connect-ES client
 * const transport = createGrpcWebTransport({
 *   baseUrl: 'https://api.example.com',
 *   interceptors: [groupInterceptor]
 * });
 *
 * const client = createPromiseClient(MyService, transport);
 * ```
 */
export function createGroupInterceptor(
  group: string
): Interceptor & { groupContext: string } {
  // Validate the group resource name format
  if (!isValidGroupResourceName(group)) {
    throw new Error(
      `Invalid group format: "${group}". Group must be in the format "groups/{ulid}" ` +
        `where {ulid} is a 26-character ULID (e.g., "groups/01ARZ3NDEKTSV4YWVF8F5BH32").`
    );
  }

  // Create the interceptor function
  const interceptor: Interceptor = (next) => async (req) => {
    // Add the x-group header to the request
    req.header.set("x-group", group);

    // Call the next interceptor in the chain
    return await next(req);
  };

  // Add a marker property so we can identify group interceptors
  // This is used in the withGroup method to prevent double-setting
  return Object.assign(interceptor, { groupContext: group });
}

/**
 * Creates a Connect-ES interceptor that injects API key authentication
 * into API requests by adding `x-api-key` and `x-group` headers.
 *
 * This authentication mode is used for service-to-service communication
 * where a backend service authenticates using an API key and operates
 * within a specific group context.
 *
 * Both the API key and group are required and validated. The group must
 * follow the resource name format: `groups/{ulid}` where {ulid} is a
 * 26-character ULID.
 *
 * @param apiKey - The API key for authentication
 * @param group - The group resource name in format `groups/{ulid}`
 * @returns An interceptor function that adds authentication headers to all requests
 * @throws {Error} If apiKey is empty or group format is invalid
 *
 * @example
 * ```typescript
 * const authInterceptor = createApiKeyInterceptor(
 *   'your-api-key',
 *   'groups/01ARZ3NDEKTSV4YWVF8F5BH32'
 * );
 *
 * const transport = createGrpcTransport({
 *   baseUrl: 'https://api.example.com',
 *   interceptors: [authInterceptor]
 * });
 * ```
 */
export function createApiKeyInterceptor(
  apiKey: string,
  group: string
): Interceptor & { apiKeyAuth: true; groupContext: string } {
  // Validate inputs
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("API key cannot be empty");
  }

  if (!isValidGroupResourceName(group)) {
    throw new Error(
      `Invalid group format: "${group}". Group must be in the format "groups/{ulid}" ` +
        `where {ulid} is a 26-character ULID (e.g., "groups/01ARZ3NDEKTSV4YWVF8F5BH32").`
    );
  }

  // Create the interceptor function
  const interceptor: Interceptor = (next) => async (req) => {
    // Add authentication headers to the request
    req.header.set(API_KEY_HEADER, apiKey);
    req.header.set(GROUP_HEADER, group);

    // Call the next interceptor in the chain
    return await next(req);
  };

  // Add marker properties for identification
  return Object.assign(interceptor, {
    apiKeyAuth: true as const,
    groupContext: group,
  });
}

/**
 * Creates a Connect-ES interceptor that injects JWT token authentication
 * into API requests by adding a `Cookie` header with the AccessToken.
 *
 * This authentication mode is used in Next.js backends where the server
 * has access to the user's JWT token from their browser session. The JWT
 * is injected as a cookie so the server can extract it in the same way
 * it would from a browser request.
 *
 * The JWT token is added as: `Cookie: AccessToken=<jwt>`
 *
 * This allows the server-side authentication middleware to extract it as:
 * ```go
 * if cookieHeader := request.Attributes.Request.Http.Headers["cookie"]; cookieHeader != "" {
 *   cookies := parseHTTPCookies(cookieHeader)
 *   for _, cookie := range cookies {
 *     if cookie.Name == "AccessToken" && cookie.Value != "" {
 *       authContext.AccessToken = cookie.Value
 *       break
 *     }
 *   }
 * }
 * ```
 *
 * @param jwtToken - The JWT token from the user's session
 * @returns An interceptor function that adds the JWT as a cookie header
 * @throws {Error} If jwtToken is empty
 *
 * @example
 * ```typescript
 * // In a Next.js API route
 * const authInterceptor = createJwtInterceptor(
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 * );
 *
 * const transport = createGrpcTransport({
 *   baseUrl: 'https://api.example.com',
 *   interceptors: [authInterceptor]
 * });
 * ```
 */
export function createJwtInterceptor(
  jwtToken: string
): Interceptor & { jwtAuth: true } {
  // Validate input
  if (!jwtToken || jwtToken.trim() === "") {
    throw new Error("JWT token cannot be empty");
  }

  // Create the interceptor function
  const interceptor: Interceptor = (next) => async (req) => {
    // Add JWT as a cookie header
    // Format: "Cookie: AccessToken=<jwt>"
    const cookieValue = `${ACCESS_TOKEN_COOKIE_NAME}=${jwtToken}`;
    req.header.set(COOKIE_HEADER, cookieValue);

    // Call the next interceptor in the chain
    return await next(req);
  };

  // Add marker property for identification
  return Object.assign(interceptor, { jwtAuth: true as const });
}

/**
 * Creates a logging interceptor that logs all requests and responses.
 * Useful for debugging and development.
 *
 * @returns An interceptor function that logs request/response details
 *
 * @example
 * ```typescript
 * const loggingInterceptor = createLoggingInterceptor();
 *
 * const transport = createGrpcWebTransport({
 *   baseUrl: 'https://api.example.com',
 *   interceptors: [loggingInterceptor]
 * });
 * ```
 */
export function createLoggingInterceptor(): Interceptor {
  return (next) => async (req) => {
    // Convert headers to plain object for logging
    const headers: Record<string, string> = {};
    req.header.forEach((value, key) => {
      headers[key] = value;
    });

    // Log the request
    console.log(`[Connect] ${req.method.name} request:`, {
      service: req.service.typeName,
      method: req.method.name,
      headers,
    });

    try {
      // Call the next interceptor and get the response
      const response = await next(req);

      // Log successful response
      console.log(`[Connect] ${req.method.name} response:`, {
        service: req.service.typeName,
        method: req.method.name,
        status: "success",
      });

      return response;
    } catch (error) {
      // Log error
      console.error(`[Connect] ${req.method.name} error:`, {
        service: req.service.typeName,
        method: req.method.name,
        error: error,
      });

      // Re-throw the error
      throw error;
    }
  };
}
