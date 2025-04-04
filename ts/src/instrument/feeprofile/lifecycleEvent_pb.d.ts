// package: api.instrument.feeprofile
// file: api/proto/instrument/feeprofile/lifecycleEvent.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_instrument_feeprofile_lifecycleEventCategory_pb from "../../instrument/feeprofile/lifecycleEventCategory_pb";
import * as api_proto_instrument_feeprofile_lifecycleEventCalculationConfig_pb from "../../instrument/feeprofile/lifecycleEventCalculationConfig_pb";

export class LifecycleEvent extends jspb.Message { 
    getDescription(): string;
    setDescription(value: string): LifecycleEvent;
    getCategory(): api_proto_instrument_feeprofile_lifecycleEventCategory_pb.LifecycleEventCategory;
    setCategory(value: api_proto_instrument_feeprofile_lifecycleEventCategory_pb.LifecycleEventCategory): LifecycleEvent;

    hasCalculationconfig(): boolean;
    clearCalculationconfig(): void;
    getCalculationconfig(): api_proto_instrument_feeprofile_lifecycleEventCalculationConfig_pb.LifecycleEventCalculationConfig | undefined;
    setCalculationconfig(value?: api_proto_instrument_feeprofile_lifecycleEventCalculationConfig_pb.LifecycleEventCalculationConfig): LifecycleEvent;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LifecycleEvent.AsObject;
    static toObject(includeInstance: boolean, msg: LifecycleEvent): LifecycleEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
