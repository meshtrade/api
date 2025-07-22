package typev1

import (
	"fmt"

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
		Value: FromShopspringDecimal(value),
		Token: NewUndefinedToken(),
	}
}

func (x *Amount) Sub(y *Amount) *Amount {
	// FIXME: only check code and issuer for now, there seems to be an inconsistency with persisted ledger vs amount, or something, that is causing this check to give false positive
	// See: https://meshtrade.slack.com/archives/C0393K91R26/p1752215411553709
	if x.GetToken().GetCode() != y.GetToken().GetCode() || x.GetToken().GetIssuer() != y.GetToken().GetIssuer() {
		panic(fmt.Sprintf("cannot do arithmetic on amounts of different token denominations: %s vs. %s", x.GetToken().PrettyString(), y.GetToken().PrettyString()))
	}
	return x.SetValue(x.GetValue().ToShopspring().Sub(y.GetValue().ToShopspring()))
}

func (x *Amount) Add(y *Amount) *Amount {
	// FIXME: only check code and issuer for now, there seems to be an inconsistency with persisted ledger vs amount, or something, that is causing this check to give false positive
	// See: https://meshtrade.slack.com/archives/C0393K91R26/p1752215411553709
	if x.GetToken().GetCode() != y.GetToken().GetCode() || x.GetToken().GetIssuer() != y.GetToken().GetIssuer() {
		panic(fmt.Sprintf("cannot do arithmetic on amounts of different token denominations: %s vs. %s", x.GetToken().PrettyString(), y.GetToken().PrettyString()))
	}
	return x.SetValue(x.GetValue().ToShopspring().Add(y.GetValue().ToShopspring()))
}

func (x *Amount) DecimalDiv(y decimal.Decimal) *Amount {
	return x.SetValue(x.GetValue().ToShopspring().Div(y))
}

func (x *Amount) DecimalMul(y decimal.Decimal) *Amount {
	return x.SetValue(x.GetValue().ToShopspring().Mul(y))
}

func (x *Amount) IsNegative() bool {
	return x.GetValue().ToShopspring().IsNegative()
}

func (x *Amount) IsZero() bool {
	return x.GetValue().ToShopspring().IsZero()
}
