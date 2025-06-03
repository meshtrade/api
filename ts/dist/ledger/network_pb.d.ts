/* eslint-disable */
// @ts-nocheck
import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv2";
/**
 * Describes the file ledger/network.proto.
 */
export declare const file_ledger_network: GenFile;
/**
 *
 * Network represents the various blockchain networks supported by Mesh.
 * NOTE: numbering NOT TO BE UPDATED to be sequential without an associated migration!!!!
 *
 * @generated from enum api.ledger.Network
 */
export declare enum Network {
    /**
     * @generated from enum value: UNDEFINED_NETWORK = 0;
     */
    UNDEFINED_NETWORK = 0,
    /**
     * @generated from enum value: STELLAR_NETWORK = 3;
     */
    STELLAR_NETWORK = 3,
    /**
     * @generated from enum value: BITCOIN_NETWORK = 5;
     */
    BITCOIN_NETWORK = 5,
    /**
     * @generated from enum value: LITECOIN_NETWORK = 7;
     */
    LITECOIN_NETWORK = 7,
    /**
     * @generated from enum value: ETHEREUM_NETWORK = 9;
     */
    ETHEREUM_NETWORK = 9,
    /**
     * @generated from enum value: RIPPLE_NETWORK = 11;
     */
    RIPPLE_NETWORK = 11,
    /**
     * @generated from enum value: SA_STOCK_BROKERS_NETWORK = 15;
     */
    SA_STOCK_BROKERS_NETWORK = 15,
    /**
     * @generated from enum value: NULL_NETWORK = 16;
     */
    NULL_NETWORK = 16
}
/**
 * Describes the enum api.ledger.Network.
 */
export declare const NetworkSchema: GenEnum<Network>;
