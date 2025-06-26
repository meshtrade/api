/* eslint-disable */
// @ts-nocheck
// package: api.banking.funding
// file: api/proto/banking/funding/directEFTMetaData.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_banking_funding_bankName_pb from "../../banking/funding/bankName_pb";
import * as api_proto_banking_funding_fee_pb from "../../banking/funding/fee_pb";

export class DirectEFTMetaData extends jspb.Message { 
    getExternalreference(): string;
    setExternalreference(value: string): DirectEFTMetaData;
    getBankname(): api_proto_banking_funding_bankName_pb.BankName;
    setBankname(value: api_proto_banking_funding_bankName_pb.BankName): DirectEFTMetaData;
    getBankreference(): string;
    setBankreference(value: string): DirectEFTMetaData;

    hasFee(): boolean;
    clearFee(): void;
    getFee(): api_proto_banking_funding_fee_pb.Fee | undefined;
    setFee(value?: api_proto_banking_funding_fee_pb.Fee): DirectEFTMetaData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DirectEFTMetaData.AsObject;
    static toObject(includeInstance: boolean, msg: DirectEFTMetaData): DirectEFTMetaData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DirectEFTMetaData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DirectEFTMetaData;
    static deserializeBinaryFromReader(message: DirectEFTMetaData, reader: jspb.BinaryReader): DirectEFTMetaData;
}

export namespace DirectEFTMetaData {
    export type AsObject = {
        externalreference: string,
        bankname: api_proto_banking_funding_bankName_pb.BankName,
        bankreference: string,
        fee?: api_proto_banking_funding_fee_pb.Fee.AsObject,
    }
}
