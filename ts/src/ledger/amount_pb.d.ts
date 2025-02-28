import * as jspb from 'google-protobuf'

import * as api_proto_ledger_token_pb from '../ledger/token_pb'; // proto import: "api/proto/ledger/token.proto"
import * as api_proto_num_decimal_pb from '../num/decimal_pb'; // proto import: "api/proto/num/decimal.proto"


export class Amount extends jspb.Message {
  getToken(): api_proto_ledger_token_pb.Token | undefined;
  setToken(value?: api_proto_ledger_token_pb.Token): Amount;
  hasToken(): boolean;
  clearToken(): Amount;

  getValue(): api_proto_num_decimal_pb.Decimal | undefined;
  setValue(value?: api_proto_num_decimal_pb.Decimal): Amount;
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
    token?: api_proto_ledger_token_pb.Token.AsObject,
    value?: api_proto_num_decimal_pb.Decimal.AsObject,
  }
}

