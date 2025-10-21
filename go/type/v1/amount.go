package type_v1

import (
	"fmt"

	"github.com/shopspring/decimal"
)

// IsEqual checks if two amounts are equal in both value and token type.
// This method is deprecated in favor of IsEqualTo for API consistency.
//
// Deprecated: Use IsEqualTo instead for consistency with Token.IsEqualTo.
//
// Parameters:
//   - x2: The amount to compare against. Can be nil.
//
// Returns:
//   - true if both amounts have equal values and equal tokens
//   - false if amounts differ, or if either amount is nil
//
// Nil Safety:
//   - Returns false if either receiver or parameter is nil
//   - Safe to call on nil receiver
//
// Example:
//
//	amount1 := &Amount{Value: FromShopspringDecimal(decimal.NewFromInt(100)), Token: token}
//	amount2 := &Amount{Value: FromShopspringDecimal(decimal.NewFromInt(100)), Token: token}
//	if amount1.IsEqual(amount2) {
//	    // Amounts are equal
//	}
func (x *Amount) IsEqual(x2 *Amount) bool {
	// Nil safety
	if x == nil || x2 == nil {
		return x == x2 // Both nil returns true, one nil returns false
	}

	return x.GetValue().Equal(x2.GetValue()) &&
		x.GetToken().IsEqualTo(x2.GetToken())
}

// IsUndefined checks whether this amount has an undefined token.
// An amount is considered undefined if its associated token is undefined.
//
// Returns:
//   - true if the amount's token is undefined or nil
//   - false if the amount has a valid, defined token
//
// Nil Safety:
//   - Returns true if called on nil receiver
//   - Safe to call on nil receiver
//
// Example:
//
//	amount := NewUndefinedAmount(decimal.NewFromInt(100))
//	if amount.IsUndefined() {
//	    // Amount has undefined token
//	}
//
//	validAmount := token.NewAmountOf(decimal.NewFromInt(100))
//	if !validAmount.IsUndefined() {
//	    // Amount has defined token
//	}
func (x *Amount) IsUndefined() bool {
	// Nil safety
	if x == nil {
		return true
	}

	return x.GetToken().IsUndefined()
}

// SetValue creates a new Amount with the given value and the same token as this amount.
// Despite its name, this method does NOT modify the receiver - it creates and returns a NEW Amount.
//
// Parameters:
//   - value: The decimal value for the new amount
//
// Returns:
//   - A new Amount with the specified value and the same token as the receiver
//   - nil if the receiver is nil
//
// Nil Safety:
//   - Returns nil if called on nil receiver
//   - Safe to call on nil receiver
//
// Note:
//   - This method creates a NEW amount, it does not modify the receiver
//   - The new amount respects the token's ledger precision rules (e.g., Stellar 7 decimals)
//
// Example:
//
//	original := token.NewAmountOf(decimal.NewFromInt(100))
//	modified := original.SetValue(decimal.NewFromInt(200))
//	// original is unchanged, modified is a new Amount with value 200
func (x *Amount) SetValue(value decimal.Decimal) *Amount {
	// Nil safety
	if x == nil {
		return nil
	}

	return x.GetToken().NewAmountOf(value)
}

// IsSameTypeAs checks if two amounts have the same token type (same currency/asset).
// This is useful for validating that amounts can be compared or combined arithmetically.
//
// Parameters:
//   - a2: The amount to compare token types with. Can be nil.
//
// Returns:
//   - true if both amounts have equal tokens
//   - false if tokens differ, or if either amount is nil
//
// Nil Safety:
//   - Returns false if either receiver or parameter is nil
//   - Safe to call on nil receiver
//
// Example:
//
//	usdAmount1 := usdToken.NewAmountOf(decimal.NewFromInt(100))
//	usdAmount2 := usdToken.NewAmountOf(decimal.NewFromInt(200))
//	eurAmount := eurToken.NewAmountOf(decimal.NewFromInt(100))
//
//	if usdAmount1.IsSameTypeAs(usdAmount2) {
//	    // Can safely perform arithmetic operations
//	}
//
//	if !usdAmount1.IsSameTypeAs(eurAmount) {
//	    // Cannot add/subtract different currencies
//	}
func (a *Amount) IsSameTypeAs(a2 *Amount) bool {
	// Nil safety
	if a == nil || a2 == nil {
		return false
	}

	return a.GetToken().IsEqualTo(a2.GetToken())
}

