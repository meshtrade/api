package funding

func (m *FundingOrderMetaData) GetExternalTransactionId() string {
	switch m.GetMetaData().(type) {
	case *FundingOrderMetaData_PeachPayment:
		return m.GetPeachPayment().GetExternalTransactionID()
	case *FundingOrderMetaData_PeachSettlement:
		return m.GetPeachSettlement().GetExternalTransactionID()
	case *FundingOrderMetaData_InvestecDirectEFT:
		return m.GetInvestecDirectEFT().GetExternalTransactionID()
	default:
		return ""
	}
}

func (m *FundingOrderMetaData) GetExternalReference() string {
	switch m.GetMetaData().(type) {
	case *FundingOrderMetaData_PeachPayment:
		return m.GetPeachPayment().GetExternalReference()
	case *FundingOrderMetaData_PeachSettlement:
		return m.GetPeachSettlement().ExternalSettlementReference
	case *FundingOrderMetaData_InvestecDirectEFT:
		return m.GetInvestecDirectEFT().GetExternalReference()
	default:
		return ""
	}
}

//func (m *FundingOrderMetaData) GetBankName() BankName {
//	switch m.GetMetaData().(type) {
//	case *FundingOrderMetaData_PeachPayment:
//		return m.GetPeachPayment().GetBankName()
//	case *FundingOrderMetaData_PeachSettlement:
//		return m.GetPeachSettlement().GetBankName()
//	case *FundingOrderMetaData_InvestecDirectEFT:
//		return m.GetInvestecDirectEFT().GetBankName()
//	default:
//		return nil
//	}
//}
