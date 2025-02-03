import * as jspb from 'google-protobuf'

import * as instrument_feeprofile_lifecycleEventFeeCalculationConfigAmount_pb from '../../instrument/feeprofile/lifecycleEventFeeCalculationConfigAmount_pb'; // proto import: "instrument/feeprofile/lifecycleEventFeeCalculationConfigAmount.proto"
import * as instrument_feeprofile_lifecycleEventFeeCalculationConfigRate_pb from '../../instrument/feeprofile/lifecycleEventFeeCalculationConfigRate_pb'; // proto import: "instrument/feeprofile/lifecycleEventFeeCalculationConfigRate.proto"


export class LifecycleEventFeeCalculationConfig extends jspb.Message {
  getAmountlifecycleeventfeecalculationconfig(): instrument_feeprofile_lifecycleEventFeeCalculationConfigAmount_pb.AmountLifecycleEventFeeCalculationConfig | undefined;
  setAmountlifecycleeventfeecalculationconfig(value?: instrument_feeprofile_lifecycleEventFeeCalculationConfigAmount_pb.AmountLifecycleEventFeeCalculationConfig): LifecycleEventFeeCalculationConfig;
  hasAmountlifecycleeventfeecalculationconfig(): boolean;
  clearAmountlifecycleeventfeecalculationconfig(): LifecycleEventFeeCalculationConfig;

  getRatelifecycleeventfeecalculationconfig(): instrument_feeprofile_lifecycleEventFeeCalculationConfigRate_pb.RateLifecycleEventFeeCalculationConfig | undefined;
  setRatelifecycleeventfeecalculationconfig(value?: instrument_feeprofile_lifecycleEventFeeCalculationConfigRate_pb.RateLifecycleEventFeeCalculationConfig): LifecycleEventFeeCalculationConfig;
  hasRatelifecycleeventfeecalculationconfig(): boolean;
  clearRatelifecycleeventfeecalculationconfig(): LifecycleEventFeeCalculationConfig;

  getLifecycleeventfeecalculationconfigCase(): LifecycleEventFeeCalculationConfig.LifecycleeventfeecalculationconfigCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LifecycleEventFeeCalculationConfig.AsObject;
  static toObject(includeInstance: boolean, msg: LifecycleEventFeeCalculationConfig): LifecycleEventFeeCalculationConfig.AsObject;
  static serializeBinaryToWriter(message: LifecycleEventFeeCalculationConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LifecycleEventFeeCalculationConfig;
  static deserializeBinaryFromReader(message: LifecycleEventFeeCalculationConfig, reader: jspb.BinaryReader): LifecycleEventFeeCalculationConfig;
}

export namespace LifecycleEventFeeCalculationConfig {
  export type AsObject = {
    amountlifecycleeventfeecalculationconfig?: instrument_feeprofile_lifecycleEventFeeCalculationConfigAmount_pb.AmountLifecycleEventFeeCalculationConfig.AsObject,
    ratelifecycleeventfeecalculationconfig?: instrument_feeprofile_lifecycleEventFeeCalculationConfigRate_pb.RateLifecycleEventFeeCalculationConfig.AsObject,
  }

  export enum LifecycleeventfeecalculationconfigCase { 
    LIFECYCLEEVENTFEECALCULATIONCONFIG_NOT_SET = 0,
    AMOUNTLIFECYCLEEVENTFEECALCULATIONCONFIG = 1,
    RATELIFECYCLEEVENTFEECALCULATIONCONFIG = 2,
  }
}

