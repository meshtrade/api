package funding

func (l StandardPeachAccountLabel) ToLedgerAccountLabel() string {
	switch l {
	case StandardPeachAccountLabel_ACCOUNT_LABEL_UNSPECIFIED:
		return ""
	case StandardPeachAccountLabel_PEACH_FEE_ACCOUNT_STANDARD_LABEL:
		return "Peach Fee"
	case StandardPeachAccountLabel_PEACH_FLOAT_ACCOUNT_STANDARD_LABEL:
		return "Peach Float"
	case StandardPeachAccountLabel_PEACH_SETTLEMENT_ACCOUNT_STANDARD_LABEL:
		return "Peach Settlement"
	}
	return ""
}
