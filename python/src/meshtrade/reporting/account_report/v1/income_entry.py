"""Income entry utility functions."""

from meshtrade.reporting.account_report.v1.income_entry_pb2 import IncomeNarrative


def income_narrative_pretty_string(narrative: IncomeNarrative) -> str:
    """Generate human-readable string for income narrative.

    Args:
        narrative: IncomeNarrative enum value

    Returns:
        Pretty-printed string representation
    """
    if narrative == IncomeNarrative.INCOME_NARRATIVE_UNSPECIFIED:
        return "UNSPECIFIED"
    return IncomeNarrative.Name(narrative)
