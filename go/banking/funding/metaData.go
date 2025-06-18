package funding

func (m *FundingOrderMetaData) GetExternalReference() string {
	switch m.GetMetaData().(type) {
	case *FundingOrderMetaData_PeachPayment:
		return m.GetPeachPayment().GetExternalReference()
	case *FundingOrderMetaData_PeachSettlement:
		return m.GetPeachSettlement().GetExternalReference()
	case *FundingOrderMetaData_InvestecDirectEFT:
		return m.GetInvestecDirectEFT().GetExternalReference()
	default:
		return ""
	}
}
