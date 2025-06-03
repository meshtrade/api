/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Amount } from "../../ledger/amount_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/feeprofile/tokenisation.proto.
 */
export declare const file_instrument_feeprofile_tokenisation: GenFile;
/**
 *
 * Tokenisation configures the fees related to the tokenisation
 * processes of the Instrument.
 *
 * @generated from message api.instrument.feeprofile.Tokenisation
 */
export type Tokenisation = Message<"api.instrument.feeprofile.Tokenisation"> & {
    /**
     *
     * FirstTimeMintingAmount is the fee amount charged when
     * minting tokens of the Instrument for the first time.
     *
     * @generated from field: api.ledger.Amount firstTimeMintingAmount = 1;
     */
    firstTimeMintingAmount?: Amount;
    /**
     *
     * MintingAmount is minting fee charged per token minted.
     *
     * @generated from field: api.ledger.Amount mintingAmount = 2;
     */
    mintingAmount?: Amount;
    /**
     *
     * BurningAmount is minting fee charged per token burned.
     *
     * @generated from field: api.ledger.Amount burningAmount = 3;
     */
    burningAmount?: Amount;
};
/**
 * Describes the message api.instrument.feeprofile.Tokenisation.
 * Use `create(TokenisationSchema)` to create a new message.
 */
export declare const TokenisationSchema: GenMessage<Tokenisation>;
