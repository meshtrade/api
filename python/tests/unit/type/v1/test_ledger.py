"""Unit tests for ledger utility functions."""

from meshtrade.type.v1.ledger import ledger_is_valid, ledger_is_valid_and_defined
from meshtrade.type.v1.ledger_pb2 import Ledger


def test_ledger_is_valid():
    """Test ledger validity check."""
    assert ledger_is_valid(Ledger.LEDGER_STELLAR) is True
    assert ledger_is_valid(Ledger.LEDGER_ETHEREUM) is True
    assert ledger_is_valid(Ledger.LEDGER_UNSPECIFIED) is True


def test_ledger_is_valid_invalid():
    """Test ledger validity check with invalid value."""
    assert ledger_is_valid(999) is False  # type: ignore


def test_ledger_is_valid_and_defined():
    """Test ledger validity and defined check."""
    assert ledger_is_valid_and_defined(Ledger.LEDGER_STELLAR) is True
    assert ledger_is_valid_and_defined(Ledger.LEDGER_ETHEREUM) is True


def test_ledger_is_valid_and_defined_unspecified():
    """Test that UNSPECIFIED is not considered defined."""
    assert ledger_is_valid_and_defined(Ledger.LEDGER_UNSPECIFIED) is False


def test_ledger_is_valid_and_defined_invalid():
    """Test with invalid ledger value."""
    assert ledger_is_valid_and_defined(999) is False  # type: ignore
