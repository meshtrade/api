package ledger

import (
	"github.com/meshtrade/api/go/num"
	"github.com/meshtrade/api/go/search"
	"github.com/shopspring/decimal"
)

func NewUndefinedToken() *Token {
	return &Token{
		Code:    "-",
		Issuer:  "-",
		Network: Network_UNDEFINED_NETWORK,
	}
}

func (t *Token) NewAmountOf(value decimal.Decimal) *Amount {
	switch t.Network {
	case Network_STELLAR_NETWORK:
		return &Amount{
			Value: num.FromShopspringDecimal(value.Truncate(7)),
			Token: t,
		}

	default:
		return &Amount{
			Value: num.FromShopspringDecimal(value),
			Token: t,
		}
	}
}

func (t *Token) IsEqualTo(t2 *Token) bool {
	return t.Code == t2.Code &&
		t.Issuer == t2.Issuer &&
		t.Network == t2.Network
}

func (t *Token) IsUndefined() bool {
	return t == nil || NewUndefinedToken().IsEqualTo(t)
}

func (t *Token) ToCriterion() []*search.Criterion {
	return []*search.Criterion{
		search.NewTextExactCriterion("token.code", t.Code),
		search.NewTextExactCriterion("token.issuer", t.Issuer),
		search.NewUint32ExactCriterion("token.network", uint32(t.Network)),
	}
}
