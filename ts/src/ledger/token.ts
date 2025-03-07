import {
  newTextExactCriterion,
  newUint32ExactCriterion,
} from "../search";
import { Criterion } from "../search/criterion_pb";
import { Network } from "./network_pb";
import { Token } from "./token_pb";

export function criteriaFromToken(token?: Token): Criterion[] {
  return [
    newTextExactCriterion("token.code", token?.getCode() ?? ""),
    newTextExactCriterion("token.issuer", token?.getIssuer() ?? ""),
    newUint32ExactCriterion(
      "token.network",
      token?.getNetwork() ?? Network.UNDEFINED_NETWORK,
    ),
  ];
}

export function tokensAreEqual(t?: Token, t2?: Token): boolean {
  return (
    (t?.getCode() ?? "") === (t2?.getCode() ?? "") &&
    (t?.getIssuer() ?? "") === (t2?.getIssuer() ?? "") &&
    (t?.getNetwork() ?? Network.UNDEFINED_NETWORK) ===
    (t2?.getNetwork() ?? Network.UNDEFINED_NETWORK)
  );
}

export function tokenIsUndefined(t?: Token): boolean {
  if (!t) {
    return true;
  }
  return (
    (t.getCode() === "-" || t.getCode() === "") &&
    (t.getIssuer() === "-" || t.getIssuer() === "") &&
    (t.getNetwork() === Network.NULL_NETWORK ||
      t.getNetwork() === Network.UNDEFINED_NETWORK)
  );
}

export function tokenToFilter(t?: Token): Criterion[] {
  return [
    newTextExactCriterion("token.code", t?.getCode() ?? ""),
    newTextExactCriterion("token.issuer", t?.getIssuer() ?? ""),
    newUint32ExactCriterion(
      "token.network",
      t?.getNetwork() ?? Network.UNDEFINED_NETWORK,
    ),
  ];
}

export function tokenToString(t?: Token): string {
  return `${t?.getCode() ?? "-"} by ${t?.getIssuer() ?? "-"} on ${t?.getNetwork() ?? Network.UNDEFINED_NETWORK}`;
}