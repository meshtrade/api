import * as jspb from 'google-protobuf'

import * as num_decimal_pb from '../../num/decimal_pb'; // proto import: "num/decimal.proto"


export class RateLifecycleEventFeeCalculationConfig extends jspb.Message {
  getRate(): num_decimal_pb.Decimal | undefined;
  setRate(value?: num_decimal_pb.Decimal): RateLifecycleEventFeeCalculationConfig;
  hasRate(): boolean;
  clearRate(): RateLifecycleEventFeeCalculationConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RateLifecycleEventFeeCalculationConfig.AsObject;
  static toObject(includeInstance: boolean, msg: RateLifecycleEventFeeCalculationConfig): RateLifecycleEventFeeCalculationConfig.AsObject;
  static serializeBinaryToWriter(message: RateLifecycleEventFeeCalculationConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RateLifecycleEventFeeCalculationConfig;
  static deserializeBinaryFromReader(message: RateLifecycleEventFeeCalculationConfig, reader: jspb.BinaryReader): RateLifecycleEventFeeCalculationConfig;
}

export namespace RateLifecycleEventFeeCalculationConfig {
  export type AsObject = {
    rate?: num_decimal_pb.Decimal.AsObject,
  }
}

