package type_v1

import (
	"testing"

	"github.com/shopspring/decimal"
)

// Helper function to create a test token
func createTestToken(code string, ledger Ledger) *Token {
	return &Token{
		Code:   code,
		Issuer: "TEST_ISSUER",
		Ledger: ledger,
	}
}

// TestNewUndefinedAmount verifies that NewUndefinedAmount creates an amount with undefined token.
func TestNewUndefinedAmount(t *testing.T) {
	t.Parallel()

	value := decimal.NewFromInt(100)
	amount := NewUndefinedAmount(value)

	if amount == nil {
		t.Fatal("NewUndefinedAmount returned nil")
	}

	if !amount.IsUndefined() {
		t.Error("NewUndefinedAmount created amount that is not undefined")
	}

	if !amount.GetValue().ToShopspring().Equal(value) {
		t.Errorf("Value = %v, want %v", amount.GetValue().ToShopspring(), value)
	}
}

// TestAmount_IsEqualTo verifies amount equality with comprehensive nil handling.
func TestAmount_IsEqualTo(t *testing.T) {
	t.Parallel()

	token := createTestToken("USD", Ledger_LEDGER_STELLAR)

	tests := []struct {
		name string
		a    *Amount
		a2   *Amount
		want bool
	}{
		{
			name: "both nil amounts are equal",
			a:    nil,
			a2:   nil,
			want: true,
		},
		{
			name: "first nil, second non-nil - not equal",
			a:    nil,
			a2:   token.NewAmountOf(decimal.NewFromInt(100)),
			want: false,
		},
		{
			name: "first non-nil, second nil - not equal",
			a:    token.NewAmountOf(decimal.NewFromInt(100)),
			a2:   nil,
			want: false,
		},
		{
			name: "equal amounts - same value and token",
			a:    token.NewAmountOf(decimal.NewFromInt(100)),
			a2:   token.NewAmountOf(decimal.NewFromInt(100)),
			want: true,
		},
		{
			name: "different values - not equal",
			a:    token.NewAmountOf(decimal.NewFromInt(100)),
			a2:   token.NewAmountOf(decimal.NewFromInt(200)),
			want: false,
		},
		{
			name: "different tokens - not equal",
			a:    createTestToken("USD", Ledger_LEDGER_STELLAR).NewAmountOf(decimal.NewFromInt(100)),
			a2:   createTestToken("EUR", Ledger_LEDGER_STELLAR).NewAmountOf(decimal.NewFromInt(100)),
			want: false,
		},
		{
			name: "zero amounts are equal",
			a:    token.NewAmountOf(decimal.Zero),
			a2:   token.NewAmountOf(decimal.Zero),
			want: true,
		},
		{
			name: "negative amounts are equal",
			a:    token.NewAmountOf(decimal.NewFromInt(-100)),
			a2:   token.NewAmountOf(decimal.NewFromInt(-100)),
			want: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.a.IsEqualTo(tt.a2)

			if got != tt.want {
				t.Errorf("IsEqualTo() = %v, want %v", got, tt.want)
			}
		})
	}
}

// TestAmount_IsUndefined verifies undefined amount detection.
func TestAmount_IsUndefined(t *testing.T) {
	t.Parallel()

	token := createTestToken("USD", Ledger_LEDGER_STELLAR)

	tests := []struct {
		name   string
		amount *Amount
		want   bool
	}{
		{
			name:   "nil amount is undefined",
			amount: nil,
			want:   true,
		},
		{
			name:   "amount with undefined token is undefined",
			amount: NewUndefinedAmount(decimal.NewFromInt(100)),
			want:   true,
		},
		{
			name:   "amount with defined token is not undefined",
			amount: token.NewAmountOf(decimal.NewFromInt(100)),
			want:   false,
		},
		{
			name:   "zero amount with defined token is not undefined",
			amount: token.NewAmountOf(decimal.Zero),
			want:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.amount.IsUndefined()

			if got != tt.want {
				t.Errorf("IsUndefined() = %v, want %v", got, tt.want)
			}
		})
	}
}

