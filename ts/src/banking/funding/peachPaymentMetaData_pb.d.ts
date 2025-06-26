// package: api.banking.funding
// file: api/proto/banking/funding/peachPaymentMetaData.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as api_proto_banking_funding_bankName_pb from "../../banking/funding/bankName_pb";
import * as api_proto_banking_funding_fee_pb from "../../banking/funding/fee_pb";
import * as api_proto_banking_funding_paymentType_pb from "../../banking/funding/paymentType_pb";

export class PeachPaymentMetaData extends jspb.Message { 
    getExternaltransactionid(): string;
    setExternaltransactionid(value: string): PeachPaymentMetaData;
    getExternalreference(): string;
    setExternalreference(value: string): PeachPaymentMetaData;
    getBankname(): api_proto_banking_funding_bankName_pb.BankName;
    setBankname(value: api_proto_banking_funding_bankName_pb.BankName): PeachPaymentMetaData;
    getPeachpaymentmethod(): api_proto_banking_funding_paymentType_pb.PeachPaymentMethod;
    setPeachpaymentmethod(value: api_proto_banking_funding_paymentType_pb.PeachPaymentMethod): PeachPaymentMetaData;
    getCheckoutid(): string;
    setCheckoutid(value: string): PeachPaymentMetaData;

    hasFee(): boolean;
    clearFee(): void;
    getFee(): api_proto_banking_funding_fee_pb.Fee | undefined;
    setFee(value?: api_proto_banking_funding_fee_pb.Fee): PeachPaymentMetaData;
    getCustomername(): string;
    setCustomername(value: string): PeachPaymentMetaData;
    getAccountholder(): string;
    setAccountholder(value: string): PeachPaymentMetaData;
    getPaymenttype(): api_proto_banking_funding_paymentType_pb.PaymentType;
    setPaymenttype(value: api_proto_banking_funding_paymentType_pb.PaymentType): PeachPaymentMetaData;
    getUserspecifiedaccount(): string;
    setUserspecifiedaccount(value: string): PeachPaymentMetaData;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PeachPaymentMetaData.AsObject;
    static toObject(includeInstance: boolean, msg: PeachPaymentMetaData): PeachPaymentMetaData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PeachPaymentMetaData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PeachPaymentMetaData;
    static deserializeBinaryFromReader(message: PeachPaymentMetaData, reader: jspb.BinaryReader): PeachPaymentMetaData;
}

export namespace PeachPaymentMetaData {
    export type AsObject = {
        externaltransactionid: string,
        externalreference: string,
        bankname: api_proto_banking_funding_bankName_pb.BankName,
        peachpaymentmethod: api_proto_banking_funding_paymentType_pb.PeachPaymentMethod,
        checkoutid: string,
        fee?: api_proto_banking_funding_fee_pb.Fee.AsObject,
        customername: string,
        accountholder: string,
        paymenttype: api_proto_banking_funding_paymentType_pb.PaymentType,
        userspecifiedaccount: string,
    }
}
