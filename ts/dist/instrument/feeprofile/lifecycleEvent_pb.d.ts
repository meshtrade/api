import * as jspb from 'google-protobuf'

import * as instrument_feeProfile_lifecycleEventFeeTrigger_pb from '../../instrument/feeProfile/lifecycleEventFeeTrigger_pb'; // proto import: "instrument/feeProfile/lifecycleEventFeeTrigger.proto"
import * as instrument_feeProfile_lifecycleEventFeeCalculationConfig_pb from '../../instrument/feeProfile/lifecycleEventFeeCalculationConfig_pb'; // proto import: "instrument/feeProfile/lifecycleEventFeeCalculationConfig.proto"


export class LifecycleEvent extends jspb.Message {
  getName(): string;
  setName(value: string): LifecycleEvent;

  getTrigger(): instrument_feeProfile_lifecycleEventFeeTrigger_pb.LifecycleEventFeeTrigger;
  setTrigger(value: instrument_feeProfile_lifecycleEventFeeTrigger_pb.LifecycleEventFeeTrigger): LifecycleEvent;

  getCalculationconfig(): instrument_feeProfile_lifecycleEventFeeCalculationConfig_pb.LifecycleEventFeeCalculationConfig | undefined;
  setCalculationconfig(value?: instrument_feeProfile_lifecycleEventFeeCalculationConfig_pb.LifecycleEventFeeCalculationConfig): LifecycleEvent;
  hasCalculationconfig(): boolean;
  clearCalculationconfig(): LifecycleEvent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LifecycleEvent.AsObject;
  static toObject(includeInstance: boolean, msg: LifecycleEvent): LifecycleEvent.AsObject;
  static serializeBinaryToWriter(message: LifecycleEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LifecycleEvent;
  static deserializeBinaryFromReader(message: LifecycleEvent, reader: jspb.BinaryReader): LifecycleEvent;
}

export namespace LifecycleEvent {
  export type AsObject = {
    name: string,
    trigger: instrument_feeProfile_lifecycleEventFeeTrigger_pb.LifecycleEventFeeTrigger,
    calculationconfig?: instrument_feeProfile_lifecycleEventFeeCalculationConfig_pb.LifecycleEventFeeCalculationConfig.AsObject,
  }
}

