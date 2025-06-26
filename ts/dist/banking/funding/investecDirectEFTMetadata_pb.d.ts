/* eslint-disable */
// @ts-nocheck
// package: api.banking.funding
// file: api/proto/banking/funding/investecDirectEFTMetadata.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_banking_funding_bankName_pb from "../../banking/funding/bankName_pb";
import * as api_proto_banking_funding_fee_pb from "../../banking/funding/fee_pb";

export class InvestecDirectEFTMetaData extends jspb.Message { 
    getExternaltransactionid(): string;
    setExternaltransactionid(value: string): InvestecDirectEFTMetaData;
    getExternalreference(): string;
    setExternalreference(value: string): InvestecDirectEFTMetaData;
    getBankname(): api_proto_banking_funding_bankName_pb.BankName;
    setBankname(value: api_proto_banking_funding_bankName_pb.BankName): InvestecDirectEFTMetaData;

    hasFee(): boolean;
    clearFee(): void;
    getFee(): api_proto_banking_funding_fee_pb.Fee | undefined;
    setFee(value?: api_proto_banking_funding_fee_pb.Fee): InvestecDirectEFTMetaData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InvestecDirectEFTMetaData.AsObject;
    static toObject(includeInstance: boolean, msg: InvestecDirectEFTMetaData): InvestecDirectEFTMetaData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InvestecDirectEFTMetaData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InvestecDirectEFTMetaData;
    static deserializeBinaryFromReader(message: InvestecDirectEFTMetaData, reader: jspb.BinaryReader): InvestecDirectEFTMetaData;
}

export namespace InvestecDirectEFTMetaData {
    export type AsObject = {
        externaltransactionid: string,
        externalreference: string,
        bankname: api_proto_banking_funding_bankName_pb.BankName,
        fee?: api_proto_banking_funding_fee_pb.Fee.AsObject,
    }
}
