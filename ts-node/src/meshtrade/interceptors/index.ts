/**
 * Connect-ES interceptors for the Meshtrade API client.
 *
 * Provides interceptor utilities for use with @connectrpc/connect clients,
 * including authentication (API key, JWT) and group context injection for
 * multi-tenant operations.
 */

import { Interceptor } from "@connectrpc/connect";
import { isValidGroupResourceName } from "../validation";

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
    req.header.set(GROUP_HEADER, group);
    return await next(req);
  };

  // Add a marker property so we can identify group interceptors
  // This is used in the withGroup method to prevent double-setting
  return Object.assign(interceptor, { groupContext: group });
}

/**
 * Creates a Connect-ES interceptor that injects API key authentication.
 *
 * @param apiKey - The API key for authentication
 * @returns An interceptor that adds x-api-key header
 * @throws {Error} If apiKey is empty
 */
export function createApiKeyInterceptor(
  apiKey: string
): Interceptor & { apiKeyAuth: true } {
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("API key cannot be empty");
  }

  const interceptor: Interceptor = (next) => async (req) => {
    req.header.set(API_KEY_HEADER, apiKey);
    return await next(req);
  };

  return Object.assign(interceptor, { apiKeyAuth: true as const });
}

/**
 * Creates a Connect-ES interceptor that injects JWT token authentication.
 *
 * @param jwtToken - The JWT token from the user's session
 * @returns An interceptor that adds AccessToken cookie
 * @throws {Error} If jwtToken is empty
 */
export function createJwtInterceptor(
  jwtToken: string
): Interceptor & { jwtAuth: true } {
  if (!jwtToken || jwtToken.trim() === "") {
    throw new Error("JWT token cannot be empty");
  }

  const interceptor: Interceptor = (next) => async (req) => {
    const cookieValue = `${ACCESS_TOKEN_COOKIE_NAME}=${jwtToken}`;
    req.header.set(COOKIE_HEADER, cookieValue);
    return await next(req);
  };

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
    console.debug(`[Connect] ${req.method.name} request:`, {
      service: req.service.typeName,
      method: req.method.name,
      headers,
    });

    try {
      // Call the next interceptor and get the response
      const response = await next(req);

      // Log successful response
      console.debug(`[Connect] ${req.method.name} response:`, {
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
