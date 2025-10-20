import { Ledger } from "./ledger_pb";
import { Token } from "./token_pb";

export function tokensAreEqual(t?: Token, t2?: Token): boolean {
  return (
    (t?.code ?? "") === (t2?.code ?? "") &&
    (t?.issuer ?? "") === (t2?.issuer ?? "") &&
    (t?.ledger ?? Ledger.UNSPECIFIED) ===
      (t2?.ledger ?? Ledger.UNSPECIFIED)
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
