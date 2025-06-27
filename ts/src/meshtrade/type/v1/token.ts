import { Ledger } from './ledger_pb';
import { Token } from './token_pb';

export function tokensAreEqual(t?: Token, t2?: Token): boolean {
  return (
    (t?.getCode() ?? '') === (t2?.getCode() ?? '') &&
    (t?.getIssuer() ?? '') === (t2?.getIssuer() ?? '') &&
    (t?.getLedger() ?? Ledger.LEDGER_UNSPECIFIED) ===
      (t2?.getLedger() ?? Ledger.LEDGER_UNSPECIFIED)
  );
}

export function tokenIsUndefined(t?: Token): boolean {
  if (!t) {
    return true;
  }
  return (
    (t.getCode() === '-' || t.getCode() === '') &&
    (t.getIssuer() === '-' || t.getIssuer() === '') &&
    // NULL is not unspecified
    t.getLedger() === Ledger.LEDGER_UNSPECIFIED
  );
}

export function tokenToString(t?: Token): string {
  return `${t?.getCode() ?? '-'} by ${t?.getIssuer() ?? '-'} on ${t?.getLedger() ?? Ledger.LEDGER_UNSPECIFIED}`;
}
