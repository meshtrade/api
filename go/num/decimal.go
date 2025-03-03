package num

import (
	"fmt"

	shopspringDecimal "github.com/shopspring/decimal"
)

// ToShopspring converts the num.Decimal value to a shopspring.Decimal value.
//
// Example:
// var d decimal.Decimal = num.Decimal().ToShopspring()
func (d *Decimal) ToShopspring() shopspringDecimal.Decimal {
	if d == nil {
		return shopspringDecimal.Zero
	}

	// deal with non-initialised values
	value := d.GetValue()
	if value == "" {
		value = "0"
	}

	dec, err := shopspringDecimal.NewFromString(value)
	if err != nil {
		panic(fmt.Errorf("could not construct shopspring decimal from num decimal: %w", err))
	}

	return dec
}

// FromShopspringDecimal constructs a new num.Decimal. from the given shopspring.Decimal value.
//
// Example:
// var d num.Decimal = num.FromShopspringDecimal(...)
// d := num.FromShopspringDecimal(decimal.RequireFromString("1234.1234"))
func FromShopspringDecimal(d shopspringDecimal.Decimal) *Decimal {
	// complete conversion and return
	return &Decimal{
		Value: d.String(),
	}
}

// LessThanOrEqual (LTE) returns true when d is less than or equal to d2.
func (d *Decimal) LessThanOrEqual(d2 *Decimal) bool {
	return d.ToShopspring().LessThanOrEqual(d2.ToShopspring())
}

// LessThan (LT) returns true when d is less than d2.
func (d *Decimal) LessThan(d2 *Decimal) bool {
	return d.ToShopspring().LessThan(d2.ToShopspring())
}

// GreaterThanOrEqual (GTE) returns true when d is greater than or equal to d2.
func (d *Decimal) GreaterThanOrEqual(d2 *Decimal) bool {
	return d.ToShopspring().GreaterThanOrEqual(d2.ToShopspring())
}

// GreaterThan (GT) returns true when d is greater than d2.
func (d *Decimal) GreaterThan(d2 *Decimal) bool {
	return d.ToShopspring().GreaterThan(d2.ToShopspring())
}

// Equal returns whether the numbers represented by d and d2 are equal.
func (d *Decimal) Equal(d2 *Decimal) bool {
	return d.ToShopspring().Equal(d2.ToShopspring())
}

// Div returns d / d2. If it doesn't divide exactly, the result will have
// DivisionPrecision digits after the decimal point.
func (d *Decimal) Div(d2 *Decimal) *Decimal {
	return FromShopspringDecimal(d.ToShopspring().Div(d2.ToShopspring()))
}

// Sub returns d - d2.
func (d *Decimal) Sub(d2 *Decimal) *Decimal {
	return FromShopspringDecimal(d.ToShopspring().Sub(d2.ToShopspring()))
}

// Add returns d + d2.
func (d *Decimal) Add(d2 *Decimal) *Decimal {
	return FromShopspringDecimal(d.ToShopspring().Add(d2.ToShopspring()))
}

// Mul returns d * d2.
func (d *Decimal) Mul(d2 *Decimal) *Decimal {
	return FromShopspringDecimal(d.ToShopspring().Mul(d2.ToShopspring()))
}

// IsZero returns
//
//	true if d == 0
//	false if d > 0
//	false if d < 0
func (d *Decimal) IsZero() bool {
	return d.ToShopspring().IsZero()
}

// IsNegative return
//
//	true if d < 0
//	false if d == 0
//	false if d > 0
func (d *Decimal) IsNegative() bool {
	return d.ToShopspring().IsNegative()
}

// IsPositive return
//
//	true if d > 0
//	false if d == 0
//	false if d < 0
func (d *Decimal) IsPositive() bool {
	return d.ToShopspring().IsPositive()
}

// Round rounds the decimal to places decimal places.
// If places < 0, it will round the integer part to the nearest 10^(-places).
//
// Example:
//
//	NewFromFloat(5.45).Round(1).String() // output: "5.5"
//	NewFromFloat(545).Round(-1).String() // output: "550"
func (d *Decimal) Round(places int32) *Decimal {
	return FromShopspringDecimal(d.ToShopspring().Round(places))
}
