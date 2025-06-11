/* eslint-disable */
// @ts-nocheck
// package: api.instrument.feeprofile
// file: api/proto/instrument/feeprofile/lifecycleEventCalculationConfigRate.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_num_decimal_pb from "../../num/decimal_pb";

export class RateLifecycleEventCalculationConfig extends jspb.Message { 

    hasRate(): boolean;
    clearRate(): void;
    getRate(): api_proto_num_decimal_pb.Decimal | undefined;
    setRate(value?: api_proto_num_decimal_pb.Decimal): RateLifecycleEventCalculationConfig;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RateLifecycleEventCalculationConfig.AsObject;
    static toObject(includeInstance: boolean, msg: RateLifecycleEventCalculationConfig): RateLifecycleEventCalculationConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RateLifecycleEventCalculationConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RateLifecycleEventCalculationConfig;
    static deserializeBinaryFromReader(message: RateLifecycleEventCalculationConfig, reader: jspb.BinaryReader): RateLifecycleEventCalculationConfig;
}

export namespace RateLifecycleEventCalculationConfig {
    export type AsObject = {
        rate?: api_proto_num_decimal_pb.Decimal.AsObject,
    }
}