// TestAmount_SetValue verifies value setting with token precision handling.
func TestAmount_SetValue(t *testing.T) {
	t.Parallel()

	stellarToken := createTestToken("USD", Ledger_LEDGER_STELLAR)
	ethereumToken := createTestToken("ETH", Ledger_LEDGER_ETHEREUM)

	tests := []struct {
		name      string
		amount    *Amount
		newValue  decimal.Decimal
		wantValue string
		wantNil   bool
	}{
		{
			name:     "nil receiver returns nil",
			amount:   nil,
			newValue: decimal.NewFromInt(200),
			wantNil:  true,
		},
		{
			name:      "set value on stellar amount - truncates to 7 decimals",
			amount:    stellarToken.NewAmountOf(decimal.NewFromInt(100)),
			newValue:  decimal.RequireFromString("200.123456789"),
			wantValue: "200.1234567",
		},
		{
			name:      "set value on ethereum amount - preserves precision",
			amount:    ethereumToken.NewAmountOf(decimal.NewFromInt(100)),
			newValue:  decimal.RequireFromString("200.123456789012345"),
			wantValue: "200.123456789012345",
		},
		{
			name:      "set zero value",
			amount:    stellarToken.NewAmountOf(decimal.NewFromInt(100)),
			newValue:  decimal.Zero,
			wantValue: "0",
		},
		{
			name:      "set negative value",
			amount:    stellarToken.NewAmountOf(decimal.NewFromInt(100)),
			newValue:  decimal.NewFromInt(-50),
			wantValue: "-50",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.amount.SetValue(tt.newValue)

			if tt.wantNil {
				if got != nil {
					t.Errorf("SetValue() = %v, want nil", got)
				}
				return
			}

			if got == nil {
				t.Fatal("SetValue() returned nil, expected non-nil")
			}

			gotValue := got.GetValue().ToShopspring()
			wantValue := decimal.RequireFromString(tt.wantValue)

			if !gotValue.Equal(wantValue) {
				t.Errorf("SetValue().Value = %s, want %s", gotValue, wantValue)
			}
		})
	}
}

// TestAmount_IsSameTypeAs verifies token type comparison.
func TestAmount_IsSameTypeAs(t *testing.T) {
	t.Parallel()

	usdToken := createTestToken("USD", Ledger_LEDGER_STELLAR)
	eurToken := createTestToken("EUR", Ledger_LEDGER_STELLAR)

	tests := []struct {
		name string
		a    *Amount
		a2   *Amount
		want bool
	}{
		{
			name: "nil receiver returns false",
			a:    nil,
			a2:   usdToken.NewAmountOf(decimal.NewFromInt(100)),
			want: false,
		},
		{
			name: "nil parameter returns false",
			a:    usdToken.NewAmountOf(decimal.NewFromInt(100)),
			a2:   nil,
			want: false,
		},
		{
			name: "same token type - different values",
			a:    usdToken.NewAmountOf(decimal.NewFromInt(100)),
			a2:   usdToken.NewAmountOf(decimal.NewFromInt(200)),
			want: true,
		},
		{
			name: "different token types",
			a:    usdToken.NewAmountOf(decimal.NewFromInt(100)),
			a2:   eurToken.NewAmountOf(decimal.NewFromInt(100)),
			want: false,
		},
		{
			name: "same token type - same values",
			a:    usdToken.NewAmountOf(decimal.NewFromInt(100)),
			a2:   usdToken.NewAmountOf(decimal.NewFromInt(100)),
			want: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.a.IsSameTypeAs(tt.a2)

			if got != tt.want {
				t.Errorf("IsSameTypeAs() = %v, want %v", got, tt.want)
			}
		})
	}
}

