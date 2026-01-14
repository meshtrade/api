import { Ledger } from "./ledger_pb";

// Get all Ledgers as enum values
export const allLedgers: Ledger[] = Object.values(Ledger).filter(
  (value) => typeof value === "number"
) as Ledger[];

// Define explicit mappings between Ledger enums and custom string representations
const ledgerToStringMapping: {
  [key in Ledger]: string;
} = {
  [Ledger.UNSPECIFIED]: "-",
  [Ledger.STELLAR]: "Stellar",
  [Ledger.BITCOIN]: "Bitcoin",
  [Ledger.LITECOIN]: "Litecoin",
  [Ledger.ETHEREUM]: "Ethereum",
  [Ledger.XRP]: "Ripple",
  [Ledger.SA_STOCK_BROKERS]: "SA Stock Brokers",
  [Ledger.SOLANA]: "Solana",
  [Ledger.NULL]: "NULL",
};

// Reverse mapping from string to Ledger enum
const stringToLedgerMapping: Record<string, Ledger> = {};
for (const [key, value] of Object.entries(ledgerToStringMapping)) {
  stringToLedgerMapping[value] = Number(key);
}

class UnsupportedLedgerError extends Error {
  Ledger: Ledger;

  constructor(Ledger: Ledger) {
    const message = `Unsupported Ledger: ${Ledger}`;
    super(message);
    this.Ledger = Ledger;
  }
}

/**
 * Converts a Ledger enum instance to a custom string representation.
 * @param {Ledger} Ledger - The Ledger to convert.
 * @returns {string} The custom string representation of the Ledger.
 */
export function ledgerToString(Ledger: Ledger): string {
  if (Ledger in ledgerToStringMapping) {
    return ledgerToStringMapping[Ledger];
  } else {
    throw new UnsupportedLedgerError(Ledger);
  }
}

class UnsupportedLedgerStringError extends Error {
  LedgerStr: string;

  constructor(LedgerStr: string) {
    const message = `Unsupported Ledger string: ${LedgerStr}`;
    super(message);
    this.LedgerStr = LedgerStr;
  }
}

/**
 * Converts a custom string representation to a Ledger enum instance.
 * @param {string} LedgerStr - The custom string representation of the Ledger.
 * @returns {Ledger} The corresponding Ledger enum instance.
 */
export function stringToLedger(LedgerStr: string): Ledger {
  if (LedgerStr in stringToLedgerMapping) {
    return stringToLedgerMapping[LedgerStr];
  } else {
    throw new UnsupportedLedgerStringError(LedgerStr);
  }
}

// Define a mapping from Ledger to the number of decimal places
const ledgerDecimalPlaces: {
  [key in Ledger]: number;
} = {
  [Ledger.UNSPECIFIED]: 2,
  [Ledger.STELLAR]: 7,
  [Ledger.BITCOIN]: 8,
  [Ledger.LITECOIN]: 7,
  [Ledger.ETHEREUM]: 7,
  [Ledger.XRP]: 7,
  [Ledger.SA_STOCK_BROKERS]: 2,
  [Ledger.SOLANA]: 9,
  [Ledger.NULL]: 2,
};

/**
 * Creates a new Amount object using a BigNumber and a Token.
 *
 * @param {Ledger} ledger - The ledger for which to get decimal places.
 * @returns {number} Returns the number of decimal places supported on ledger.
 */
export function getLedgerNoDecimalPlaces(ledger: Ledger): number {
  if (ledger in ledgerDecimalPlaces) {
    return ledgerDecimalPlaces[ledger];
  } else {
    throw new UnsupportedLedgerError(ledger);
  }
}

// Define explicit mappings between Ledger enums backend string representations
const ledgerToBEStringMapping: {
  [key in Ledger]: string;
} = {
  [Ledger.UNSPECIFIED]: "LEDGER_UNSPECIFIED",
  [Ledger.STELLAR]: "LEDGER_STELLAR",
  [Ledger.BITCOIN]: "LEDGER_BITCOIN",
  [Ledger.LITECOIN]: "LEDGER_LITECOIN",
  [Ledger.ETHEREUM]: "LEDGER_ETHEREUM",
  [Ledger.XRP]: "LEDGER_XRP",
  [Ledger.SA_STOCK_BROKERS]: "LEDGER_SA_STOCK_BROKERS",
  [Ledger.SOLANA]: "LEDGER_SOLANA",
  [Ledger.NULL]: "LEDGER_NULL",
};

/**
 * Converts a Ledger enum instance to a BE string representation.
 * @param {Ledger} Ledger - The Ledger to convert.
 * @returns {string} The custom string representation of the Ledger.
 */
export function ledgerToBEString(Ledger: Ledger): string {
  if (Ledger in ledgerToBEStringMapping) {
    return ledgerToBEStringMapping[Ledger];
  } else {
    throw new UnsupportedLedgerError(Ledger);
  }
}
