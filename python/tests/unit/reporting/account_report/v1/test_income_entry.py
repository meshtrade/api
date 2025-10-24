"""Unit tests for income entry utility functions."""

from meshtrade.reporting.account_report.v1.income_entry import income_narrative_pretty_string
from meshtrade.reporting.account_report.v1.income_entry_pb2 import IncomeNarrative


def test_income_narrative_pretty_string_unspecified():
    """Test pretty string for UNSPECIFIED narrative."""
    result = income_narrative_pretty_string(IncomeNarrative.INCOME_NARRATIVE_UNSPECIFIED)
    assert result == "-"


def test_income_narrative_pretty_string_known_values():
    """Test pretty string for known narrative values."""
    result = income_narrative_pretty_string(IncomeNarrative.INCOME_NARRATIVE_YIELD)
    assert result == "Yield"

    result = income_narrative_pretty_string(IncomeNarrative.INCOME_NARRATIVE_DIVIDEND)
    assert result == "Dividend"

    result = income_narrative_pretty_string(IncomeNarrative.INCOME_NARRATIVE_INTEREST)
    assert result == "Interest"

    result = income_narrative_pretty_string(IncomeNarrative.INCOME_NARRATIVE_PRINCIPAL)
    assert result == "Principal"

    result = income_narrative_pretty_string(IncomeNarrative.INCOME_NARRATIVE_DISTRIBUTION)
    assert result == "Distribution"

    result = income_narrative_pretty_string(IncomeNarrative.INCOME_NARRATIVE_PROFIT_DISTRIBUTION)
    assert result == "Profit Distribution"


def test_income_narrative_pretty_string_all_values():
    """Test pretty string for all defined narrative values."""
    narratives = [
        (IncomeNarrative.INCOME_NARRATIVE_UNSPECIFIED, "-"),
        (IncomeNarrative.INCOME_NARRATIVE_YIELD, "Yield"),
        (IncomeNarrative.INCOME_NARRATIVE_DIVIDEND, "Dividend"),
        (IncomeNarrative.INCOME_NARRATIVE_INTEREST, "Interest"),
        (IncomeNarrative.INCOME_NARRATIVE_PRINCIPAL, "Principal"),
        (IncomeNarrative.INCOME_NARRATIVE_DISTRIBUTION, "Distribution"),
        (IncomeNarrative.INCOME_NARRATIVE_PROFIT_DISTRIBUTION, "Profit Distribution"),
    ]

    for narrative, expected in narratives:
        result = income_narrative_pretty_string(narrative)
        assert isinstance(result, str)
        assert len(result) > 0
        assert result == expected


def test_income_narrative_pretty_string_unknown():
    """Test pretty string for unknown narrative value."""
    # Test with an invalid enum value (999 is not defined)
    result = income_narrative_pretty_string(IncomeNarrative(999))
    assert result == ""
