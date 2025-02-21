import * as jspb from 'google-protobuf'

import * as ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "ledger/amount.proto"
import * as num_decimal_pb from '../../num/decimal_pb'; // proto import: "num/decimal.proto"


export class AmountData extends jspb.Message {
  getAmountexclvat(): ledger_amount_pb.Amount | undefined;
  setAmountexclvat(value?: ledger_amount_pb.Amount): AmountData;
  hasAmountexclvat(): boolean;
  clearAmountexclvat(): AmountData;

  getVatrate(): num_decimal_pb.Decimal | undefined;
  setVatrate(value?: num_decimal_pb.Decimal): AmountData;
  hasVatrate(): boolean;
  clearVatrate(): AmountData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AmountData.AsObject;
  static toObject(includeInstance: boolean, msg: AmountData): AmountData.AsObject;
  static serializeBinaryToWriter(message: AmountData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AmountData;
  static deserializeBinaryFromReader(message: AmountData, reader: jspb.BinaryReader): AmountData;
}

export namespace AmountData {
  export type AsObject = {
    amountexclvat?: ledger_amount_pb.Amount.AsObject,
    vatrate?: num_decimal_pb.Decimal.AsObject,
  }
}

