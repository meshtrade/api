/* eslint-disable */
// @ts-nocheck
// package: api.instrument.feeprofile
// file: api/proto/instrument/feeprofile/lifecycleEventCalculationConfig.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_instrument_feeprofile_lifecycleEventCalculationConfigAmount_pb from "../../instrument/feeprofile/lifecycleEventCalculationConfigAmount_pb";
import * as api_proto_instrument_feeprofile_lifecycleEventCalculationConfigRate_pb from "../../instrument/feeprofile/lifecycleEventCalculationConfigRate_pb";

export class LifecycleEventCalculationConfig extends jspb.Message { 

    hasAmountlifecycleeventcalculationconfig(): boolean;
    clearAmountlifecycleeventcalculationconfig(): void;
    getAmountlifecycleeventcalculationconfig(): api_proto_instrument_feeprofile_lifecycleEventCalculationConfigAmount_pb.AmountLifecycleEventCalculationConfig | undefined;
    setAmountlifecycleeventcalculationconfig(value?: api_proto_instrument_feeprofile_lifecycleEventCalculationConfigAmount_pb.AmountLifecycleEventCalculationConfig): LifecycleEventCalculationConfig;

    hasRatelifecycleeventcalculationconfig(): boolean;
    clearRatelifecycleeventcalculationconfig(): void;
    getRatelifecycleeventcalculationconfig(): api_proto_instrument_feeprofile_lifecycleEventCalculationConfigRate_pb.RateLifecycleEventCalculationConfig | undefined;
    setRatelifecycleeventcalculationconfig(value?: api_proto_instrument_feeprofile_lifecycleEventCalculationConfigRate_pb.RateLifecycleEventCalculationConfig): LifecycleEventCalculationConfig;

    getLifecycleeventcalculationconfigCase(): LifecycleEventCalculationConfig.LifecycleeventcalculationconfigCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LifecycleEventCalculationConfig.AsObject;
    static toObject(includeInstance: boolean, msg: LifecycleEventCalculationConfig): LifecycleEventCalculationConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