// TestAmount_ContainsFractions verifies fractional detection.
func TestAmount_ContainsFractions(t *testing.T) {
	t.Parallel()

	token := createTestToken("USD", Ledger_LEDGER_STELLAR)

	tests := []struct {
		name   string
		amount *Amount
		want   bool
	}{
		{
			name:   "nil receiver returns false",
			amount: nil,
			want:   false,
		},
		{
			name:   "whole number - no fractions",
			amount: token.NewAmountOf(decimal.NewFromInt(100)),
			want:   false,
		},
		{
			name:   "decimal value - has fractions",
			amount: token.NewAmountOf(decimal.RequireFromString("100.5")),
			want:   true,
		},
		{
			name:   "small fraction - has fractions",
			amount: token.NewAmountOf(decimal.RequireFromString("100.0000001")),
			want:   true,
		},
		{
			name:   "zero - no fractions",
			amount: token.NewAmountOf(decimal.Zero),
			want:   false,
		},
		{
			name:   "negative whole number - no fractions",
			amount: token.NewAmountOf(decimal.NewFromInt(-100)),
			want:   false,
		},
		{
			name:   "negative decimal - has fractions",
			amount: token.NewAmountOf(decimal.RequireFromString("-100.25")),
			want:   true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.amount.ContainsFractions()

			if got != tt.want {
				t.Errorf("ContainsFractions() = %v, want %v", got, tt.want)
			}
		})
	}
}

// TestAmount_Add verifies amount addition with token validation.
func TestAmount_Add(t *testing.T) {
	t.Parallel()

	token := createTestToken("USD", Ledger_LEDGER_STELLAR)
	otherToken := createTestToken("EUR", Ledger_LEDGER_STELLAR)

	tests := []struct {
		name      string
		x         *Amount
		y         *Amount
		wantValue string
		wantNil   bool
		wantPanic bool
	}{
		{
			name:    "nil receiver returns nil",
			x:       nil,
			y:       token.NewAmountOf(decimal.NewFromInt(50)),
			wantNil: true,
		},
		{
			name:    "nil parameter returns nil",
			x:       token.NewAmountOf(decimal.NewFromInt(100)),
			y:       nil,
			wantNil: true,
		},
		{
			name:      "add positive amounts",
			x:         token.NewAmountOf(decimal.NewFromInt(100)),
			y:         token.NewAmountOf(decimal.NewFromInt(50)),
			wantValue: "150",
		},
		{
			name:      "add negative amount",
			x:         token.NewAmountOf(decimal.NewFromInt(100)),
			y:         token.NewAmountOf(decimal.NewFromInt(-30)),
			wantValue: "70",
		},
		{
			name:      "add to zero",
			x:         token.NewAmountOf(decimal.Zero),
			y:         token.NewAmountOf(decimal.NewFromInt(50)),
			wantValue: "50",
		},
		{
			name:      "add zero",
			x:         token.NewAmountOf(decimal.NewFromInt(100)),
			y:         token.NewAmountOf(decimal.Zero),
			wantValue: "100",
		},
		{
			name:      "different tokens - panics",
			x:         token.NewAmountOf(decimal.NewFromInt(100)),
			y:         otherToken.NewAmountOf(decimal.NewFromInt(50)),
			wantPanic: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			if tt.wantPanic {
				defer func() {
					if r := recover(); r == nil {
						t.Error("Add() did not panic on different tokens")
					}
				}()
			}

			got := tt.x.Add(tt.y)

			if tt.wantPanic {
				return
			}

			if tt.wantNil {
				if got != nil {
					t.Errorf("Add() = %v, want nil", got)
				}
				return
			}

			if got == nil {
				t.Fatal("Add() returned nil, expected non-nil")
			}

			gotValue := got.GetValue().ToShopspring()
			wantValue := decimal.RequireFromString(tt.wantValue)

			if !gotValue.Equal(wantValue) {
				t.Errorf("Add().Value = %s, want %s", gotValue, wantValue)
			}
		})
	}
}

