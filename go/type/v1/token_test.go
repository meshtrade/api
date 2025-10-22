package type_v1

import (
	"testing"

	"github.com/shopspring/decimal"
)

// TestNewUndefinedToken verifies that NewUndefinedToken creates a token with the expected undefined pattern.
func TestNewUndefinedToken(t *testing.T) {
	t.Parallel()

	token := NewUndefinedToken()

	if token == nil {
		t.Fatal("NewUndefinedToken() returned nil, expected non-nil token")
	}

	if got := token.GetCode(); got != "-" {
		t.Errorf("NewUndefinedToken().Code = %q, want %q", got, "-")
	}

	if got := token.GetIssuer(); got != "-" {
		t.Errorf("NewUndefinedToken().Issuer = %q, want %q", got, "-")
	}

	if got := token.GetLedger(); got != Ledger_LEDGER_UNSPECIFIED {
		t.Errorf("NewUndefinedToken().Ledger = %v, want %v", got, Ledger_LEDGER_UNSPECIFIED)
	}

	// Verify that undefined token is actually considered undefined
	if !token.IsUndefined() {
		t.Error("NewUndefinedToken() created token that IsUndefined() returns false for")
	}
}

// TestToken_NewAmountOf verifies the NewAmountOf method with comprehensive test cases
// including nil safety, precision truncation for Stellar, and various value ranges.
func TestToken_NewAmountOf(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name          string
		token         *Token
		value         decimal.Decimal
		wantNil       bool
		wantValue     string // Expected value as string for comparison
		wantTruncated bool   // Whether value should be truncated
	}{
		{
			name:    "nil receiver returns nil",
			token:   nil,
			value:   decimal.NewFromFloat(100.0),
			wantNil: true,
		},
		{
			name: "stellar ledger truncates to 7 decimals",
			token: &Token{
				Code:   "USD",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			value:         decimal.RequireFromString("123.456789012345"),
			wantNil:       false,
			wantValue:     "123.4567890",
			wantTruncated: true,
		},
		{
			name: "stellar ledger with exactly 7 decimals",
			token: &Token{
				Code:   "USD",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			value:         decimal.RequireFromString("123.4567890"),
			wantNil:       false,
			wantValue:     "123.4567890",
			wantTruncated: false,
		},
		{
			name: "stellar ledger with less than 7 decimals",
			token: &Token{
				Code:   "USD",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			value:     decimal.RequireFromString("123.45"),
			wantNil:   false,
			wantValue: "123.45",
		},
		{
			name: "non-stellar ledger preserves full precision",
			token: &Token{
				Code:   "ETH",
				Issuer: "ETHEREUM",
				Ledger: Ledger_LEDGER_ETHEREUM,
			},
			value:     decimal.RequireFromString("123.456789012345678901234567890"),
			wantNil:   false,
			wantValue: "123.456789012345678901234567890",
		},
		{
			name: "zero value",
			token: &Token{
				Code:   "USD",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			value:     decimal.Zero,
			wantNil:   false,
			wantValue: "0",
		},
		{
			name: "negative value",
			token: &Token{
				Code:   "USD",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			value:     decimal.NewFromFloat(-123.456789),
			wantNil:   false,
			wantValue: "-123.4567890",
		},
		{
			name: "large value",
			token: &Token{
				Code:   "BTC",
				Issuer: "BITCOIN",
				Ledger: Ledger_LEDGER_BITCOIN,
			},
			value:     decimal.RequireFromString("999999999999.123456789"),
			wantNil:   false,
			wantValue: "999999999999.123456789",
		},
		{
			name: "unspecified ledger preserves precision",
			token: &Token{
				Code:   "TOKEN",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_UNSPECIFIED,
			},
			value:     decimal.RequireFromString("100.123456789012345"),
			wantNil:   false,
			wantValue: "100.123456789012345",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.token.NewAmountOf(tt.value)

			if tt.wantNil {
				if got != nil {
					t.Errorf("NewAmountOf() = %v, want nil", got)
				}
				return
			}

			if got == nil {
				t.Fatal("NewAmountOf() returned nil, expected non-nil Amount")
			}

			// Verify the token reference is correct
			if got.Token != tt.token {
				t.Errorf("NewAmountOf().Token = %p, want %p", got.Token, tt.token)
			}

			// Convert back to shopspring decimal for comparison
			gotDecimal := got.Value.ToShopspring()
			wantDecimal := decimal.RequireFromString(tt.wantValue)

			if !gotDecimal.Equal(wantDecimal) {
				t.Errorf("NewAmountOf().Value = %s, want %s", gotDecimal.String(), wantDecimal.String())
			}
		})
	}
}

// TestToken_IsEqualTo verifies token equality comparison with comprehensive nil handling
// and field-level difference detection.
func TestToken_IsEqualTo(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		t1   *Token
		t2   *Token
		want bool
	}{
		{
			name: "both nil tokens are equal",
			t1:   nil,
			t2:   nil,
			want: true,
		},
		{
			name: "first nil, second non-nil - not equal",
			t1:   nil,
			t2: &Token{
				Code:   "USD",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			want: false,
		},
		{
			name: "first non-nil, second nil - not equal",
			t1: &Token{
				Code:   "USD",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			t2:   nil,
			want: false,
		},
		{
			name: "identical tokens are equal",
			t1: &Token{
				Code:   "USD",
				Issuer: "ISSUER1",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			t2: &Token{
				Code:   "USD",
				Issuer: "ISSUER1",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			want: true,
		},
		{
			name: "different code - not equal",
			t1: &Token{
				Code:   "USD",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			t2: &Token{
				Code:   "EUR",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			want: false,
		},
		{
			name: "different issuer - not equal",
			t1: &Token{
				Code:   "USD",
				Issuer: "ISSUER1",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			t2: &Token{
				Code:   "USD",
				Issuer: "ISSUER2",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			want: false,
		},
		{
			name: "different ledger - not equal",
			t1: &Token{
				Code:   "USD",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			t2: &Token{
				Code:   "USD",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_ETHEREUM,
			},
			want: false,
		},
		{
			name: "both undefined tokens are equal",
			t1:   NewUndefinedToken(),
			t2:   NewUndefinedToken(),
			want: true,
		},
		{
			name: "empty tokens are equal",
			t1:   &Token{},
			t2:   &Token{},
			want: true,
		},
		{
			name: "tokens with empty strings but same values are equal",
			t1: &Token{
				Code:   "",
				Issuer: "",
				Ledger: Ledger_LEDGER_UNSPECIFIED,
			},
			t2: &Token{
				Code:   "",
				Issuer: "",
				Ledger: Ledger_LEDGER_UNSPECIFIED,
			},
			want: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.t1.IsEqualTo(tt.t2)

			if got != tt.want {
				t.Errorf("IsEqualTo() = %v, want %v", got, tt.want)
			}

			// Verify symmetry: t1.IsEqualTo(t2) == t2.IsEqualTo(t1)
			got2 := tt.t2.IsEqualTo(tt.t1)
			if got != got2 {
				t.Errorf("IsEqualTo() not symmetric: t1.IsEqualTo(t2)=%v but t2.IsEqualTo(t1)=%v", got, got2)
			}
		})
	}
}

// TestToken_IsUndefined verifies undefined token detection with nil safety
// and proper pattern matching.
func TestToken_IsUndefined(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name  string
		token *Token
		want  bool
	}{
		{
			name:  "nil token is undefined",
			token: nil,
			want:  true,
		},
		{
			name:  "token from NewUndefinedToken is undefined",
			token: NewUndefinedToken(),
			want:  true,
		},
		{
			name: "manually created undefined token is undefined",
			token: &Token{
				Code:   "-",
				Issuer: "-",
				Ledger: Ledger_LEDGER_UNSPECIFIED,
			},
			want: true,
		},
		{
			name: "normal stellar token is not undefined",
			token: &Token{
				Code:   "USD",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			want: false,
		},
		{
			name: "token with only undefined code is not undefined",
			token: &Token{
				Code:   "-",
				Issuer: "ISSUER",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			want: false,
		},
		{
			name: "token with only undefined issuer is not undefined",
			token: &Token{
				Code:   "USD",
				Issuer: "-",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			want: false,
		},
		{
			name: "token with code and issuer '-' but specified ledger is not undefined",
			token: &Token{
				Code:   "-",
				Issuer: "-",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			want: false,
		},
		{
			name: "empty token is not undefined (different from undefined pattern)",
			token: &Token{
				Code:   "",
				Issuer: "",
				Ledger: Ledger_LEDGER_UNSPECIFIED,
			},
			want: false,
		},
		{
			name: "bitcoin token is not undefined",
			token: &Token{
				Code:   "BTC",
				Issuer: "BITCOIN_NETWORK",
				Ledger: Ledger_LEDGER_BITCOIN,
			},
			want: false,
		},
		{
			name: "ethereum token is not undefined",
			token: &Token{
				Code:   "ETH",
				Issuer: "ETHEREUM_NETWORK",
				Ledger: Ledger_LEDGER_ETHEREUM,
			},
			want: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.token.IsUndefined()

			if got != tt.want {
				t.Errorf("IsUndefined() = %v, want %v", got, tt.want)
			}
		})
	}
}

// TestToken_PrettyString verifies human-readable string formatting with nil safety.
func TestToken_PrettyString(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name  string
		token *Token
		want  string
	}{
		{
			name:  "nil token returns 'undefined'",
			token: nil,
			want:  "undefined",
		},
		{
			name:  "undefined token returns 'undefined'",
			token: NewUndefinedToken(),
			want:  "undefined",
		},
		{
			name: "manually created undefined token returns 'undefined'",
			token: &Token{
				Code:   "-",
				Issuer: "-",
				Ledger: Ledger_LEDGER_UNSPECIFIED,
			},
			want: "undefined",
		},
		{
			name: "normal stellar token formats correctly",
			token: &Token{
				Code:   "USD",
				Issuer: "CIRCLE",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			want: "USD by CIRCLE on Stellar",
		},
		{
			name: "bitcoin token formats correctly",
			token: &Token{
				Code:   "BTC",
				Issuer: "BITCOIN_NETWORK",
				Ledger: Ledger_LEDGER_BITCOIN,
			},
			want: "BTC by BITCOIN_NETWORK on Bitcoin",
		},
		{
			name: "ethereum token formats correctly",
			token: &Token{
				Code:   "ETH",
				Issuer: "ETHEREUM_NETWORK",
				Ledger: Ledger_LEDGER_ETHEREUM,
			},
			want: "ETH by ETHEREUM_NETWORK on Ethereum",
		},
		{
			name: "token with empty code and issuer",
			token: &Token{
				Code:   "",
				Issuer: "",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			want: " by  on Stellar",
		},
		{
			name: "token with special characters in code",
			token: &Token{
				Code:   "USD-T",
				Issuer: "TETHER",
				Ledger: Ledger_LEDGER_ETHEREUM,
			},
			want: "USD-T by TETHER on Ethereum",
		},
		{
			name: "token with long issuer name",
			token: &Token{
				Code:   "USDC",
				Issuer: "GAKRW3JXRQYJHTKQRUJLNVT7QI2EE3X6ZFHQKZBQPMDWURZQNZQ5NN6C",
				Ledger: Ledger_LEDGER_STELLAR,
			},
			want: "USDC by GAKRW3JXRQYJHTKQRUJLNVT7QI2EE3X6ZFHQKZBQPMDWURZQNZQ5NN6C on Stellar",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.token.PrettyString()

			if got != tt.want {
				t.Errorf("PrettyString() = %q, want %q", got, tt.want)
			}
		})
	}
}

// TestToken_NilSafetyIntegration verifies that all methods handle nil receivers gracefully
// and don't panic. This is a critical safety test.
func TestToken_NilSafetyIntegration(t *testing.T) {
	t.Parallel()

	var nilToken *Token = nil

	t.Run("IsUndefined on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("IsUndefined() on nil token panicked: %v", r)
			}
		}()
		result := nilToken.IsUndefined()
		if !result {
			t.Error("IsUndefined() on nil token should return true")
		}
	})

	t.Run("IsEqualTo on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("IsEqualTo() on nil token panicked: %v", r)
			}
		}()
		result := nilToken.IsEqualTo(nil)
		if !result {
			t.Error("IsEqualTo(nil) on nil token should return true")
		}
	})

	t.Run("PrettyString on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("PrettyString() on nil token panicked: %v", r)
			}
		}()
		result := nilToken.PrettyString()
		if result != "undefined" {
			t.Errorf("PrettyString() on nil token = %q, want %q", result, "undefined")
		}
	})

	t.Run("NewAmountOf on nil does not panic", func(t *testing.T) {
		defer func() {
			if r := recover(); r != nil {
				t.Errorf("NewAmountOf() on nil token panicked: %v", r)
			}
		}()
		result := nilToken.NewAmountOf(decimal.NewFromInt(100))
		if result != nil {
			t.Errorf("NewAmountOf() on nil token = %v, want nil", result)
		}
	})
}

// BenchmarkToken_IsEqualTo benchmarks the token equality comparison.
func BenchmarkToken_IsEqualTo(b *testing.B) {
	token1 := &Token{
		Code:   "USD",
		Issuer: "ISSUER",
		Ledger: Ledger_LEDGER_STELLAR,
	}
	token2 := &Token{
		Code:   "USD",
		Issuer: "ISSUER",
		Ledger: Ledger_LEDGER_STELLAR,
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = token1.IsEqualTo(token2)
	}
}

// BenchmarkToken_IsUndefined benchmarks the undefined check (optimized version without allocation).
func BenchmarkToken_IsUndefined(b *testing.B) {
	token := &Token{
		Code:   "USD",
		Issuer: "ISSUER",
		Ledger: Ledger_LEDGER_STELLAR,
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = token.IsUndefined()
	}
}

// BenchmarkToken_NewAmountOf_Stellar benchmarks amount creation for Stellar tokens.
func BenchmarkToken_NewAmountOf_Stellar(b *testing.B) {
	token := &Token{
		Code:   "USD",
		Issuer: "ISSUER",
		Ledger: Ledger_LEDGER_STELLAR,
	}
	value := decimal.RequireFromString("123.456789012345")

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = token.NewAmountOf(value)
	}
}

// BenchmarkToken_PrettyString benchmarks the string formatting.
func BenchmarkToken_PrettyString(b *testing.B) {
	token := &Token{
		Code:   "USD",
		Issuer: "CIRCLE",
		Ledger: Ledger_LEDGER_STELLAR,
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = token.PrettyString()
	}
}
