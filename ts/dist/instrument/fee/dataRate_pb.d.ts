import * as jspb from 'google-protobuf'

import * as ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "ledger/amount.proto"
import * as num_decimal_pb from '../../num/decimal_pb'; // proto import: "num/decimal.proto"


export class RateData extends jspb.Message {
  getRate(): num_decimal_pb.Decimal | undefined;
  setRate(value?: num_decimal_pb.Decimal): RateData;
  hasRate(): boolean;
  clearRate(): RateData;

  getBaseamount(): ledger_amount_pb.Amount | undefined;
  setBaseamount(value?: ledger_amount_pb.Amount): RateData;
  hasBaseamount(): boolean;
  clearBaseamount(): RateData;

  getAmountexclvat(): ledger_amount_pb.Amount | undefined;
  setAmountexclvat(value?: ledger_amount_pb.Amount): RateData;
  hasAmountexclvat(): boolean;
  clearAmountexclvat(): RateData;

  getVatrate(): num_decimal_pb.Decimal | undefined;
  setVatrate(value?: num_decimal_pb.Decimal): RateData;
  hasVatrate(): boolean;
  clearVatrate(): RateData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RateData.AsObject;
  static toObject(includeInstance: boolean, msg: RateData): RateData.AsObject;
  static serializeBinaryToWriter(message: RateData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RateData;
  static deserializeBinaryFromReader(message: RateData, reader: jspb.BinaryReader): RateData;
}

export namespace RateData {
  export type AsObject = {
    rate?: num_decimal_pb.Decimal.AsObject,
    baseamount?: ledger_amount_pb.Amount.AsObject,
    amountexclvat?: ledger_amount_pb.Amount.AsObject,
    vatrate?: num_decimal_pb.Decimal.AsObject,
  }
}

