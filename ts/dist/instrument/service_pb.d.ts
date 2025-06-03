/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Amount } from "../ledger/amount_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/service.proto.
 */
export declare const file_instrument_service: GenFile;
/**
 *
 * MintRequest is Mint method request on the Instrument Service.
 *
 * @generated from message api.instrument.MintRequest
 */
export type MintRequest = Message<"api.instrument.MintRequest"> & {
    /**
     *
     * Amount is the amount to be minted.
     *
     * @generated from field: api.ledger.Amount amount = 1;
     */
    amount?: Amount;
    /**
     *
     * FeeAccountNumber refers to the account from which fees are paid.
     *
     * @generated from field: string feeAccountNumber = 2;
     */
    feeAccountNumber: string;
    /**
     *
     * DestinationAccountNumber refers to the account for which instrument tokens are minted.
     *
     * @generated from field: string destinationAccountNumber = 3;
     */
    destinationAccountNumber: string;
};
/**
 * Describes the message api.instrument.MintRequest.
 * Use `create(MintRequestSchema)` to create a new message.
 */
export declare const MintRequestSchema: GenMessage<MintRequest>;
/**
 *
 * MintResponse is Mint method response on the Instrument Service.
 *
 * @generated from message api.instrument.MintResponse
 */
export type MintResponse = Message<"api.instrument.MintResponse"> & {
    /**
     *
     * TransactionID refers to the mint transaction.
     *
     * @generated from field: string transactionID = 1;
     */
    transactionID: string;
};
/**
 * Describes the message api.instrument.MintResponse.
 * Use `create(MintResponseSchema)` to create a new message.
 */
export declare const MintResponseSchema: GenMessage<MintResponse>;
/**
 *
 * BurnRequest is Burn method request on the Instrument Service.
 *
 * @generated from message api.instrument.BurnRequest
 */
export type BurnRequest = Message<"api.instrument.BurnRequest"> & {
    /**
     *
     * Amount is the amount to be burned.
     *
     * @generated from field: api.ledger.Amount amount = 1;
     */
    amount?: Amount;
    /**
     *
     * FeeAccountNumber refers to the account from which fees are paid.
     *
     * @generated from field: string feeAccountNumber = 2;
     */
    feeAccountNumber: string;
    /**
     *
     * SourceAccountNumber refers to the account from which instrument tokens are burned.
     *
     * @generated from field: string sourceAccountNumber = 3;
     */
    sourceAccountNumber: string;
};
/**
 * Describes the message api.instrument.BurnRequest.
 * Use `create(BurnRequestSchema)` to create a new message.
 */
export declare const BurnRequestSchema: GenMessage<BurnRequest>;
/**
 *
 * BurnResponse is Burn method response on the Instrument Service.
 *
 * @generated from message api.instrument.BurnResponse
 */
export type BurnResponse = Message<"api.instrument.BurnResponse"> & {
    /**
     *
     * TransactionID refers to the burn transaction.
     *
     * @generated from field: string transactionID = 1;
     */
    transactionID: string;
};
/**
 * Describes the message api.instrument.BurnResponse.
 * Use `create(BurnResponseSchema)` to create a new message.
 */
export declare const BurnResponseSchema: GenMessage<BurnResponse>;
/**
 *
 * Service is the Instrument Service.
 *
 * @generated from service api.instrument.Service
 */
export declare const Service: GenService<{
    /**
     * @generated from rpc api.instrument.Service.Mint
     */
    mint: {
        methodKind: "unary";
        input: typeof MintRequestSchema;
        output: typeof MintResponseSchema;
    };
    /**
     * @generated from rpc api.instrument.Service.Burn
     */
    burn: {
        methodKind: "unary";
        input: typeof BurnRequestSchema;
        output: typeof BurnResponseSchema;
    };
}>;
