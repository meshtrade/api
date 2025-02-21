import * as jspb from 'google-protobuf'

import * as instrument_feeProfile_lifecycleEventCategory_pb from '../../instrument/feeProfile/lifecycleEventCategory_pb'; // proto import: "instrument/feeProfile/lifecycleEventCategory.proto"
import * as instrument_feeProfile_lifecycleEventCalculationConfig_pb from '../../instrument/feeProfile/lifecycleEventCalculationConfig_pb'; // proto import: "instrument/feeProfile/lifecycleEventCalculationConfig.proto"


export class LifecycleEvent extends jspb.Message {
  getDescription(): string;
  setDescription(value: string): LifecycleEvent;

  getCategory(): instrument_feeProfile_lifecycleEventCategory_pb.LifecycleEventCategory;
  setCategory(value: instrument_feeProfile_lifecycleEventCategory_pb.LifecycleEventCategory): LifecycleEvent;

  getCalculationconfig(): instrument_feeProfile_lifecycleEventCalculationConfig_pb.LifecycleEventCalculationConfig | undefined;
  setCalculationconfig(value?: instrument_feeProfile_lifecycleEventCalculationConfig_pb.LifecycleEventCalculationConfig): LifecycleEvent;
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
    description: string,
    category: instrument_feeProfile_lifecycleEventCategory_pb.LifecycleEventCategory,
    calculationconfig?: instrument_feeProfile_lifecycleEventCalculationConfig_pb.LifecycleEventCalculationConfig.AsObject,
  }
}

