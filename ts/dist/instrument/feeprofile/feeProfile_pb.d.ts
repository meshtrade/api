/* eslint-disable */
// @ts-nocheck
// package: api.instrument.feeprofile
// file: api/proto/instrument/feeprofile/feeProfile.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_instrument_feeprofile_tokenisation_pb from "../../instrument/feeprofile/tokenisation_pb";
import * as api_proto_instrument_feeprofile_lifecycleEvent_pb from "../../instrument/feeprofile/lifecycleEvent_pb";
import * as api_proto_instrument_feeprofile_aum_pb from "../../instrument/feeprofile/aum_pb";

export class FeeProfile extends jspb.Message { 
    getInstrumentid(): string;
    setInstrumentid(value: string): FeeProfile;

    hasTokenisation(): boolean;
    clearTokenisation(): void;
    getTokenisation(): api_proto_instrument_feeprofile_tokenisation_pb.Tokenisation | undefined;
    setTokenisation(value?: api_proto_instrument_feeprofile_tokenisation_pb.Tokenisation): FeeProfile;
    clearLifecycleeventsList(): void;
    getLifecycleeventsList(): Array<api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent>;
    setLifecycleeventsList(value: Array<api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent>): FeeProfile;
    addLifecycleevents(value?: api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent, index?: number): api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent;

    hasAum(): boolean;
    clearAum(): void;
    getAum(): api_proto_instrument_feeprofile_aum_pb.AUM | undefined;
    setAum(value?: api_proto_instrument_feeprofile_aum_pb.AUM): FeeProfile;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FeeProfile.AsObject;
    static toObject(includeInstance: boolean, msg: FeeProfile): FeeProfile.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FeeProfile, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FeeProfile;
    static deserializeBinaryFromReader(message: FeeProfile, reader: jspb.BinaryReader): FeeProfile;
}

export namespace FeeProfile {
    export type AsObject = {
        instrumentid: string,
        tokenisation?: api_proto_instrument_feeprofile_tokenisation_pb.Tokenisation.AsObject,
        lifecycleeventsList: Array<api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent.AsObject>,
        aum?: api_proto_instrument_feeprofile_aum_pb.AUM.AsObject,
    }
}
