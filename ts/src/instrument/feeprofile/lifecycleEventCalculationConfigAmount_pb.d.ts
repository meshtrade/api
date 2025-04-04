// package: api.instrument.feeprofile
// file: api/proto/instrument/feeprofile/lifecycleEventCalculationConfigAmount.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_ledger_amount_pb from "../../ledger/amount_pb";

export class AmountLifecycleEventCalculationConfig extends jspb.Message { 

    hasAmount(): boolean;
    clearAmount(): void;
    getAmount(): api_proto_ledger_amount_pb.Amount | undefined;
    setAmount(value?: api_proto_ledger_amount_pb.Amount): AmountLifecycleEventCalculationConfig;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AmountLifecycleEventCalculationConfig.AsObject;
    static toObject(includeInstance: boolean, msg: AmountLifecycleEventCalculationConfig): AmountLifecycleEventCalculationConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AmountLifecycleEventCalculationConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AmountLifecycleEventCalculationConfig;
    static deserializeBinaryFromReader(message: AmountLifecycleEventCalculationConfig, reader: jspb.BinaryReader): AmountLifecycleEventCalculationConfig;
}

export namespace AmountLifecycleEventCalculationConfig {
    export type AsObject = {
        amount?: api_proto_ledger_amount_pb.Amount.AsObject,
    }
}
