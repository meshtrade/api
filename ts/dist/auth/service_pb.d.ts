/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file auth/service.proto.
 */
export declare const file_auth_service: GenFile;
/**
 *
 * LoginWithFirebaseTokenRequest is the request message for the Authenticator.LoginWithFirebaseToken method.
 *
 * @generated from message api.auth.LoginWithFirebaseTokenRequest
 */
export type LoginWithFirebaseTokenRequest = Message<"api.auth.LoginWithFirebaseTokenRequest"> & {
    /**
     * @generated from field: string firebaseToken = 1;
     */
    firebaseToken: string;
};
/**
 * Describes the message api.auth.LoginWithFirebaseTokenRequest.
 * Use `create(LoginWithFirebaseTokenRequestSchema)` to create a new message.
 */
export declare const LoginWithFirebaseTokenRequestSchema: GenMessage<LoginWithFirebaseTokenRequest>;
/**
 *
 * LoginWithFirebaseTokenResponse is the response message for the Authenticator.LoginWithFirebaseToken method.
 *
 * @generated from message api.auth.LoginWithFirebaseTokenResponse
 */
export type LoginWithFirebaseTokenResponse = Message<"api.auth.LoginWithFirebaseTokenResponse"> & {
    /**
     * @generated from field: string sessionToken = 1;
     */
    sessionToken: string;
};
/**
 * Describes the message api.auth.LoginWithFirebaseTokenResponse.
 * Use `create(LoginWithFirebaseTokenResponseSchema)` to create a new message.
 */
export declare const LoginWithFirebaseTokenResponseSchema: GenMessage<LoginWithFirebaseTokenResponse>;
/**
 *
 * Service is the Auth Service.
 *
 * @generated from service api.auth.Service
 */
export declare const Service: GenService<{
    /**
     * @generated from rpc api.auth.Service.LoginWithFirebaseToken
     */
    loginWithFirebaseToken: {
        methodKind: "unary";
        input: typeof LoginWithFirebaseTokenRequestSchema;
        output: typeof LoginWithFirebaseTokenResponseSchema;
    };
}>;
