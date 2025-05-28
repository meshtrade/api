/* eslint-disable */
// @ts-nocheck
// package: api.instrument.fee
// file: api/proto/instrument/fee/data.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_instrument_fee_dataAmount_pb from "../../instrument/fee/dataAmount_pb";
import * as api_proto_instrument_fee_dataRate_pb from "../../instrument/fee/dataRate_pb";
import * as api_proto_instrument_fee_dataPerUnit_pb from "../../instrument/fee/dataPerUnit_pb";

export class Data extends jspb.Message { 

    hasAmountdata(): boolean;
    clearAmountdata(): void;
    getAmountdata(): api_proto_instrument_fee_dataAmount_pb.AmountData | undefined;
    setAmountdata(value?: api_proto_instrument_fee_dataAmount_pb.AmountData): Data;

    hasRatedata(): boolean;
    clearRatedata(): void;
    getRatedata(): api_proto_instrument_fee_dataRate_pb.RateData | undefined;
    setRatedata(value?: api_proto_instrument_fee_dataRate_pb.RateData): Data;

    hasPerunitdata(): boolean;
    clearPerunitdata(): void;
    getPerunitdata(): api_proto_instrument_fee_dataPerUnit_pb.PerUnitData | undefined;
    setPerunitdata(value?: api_proto_instrument_fee_dataPerUnit_pb.PerUnitData): Data;

    getDataCase(): Data.DataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Data.AsObject;
    static toObject(includeInstance: boolean, msg: Data): Data.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Data, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Data;
    static deserializeBinaryFromReader(message: Data, reader: jspb.BinaryReader): Data;
}

export namespace Data {
    export type AsObject = {
        amountdata?: api_proto_instrument_fee_dataAmount_pb.AmountData.AsObject,
        ratedata?: api_proto_instrument_fee_dataRate_pb.RateData.AsObject,
        perunitdata?: api_proto_instrument_fee_dataPerUnit_pb.PerUnitData.AsObject,
    }

    export enum DataCase {
        DATA_NOT_SET = 0,
        AMOUNTDATA = 1,
        RATEDATA = 2,
        PERUNITDATA = 3,
    }

}
