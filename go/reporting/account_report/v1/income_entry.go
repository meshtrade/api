package account_report_v1

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
