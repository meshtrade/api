"""Unit tests for income entry utility functions."""

from meshtrade.reporting.account_report.v1.income_entry import income_narrative_pretty_string
from meshtrade.reporting.account_report.v1.income_entry_pb2 import IncomeNarrative


def test_income_narrative_pretty_string_unspecified():
    """Test pretty string for UNSPECIFIED narrative."""
    result = income_narrative_pretty_string(IncomeNarrative.INCOME_NARRATIVE_UNSPECIFIED)
    assert result == "UNSPECIFIED"


def test_income_narrative_pretty_string_known_values():
    """Test pretty string for known narrative values."""
    # Test that it returns the enum name for known values
    result = income_narrative_pretty_string(IncomeNarrative.INCOME_NARRATIVE_DIVIDEND)
    assert result == "INCOME_NARRATIVE_DIVIDEND"

    result = income_narrative_pretty_string(IncomeNarrative.INCOME_NARRATIVE_INTEREST)
    assert result == "INCOME_NARRATIVE_INTEREST"

    result = income_narrative_pretty_string(IncomeNarrative.INCOME_NARRATIVE_DISTRIBUTION)
    assert result == "INCOME_NARRATIVE_DISTRIBUTION"


def test_income_narrative_pretty_string_all_values():
    """Test pretty string for all defined narrative values."""
    narratives = [
        IncomeNarrative.INCOME_NARRATIVE_UNSPECIFIED,
        IncomeNarrative.INCOME_NARRATIVE_DIVIDEND,
        IncomeNarrative.INCOME_NARRATIVE_INTEREST,
        IncomeNarrative.INCOME_NARRATIVE_DISTRIBUTION,
    ]

    for narrative in narratives:
        result = income_narrative_pretty_string(narrative)
        assert isinstance(result, str)
        assert len(result) > 0
        # Either "UNSPECIFIED" or starts with "INCOME_NARRATIVE_"
        assert result == "UNSPECIFIED" or result.startswith("INCOME_NARRATIVE_")
