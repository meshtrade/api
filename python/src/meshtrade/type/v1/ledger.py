from typing import Dict

from .ledger_pb2 import Ledger

_ledger_decimal_places: Dict[Ledger, int] = {
    Ledger.LEDGER_STELLAR: 7,
    Ledger.LEDGER_SA_STOCK_BROKERS: 2,
}

class UnsupportedLedgerError(Exception):
    """Exception raised for unsupported Ledger values."""

    def __init__(self, ledger: Ledger):
        self.financial_business_day_convention = ledger
        message = f"Unsupported Ledger: {ledger}"
        super().__init__(message)


def get_ledger_no_decimal_places(ledger: Ledger) -> int:
    """
    Returns the number of decimal places supported by the given Ledger
    """
    if ledger in _ledger_decimal_places:
        return _ledger_decimal_places[ledger]
    else:
        raise UnsupportedLedgerError(ledger)
