/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'

import * as api_proto_ledger_amount_pb from '../ledger/amount_pb'; // proto import: "api/proto/ledger/amount.proto"


export class MintRequest extends jspb.Message {
  getAmount(): api_proto_ledger_amount_pb.Amount | undefined;
  setAmount(value?: api_proto_ledger_amount_pb.Amount): MintRequest;
  hasAmount(): boolean;
  clearAmount(): MintRequest;

  getFeeaccountnumber(): string;
  setFeeaccountnumber(value: string): MintRequest;

  getDestinationaccountnumber(): string;
  setDestinationaccountnumber(value: string): MintRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MintRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MintRequest): MintRequest.AsObject;
  static serializeBinaryToWriter(message: MintRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MintRequest;
  static deserializeBinaryFromReader(message: MintRequest, reader: jspb.BinaryReader): MintRequest;
}

export namespace MintRequest {
  export type AsObject = {
    amount?: api_proto_ledger_amount_pb.Amount.AsObject,
    feeaccountnumber: string,
    destinationaccountnumber: string,
  }
}

export class MintResponse extends jspb.Message {
  getTransactionid(): string;
  setTransactionid(value: string): MintResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MintResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MintResponse): MintResponse.AsObject;
  static serializeBinaryToWriter(message: MintResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MintResponse;
  static deserializeBinaryFromReader(message: MintResponse, reader: jspb.BinaryReader): MintResponse;
}

export namespace MintResponse {
  export type AsObject = {
    transactionid: string,
  }
}

export class BurnRequest extends jspb.Message {
  getAmount(): api_proto_ledger_amount_pb.Amount | undefined;
  setAmount(value?: api_proto_ledger_amount_pb.Amount): BurnRequest;
  hasAmount(): boolean;
  clearAmount(): BurnRequest;

  getFeeaccountnumber(): string;
  setFeeaccountnumber(value: string): BurnRequest;

  getSourceaccountnumber(): string;
  setSourceaccountnumber(value: string): BurnRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BurnRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BurnRequest): BurnRequest.AsObject;
  static serializeBinaryToWriter(message: BurnRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BurnRequest;
  static deserializeBinaryFromReader(message: BurnRequest, reader: jspb.BinaryReader): BurnRequest;
}

export namespace BurnRequest {
  export type AsObject = {
    amount?: api_proto_ledger_amount_pb.Amount.AsObject,
    feeaccountnumber: string,
    sourceaccountnumber: string,
  }
}

export class BurnResponse extends jspb.Message {
  getTransactionid(): string;
  setTransactionid(value: string): BurnResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BurnResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BurnResponse): BurnResponse.AsObject;
  static serializeBinaryToWriter(message: BurnResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BurnResponse;
  static deserializeBinaryFromReader(message: BurnResponse, reader: jspb.BinaryReader): BurnResponse;
}

export namespace BurnResponse {
  export type AsObject = {
    transactionid: string,
  }
}

