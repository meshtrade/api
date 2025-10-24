package account_report_v1

// PrettyString returns a human-readable string representation of the IncomeNarrative enum.
// It converts enum values to concise, display-friendly strings suitable for reports and user interfaces.
// Returns "-" for unspecified narratives, descriptive names for known types, and an empty string for unknown values.
func (a IncomeNarrative) PrettyString() string {
	switch a {
	case IncomeNarrative_INCOME_NARRATIVE_UNSPECIFIED:
		return "-"
	case IncomeNarrative_INCOME_NARRATIVE_YIELD:
		return "Yield"
	case IncomeNarrative_INCOME_NARRATIVE_DIVIDEND:
		return "Dividend"
	case IncomeNarrative_INCOME_NARRATIVE_INTEREST:
		return "Interest"
	case IncomeNarrative_INCOME_NARRATIVE_PRINCIPAL:
		return "Principal"
	case IncomeNarrative_INCOME_NARRATIVE_DISTRIBUTION:
		return "Distribution"
	case IncomeNarrative_INCOME_NARRATIVE_PROFIT_DISTRIBUTION:
		return "Profit Distribution"
	default:
		return ""
	}
}
