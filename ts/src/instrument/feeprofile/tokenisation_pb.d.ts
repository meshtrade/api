import * as jspb from 'google-protobuf'

import * as ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "ledger/amount.proto"


export class Tokenisation extends jspb.Message {
  getFirsttimemintingamount(): ledger_amount_pb.Amount | undefined;
  setFirsttimemintingamount(value?: ledger_amount_pb.Amount): Tokenisation;
  hasFirsttimemintingamount(): boolean;
  clearFirsttimemintingamount(): Tokenisation;

  getMintingamount(): ledger_amount_pb.Amount | undefined;
  setMintingamount(value?: ledger_amount_pb.Amount): Tokenisation;
  hasMintingamount(): boolean;
  clearMintingamount(): Tokenisation;

  getBurningamount(): ledger_amount_pb.Amount | undefined;
  setBurningamount(value?: ledger_amount_pb.Amount): Tokenisation;
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
    firsttimemintingamount?: ledger_amount_pb.Amount.AsObject,
    mintingamount?: ledger_amount_pb.Amount.AsObject,
    burningamount?: ledger_amount_pb.Amount.AsObject,
  }
}

