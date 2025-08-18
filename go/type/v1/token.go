package typev1

import (
	"fmt"

	"github.com/shopspring/decimal"
)

func NewUndefinedToken() *Token {
	return &Token{
		Code:   "-",
		Issuer: "-",
		Ledger: Ledger_LEDGER_UNSPECIFIED,
	}
}

func (t *Token) NewAmountOf(value decimal.Decimal) *Amount {
	switch t.Ledger {
	case Ledger_LEDGER_STELLAR:
		return &Amount{
			Value: FromShopspringDecimal(value.Truncate(7)),
			Token: t,
		}

	default:
		return &Amount{
			Value: FromShopspringDecimal(value),
			Token: t,
		}
	}
}

func (t *Token) IsEqualTo(t2 *Token) bool {
	return t.GetCode() == t2.GetCode() &&
		t.GetIssuer() == t2.GetIssuer() &&
		t.GetLedger() == t2.GetLedger()
}

func (t *Token) IsUndefined() bool {
	return t == nil || NewUndefinedToken().IsEqualTo(t)
}

func (t *Token) PrettyString() string {
	return fmt.Sprintf("%s by %s", t.GetCode(), t.GetIssuer())
}
