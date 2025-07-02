package funding

import (
	apiLedger "github.com/meshtrade/api/go/ledger"
	"github.com/shopspring/decimal"
)

func NewZeroFee() *Fee {
	return &Fee{
		FeeIncVat: apiLedger.NewUndefinedToken().NewAmountOf(decimal.NewFromFloat(0)),
		FeeExlVat: apiLedger.NewUndefinedToken().NewAmountOf(decimal.NewFromFloat(0)),
		VatAmount: apiLedger.NewUndefinedToken().NewAmountOf(decimal.NewFromFloat(0)),
	}
}
