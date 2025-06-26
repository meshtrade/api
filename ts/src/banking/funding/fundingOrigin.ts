import { FundingOrigin, FundingState } from "./funding_pb";

const fundingOriginToStringMapping: {
  [key in FundingOrigin]: string;
} = {
  [FundingOrigin.UNDEFINED_FUNDING_ORIGIN]: "-",
  [FundingOrigin.DIRECT_EFT]: "Manual EFT",
  [FundingOrigin.INVESTEC_DIRECT_EFT]: "Investec EFT",
  [FundingOrigin.PEACH_PAYMENT]: "Peach Payment",
  [FundingOrigin.PEACH_SETTLEMENT]: "Peach Settlement",
};

const fundingOriginStringToState: Record<string, FundingOrigin> = {};
for (const [key, value] of Object.entries(fundingOriginToStringMapping)) {
  fundingOriginStringToState[value] = Number(key);
}

class UnsupportedFundingOriginStringError extends Error {
  fundingOriginString: string;

  constructor(fundingOriginString: string) {
    const message = `Unsupported FundingOrigin string: ${fundingOriginString}`;
    super(message);
    this.fundingOriginString = fundingOriginString;
  }
}

export function stringToFundingOrigin(
  fundingOriginString: string,
): FundingOrigin {
  if (fundingOriginString in fundingOriginStringToState) {
    return fundingOriginStringToState[fundingOriginString];
  } else {
    throw new UnsupportedFundingOriginStringError(fundingOriginString);
  }
}

class UnsupportedFundingOriginError extends Error {
  fundingOrigin: FundingOrigin;

  constructor(fundingOrigin: FundingOrigin) {
    const message = `Unsupported FundingOrigin: ${fundingOrigin}`;
    super(message);
    this.fundingOrigin = fundingOrigin;
  }
}

export function fundingOriginToString(fundingOrigin: FundingOrigin): string {
  if (fundingOrigin in fundingOriginToStringMapping) {
    return fundingOriginToStringMapping[fundingOrigin];
  } else {
    throw new UnsupportedFundingOriginError(fundingOrigin);
  }
}