// IsEqualTo checks if two amounts are equal in both value and token type.
// Two amounts are considered equal if they have the same decimal value AND the same token.
//
// Parameters:
//   - a2: The amount to compare against. Can be nil.
//
// Returns:
//   - true if both amounts have equal values and equal tokens (or both are nil)
//   - false if amounts differ, or if exactly one is nil
//
// Nil Safety:
//   - Returns true if both receiver and parameter are nil
//   - Returns false if exactly one is nil
//   - Safe to call on nil receiver
//
// Example:
//
//	amount1 := token.NewAmountOf(decimal.NewFromInt(100))
//	amount2 := token.NewAmountOf(decimal.NewFromInt(100))
//	amount3 := token.NewAmountOf(decimal.NewFromInt(200))
//
//	if amount1.IsEqualTo(amount2) {  // true - same value and token
//	    // Amounts are equal
//	}
//
//	if !amount1.IsEqualTo(amount3) {  // false - different values
//	    // Amounts are not equal
//	}
func (a *Amount) IsEqualTo(a2 *Amount) bool {
	// Nil safety
	if a == nil && a2 == nil {
		return true
	}
	if a == nil || a2 == nil {
		return false
	}

	return a.GetToken().IsEqualTo(a2.GetToken()) && a.GetValue().Equal(a2.GetValue())
}

// ContainsFractions checks whether the amount's value has any fractional (decimal) component.
// This is useful for determining if an amount can be represented as a whole number.
//
// Returns:
//   - true if the value has fractional/decimal places
//   - false if the value is a whole number, or if receiver is nil
//
// Nil Safety:
//   - Returns false if called on nil receiver
//   - Safe to call on nil receiver
//
// Example:
//
//	amount1 := token.NewAmountOf(decimal.RequireFromString("100.50"))
//	if amount1.ContainsFractions() {  // true - has .50 fraction
//	    // Amount has decimal places
//	}
//
//	amount2 := token.NewAmountOf(decimal.NewFromInt(100))
//	if !amount2.ContainsFractions() {  // false - whole number
//	    // Amount is a whole number
//	}
func (a *Amount) ContainsFractions() bool {
	// Nil safety
	if a == nil {
		return false
	}

	return !a.GetValue().ToShopspring().Truncate(0).Equal(a.GetValue().ToShopspring())
}

// NewUndefinedAmount creates a new Amount with the specified value and an undefined token.
// This is useful as a placeholder or when the token type is not yet known.
//
// Parameters:
//   - value: The decimal value for the amount
//
// Returns:
//   - A new Amount with the specified value and an undefined token
//
// Example:
//
//	amount := NewUndefinedAmount(decimal.NewFromInt(100))
//	if amount.IsUndefined() {  // true
//	    // Amount needs a token assigned
//	}
func NewUndefinedAmount(value decimal.Decimal) *Amount {
	return &Amount{
		Value: FromShopspringDecimal(value),
		Token: NewUndefinedToken(),
	}
}

// Sub subtracts another amount from this amount and returns a new amount with the result.
// The amounts must have the same token type (currency/asset).
//
// Parameters:
//   - y: The amount to subtract. Must have the same token as the receiver.
//
// Returns:
//   - A new Amount containing the difference (x - y)
//   - nil if either amount is nil
//
// Panics:
//   - If the amounts have different token types
//
// Nil Safety:
//   - Returns nil if either receiver or parameter is nil
//   - Safe to call on nil receiver (returns nil instead of panic)
//
// Example:
//
//	amount1 := token.NewAmountOf(decimal.NewFromInt(100))
//	amount2 := token.NewAmountOf(decimal.NewFromInt(30))
//	result := amount1.Sub(amount2)  // result = 70
//
//	// Panics if tokens don't match:
//	// usdAmount.Sub(eurAmount)  // PANIC: different tokens
func (x *Amount) Sub(y *Amount) *Amount {
	// Nil safety
	if x == nil || y == nil {
		return nil
	}

	if !x.GetToken().IsEqualTo(y.GetToken()) {
		panic(fmt.Sprintf("cannot do arithmetic on amounts of different token denominations: %s vs. %s", x.GetToken().PrettyString(), y.GetToken().PrettyString()))
	}
	return x.SetValue(x.GetValue().ToShopspring().Sub(y.GetValue().ToShopspring()))
}

