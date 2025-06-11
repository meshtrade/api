/* eslint-disable */
// @ts-nocheck
import { Network } from "./network_pb";
export declare const allNetworks: Network[];
/**
 * Converts a Network enum instance to a custom string representation.
 * @param {Network} Network - The Network to convert.
 * @returns {string} The custom string representation of the Network.
 */
export declare function networkToString(Network: Network): string;
/**
 * Converts a custom string representation to a Network enum instance.
 * @param {string} NetworkStr - The custom string representation of the Network.
 * @returns {Network} The corresponding Network enum instance.
 */
export declare function stringToNetwork(NetworkStr: string): Network;
/**
 * Creates a new Amount object using a BigNumber and a Token.
 *
 * @param {Network} network - The network for which to get decimal places.
 * @returns {number} Returns the number of decimal places supported on network.
 */
export declare function getNetworkNoDecimalPlaces(network: Network): number;
/**
 * Converts a Network enum instance to a BE string representation.
 * @param {Network} Network - The Network to convert.
 * @returns {string} The custom string representation of the Network.
 */
export declare function networkToBEString(Network: Network): string;
