/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'

import * as api_proto_ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "api/proto/ledger/amount.proto"
import * as api_proto_num_decimal_pb from '../../num/decimal_pb'; // proto import: "api/proto/num/decimal.proto"


export class RateData extends jspb.Message {
  getRate(): api_proto_num_decimal_pb.Decimal | undefined;
  setRate(value?: api_proto_num_decimal_pb.Decimal): RateData;
  hasRate(): boolean;
  clearRate(): RateData;

  getBaseamount(): api_proto_ledger_amount_pb.Amount | undefined;
  setBaseamount(value?: api_proto_ledger_amount_pb.Amount): RateData;
  hasBaseamount(): boolean;
  clearBaseamount(): RateData;

  getAmountexclvat(): api_proto_ledger_amount_pb.Amount | undefined;
  setAmountexclvat(value?: api_proto_ledger_amount_pb.Amount): RateData;
  hasAmountexclvat(): boolean;
  clearAmountexclvat(): RateData;

  getVatrate(): api_proto_num_decimal_pb.Decimal | undefined;
  setVatrate(value?: api_proto_num_decimal_pb.Decimal): RateData;
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
    rate?: api_proto_num_decimal_pb.Decimal.AsObject,
    baseamount?: api_proto_ledger_amount_pb.Amount.AsObject,
    amountexclvat?: api_proto_ledger_amount_pb.Amount.AsObject,
    vatrate?: api_proto_num_decimal_pb.Decimal.AsObject,
  }
}

