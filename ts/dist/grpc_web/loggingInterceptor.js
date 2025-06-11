"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
/**
 * `LoggingInterceptor` is a class responsible for intercepting requests and logging out requests and responses.
 */
class LoggingInterceptor {
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
    intercept(request, invoker) {
        return __awaiter(this, void 0, void 0, function* () {
            // log request
            console.debug("request: ", request.getMethodDescriptor().getName(), request);
            // perform grpc call in a try catch so that error can be logged
            try {
                const response = yield invoker(request);
                console.debug("response: ", request.getMethodDescriptor().getName(), response);
                return response;
            }
            catch (e) {
                console.error(`error: ${request.getMethodDescriptor().getName()}`, e);
                throw e;
            }
        });
    }
}
exports.LoggingInterceptor = LoggingInterceptor;
