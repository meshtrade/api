import * as jspb from 'google-protobuf'

import * as api_proto_instrument_feeprofile_lifecycleEventCalculationConfigAmount_pb from '../../instrument/feeprofile/lifecycleEventCalculationConfigAmount_pb'; // proto import: "api/proto/instrument/feeprofile/lifecycleEventCalculationConfigAmount.proto"
import * as api_proto_instrument_feeprofile_lifecycleEventCalculationConfigRate_pb from '../../instrument/feeprofile/lifecycleEventCalculationConfigRate_pb'; // proto import: "api/proto/instrument/feeprofile/lifecycleEventCalculationConfigRate.proto"


export class LifecycleEventCalculationConfig extends jspb.Message {
  getAmountlifecycleeventcalculationconfig(): api_proto_instrument_feeprofile_lifecycleEventCalculationConfigAmount_pb.AmountLifecycleEventCalculationConfig | undefined;
  setAmountlifecycleeventcalculationconfig(value?: api_proto_instrument_feeprofile_lifecycleEventCalculationConfigAmount_pb.AmountLifecycleEventCalculationConfig): LifecycleEventCalculationConfig;
  hasAmountlifecycleeventcalculationconfig(): boolean;
  clearAmountlifecycleeventcalculationconfig(): LifecycleEventCalculationConfig;

  getRatelifecycleeventcalculationconfig(): api_proto_instrument_feeprofile_lifecycleEventCalculationConfigRate_pb.RateLifecycleEventCalculationConfig | undefined;
  setRatelifecycleeventcalculationconfig(value?: api_proto_instrument_feeprofile_lifecycleEventCalculationConfigRate_pb.RateLifecycleEventCalculationConfig): LifecycleEventCalculationConfig;
  hasRatelifecycleeventcalculationconfig(): boolean;
  clearRatelifecycleeventcalculationconfig(): LifecycleEventCalculationConfig;

  getLifecycleeventcalculationconfigCase(): LifecycleEventCalculationConfig.LifecycleeventcalculationconfigCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LifecycleEventCalculationConfig.AsObject;
  static toObject(includeInstance: boolean, msg: LifecycleEventCalculationConfig): LifecycleEventCalculationConfig.AsObject;
  static serializeBinaryToWriter(message: LifecycleEventCalculationConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LifecycleEventCalculationConfig;
  static deserializeBinaryFromReader(message: LifecycleEventCalculationConfig, reader: jspb.BinaryReader): LifecycleEventCalculationConfig;
}

export namespace LifecycleEventCalculationConfig {
  export type AsObject = {
    amountlifecycleeventcalculationconfig?: api_proto_instrument_feeprofile_lifecycleEventCalculationConfigAmount_pb.AmountLifecycleEventCalculationConfig.AsObject,
    ratelifecycleeventcalculationconfig?: api_proto_instrument_feeprofile_lifecycleEventCalculationConfigRate_pb.RateLifecycleEventCalculationConfig.AsObject,
  }

  export enum LifecycleeventcalculationconfigCase { 
    LIFECYCLEEVENTCALCULATIONCONFIG_NOT_SET = 0,
    AMOUNTLIFECYCLEEVENTCALCULATIONCONFIG = 1,
    RATELIFECYCLEEVENTCALCULATIONCONFIG = 2,
  }
}

