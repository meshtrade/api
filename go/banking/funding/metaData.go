package funding

func (m *MetaData) GetExternalTransactionId() string {
	switch m.GetMetaData().(type) {
	case *MetaData_PeachPaymentMetaData:
		return m.GetPeachPaymentMetaData().GetExternalTransactionID()
	case *MetaData_PeachSettlementMetaData:
		return m.GetPeachSettlementMetaData().GetExternalTransactionID()
	case *MetaData_InvestecDirectEFTMetaData:
		return m.GetInvestecDirectEFTMetaData().GetExternalTransactionID()
	default:
		return ""
	}
}

func (m *MetaData) GetExternalReference() string {
	switch m.GetMetaData().(type) {
	case *MetaData_PeachPaymentMetaData:
		return m.GetPeachPaymentMetaData().GetExternalReference()
	case *MetaData_PeachSettlementMetaData:
		return m.GetPeachSettlementMetaData().ExternalSettlementReference
	case *MetaData_InvestecDirectEFTMetaData:
		return m.GetInvestecDirectEFTMetaData().GetExternalReference()
	default:
		return ""
	}
}

func (m *PeachPaymentMetaData) GetPaymentMethod() string {
	switch m.GetPeachPaymentMethod() {
	case PeachPaymentMethod_PEACH_PAY_BY_BANK:
		return "PAYBYBANK"

	case PeachPaymentMethod_PEACH_PAY_BY_CARD:
		return "CARD"

	default:
		return ""
	}
}
