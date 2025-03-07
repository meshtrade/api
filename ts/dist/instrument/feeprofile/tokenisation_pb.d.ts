/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'

import * as api_proto_ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "api/proto/ledger/amount.proto"


export class Tokenisation extends jspb.Message {
  getFirsttimemintingamount(): api_proto_ledger_amount_pb.Amount | undefined;
  setFirsttimemintingamount(value?: api_proto_ledger_amount_pb.Amount): Tokenisation;
  hasFirsttimemintingamount(): boolean;
  clearFirsttimemintingamount(): Tokenisation;

  getMintingamount(): api_proto_ledger_amount_pb.Amount | undefined;
  setMintingamount(value?: api_proto_ledger_amount_pb.Amount): Tokenisation;
  hasMintingamount(): boolean;
  clearMintingamount(): Tokenisation;

  getBurningamount(): api_proto_ledger_amount_pb.Amount | undefined;
  setBurningamount(value?: api_proto_ledger_amount_pb.Amount): Tokenisation;
  hasBurningamount(): boolean;
  clearBurningamount(): Tokenisation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tokenisation.AsObject;
  static toObject(includeInstance: boolean, msg: Tokenisation): Tokenisation.AsObject;
  static serializeBinaryToWriter(message: Tokenisation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tokenisation;
  static deserializeBinaryFromReader(message: Tokenisation, reader: jspb.BinaryReader): Tokenisation;
}

export namespace Tokenisation {
  export type AsObject = {
    firsttimemintingamount?: api_proto_ledger_amount_pb.Amount.AsObject,
    mintingamount?: api_proto_ledger_amount_pb.Amount.AsObject,
    burningamount?: api_proto_ledger_amount_pb.Amount.AsObject,
  }
}