// TestAmount_Sub verifies amount subtraction with token validation.
func TestAmount_Sub(t *testing.T) {
	t.Parallel()

	token := createTestToken("USD", Ledger_LEDGER_STELLAR)
	otherToken := createTestToken("EUR", Ledger_LEDGER_STELLAR)

	tests := []struct {
		name      string
		x         *Amount
		y         *Amount
		wantValue string
		wantNil   bool
		wantPanic bool
	}{
		{
			name:    "nil receiver returns nil",
			x:       nil,
			y:       token.NewAmountOf(decimal.NewFromInt(50)),
			wantNil: true,
		},
		{
			name:    "nil parameter returns nil",
			x:       token.NewAmountOf(decimal.NewFromInt(100)),
			y:       nil,
			wantNil: true,
		},
		{
			name:      "subtract positive amounts",
			x:         token.NewAmountOf(decimal.NewFromInt(100)),
			y:         token.NewAmountOf(decimal.NewFromInt(30)),
			wantValue: "70",
		},
		{
			name:      "subtract larger from smaller - negative result",
			x:         token.NewAmountOf(decimal.NewFromInt(50)),
			y:         token.NewAmountOf(decimal.NewFromInt(100)),
			wantValue: "-50",
		},
		{
			name:      "subtract from zero - negative result",
			x:         token.NewAmountOf(decimal.Zero),
			y:         token.NewAmountOf(decimal.NewFromInt(50)),
			wantValue: "-50",
		},
		{
			name:      "subtract zero",
			x:         token.NewAmountOf(decimal.NewFromInt(100)),
			y:         token.NewAmountOf(decimal.Zero),
			wantValue: "100",
		},
		{
			name:      "different tokens - panics",
			x:         token.NewAmountOf(decimal.NewFromInt(100)),
			y:         otherToken.NewAmountOf(decimal.NewFromInt(50)),
			wantPanic: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			if tt.wantPanic {
				defer func() {
					if r := recover(); r == nil {
						t.Error("Sub() did not panic on different tokens")
					}
				}()
			}

			got := tt.x.Sub(tt.y)

			if tt.wantPanic {
				return
			}

			if tt.wantNil {
				if got != nil {
					t.Errorf("Sub() = %v, want nil", got)
				}
				return
			}

			if got == nil {
				t.Fatal("Sub() returned nil, expected non-nil")
			}

			gotValue := got.GetValue().ToShopspring()
			wantValue := decimal.RequireFromString(tt.wantValue)

			if !gotValue.Equal(wantValue) {
				t.Errorf("Sub().Value = %s, want %s", gotValue, wantValue)
			}
		})
	}
}

// TestAmount_DecimalMul verifies amount multiplication by decimal.
func TestAmount_DecimalMul(t *testing.T) {
	t.Parallel()

	token := createTestToken("USD", Ledger_LEDGER_STELLAR)

	tests := []struct {
		name       string
		amount     *Amount
		multiplier decimal.Decimal
		wantValue  string
		wantNil    bool
	}{
		{
			name:       "nil receiver returns nil",
			amount:     nil,
			multiplier: decimal.NewFromInt(2),
			wantNil:    true,
		},
		{
			name:       "multiply by 2",
			amount:     token.NewAmountOf(decimal.NewFromInt(100)),
			multiplier: decimal.NewFromInt(2),
			wantValue:  "200",
		},
		{
			name:       "multiply by 0.5",
			amount:     token.NewAmountOf(decimal.NewFromInt(100)),
			multiplier: decimal.RequireFromString("0.5"),
			wantValue:  "50",
		},
		{
			name:       "multiply by zero",
			amount:     token.NewAmountOf(decimal.NewFromInt(100)),
			multiplier: decimal.Zero,
			wantValue:  "0",
		},
		{
			name:       "multiply by negative",
			amount:     token.NewAmountOf(decimal.NewFromInt(100)),
			multiplier: decimal.NewFromInt(-2),
			wantValue:  "-200",
		},
		{
			name:       "multiply by 1 - unchanged",
			amount:     token.NewAmountOf(decimal.NewFromInt(100)),
			multiplier: decimal.NewFromInt(1),
			wantValue:  "100",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.amount.DecimalMul(tt.multiplier)

			if tt.wantNil {
				if got != nil {
					t.Errorf("DecimalMul() = %v, want nil", got)
				}
				return
			}

			if got == nil {
				t.Fatal("DecimalMul() returned nil, expected non-nil")
			}

			gotValue := got.GetValue().ToShopspring()
			wantValue := decimal.RequireFromString(tt.wantValue)

			if !gotValue.Equal(wantValue) {
				t.Errorf("DecimalMul().Value = %s, want %s", gotValue, wantValue)
			}
		})
	}
}

