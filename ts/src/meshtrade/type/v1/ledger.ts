import { Ledger } from './ledger_pb';

// Get all Ledgers as enum values
export const allLedgers: Ledger[] = Object.values(Ledger).filter(
  (value) => typeof value === 'number'
) as Ledger[];

// Define explicit mappings between Ledger enums and custom string representations
const ledgerToStringMapping: {
  [key in Ledger]: string;
} = {
  [Ledger.LEDGER_UNSPECIFIED]: '-',
  [Ledger.LEDGER_STELLAR]: 'Stellar',
  [Ledger.LEDGER_BITCOIN]: 'Bitcoin',
  [Ledger.LEDGER_LITECOIN]: 'Litecoin',
  [Ledger.LEDGER_ETHEREUM]: 'Ethereum',
  [Ledger.LEDGER_XRP]: 'Ripple',
  [Ledger.LEDGER_SA_STOCK_BROKERS]: 'SA Stock Brokers',
  [Ledger.LEDGER_NULL]: 'NULL',
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
  [Ledger.LEDGER_UNSPECIFIED]: 2,
  [Ledger.LEDGER_STELLAR]: 7,
  [Ledger.LEDGER_BITCOIN]: 8,
  [Ledger.LEDGER_LITECOIN]: 7,
  [Ledger.LEDGER_ETHEREUM]: 7,
  [Ledger.LEDGER_XRP]: 7,
  [Ledger.LEDGER_SA_STOCK_BROKERS]: 2,
  [Ledger.LEDGER_NULL]: 2,
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
  [Ledger.LEDGER_UNSPECIFIED]: 'LEDGER_UNSPECIFIED',
  [Ledger.LEDGER_STELLAR]: 'LEDGER_STELLAR',
  [Ledger.LEDGER_BITCOIN]: 'LEDGER_BITCOIN',
  [Ledger.LEDGER_LITECOIN]: 'LEDGER_LITECOIN',
  [Ledger.LEDGER_ETHEREUM]: 'LEDGER_ETHEREUM',
  [Ledger.LEDGER_XRP]: 'LEDGER_XRP',
  [Ledger.LEDGER_SA_STOCK_BROKERS]: 'LEDGER_SA_STOCK_BROKERS',
  [Ledger.LEDGER_NULL]: 'LEDGER_NULL',
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
