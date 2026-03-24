import { Ledger } from "./ledger_pb";
import { Token } from "./token_pb";

/**
 * The reserved issuer value for assets that are native to their ledger's protocol
 * layer. Each ledger typically has one native asset (e.g., ETH on Ethereum, SOL on
 * Solana, XLM on Stellar, SUI on Sui) — a base-layer token which has no issuing
 * contract or account. For all other assets (e.g., ERC-20 tokens, Stellar credit
 * assets), the issuer field should contain the unique identifier of the issuing
 * entity, such as a smart contract address or issuance account public key.
 */
export const NativeAssetIssuer = "__LEDGER__";

export function tokensAreEqual(t?: Token, t2?: Token): boolean {
  return (
    (t?.code ?? "") === (t2?.code ?? "") &&
    (t?.issuer ?? "") === (t2?.issuer ?? "") &&
    (t?.ledger ?? Ledger.UNSPECIFIED) === (t2?.ledger ?? Ledger.UNSPECIFIED)
  );
}

export function tokenIsUndefined(t?: Token): boolean {
  if (!t) {
    return true;
  }
  return (
    (t.code === "-" || t.code === "") &&
    (t.issuer === "-" || t.issuer === "") &&
    // NULL is not unspecified
    t.ledger === Ledger.UNSPECIFIED
  );
}

export function tokenToString(t?: Token): string {
  return `${t?.code ?? "-"} by ${t?.issuer ?? "-"} on ${t?.ledger ?? Ledger.UNSPECIFIED}`;
}