// TestAmount_DecimalDiv verifies amount division by decimal with zero check.
func TestAmount_DecimalDiv(t *testing.T) {
	t.Parallel()

	token := createTestToken("USD", Ledger_LEDGER_STELLAR)

	tests := []struct {
		name      string
		amount    *Amount
		divisor   decimal.Decimal
		wantValue string
		wantNil   bool
		wantPanic bool
	}{
		{
			name:    "nil receiver returns nil",
			amount:  nil,
			divisor: decimal.NewFromInt(2),
			wantNil: true,
		},
		{
			name:      "divide by 2",
			amount:    token.NewAmountOf(decimal.NewFromInt(100)),
			divisor:   decimal.NewFromInt(2),
			wantValue: "50",
		},
		{
			name:      "divide by 0.5",
			amount:    token.NewAmountOf(decimal.NewFromInt(100)),
			divisor:   decimal.RequireFromString("0.5"),
			wantValue: "200",
		},
		{
			name:      "divide by 1 - unchanged",
			amount:    token.NewAmountOf(decimal.NewFromInt(100)),
			divisor:   decimal.NewFromInt(1),
			wantValue: "100",
		},
		{
			name:      "divide by negative",
			amount:    token.NewAmountOf(decimal.NewFromInt(100)),
			divisor:   decimal.NewFromInt(-2),
			wantValue: "-50",
		},
		{
			name:      "divide by zero - panics",
			amount:    token.NewAmountOf(decimal.NewFromInt(100)),
			divisor:   decimal.Zero,
			wantPanic: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			if tt.wantPanic {
				defer func() {
					if r := recover(); r == nil {
						t.Error("DecimalDiv() did not panic on division by zero")
					}
				}()
			}

			got := tt.amount.DecimalDiv(tt.divisor)

			if tt.wantPanic {
				return
			}

			if tt.wantNil {
				if got != nil {
					t.Errorf("DecimalDiv() = %v, want nil", got)
				}
				return
			}

			if got == nil {
				t.Fatal("DecimalDiv() returned nil, expected non-nil")
			}

			gotValue := got.GetValue().ToShopspring()
			wantValue := decimal.RequireFromString(tt.wantValue)

			if !gotValue.Equal(wantValue) {
				t.Errorf("DecimalDiv().Value = %s, want %s", gotValue, wantValue)
			}
		})
	}
}

// TestAmount_IsNegative verifies negative value detection.
func TestAmount_IsNegative(t *testing.T) {
	t.Parallel()

	token := createTestToken("USD", Ledger_LEDGER_STELLAR)

	tests := []struct {
		name   string
		amount *Amount
		want   bool
	}{
		{
			name:   "nil receiver returns false",
			amount: nil,
			want:   false,
		},
		{
			name:   "negative value",
			amount: token.NewAmountOf(decimal.NewFromInt(-100)),
			want:   true,
		},
		{
			name:   "positive value",
			amount: token.NewAmountOf(decimal.NewFromInt(100)),
			want:   false,
		},
		{
			name:   "zero value",
			amount: token.NewAmountOf(decimal.Zero),
			want:   false,
		},
		{
			name:   "small negative value",
			amount: token.NewAmountOf(decimal.RequireFromString("-0.01")),
			want:   true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.amount.IsNegative()

			if got != tt.want {
				t.Errorf("IsNegative() = %v, want %v", got, tt.want)
			}
		})
	}
}

// TestAmount_IsZero verifies zero value detection.
func TestAmount_IsZero(t *testing.T) {
	t.Parallel()

	token := createTestToken("USD", Ledger_LEDGER_STELLAR)

	tests := []struct {
		name   string
		amount *Amount
		want   bool
	}{
		{
			name:   "nil receiver returns false",
			amount: nil,
			want:   false,
		},
		{
			name:   "zero value",
			amount: token.NewAmountOf(decimal.Zero),
			want:   true,
		},
		{
			name:   "positive value",
			amount: token.NewAmountOf(decimal.NewFromInt(100)),
			want:   false,
		},
		{
			name:   "negative value",
			amount: token.NewAmountOf(decimal.NewFromInt(-100)),
			want:   false,
		},
		{
			name:   "small positive value",
			amount: token.NewAmountOf(decimal.RequireFromString("0.01")),
			want:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.amount.IsZero()

			if got != tt.want {
				t.Errorf("IsZero() = %v, want %v", got, tt.want)
			}
		})
	}
}

