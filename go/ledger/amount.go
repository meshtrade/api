package ledger

import (
	"github.com/meshtrade/api/go/num"
	"github.com/shopspring/decimal"
)

func (x *Amount) IsEqual(x2 *Amount) bool {
	return x.GetValue().Equal(x2.GetValue()) &&
		x.GetToken().IsEqualTo(x2.GetToken())
}

func (x *Amount) IsUndefined() bool {
	return x.GetToken().IsUndefined()
}

func (x *Amount) SetValue(value decimal.Decimal) *Amount {
	return x.GetToken().NewAmountOf(value)
}

func (a *Amount) IsSameTypeAs(a2 *Amount) bool {
	return a.GetToken().IsEqualTo(a2.GetToken())
}

func (a *Amount) IsEqualTo(a2 *Amount) bool {
	return a.GetToken() == a2.GetToken() && a.GetValue().Equal(a2.GetValue())
}

func (a *Amount) ContainsFractions() bool {
	return !a.GetValue().ToShopspring().Truncate(0).Equal(a.GetValue().ToShopspring())
}

func NewUndefinedAmount(value decimal.Decimal) *Amount {
	return &Amount{
		Value: num.FromShopspringDecimal(value),
		Token: NewUndefinedToken(),
	}
}
