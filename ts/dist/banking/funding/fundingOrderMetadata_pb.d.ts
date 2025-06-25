/* eslint-disable */
// @ts-nocheck
// package: api.banking.funding
// file: api/proto/banking/funding/fundingOrderMetadata.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_banking_funding_investecDirectEFTMetadata_pb from "../../banking/funding/investecDirectEFTMetadata_pb";
import * as api_proto_banking_funding_directEFTMetaData_pb from "../../banking/funding/directEFTMetaData_pb";
import * as api_proto_banking_funding_peachPaymentMetaData_pb from "../../banking/funding/peachPaymentMetaData_pb";
import * as api_proto_banking_funding_peachSettlementMetadata_pb from "../../banking/funding/peachSettlementMetadata_pb";

export class MetaData extends jspb.Message { 

    hasPeachpaymentmetadata(): boolean;
    clearPeachpaymentmetadata(): void;
    getPeachpaymentmetadata(): api_proto_banking_funding_peachPaymentMetaData_pb.PeachPaymentMetaData | undefined;
    setPeachpaymentmetadata(value?: api_proto_banking_funding_peachPaymentMetaData_pb.PeachPaymentMetaData): MetaData;

    hasPeachsettlementmetadata(): boolean;
    clearPeachsettlementmetadata(): void;
    getPeachsettlementmetadata(): api_proto_banking_funding_peachSettlementMetadata_pb.PeachSettlementMetaData | undefined;
    setPeachsettlementmetadata(value?: api_proto_banking_funding_peachSettlementMetadata_pb.PeachSettlementMetaData): MetaData;

    hasInvestecdirecteftmetadata(): boolean;
    clearInvestecdirecteftmetadata(): void;
    getInvestecdirecteftmetadata(): api_proto_banking_funding_investecDirectEFTMetadata_pb.InvestecDirectEFTMetaData | undefined;
    setInvestecdirecteftmetadata(value?: api_proto_banking_funding_investecDirectEFTMetadata_pb.InvestecDirectEFTMetaData): MetaData;

    hasDirecteftmetadata(): boolean;
    clearDirecteftmetadata(): void;
    getDirecteftmetadata(): api_proto_banking_funding_directEFTMetaData_pb.DirectEFTMetaData | undefined;
    setDirecteftmetadata(value?: api_proto_banking_funding_directEFTMetaData_pb.DirectEFTMetaData): MetaData;

    getMetadataCase(): MetaData.MetadataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MetaData.AsObject;
    static toObject(includeInstance: boolean, msg: MetaData): MetaData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MetaData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MetaData;
    static deserializeBinaryFromReader(message: MetaData, reader: jspb.BinaryReader): MetaData;
}

export namespace MetaData {
    export type AsObject = {
        peachpaymentmetadata?: api_proto_banking_funding_peachPaymentMetaData_pb.PeachPaymentMetaData.AsObject,
        peachsettlementmetadata?: api_proto_banking_funding_peachSettlementMetadata_pb.PeachSettlementMetaData.AsObject,
        investecdirecteftmetadata?: api_proto_banking_funding_investecDirectEFTMetadata_pb.InvestecDirectEFTMetaData.AsObject,
        directeftmetadata?: api_proto_banking_funding_directEFTMetaData_pb.DirectEFTMetaData.AsObject,
    }

    export enum MetadataCase {
        METADATA_NOT_SET = 0,
        PEACHPAYMENTMETADATA = 1,
        PEACHSETTLEMENTMETADATA = 2,
        INVESTECDIRECTEFTMETADATA = 3,
        DIRECTEFTMETADATA = 4,
    }

}
