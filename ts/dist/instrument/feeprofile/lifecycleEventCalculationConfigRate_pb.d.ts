import * as jspb from 'google-protobuf'

import * as api_proto_num_decimal_pb from '../../num/decimal_pb'; // proto import: "api/proto/num/decimal.proto"


export class RateLifecycleEventCalculationConfig extends jspb.Message {
  getRate(): api_proto_num_decimal_pb.Decimal | undefined;
  setRate(value?: api_proto_num_decimal_pb.Decimal): RateLifecycleEventCalculationConfig;
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
    rate?: api_proto_num_decimal_pb.Decimal.AsObject,
  }
}

