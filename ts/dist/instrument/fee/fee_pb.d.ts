/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'

import * as api_proto_instrument_fee_data_pb from '../../instrument/fee/data_pb'; // proto import: "api/proto/instrument/fee/data.proto"
import * as api_proto_ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "api/proto/ledger/amount.proto"
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class Fee extends jspb.Message {
  getId(): string;
  setId(value: string): Fee;

  getInstrumentname(): string;
  setInstrumentname(value: string): Fee;

  getState(): State;
  setState(value: State): Fee;

  getDescription(): string;
  setDescription(value: string): Fee;

  getAmountinclvat(): api_proto_ledger_amount_pb.Amount | undefined;
  setAmountinclvat(value?: api_proto_ledger_amount_pb.Amount): Fee;
  hasAmountinclvat(): boolean;
  clearAmountinclvat(): Fee;

  getVatamount(): api_proto_ledger_amount_pb.Amount | undefined;
  setVatamount(value?: api_proto_ledger_amount_pb.Amount): Fee;
  hasVatamount(): boolean;
  clearVatamount(): Fee;

  getCategory(): Category;
  setCategory(value: Category): Fee;

  getPaymentdate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setPaymentdate(value?: google_protobuf_timestamp_pb.Timestamp): Fee;
  hasPaymentdate(): boolean;
  clearPaymentdate(): Fee;

  getData(): api_proto_instrument_fee_data_pb.Data | undefined;
  setData(value?: api_proto_instrument_fee_data_pb.Data): Fee;
  hasData(): boolean;
  clearData(): Fee;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Fee.AsObject;
  static toObject(includeInstance: boolean, msg: Fee): Fee.AsObject;
  static serializeBinaryToWriter(message: Fee, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Fee;
  static deserializeBinaryFromReader(message: Fee, reader: jspb.BinaryReader): Fee;
}

export namespace Fee {
  export type AsObject = {
    id: string,
    instrumentname: string,
    state: State,
    description: string,
    amountinclvat?: api_proto_ledger_amount_pb.Amount.AsObject,
    vatamount?: api_proto_ledger_amount_pb.Amount.AsObject,
    category: Category,
    paymentdate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    data?: api_proto_instrument_fee_data_pb.Data.AsObject,
  }
}

export enum State { 
  UNDEFINED_STATE = 0,
  UPCOMING_STATE = 1,
  DUE_STATE = 2,
  PAYMENT_IN_PROGRESS_STATE = 3,
  FAILED_STATE = 4,
  CANCELLED_STATE = 5,
  PAID_STATE = 6,
}
export enum Category { 
  UNDEFINED_CATEGORY = 0,
  TOKENISATION_CATEGORY = 1,
  LISTING_CATEGORY = 2,
  PRIMARY_MARKET_SETTLEMENT_CATEGORY = 3,
  AUM_CATEGORY = 4,
}
