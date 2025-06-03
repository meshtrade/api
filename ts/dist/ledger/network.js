/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkToBEString = exports.getNetworkNoDecimalPlaces = exports.stringToNetwork = exports.networkToString = exports.allNetworks = void 0;
const network_pb_1 = require("./network_pb");
// Get all Networks as enum values
exports.allNetworks = Object.values(network_pb_1.Network).filter((value) => typeof value === "number");
// Define explicit mappings between Network enums and custom string representations
const networkToStringMapping = {
    [network_pb_1.Network.UNDEFINED_NETWORK]: "-",
    [network_pb_1.Network.STELLAR_NETWORK]: "Stellar",
    [network_pb_1.Network.BITCOIN_NETWORK]: "Bitcoin",
    [network_pb_1.Network.LITECOIN_NETWORK]: "Litecoin",
    [network_pb_1.Network.ETHEREUM_NETWORK]: "Ethereum",
    [network_pb_1.Network.RIPPLE_NETWORK]: "Ripple",
    [network_pb_1.Network.SA_STOCK_BROKERS_NETWORK]: "SA Stock Brokers",
    [network_pb_1.Network.NULL_NETWORK]: "NULL",
};
// Reverse mapping from string to Network enum
const stringToNetworkMapping = {};
for (const [key, value] of Object.entries(networkToStringMapping)) {
    stringToNetworkMapping[value] = Number(key);
}
class UnsupportedNetworkError extends Error {
    constructor(Network) {
        const message = `Unsupported Network: ${Network}`;
        super(message);
        this.Network = Network;
    }
}
/**
 * Converts a Network enum instance to a custom string representation.
 * @param {Network} Network - The Network to convert.
 * @returns {string} The custom string representation of the Network.
 */
function networkToString(Network) {
    if (Network in networkToStringMapping) {
        return networkToStringMapping[Network];
    }
    else {
        throw new UnsupportedNetworkError(Network);
    }
}
exports.networkToString = networkToString;
class UnsupportedNetworkStringError extends Error {
    constructor(NetworkStr) {
        const message = `Unsupported Network string: ${NetworkStr}`;
        super(message);
        this.NetworkStr = NetworkStr;
    }
}
/**
 * Converts a custom string representation to a Network enum instance.
 * @param {string} NetworkStr - The custom string representation of the Network.
 * @returns {Network} The corresponding Network enum instance.
 */
function stringToNetwork(NetworkStr) {
    if (NetworkStr in stringToNetworkMapping) {
        return stringToNetworkMapping[NetworkStr];
    }
    else {
        throw new UnsupportedNetworkStringError(NetworkStr);
    }
}
exports.stringToNetwork = stringToNetwork;
// Define a mapping from Network to the number of decimal places
const networkDecimalPlaces = {
    [network_pb_1.Network.UNDEFINED_NETWORK]: 2,
    [network_pb_1.Network.STELLAR_NETWORK]: 7,
    [network_pb_1.Network.BITCOIN_NETWORK]: 8,
    [network_pb_1.Network.LITECOIN_NETWORK]: 7,
    [network_pb_1.Network.ETHEREUM_NETWORK]: 7,
    [network_pb_1.Network.RIPPLE_NETWORK]: 7,
    [network_pb_1.Network.SA_STOCK_BROKERS_NETWORK]: 2,
    [network_pb_1.Network.NULL_NETWORK]: 2,
};
/**
 * Creates a new Amount object using a BigNumber and a Token.
 *
 * @param {Network} network - The network for which to get decimal places.
 * @returns {number} Returns the number of decimal places supported on network.
 */
function getNetworkNoDecimalPlaces(network) {
    if (network in networkDecimalPlaces) {
        return networkDecimalPlaces[network];
    }
    else {
        throw new UnsupportedNetworkError(network);
    }
}
exports.getNetworkNoDecimalPlaces = getNetworkNoDecimalPlaces;
// Define explicit mappings between Network enums backend string representations
const networkToBEStringMapping = {
    [network_pb_1.Network.UNDEFINED_NETWORK]: "UNDEFINED_NETWORK",
    [network_pb_1.Network.STELLAR_NETWORK]: "STELLAR_NETWORK",
    [network_pb_1.Network.BITCOIN_NETWORK]: "BITCOIN_NETWORK",
    [network_pb_1.Network.LITECOIN_NETWORK]: "LITECOIN_NETWORK",
    [network_pb_1.Network.ETHEREUM_NETWORK]: "ETHEREUM_NETWORK",
    [network_pb_1.Network.RIPPLE_NETWORK]: "RIPPLE_NETWORK",
    [network_pb_1.Network.SA_STOCK_BROKERS_NETWORK]: "SA_STOCK_BROKERS_NETWORK",
    [network_pb_1.Network.NULL_NETWORK]: "NULL_NETWORK",
};
/**
 * Converts a Network enum instance to a BE string representation.
 * @param {Network} Network - The Network to convert.
 * @returns {string} The custom string representation of the Network.
 */
function networkToBEString(Network) {
    if (Network in networkToBEStringMapping) {
        return networkToBEStringMapping[Network];
    }
    else {
        throw new UnsupportedNetworkError(Network);
    }
}
exports.networkToBEString = networkToBEString;
