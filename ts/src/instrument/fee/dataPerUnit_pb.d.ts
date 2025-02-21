import * as jspb from 'google-protobuf'

import * as ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "ledger/amount.proto"
import * as num_decimal_pb from '../../num/decimal_pb'; // proto import: "num/decimal.proto"


export class PerUnitData extends jspb.Message {
  getNounits(): num_decimal_pb.Decimal | undefined;
  setNounits(value?: num_decimal_pb.Decimal): PerUnitData;
  hasNounits(): boolean;
  clearNounits(): PerUnitData;

  getPerunitamount(): ledger_amount_pb.Amount | undefined;
  setPerunitamount(value?: ledger_amount_pb.Amount): PerUnitData;
  hasPerunitamount(): boolean;
  clearPerunitamount(): PerUnitData;

  getAmountexclvat(): ledger_amount_pb.Amount | undefined;
  setAmountexclvat(value?: ledger_amount_pb.Amount): PerUnitData;
  hasAmountexclvat(): boolean;
  clearAmountexclvat(): PerUnitData;

  getVatrate(): num_decimal_pb.Decimal | undefined;
  setVatrate(value?: num_decimal_pb.Decimal): PerUnitData;
  hasVatrate(): boolean;
  clearVatrate(): PerUnitData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PerUnitData.AsObject;
  static toObject(includeInstance: boolean, msg: PerUnitData): PerUnitData.AsObject;
  static serializeBinaryToWriter(message: PerUnitData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PerUnitData;
  static deserializeBinaryFromReader(message: PerUnitData, reader: jspb.BinaryReader): PerUnitData;
}

export namespace PerUnitData {
  export type AsObject = {
    nounits?: num_decimal_pb.Decimal.AsObject,
    perunitamount?: ledger_amount_pb.Amount.AsObject,
    amountexclvat?: ledger_amount_pb.Amount.AsObject,
    vatrate?: num_decimal_pb.Decimal.AsObject,
  }
}

