/* eslint-disable */
// @ts-nocheck
// package: api.banking.funding
// file: api/proto/banking/funding/peachSettlementMetadata.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_banking_funding_bankName_pb from "../../banking/funding/bankName_pb";
import * as api_proto_banking_funding_fee_pb from "../../banking/funding/fee_pb";

export class PeachSettlementMetaData extends jspb.Message { 
    getExternaltransactionid(): string;
    setExternaltransactionid(value: string): PeachSettlementMetaData;
    getExternalsettlementreference(): string;
    setExternalsettlementreference(value: string): PeachSettlementMetaData;
    getBankname(): api_proto_banking_funding_bankName_pb.BankName;
    setBankname(value: api_proto_banking_funding_bankName_pb.BankName): PeachSettlementMetaData;

    hasFee(): boolean;
    clearFee(): void;
    getFee(): api_proto_banking_funding_fee_pb.Fee | undefined;
    setFee(value?: api_proto_banking_funding_fee_pb.Fee): PeachSettlementMetaData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PeachSettlementMetaData.AsObject;
    static toObject(includeInstance: boolean, msg: PeachSettlementMetaData): PeachSettlementMetaData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PeachSettlementMetaData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PeachSettlementMetaData;
    static deserializeBinaryFromReader(message: PeachSettlementMetaData, reader: jspb.BinaryReader): PeachSettlementMetaData;
}

export namespace PeachSettlementMetaData {
    export type AsObject = {
        externaltransactionid: string,
        externalsettlementreference: string,
        bankname: api_proto_banking_funding_bankName_pb.BankName,
        fee?: api_proto_banking_funding_fee_pb.Fee.AsObject,
    }
}
