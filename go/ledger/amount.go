package ledger

import "github.com/shopspring/decimal"

func (x *Amount) IsEqual(x2 *Amount) bool {
	return x.Value.Equal(x2.Value) &&
		x.Token.IsEqualTo(x2.Token)
}

func (x *Amount) IsUndefined() bool {
	return x.Token.IsUndefined()
}

func (x *Amount) SetValue(value decimal.Decimal) *Amount {
	return x.Token.NewAmountOf(value)
}