// TestAmount_NilSafetyIntegration verifies all methods handle nil receivers gracefully.
func TestAmount_NilSafetyIntegration(t *testing.T) {
	t.Parallel()

	var nilAmount *Amount = nil

	t.Run("IsEqualTo on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("IsEqualTo() on nil panicked: %v", r)
			}
		}()
		_ = nilAmount.IsEqualTo(nil)
	})

	t.Run("IsUndefined on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("IsUndefined() on nil panicked: %v", r)
			}
		}()
		result := nilAmount.IsUndefined()
		if !result {
			t.Error("IsUndefined() on nil should return true")
		}
	})

	t.Run("SetValue on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("SetValue() on nil panicked: %v", r)
			}
		}()
		result := nilAmount.SetValue(decimal.NewFromInt(100))
		if result != nil {
			t.Errorf("SetValue() on nil = %v, want nil", result)
		}
	})

	t.Run("IsSameTypeAs on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("IsSameTypeAs() on nil panicked: %v", r)
			}
		}()
		_ = nilAmount.IsSameTypeAs(nil)
	})

	t.Run("ContainsFractions on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("ContainsFractions() on nil panicked: %v", r)
			}
		}()
		_ = nilAmount.ContainsFractions()
	})

	t.Run("Add on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("Add() on nil panicked: %v", r)
			}
		}()
		result := nilAmount.Add(nil)
		if result != nil {
			t.Errorf("Add() on nil = %v, want nil", result)
		}
	})

	t.Run("Sub on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("Sub() on nil panicked: %v", r)
			}
		}()
		result := nilAmount.Sub(nil)
		if result != nil {
			t.Errorf("Sub() on nil = %v, want nil", result)
		}
	})

	t.Run("DecimalMul on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("DecimalMul() on nil panicked: %v", r)
			}
		}()
		result := nilAmount.DecimalMul(decimal.NewFromInt(2))
		if result != nil {
			t.Errorf("DecimalMul() on nil = %v, want nil", result)
		}
	})

	t.Run("DecimalDiv on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("DecimalDiv() on nil panicked: %v", r)
			}
		}()
		result := nilAmount.DecimalDiv(decimal.NewFromInt(2))
		if result != nil {
			t.Errorf("DecimalDiv() on nil = %v, want nil", result)
		}
	})

	t.Run("IsNegative on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("IsNegative() on nil panicked: %v", r)
			}
		}()
		_ = nilAmount.IsNegative()
	})

	t.Run("IsZero on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("IsZero() on nil panicked: %v", r)
			}
		}()
		_ = nilAmount.IsZero()
	})
}

// Benchmarks
func BenchmarkAmount_IsEqualTo(b *testing.B) {
	token := createTestToken("USD", Ledger_LEDGER_STELLAR)
	amount1 := token.NewAmountOf(decimal.NewFromInt(100))
	amount2 := token.NewAmountOf(decimal.NewFromInt(100))

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = amount1.IsEqualTo(amount2)
	}
}

func BenchmarkAmount_Add(b *testing.B) {
	token := createTestToken("USD", Ledger_LEDGER_STELLAR)
	amount1 := token.NewAmountOf(decimal.NewFromInt(100))
	amount2 := token.NewAmountOf(decimal.NewFromInt(50))

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = amount1.Add(amount2)
	}
}

func BenchmarkAmount_DecimalMul(b *testing.B) {
	token := createTestToken("USD", Ledger_LEDGER_STELLAR)
	amount := token.NewAmountOf(decimal.NewFromInt(100))
	multiplier := decimal.NewFromInt(2)

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = amount.DecimalMul(multiplier)
	}
}
