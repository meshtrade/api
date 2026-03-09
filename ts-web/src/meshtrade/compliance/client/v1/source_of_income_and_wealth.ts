import { SourceOfIncomeAndWealth } from "./source_of_income_and_wealth_pb";

// Get all source of income and wealth values as enum values
export const allSourceOfIncomeAndWealths: SourceOfIncomeAndWealth[] =
  Object.values(SourceOfIncomeAndWealth).filter(
    (value) => typeof value === "number"
  ) as SourceOfIncomeAndWealth[];

// Define explicit mappings between SourceOfIncomeAndWealth enums and custom string representations
const sourceOfIncomeAndWealthToStringMapping: {
  [key in SourceOfIncomeAndWealth]: string;
} = {
  [SourceOfIncomeAndWealth.UNSPECIFIED]: "Unspecified",
  [SourceOfIncomeAndWealth.ALLOWANCES]: "Allowances",
  [SourceOfIncomeAndWealth.BURSARY]: "Bursary",
  [SourceOfIncomeAndWealth.COURT_ORDER]: "Court Order",
  [SourceOfIncomeAndWealth.LOAN_FINANCIAL_INSTITUTION]:
    "Loan (Financial Institution)",
  [SourceOfIncomeAndWealth.LOAN_OTHER]: "Loan (Other)",
  [SourceOfIncomeAndWealth.MAINTENANCE]: "Maintenance",
  [SourceOfIncomeAndWealth.MATURING_INVESTMENTS]: "Maturing Investments",
  [SourceOfIncomeAndWealth.PENSION]: "Pension",
  [SourceOfIncomeAndWealth.RENTAL_INCOME]: "Rental Income",
  [SourceOfIncomeAndWealth.COMPANY_PROFITS]: "Company Profits",
  [SourceOfIncomeAndWealth.COMPANY_SALE]: "Company Sale",
  [SourceOfIncomeAndWealth.DECEASED_ESTATE]: "Deceased Estate",
  [SourceOfIncomeAndWealth.DIVORCE_SETTLEMENT]: "Divorce Settlement",
  [SourceOfIncomeAndWealth.GIFT_OR_DONATION]: "Gift or Donation",
  [SourceOfIncomeAndWealth.INCOME_FROM_EMPLOYMENT]: "Income from Employment",
  [SourceOfIncomeAndWealth.INCOME_FROM_PREVIOUS_EMPLOYMENT]:
    "Income from Previous Employment",
  [SourceOfIncomeAndWealth.INHERITANCE]: "Inheritance",
  [SourceOfIncomeAndWealth.LOTTERY_WINNINGS_OR_GAMBLING]:
    "Lottery Winnings or Gambling",
  [SourceOfIncomeAndWealth.SALE_OF_ASSET]: "Sale of Asset",
  [SourceOfIncomeAndWealth.SALE_OF_SHARES]: "Sale of Shares",
  [SourceOfIncomeAndWealth.SAVINGS_INVESTMENT_OR_DIVIDEND]:
    "Savings, Investment or Dividend",
  [SourceOfIncomeAndWealth.TRUST_DISTRIBUTIONS]: "Trust Distributions",
};

// Reverse mapping from string to SourceOfIncomeAndWealth enum
const stringToSourceOfIncomeAndWealthMapping: Record<
  string,
  SourceOfIncomeAndWealth
> = {};
for (const [key, value] of Object.entries(
  sourceOfIncomeAndWealthToStringMapping
)) {
  stringToSourceOfIncomeAndWealthMapping[value] = Number(key);
}

class UnsupportedSourceOfIncomeAndWealthError extends Error {
  sourceOfIncomeAndWealth: SourceOfIncomeAndWealth;

  constructor(sourceOfIncomeAndWealth: SourceOfIncomeAndWealth) {
    const message = `Unsupported SourceOfIncomeAndWealth: ${sourceOfIncomeAndWealth}`;
    super(message);
    this.sourceOfIncomeAndWealth = sourceOfIncomeAndWealth;
  }
}

/**
 * Converts a SourceOfIncomeAndWealth enum instance to a custom string representation.
 * @param {SourceOfIncomeAndWealth} sourceOfIncomeAndWealth - The source to convert.
 * @returns {string} The custom string representation of the source.
 */
export function sourceOfIncomeAndWealthToString(
  sourceOfIncomeAndWealth: SourceOfIncomeAndWealth
): string {
  if (sourceOfIncomeAndWealth in sourceOfIncomeAndWealthToStringMapping) {
    return sourceOfIncomeAndWealthToStringMapping[sourceOfIncomeAndWealth];
  } else {
    throw new UnsupportedSourceOfIncomeAndWealthError(sourceOfIncomeAndWealth);
  }
}

class UnsupportedSourceOfIncomeAndWealthStringError extends Error {
  sourceOfIncomeAndWealthStr: string;

  constructor(sourceOfIncomeAndWealthStr: string) {
    const message = `Unsupported source of income and wealth string: ${sourceOfIncomeAndWealthStr}`;
    super(message);
    this.sourceOfIncomeAndWealthStr = sourceOfIncomeAndWealthStr;
  }
}

/**
 * Converts a custom string representation to a SourceOfIncomeAndWealth enum instance.
 * @param {string} sourceOfIncomeAndWealthStr - The custom string representation.
 * @returns {SourceOfIncomeAndWealth} The corresponding SourceOfIncomeAndWealth enum instance.
 */
export function stringToSourceOfIncomeAndWealth(
  sourceOfIncomeAndWealthStr: string
): SourceOfIncomeAndWealth {
  if (sourceOfIncomeAndWealthStr in stringToSourceOfIncomeAndWealthMapping) {
    return stringToSourceOfIncomeAndWealthMapping[sourceOfIncomeAndWealthStr];
  } else {
    throw new UnsupportedSourceOfIncomeAndWealthStringError(
      sourceOfIncomeAndWealthStr
    );
  }
}
