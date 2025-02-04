import * as jspb from 'google-protobuf'

import * as instrument_fee_state_pb from '../../instrument/fee/state_pb'; // proto import: "instrument/fee/state.proto"
import * as instrument_fee_category_pb from '../../instrument/fee/category_pb'; // proto import: "instrument/fee/category.proto"
import * as instrument_fee_data_pb from '../../instrument/fee/data_pb'; // proto import: "instrument/fee/data.proto"
import * as ledger_amount_pb from '../../ledger/amount_pb'; // proto import: "ledger/amount.proto"
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class Fee extends jspb.Message {
  getName(): string;
  setName(value: string): Fee;

  getInstrumentname(): string;
  setInstrumentname(value: string): Fee;

  getState(): instrument_fee_state_pb.State;
  setState(value: instrument_fee_state_pb.State): Fee;

  getAmountinclvat(): ledger_amount_pb.Amount | undefined;
  setAmountinclvat(value?: ledger_amount_pb.Amount): Fee;
  hasAmountinclvat(): boolean;
  clearAmountinclvat(): Fee;

  getVatamount(): string;
  setVatamount(value: string): Fee;

  getCategory(): instrument_fee_category_pb.Category;
  setCategory(value: instrument_fee_category_pb.Category): Fee;

  getPaymentdate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setPaymentdate(value?: google_protobuf_timestamp_pb.Timestamp): Fee;
  hasPaymentdate(): boolean;
  clearPaymentdate(): Fee;

  getData(): instrument_fee_data_pb.Data | undefined;
  setData(value?: instrument_fee_data_pb.Data): Fee;
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
    name: string,
    instrumentname: string,
    state: instrument_fee_state_pb.State,
    amountinclvat?: ledger_amount_pb.Amount.AsObject,
    vatamount: string,
    category: instrument_fee_category_pb.Category,
    paymentdate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    data?: instrument_fee_data_pb.Data.AsObject,
  }
}

