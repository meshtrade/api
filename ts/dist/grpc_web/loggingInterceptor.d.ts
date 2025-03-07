/* eslint-disable */
// @ts-nocheck
import { UnaryInterceptor, Request, UnaryResponse } from "grpc-web";
/**
 * `LoggingInterceptor` is a class responsible for intercepting requests and logging out requests and responses.
 */
export declare class LoggingInterceptor implements UnaryInterceptor<unknown, unknown> {
    /**
     * Intercepts a request to add the loggingorization token to its metadata.
     *
     * @param {Object} request - The request object.
     * @param {Function} request.getMetadata - A function that returns the request's metadata.
     * @param {unknown} invoker - A function responsible for processing the request.
     *                            Expected to be of type `function`, but can be of any type.
     *
     * @returns {unknown} The result of the `invoker` function, if it is a function.
     *                    Otherwise, logs an error and doesn't return anything.
     */
    intercept(request: Request<unknown, unknown>, invoker: (request: Request<unknown, unknown>) => Promise<UnaryResponse<unknown, unknown>>): Promise<UnaryResponse<unknown, unknown>>;
}
