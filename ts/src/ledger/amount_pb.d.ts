import * as jspb from 'google-protobuf'

import * as ledger_token_pb from '../ledger/token_pb'; // proto import: "ledger/token.proto"
import * as num_decimal_pb from '../num/decimal_pb'; // proto import: "num/decimal.proto"


export class Amount extends jspb.Message {
  getToken(): ledger_token_pb.Token | undefined;
  setToken(value?: ledger_token_pb.Token): Amount;
  hasToken(): boolean;
  clearToken(): Amount;

  getValue(): num_decimal_pb.Decimal | undefined;
  setValue(value?: num_decimal_pb.Decimal): Amount;
  hasValue(): boolean;
  clearValue(): Amount;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Amount.AsObject;
  static toObject(includeInstance: boolean, msg: Amount): Amount.AsObject;
  static serializeBinaryToWriter(message: Amount, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Amount;
  static deserializeBinaryFromReader(message: Amount, reader: jspb.BinaryReader): Amount;
}

export namespace Amount {
  export type AsObject = {
    token?: ledger_token_pb.Token.AsObject,
    value?: num_decimal_pb.Decimal.AsObject,
  }
}

