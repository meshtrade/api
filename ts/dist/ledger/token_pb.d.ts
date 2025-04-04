/* eslint-disable */
// @ts-nocheck
// package: api.ledger
// file: api/proto/ledger/token.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_ledger_network_pb from "../ledger/network_pb";

export class Token extends jspb.Message { 
    getCode(): string;
    setCode(value: string): Token;
    getIssuer(): string;
    setIssuer(value: string): Token;
    getNetwork(): api_proto_ledger_network_pb.Network;
    setNetwork(value: api_proto_ledger_network_pb.Network): Token;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Token.AsObject;
    static toObject(includeInstance: boolean, msg: Token): Token.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Token, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Token;
    static deserializeBinaryFromReader(message: Token, reader: jspb.BinaryReader): Token;
}

export namespace Token {
    export type AsObject = {
        code: string,
        issuer: string,
        network: api_proto_ledger_network_pb.Network,
    }
}