// Add adds another amount to this amount and returns a new amount with the result.
// The amounts must have the same token type (currency/asset).
//
// Parameters:
//   - y: The amount to add. Must have the same token as the receiver.
//
// Returns:
//   - A new Amount containing the sum (x + y)
//   - nil if either amount is nil
//
// Panics:
//   - If the amounts have different token types
//
// Nil Safety:
//   - Returns nil if either receiver or parameter is nil
//   - Safe to call on nil receiver (returns nil instead of panic)
//
// Example:
//
//	amount1 := token.NewAmountOf(decimal.NewFromInt(100))
//	amount2 := token.NewAmountOf(decimal.NewFromInt(30))
//	result := amount1.Add(amount2)  // result = 130
//
//	// Panics if tokens don't match:
//	// usdAmount.Add(eurAmount)  // PANIC: different tokens
func (x *Amount) Add(y *Amount) *Amount {
	// Nil safety
	if x == nil || y == nil {
		return nil
	}

	if !x.GetToken().IsEqualTo(y.GetToken()) {
		panic(fmt.Sprintf("cannot do arithmetic on amounts of different token denominations: %s vs. %s", x.GetToken().PrettyString(), y.GetToken().PrettyString()))
	}
	return x.SetValue(x.GetValue().ToShopspring().Add(y.GetValue().ToShopspring()))
}

// DecimalDiv divides this amount by a decimal value and returns a new amount with the result.
// The token type is preserved.
//
// Parameters:
//   - y: The decimal divisor. Must not be zero.
//
// Returns:
//   - A new Amount containing the quotient (x / y)
//   - nil if the receiver is nil
//
// Panics:
//   - If y is zero (division by zero)
//
// Nil Safety:
//   - Returns nil if called on nil receiver
//   - Safe to call on nil receiver
//
// Example:
//
//	amount := token.NewAmountOf(decimal.NewFromInt(100))
//	half := amount.DecimalDiv(decimal.NewFromInt(2))  // result = 50
//
//	// Panics on division by zero:
//	// amount.DecimalDiv(decimal.Zero)  // PANIC: division by zero
func (x *Amount) DecimalDiv(y decimal.Decimal) *Amount {
	// Nil safety
	if x == nil {
		return nil
	}

	// Division by zero check
	if y.IsZero() {
		panic("cannot divide amount by zero")
	}

	return x.SetValue(x.GetValue().ToShopspring().Div(y))
}

// DecimalMul multiplies this amount by a decimal value and returns a new amount with the result.
// The token type is preserved.
//
// Parameters:
//   - y: The decimal multiplier
//
// Returns:
//   - A new Amount containing the product (x * y)
//   - nil if the receiver is nil
//
// Nil Safety:
//   - Returns nil if called on nil receiver
//   - Safe to call on nil receiver
//
// Example:
//
//	amount := token.NewAmountOf(decimal.NewFromInt(100))
//	double := amount.DecimalMul(decimal.NewFromInt(2))  // result = 200
//	half := amount.DecimalMul(decimal.RequireFromString("0.5"))  // result = 50
func (x *Amount) DecimalMul(y decimal.Decimal) *Amount {
	// Nil safety
	if x == nil {
		return nil
	}

	return x.SetValue(x.GetValue().ToShopspring().Mul(y))
}

// IsNegative checks whether the amount's value is less than zero.
//
// Returns:
//   - true if the value is negative (< 0)
//   - false if the value is zero or positive, or if receiver is nil
//
// Nil Safety:
//   - Returns false if called on nil receiver
//   - Safe to call on nil receiver
//
// Example:
//
//	amount1 := token.NewAmountOf(decimal.NewFromInt(-50))
//	if amount1.IsNegative() {  // true
//	    // Handle negative amount (e.g., debt, withdrawal)
//	}
//
//	amount2 := token.NewAmountOf(decimal.NewFromInt(100))
//	if !amount2.IsNegative() {  // false
//	    // Positive amount
//	}
func (x *Amount) IsNegative() bool {
	// Nil safety
	if x == nil {
		return false
	}

	return x.GetValue().ToShopspring().IsNegative()
}

// IsZero checks whether the amount's value is exactly zero.
//
// Returns:
//   - true if the value is zero
//   - false if the value is non-zero, or if receiver is nil
//
// Nil Safety:
//   - Returns false if called on nil receiver
//   - Safe to call on nil receiver
//
// Example:
//
//	amount1 := token.NewAmountOf(decimal.Zero)
//	if amount1.IsZero() {  // true
//	    // Amount is zero
//	}
//
//	amount2 := token.NewAmountOf(decimal.NewFromInt(100))
//	if !amount2.IsZero() {  // false
//	    // Amount has value
//	}
func (x *Amount) IsZero() bool {
	// Nil safety
	if x == nil {
		return false
	}

	return x.GetValue().ToShopspring().IsZero()
}
