import * as jspb from 'google-protobuf'

import * as num_decimal_pb from '../../num/decimal_pb'; // proto import: "num/decimal.proto"


export class RateLifecycleEventCalculationConfig extends jspb.Message {
  getRate(): num_decimal_pb.Decimal | undefined;
  setRate(value?: num_decimal_pb.Decimal): RateLifecycleEventCalculationConfig;
  hasRate(): boolean;
  clearRate(): RateLifecycleEventCalculationConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RateLifecycleEventCalculationConfig.AsObject;
  static toObject(includeInstance: boolean, msg: RateLifecycleEventCalculationConfig): RateLifecycleEventCalculationConfig.AsObject;
  static serializeBinaryToWriter(message: RateLifecycleEventCalculationConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RateLifecycleEventCalculationConfig;
  static deserializeBinaryFromReader(message: RateLifecycleEventCalculationConfig, reader: jspb.BinaryReader): RateLifecycleEventCalculationConfig;
}

export namespace RateLifecycleEventCalculationConfig {
  export type AsObject = {
    rate?: num_decimal_pb.Decimal.AsObject,
  }
}

