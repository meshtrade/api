from .ledger_pb2 import Ledger

_ledger_decimal_places: dict[Ledger, int] = {
    Ledger.LEDGER_STELLAR: 7,
    Ledger.LEDGER_SA_STOCK_BROKERS: 2,
}


class UnsupportedLedgerError(Exception):
    """Exception raised for unsupported Ledger values."""

    def __init__(self, ledger: Ledger):
        self.ledger = ledger
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


def ledger_to_pretty_string(ledger: Ledger) -> str:
    """Convert the Ledger enum value to a human-readable network name.

    This method provides user-friendly names for each blockchain network/ledger type.

    Args:
        ledger: The Ledger enum value

    Returns:
        A human-readable network name string, or "Unknown" for invalid/unrecognized values

    Example:
        >>> ledger_to_pretty_string(Ledger.LEDGER_STELLAR)
        'Stellar'
        >>> ledger_to_pretty_string(Ledger.LEDGER_ETHEREUM)
        'Ethereum'
        >>> ledger_to_pretty_string(Ledger.LEDGER_UNSPECIFIED)
        'Unspecified'
    """
    if ledger == Ledger.LEDGER_STELLAR:
        return "Stellar"
    elif ledger == Ledger.LEDGER_ETHEREUM:
        return "Ethereum"
    elif ledger == Ledger.LEDGER_BITCOIN:
        return "Bitcoin"
    elif ledger == Ledger.LEDGER_LITECOIN:
        return "Litecoin"
    elif ledger == Ledger.LEDGER_XRP:
        return "XRP"
    elif ledger == Ledger.LEDGER_SA_STOCK_BROKERS:
        return "SA Stock Brokers"
    elif ledger == Ledger.LEDGER_NULL:
        return "Null"
    elif ledger == Ledger.LEDGER_UNSPECIFIED:
        return "Unspecified"
    else:
        return "Unknown"


def ledger_is_valid(ledger: Ledger) -> bool:
    """Check if ledger value is valid (within enum range).

    Args:
        ledger: The Ledger enum value to check

    Returns:
        True if the ledger is a valid enum value, False otherwise

    Example:
        >>> ledger_is_valid(Ledger.LEDGER_STELLAR)
        True
        >>> ledger_is_valid(999)  # Invalid enum value
        False
    """
    return ledger in Ledger.values()


def ledger_is_valid_and_defined(ledger: Ledger) -> bool:
    """Check if ledger is valid and not UNSPECIFIED.

    Args:
        ledger: The Ledger enum value to check

    Returns:
        True if the ledger is valid and not LEDGER_UNSPECIFIED, False otherwise

    Example:
        >>> ledger_is_valid_and_defined(Ledger.LEDGER_STELLAR)
        True
        >>> ledger_is_valid_and_defined(Ledger.LEDGER_UNSPECIFIED)
        False
    """
    return ledger_is_valid(ledger) and ledger != Ledger.LEDGER_UNSPECIFIED
