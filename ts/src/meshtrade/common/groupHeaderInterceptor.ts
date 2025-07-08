import {
  Request,
  UnaryInterceptor,
  UnaryResponse,
} from "grpc-web";
import { Message } from "google-protobuf";

/**
 * Interceptor to inject operating group context into an API call
 * by adding a `x-group-id` header to the request metadata.
 *
 * It is fully generic and type-safe for any request/response message pair.
 *
 * @template TReq The request message type.
 * @template TResp The response message type.
 */
export class GroupHeaderInterceptor<TReq extends Message, TResp extends Message>
  implements UnaryInterceptor<TReq, TResp>
{
  constructor(private readonly groupID: string) {}

  /**
   * @override
   */
  intercept(
    request: Request<TReq, TResp>,
    invoker: (request: Request<TReq, TResp>) => Promise<UnaryResponse<TReq, TResp>>
  ): Promise<UnaryResponse<TReq, TResp>> {
    const metadata = request.getMetadata();
    metadata["x-group-id"] = this.groupID;

    return invoker(request);
  }
}