import { Request, UnaryInterceptor, UnaryResponse } from "grpc-web";
import { Message } from "google-protobuf";
import { isValidGroupResourceName } from "./validation";

/**
 * Interceptor to inject operating group context into an API call
 * by adding a `x-group` header to the request metadata.
 *
 * The group context determines the scope of operations and resource access
 * within the Meshtrade platform's hierarchical group ownership model.
 *
 * This interceptor validates that the provided group follows the correct
 * resource name format: `groups/{ulid}` where {ulid} is a 26-character
 * ULID (Universally Unique Lexicographically Sortable Identifier).
 *
 * @template TReq The request message type.
 * @template TResp The response message type.
 *
 * @example
 * ```typescript
 * // Create an interceptor with a valid group resource name
 * const interceptor = new GroupHeaderInterceptor('groups/01ARZ3NDEKTSV4YWVF8F5BH32');
 *
 * // Use with a gRPC client
 * const client = new SomeServiceClient(url, null, {
 *   unaryInterceptors: [interceptor]
 * });
 * ```
 */
export class GroupHeaderInterceptor<
  TReq extends Message,
  TResp extends Message,
> implements UnaryInterceptor<TReq, TResp> {
  /**
   * Creates a new GroupHeaderInterceptor instance.
   *
   * @param group - The group resource name in the format `groups/{ulid}` where
   *                {ulid} is a 26-character ULID identifier. This determines
   *                the operating group context for all API requests.
   * @throws {Error} If the group format is invalid
   *
   * @example
   * ```typescript
   * // Valid group format
   * new GroupHeaderInterceptor('groups/01ARZ3NDEKTSV4YWVF8F5BH32');
   *
   * // Invalid formats (will throw errors)
   * new GroupHeaderInterceptor('01ARZ3NDEKTSV4YWVF8F5BH32'); // Missing "groups/" prefix
   * new GroupHeaderInterceptor('groups/invalid'); // Invalid ULID format
   * new GroupHeaderInterceptor('users/01ARZ3NDEKTSV4YWVF8F5BH32'); // Wrong resource type
   * ```
   */
  constructor(private readonly group: string) {
    if (!isValidGroupResourceName(group)) {
      throw new Error(
        `Invalid group format: "${group}". Group must be in the format "groups/{ulid}" ` +
          `where {ulid} is a 26-character ULID (e.g., "groups/01ARZ3NDEKTSV4YWVF8F5BH32").`
      );
    }
  }

  /**
   * Intercepts the gRPC request to inject the group context into the metadata.
   *
   * This method adds an `x-group` header to the request metadata containing
   * the group resource name. The backend authorization layer uses this header
   * to determine the operating group scope for the request.
   *
   * @param request - The gRPC request to intercept
   * @param invoker - The function to invoke the actual gRPC call
   * @returns Promise resolving to the gRPC response
   *
   * @override
   */
  intercept(
    request: Request<TReq, TResp>,
    invoker: (
      request: Request<TReq, TResp>
    ) => Promise<UnaryResponse<TReq, TResp>>
  ): Promise<UnaryResponse<TReq, TResp>> {
    const metadata = request.getMetadata();
    metadata["x-group"] = this.group;

    return invoker(request);
  }
}
