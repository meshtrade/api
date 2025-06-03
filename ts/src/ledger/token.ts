import { newTextExactCriterion, newUint32ExactCriterion } from "../search";
import { Criterion } from "../search/criterion_pb";
import { Network } from "./network_pb";
import { Token } from "./token_pb";

export function criteriaFromToken(token?: Token): Criterion[] {
  return [
    newTextExactCriterion("token.code", token?.code ?? ""),
    newTextExactCriterion("token.issuer", token?.issuer ?? ""),
    newUint32ExactCriterion(
      "token.network",
      token?.network ?? Network.UNDEFINED_NETWORK,
    ),
  ];
}

export function tokensAreEqual(t?: Token, t2?: Token): boolean {
  return (
    (t?.code ?? "") === (t2?.code ?? "") &&
    (t?.issuer ?? "") === (t2?.issuer ?? "") &&
    (t?.network ?? Network.UNDEFINED_NETWORK) ===
    (t2?.network ?? Network.UNDEFINED_NETWORK)
  );
}

export function tokenIsUndefined(t?: Token): boolean {
  if (!t) {
    return true;
  }
  return (
    (t.code === "-" || t.code === "") &&
    (t.issuer === "-" || t.issuer === "") &&
    (t.network === Network.NULL_NETWORK ||
      t.network === Network.UNDEFINED_NETWORK)
  );
}

export function tokenToFilter(t?: Token): Criterion[] {
  return [
    newTextExactCriterion("token.code", t?.code ?? ""),
    newTextExactCriterion("token.issuer", t?.issuer ?? ""),
    newUint32ExactCriterion(
      "token.network",
      t?.network ?? Network.UNDEFINED_NETWORK,
    ),
  ];
}

export function tokenToString(t?: Token): string {
  return `${t?.code ?? "-"} by ${t?.issuer ?? "-"} on ${t?.network ?? Network.UNDEFINED_NETWORK}`;
}
