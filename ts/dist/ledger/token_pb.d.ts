/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Network } from "./network_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file ledger/token.proto.
 */
export declare const file_ledger_token: GenFile;
/**
 *
 * Token is the unit of account for a particular asset on a specific blockchain network.
 *
 * @generated from message api.ledger.Token
 */
export type Token = Message<"api.ledger.Token"> & {
    /**
     *
     * Code is the code of the token.
     * Examples: "mZAR", "USDC" or "BTC"
     *
     * @generated from field: string code = 1;
     */
    code: string;
    /**
     *
     * Issuer is the issuing entity of the token.
     *
     * @generated from field: string issuer = 2;
     */
    issuer: string;
    /**
     *
     * Network is the he blockchain network on which the token exists.
     *
     * @generated from field: api.ledger.Network network = 3;
     */
    network: Network;
};
/**
 * Describes the message api.ledger.Token.
 * Use `create(TokenSchema)` to create a new message.
 */
export declare const TokenSchema: GenMessage<Token>;
