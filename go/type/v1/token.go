package type_v1

import (
	"fmt"

	"github.com/shopspring/decimal"
)

// NewUndefinedToken creates a new Token representing an undefined or placeholder token.
// The undefined token has:
//   - Code: "-"
//   - Issuer: "-"
//   - Ledger: LEDGER_UNSPECIFIED
//
// This is useful as a sentinel value to represent the absence of a valid token
// or as a placeholder in data structures.
//
// Returns:
//   - A non-nil pointer to a Token configured as undefined
//
// Example:
//
//	undef := NewUndefinedToken()
//	if token.IsEqualTo(undef) {
//	    // Handle undefined token case
//	}
func NewUndefinedToken() *Token {
	return &Token{
		Code:   "-",
		Issuer: "-",
		Ledger: Ledger_LEDGER_UNSPECIFIED,
	}
}

// NewAmountOf creates a new Amount with the given decimal value and this token.
// The precision handling depends on the token's ledger:
//   - Stellar ledger: Values are truncated to 7 decimal places (Stellar's native precision)
//   - All other ledgers: Full precision is preserved
//
// Parameters:
//   - value: The decimal value for the amount. Can be positive, negative, or zero.
//
// Returns:
//   - A pointer to a new Amount, or nil if the receiver token is nil
//
// Nil Safety:
//   - If called on a nil Token receiver, returns nil gracefully instead of panicking
//
// Example:
//
//	token := &Token{Code: "USD", Issuer: "...", Ledger: Ledger_LEDGER_STELLAR}
//	amount := token.NewAmountOf(decimal.NewFromFloat(123.456789012)) // Truncates to 123.4567890
func (t *Token) NewAmountOf(value decimal.Decimal) *Amount {
	// Nil safety: return nil if receiver is nil
	if t == nil {
		return nil
	}

	switch t.Ledger {
	case Ledger_LEDGER_STELLAR:
		// Stellar network has 7 decimal places of precision
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

// IsEqualTo compares this token with another token for equality.
// Two tokens are considered equal if and only if all of the following match:
//   - Code (asset code)
//   - Issuer (asset issuer)
//   - Ledger (blockchain/ledger type)
//
// Parameters:
//   - t2: The token to compare against. Can be nil.
//
// Returns:
//   - true if both tokens are equal (including both being nil)
//   - false if tokens differ in any field or if exactly one is nil
//
// Nil Safety:
//   - Two nil tokens are considered equal (returns true)
//   - A nil token and a non-nil token are not equal (returns false)
//   - Safe to call on nil receiver
//
// Example:
//
//	token1 := &Token{Code: "USD", Issuer: "ISSUER1", Ledger: Ledger_LEDGER_STELLAR}
//	token2 := &Token{Code: "USD", Issuer: "ISSUER1", Ledger: Ledger_LEDGER_STELLAR}
//	if token1.IsEqualTo(token2) {
//	    // Tokens are identical
//	}
func (t *Token) IsEqualTo(t2 *Token) bool {
	// Handle nil cases
	if t == nil && t2 == nil {
		return true
	}
	if t == nil || t2 == nil {
		return false
	}

	return t.GetCode() == t2.GetCode() &&
		t.GetIssuer() == t2.GetIssuer() &&
		t.GetLedger() == t2.GetLedger()
}

// IsUndefined checks whether this token represents an undefined or placeholder token.
// A token is considered undefined if:
//   - The token is nil, OR
//   - The token has Code == "-" AND Issuer == "-" AND Ledger == LEDGER_UNSPECIFIED
//
// Returns:
//   - true if the token is undefined (nil or matches undefined pattern)
//   - false if the token is a valid, defined token
//
// Nil Safety:
//   - Safe to call on nil receiver (returns true)
//
// Example:
//
//	var token *Token = nil
//	if token.IsUndefined() {  // Returns true
//	    // Handle undefined case
//	}
//
//	defined := &Token{Code: "USD", Issuer: "ISSUER", Ledger: Ledger_LEDGER_STELLAR}
//	if !defined.IsUndefined() {  // Returns false
//	    // Process valid token
//	}
func (t *Token) IsUndefined() bool {
	// Nil tokens are undefined
	if t == nil {
		return true
	}

	// Check if token matches the undefined pattern without allocating a new Token
	return t.GetCode() == "-" &&
		t.GetIssuer() == "-" &&
		t.GetLedger() == Ledger_LEDGER_UNSPECIFIED
}

// PrettyString returns a human-readable string representation of the token
// in the format "CODE by ISSUER on NETWORK".
//
// Returns:
//   - A formatted string describing the token with network information
//   - "undefined" if called on a nil receiver or undefined token
//
// Nil Safety:
//   - Safe to call on nil receiver (returns "undefined")
//
// Example:
//
//	token := &Token{Code: "USD", Issuer: "CIRCLE", Ledger: Ledger_LEDGER_STELLAR}
//	fmt.Println(token.PrettyString())  // Output: "USD by CIRCLE on Stellar"
//
//	var nilToken *Token = nil
//	fmt.Println(nilToken.PrettyString())  // Output: "undefined"
func (t *Token) PrettyString() string {
	// Nil safety: return sensible default for nil receiver
	if t == nil {
		return "undefined"
	}

	// Also handle undefined tokens gracefully
	if t.IsUndefined() {
		return "undefined"
	}

	return fmt.Sprintf("%s by %s on %s", t.GetCode(), t.GetIssuer(), t.GetLedger().ToPrettyString())
}
