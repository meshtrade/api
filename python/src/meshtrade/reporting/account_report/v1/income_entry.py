"""Income entry utility functions."""

from meshtrade.reporting.account_report.v1.income_entry_pb2 import IncomeNarrative


def income_narrative_pretty_string(narrative: IncomeNarrative) -> str:
    """Generate human-readable string for income narrative.

    Converts enum values to concise, display-friendly strings suitable for
    reports and user interfaces.

    Args:
        narrative: IncomeNarrative enum value

    Returns:
        Pretty-printed string representation:
        - "-" for unspecified narratives
        - Descriptive names for known types (e.g., "Yield", "Dividend")
        - Empty string for unknown values
    """
    if narrative == IncomeNarrative.INCOME_NARRATIVE_UNSPECIFIED:
        return "-"
    if narrative == IncomeNarrative.INCOME_NARRATIVE_YIELD:
        return "Yield"
    if narrative == IncomeNarrative.INCOME_NARRATIVE_DIVIDEND:
        return "Dividend"
    if narrative == IncomeNarrative.INCOME_NARRATIVE_INTEREST:
        return "Interest"
    if narrative == IncomeNarrative.INCOME_NARRATIVE_PRINCIPAL:
        return "Principal"
    if narrative == IncomeNarrative.INCOME_NARRATIVE_DISTRIBUTION:
        return "Distribution"
    if narrative == IncomeNarrative.INCOME_NARRATIVE_PROFIT_DISTRIBUTION:
        return "Profit Distribution"
    return ""
