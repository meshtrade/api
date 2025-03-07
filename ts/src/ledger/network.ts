import { Network } from "./network_pb";

// Get all Networks as enum values
export const allNetworks: Network[] = Object.values(Network).filter(
  (value) => typeof value === "number",
) as Network[];

// Define explicit mappings between Network enums and custom string representations
const networkToStringMapping: {
  [key in Network]: string;
} = {
  [Network.UNDEFINED_NETWORK]: "-",
  [Network.STELLAR_NETWORK]: "Stellar",
  [Network.BITCOIN_NETWORK]: "Bitcoin",
  [Network.LITECOIN_NETWORK]: "Litecoin",
  [Network.ETHEREUM_NETWORK]: "Ethereum",
  [Network.RIPPLE_NETWORK]: "Ripple",
  [Network.SA_STOCK_BROKERS_NETWORK]: "SA Stock Brokers",
  [Network.NULL_NETWORK]: "NULL",
};

// Reverse mapping from string to Network enum
const stringToNetworkMapping: Record<string, Network> = {};
for (const [key, value] of Object.entries(networkToStringMapping)) {
  stringToNetworkMapping[value] = Number(key);
}

class UnsupportedNetworkError extends Error {
  Network: Network;

  constructor(Network: Network) {
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
export function networkToString(Network: Network): string {
  if (Network in networkToStringMapping) {
    return networkToStringMapping[Network];
  } else {
    throw new UnsupportedNetworkError(Network);
  }
}

class UnsupportedNetworkStringError extends Error {
  NetworkStr: string;

  constructor(NetworkStr: string) {
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
export function stringToNetwork(NetworkStr: string): Network {
  if (NetworkStr in stringToNetworkMapping) {
    return stringToNetworkMapping[NetworkStr];
  } else {
    throw new UnsupportedNetworkStringError(NetworkStr);
  }
}

// Define a mapping from Network to the number of decimal places
const networkDecimalPlaces: {
  [key in Network]: number;
} = {
  [Network.UNDEFINED_NETWORK]: 2,
  [Network.STELLAR_NETWORK]: 7,
  [Network.BITCOIN_NETWORK]: 8,
  [Network.LITECOIN_NETWORK]: 7,
  [Network.ETHEREUM_NETWORK]: 7,
  [Network.RIPPLE_NETWORK]: 7,
  [Network.SA_STOCK_BROKERS_NETWORK]: 2,
  [Network.NULL_NETWORK]: 2,
};

/**
 * Creates a new Amount object using a BigNumber and a Token.
 *
 * @param {Network} network - The network for which to get decimal places.
 * @returns {number} Returns the number of decimal places supported on network.
 */
export function getNetworkNoDecimalPlaces(network: Network): number {
  if (network in networkDecimalPlaces) {
    return networkDecimalPlaces[network];
  } else {
    throw new UnsupportedNetworkError(network);
  }
}

// Define explicit mappings between Network enums backend string representations
const networkToBEStringMapping: {
  [key in Network]: string;
} = {
  [Network.UNDEFINED_NETWORK]: "UNDEFINED_NETWORK",
  [Network.STELLAR_NETWORK]: "STELLAR_NETWORK",
  [Network.BITCOIN_NETWORK]: "BITCOIN_NETWORK",
  [Network.LITECOIN_NETWORK]: "LITECOIN_NETWORK",
  [Network.ETHEREUM_NETWORK]: "ETHEREUM_NETWORK",
  [Network.RIPPLE_NETWORK]: "RIPPLE_NETWORK",
  [Network.SA_STOCK_BROKERS_NETWORK]: "SA_STOCK_BROKERS_NETWORK",
  [Network.NULL_NETWORK]: "NULL_NETWORK",
};

/**
 * Converts a Network enum instance to a BE string representation.
 * @param {Network} Network - The Network to convert.
 * @returns {string} The custom string representation of the Network.
 */
export function networkToBEString(Network: Network): string {
  if (Network in networkToBEStringMapping) {
    return networkToBEStringMapping[Network];
  } else {
    throw new UnsupportedNetworkError(Network);
  }
}
