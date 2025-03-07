/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'

import * as api_proto_ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "api/proto/ledger/amount.proto"
import * as api_proto_num_decimal_pb from '../../num/decimal_pb'; // proto import: "api/proto/num/decimal.proto"


export class PerUnitData extends jspb.Message {
  getNounits(): api_proto_num_decimal_pb.Decimal | undefined;
  setNounits(value?: api_proto_num_decimal_pb.Decimal): PerUnitData;
  hasNounits(): boolean;
  clearNounits(): PerUnitData;

  getPerunitamount(): api_proto_ledger_amount_pb.Amount | undefined;
  setPerunitamount(value?: api_proto_ledger_amount_pb.Amount): PerUnitData;
  hasPerunitamount(): boolean;
  clearPerunitamount(): PerUnitData;

  getAmountexclvat(): api_proto_ledger_amount_pb.Amount | undefined;
  setAmountexclvat(value?: api_proto_ledger_amount_pb.Amount): PerUnitData;
  hasAmountexclvat(): boolean;
  clearAmountexclvat(): PerUnitData;

  getVatrate(): api_proto_num_decimal_pb.Decimal | undefined;
  setVatrate(value?: api_proto_num_decimal_pb.Decimal): PerUnitData;
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
    nounits?: api_proto_num_decimal_pb.Decimal.AsObject,
    perunitamount?: api_proto_ledger_amount_pb.Amount.AsObject,
    amountexclvat?: api_proto_ledger_amount_pb.Amount.AsObject,
    vatrate?: api_proto_num_decimal_pb.Decimal.AsObject,
  }
}

