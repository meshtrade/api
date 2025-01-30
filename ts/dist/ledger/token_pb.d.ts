import * as jspb from 'google-protobuf'

import * as ledger_network_pb from '../ledger/network_pb'; // proto import: "ledger/network.proto"


export class Token extends jspb.Message {
  getCode(): string;
  setCode(value: string): Token;

  getIssuer(): string;
  setIssuer(value: string): Token;

  getNetwork(): ledger_network_pb.Network;
  setNetwork(value: ledger_network_pb.Network): Token;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Token.AsObject;
  static toObject(includeInstance: boolean, msg: Token): Token.AsObject;
  static serializeBinaryToWriter(message: Token, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Token;
  static deserializeBinaryFromReader(message: Token, reader: jspb.BinaryReader): Token;
}

export namespace Token {
  export type AsObject = {
    code: string,
    issuer: string,
    network: ledger_network_pb.Network,
  }
}

