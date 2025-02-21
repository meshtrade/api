import * as jspb from 'google-protobuf'

import * as instrument_fee_dataAmount_pb from '../../instrument/fee/dataAmount_pb'; // proto import: "instrument/fee/dataAmount.proto"
import * as instrument_fee_dataRate_pb from '../../instrument/fee/dataRate_pb'; // proto import: "instrument/fee/dataRate.proto"
import * as instrument_fee_dataPerUnit_pb from '../../instrument/fee/dataPerUnit_pb'; // proto import: "instrument/fee/dataPerUnit.proto"


export class Data extends jspb.Message {
  getAmountdata(): instrument_fee_dataAmount_pb.AmountData | undefined;
  setAmountdata(value?: instrument_fee_dataAmount_pb.AmountData): Data;
  hasAmountdata(): boolean;
  clearAmountdata(): Data;

  getRatedata(): instrument_fee_dataRate_pb.RateData | undefined;
  setRatedata(value?: instrument_fee_dataRate_pb.RateData): Data;
  hasRatedata(): boolean;
  clearRatedata(): Data;

  getPerunitdata(): instrument_fee_dataPerUnit_pb.PerUnitData | undefined;
  setPerunitdata(value?: instrument_fee_dataPerUnit_pb.PerUnitData): Data;
  hasPerunitdata(): boolean;
  clearPerunitdata(): Data;

  getDataCase(): Data.DataCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Data.AsObject;
  static toObject(includeInstance: boolean, msg: Data): Data.AsObject;
  static serializeBinaryToWriter(message: Data, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Data;
  static deserializeBinaryFromReader(message: Data, reader: jspb.BinaryReader): Data;
}

export namespace Data {
  export type AsObject = {
    amountdata?: instrument_fee_dataAmount_pb.AmountData.AsObject,
    ratedata?: instrument_fee_dataRate_pb.RateData.AsObject,
    perunitdata?: instrument_fee_dataPerUnit_pb.PerUnitData.AsObject,
  }

  export enum DataCase { 
    DATA_NOT_SET = 0,
    AMOUNTDATA = 1,
    RATEDATA = 2,
    PERUNITDATA = 3,
  }
}

