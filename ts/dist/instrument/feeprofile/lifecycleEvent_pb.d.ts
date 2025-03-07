/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'

import * as api_proto_instrument_feeprofile_lifecycleEventCategory_pb from '../../instrument/feeprofile/lifecycleEventCategory_pb'; // proto import: "api/proto/instrument/feeprofile/lifecycleEventCategory.proto"
import * as api_proto_instrument_feeprofile_lifecycleEventCalculationConfig_pb from '../../instrument/feeprofile/lifecycleEventCalculationConfig_pb'; // proto import: "api/proto/instrument/feeprofile/lifecycleEventCalculationConfig.proto"


export class LifecycleEvent extends jspb.Message {
  getDescription(): string;
  setDescription(value: string): LifecycleEvent;

  getCategory(): api_proto_instrument_feeprofile_lifecycleEventCategory_pb.LifecycleEventCategory;
  setCategory(value: api_proto_instrument_feeprofile_lifecycleEventCategory_pb.LifecycleEventCategory): LifecycleEvent;

  getCalculationconfig(): api_proto_instrument_feeprofile_lifecycleEventCalculationConfig_pb.LifecycleEventCalculationConfig | undefined;
  setCalculationconfig(value?: api_proto_instrument_feeprofile_lifecycleEventCalculationConfig_pb.LifecycleEventCalculationConfig): LifecycleEvent;
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
    category: api_proto_instrument_feeprofile_lifecycleEventCategory_pb.LifecycleEventCategory,
    calculationconfig?: api_proto_instrument_feeprofile_lifecycleEventCalculationConfig_pb.LifecycleEventCalculationConfig.AsObject,
  }
}

