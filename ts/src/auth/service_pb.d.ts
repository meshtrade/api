// package: api.auth
// file: api/proto/auth/service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class LoginWithFirebaseTokenRequest extends jspb.Message { 
    getFirebasetoken(): string;
    setFirebasetoken(value: string): LoginWithFirebaseTokenRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginWithFirebaseTokenRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoginWithFirebaseTokenRequest): LoginWithFirebaseTokenRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginWithFirebaseTokenRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginWithFirebaseTokenRequest;
    static deserializeBinaryFromReader(message: LoginWithFirebaseTokenRequest, reader: jspb.BinaryReader): LoginWithFirebaseTokenRequest;
}

export namespace LoginWithFirebaseTokenRequest {
    export type AsObject = {
        firebasetoken: string,
    }
}

export class LoginWithFirebaseTokenResponse extends jspb.Message { 
    getSessiontoken(): string;
    setSessiontoken(value: string): LoginWithFirebaseTokenResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginWithFirebaseTokenResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LoginWithFirebaseTokenResponse): LoginWithFirebaseTokenResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginWithFirebaseTokenResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginWithFirebaseTokenResponse;
    static deserializeBinaryFromReader(message: LoginWithFirebaseTokenResponse, reader: jspb.BinaryReader): LoginWithFirebaseTokenResponse;
}

export namespace LoginWithFirebaseTokenResponse {
    export type AsObject = {
        sessiontoken: string,
    }
}
