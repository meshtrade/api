import { Interceptor } from "@connectrpc/connect";

/**
 * `LoggingInterceptor` is a class responsible for intercepting requests and logging out requests and responses.
 */
export const LoggingInterceptorConnect: Interceptor =
  (next) => async (request) => {
    console.debug("request: ", request.method.name, request);
    return await next(request);
  };
