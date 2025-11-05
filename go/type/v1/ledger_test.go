package type_v1

import "testing"

// TestLedger_IsValid verifies that IsValid correctly identifies valid and invalid ledger enum values.
func TestLedger_IsValid(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name   string
		ledger Ledger
		want   bool
	}{
		{
			name:   "LEDGER_UNSPECIFIED is valid",
			ledger: Ledger_LEDGER_UNSPECIFIED,
			want:   true,
		},
		{
			name:   "LEDGER_STELLAR is valid",
			ledger: Ledger_LEDGER_STELLAR,
			want:   true,
		},
		{
			name:   "LEDGER_BITCOIN is valid",
			ledger: Ledger_LEDGER_BITCOIN,
			want:   true,
		},
		{
			name:   "LEDGER_LITECOIN is valid",
			ledger: Ledger_LEDGER_LITECOIN,
			want:   true,
		},
		{
			name:   "LEDGER_ETHEREUM is valid",
			ledger: Ledger_LEDGER_ETHEREUM,
			want:   true,
		},
		{
			name:   "LEDGER_XRP is valid",
			ledger: Ledger_LEDGER_XRP,
			want:   true,
		},
		{
			name:   "LEDGER_SA_STOCK_BROKERS is valid",
			ledger: Ledger_LEDGER_SA_STOCK_BROKERS,
			want:   true,
		},
		{
			name:   "LEDGER_NULL is valid",
			ledger: Ledger_LEDGER_NULL,
			want:   true,
		},
		{
			name:   "invalid ledger value 999 is not valid",
			ledger: Ledger(999),
			want:   false,
		},
		{
			name:   "invalid ledger value -1 is not valid",
			ledger: Ledger(-1),
			want:   false,
		},
		{
			name:   "invalid ledger value 100 is not valid",
			ledger: Ledger(100),
			want:   false,
		},
		{
			name:   "zero value (UNSPECIFIED) is valid",
			ledger: Ledger(0),
			want:   true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.ledger.IsValid()

			if got != tt.want {
				t.Errorf("Ledger(%d).IsValid() = %v, want %v", tt.ledger, got, tt.want)
			}
		})
	}
}

// TestLedger_IsValidAndDefined verifies that IsValidAndDefined correctly identifies
// valid defined ledgers (excluding LEDGER_UNSPECIFIED).
func TestLedger_IsValidAndDefined(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name   string
		ledger Ledger
		want   bool
	}{
		{
			name:   "LEDGER_UNSPECIFIED is not valid and defined",
			ledger: Ledger_LEDGER_UNSPECIFIED,
			want:   false,
		},
		{
			name:   "LEDGER_STELLAR is valid and defined",
			ledger: Ledger_LEDGER_STELLAR,
			want:   true,
		},
		{
			name:   "LEDGER_BITCOIN is valid and defined",
			ledger: Ledger_LEDGER_BITCOIN,
			want:   true,
		},
		{
			name:   "LEDGER_LITECOIN is valid and defined",
			ledger: Ledger_LEDGER_LITECOIN,
			want:   true,
		},
		{
			name:   "LEDGER_ETHEREUM is valid and defined",
			ledger: Ledger_LEDGER_ETHEREUM,
			want:   true,
		},
		{
			name:   "LEDGER_XRP is valid and defined",
			ledger: Ledger_LEDGER_XRP,
			want:   true,
		},
		{
			name:   "LEDGER_SA_STOCK_BROKERS is valid and defined",
			ledger: Ledger_LEDGER_SA_STOCK_BROKERS,
			want:   true,
		},
		{
			name:   "LEDGER_NULL is valid and defined",
			ledger: Ledger_LEDGER_NULL,
			want:   true,
		},
		{
			name:   "invalid ledger value 999 is not valid and defined",
			ledger: Ledger(999),
			want:   false,
		},
		{
			name:   "invalid ledger value -1 is not valid and defined",
			ledger: Ledger(-1),
			want:   false,
		},
		{
			name:   "zero value (UNSPECIFIED) is not valid and defined",
			ledger: Ledger(0),
			want:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.ledger.IsValidAndDefined()

			if got != tt.want {
				t.Errorf("Ledger(%d).IsValidAndDefined() = %v, want %v", tt.ledger, got, tt.want)
			}
		})
	}
}

// TestLedger_ToPrettyString verifies that ToPrettyString returns correct human-readable names
// for all ledger types.
func TestLedger_ToPrettyString(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name   string
		ledger Ledger
		want   string
	}{
		{
			name:   "LEDGER_STELLAR returns 'Stellar'",
			ledger: Ledger_LEDGER_STELLAR,
			want:   "Stellar",
		},
		{
			name:   "LEDGER_ETHEREUM returns 'Ethereum'",
			ledger: Ledger_LEDGER_ETHEREUM,
			want:   "Ethereum",
		},
		{
			name:   "LEDGER_BITCOIN returns 'Bitcoin'",
			ledger: Ledger_LEDGER_BITCOIN,
			want:   "Bitcoin",
		},
		{
			name:   "LEDGER_LITECOIN returns 'Litecoin'",
			ledger: Ledger_LEDGER_LITECOIN,
			want:   "Litecoin",
		},
		{
			name:   "LEDGER_XRP returns 'XRP'",
			ledger: Ledger_LEDGER_XRP,
			want:   "XRP",
		},
		{
			name:   "LEDGER_SA_STOCK_BROKERS returns 'SA Stock Brokers'",
			ledger: Ledger_LEDGER_SA_STOCK_BROKERS,
			want:   "SA Stock Brokers",
		},
		{
			name:   "LEDGER_NULL returns 'Null'",
			ledger: Ledger_LEDGER_NULL,
			want:   "Null",
		},
		{
			name:   "LEDGER_UNSPECIFIED returns 'Unspecified'",
			ledger: Ledger_LEDGER_UNSPECIFIED,
			want:   "Unspecified",
		},
		{
			name:   "invalid ledger value 999 returns 'Unknown'",
			ledger: Ledger(999),
			want:   "Unknown",
		},
		{
			name:   "invalid ledger value -1 returns 'Unknown'",
			ledger: Ledger(-1),
			want:   "Unknown",
		},
		{
			name:   "invalid ledger value 100 returns 'Unknown'",
			ledger: Ledger(100),
			want:   "Unknown",
		},
		{
			name:   "zero value (UNSPECIFIED) returns 'Unspecified'",
			ledger: Ledger(0),
			want:   "Unspecified",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := tt.ledger.ToPrettyString()

			if got != tt.want {
				t.Errorf("Ledger(%d).ToPrettyString() = %q, want %q", tt.ledger, got, tt.want)
			}
		})
	}
}

// TestLedger_CombinedValidation tests the interaction between IsValid, IsValidAndDefined,
// and ToPrettyString to ensure they work correctly together.
func TestLedger_CombinedValidation(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name              string
		ledger            Ledger
		wantIsValid       bool
		wantIsDefinedValid bool
		wantPrettyString  string
	}{
		{
			name:              "Stellar - valid, defined, pretty",
			ledger:            Ledger_LEDGER_STELLAR,
			wantIsValid:       true,
			wantIsDefinedValid: true,
			wantPrettyString:  "Stellar",
		},
		{
			name:              "Unspecified - valid but not defined",
			ledger:            Ledger_LEDGER_UNSPECIFIED,
			wantIsValid:       true,
			wantIsDefinedValid: false,
			wantPrettyString:  "Unspecified",
		},
		{
			name:              "Invalid value - not valid, not defined, unknown",
			ledger:            Ledger(999),
			wantIsValid:       false,
			wantIsDefinedValid: false,
			wantPrettyString:  "Unknown",
		},
		{
			name:              "Ethereum - valid, defined, pretty",
			ledger:            Ledger_LEDGER_ETHEREUM,
			wantIsValid:       true,
			wantIsDefinedValid: true,
			wantPrettyString:  "Ethereum",
		},
		{
			name:              "Bitcoin - valid, defined, pretty",
			ledger:            Ledger_LEDGER_BITCOIN,
			wantIsValid:       true,
			wantIsDefinedValid: true,
			wantPrettyString:  "Bitcoin",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			gotIsValid := tt.ledger.IsValid()
			if gotIsValid != tt.wantIsValid {
				t.Errorf("IsValid() = %v, want %v", gotIsValid, tt.wantIsValid)
			}

			gotIsDefinedValid := tt.ledger.IsValidAndDefined()
			if gotIsDefinedValid != tt.wantIsDefinedValid {
				t.Errorf("IsValidAndDefined() = %v, want %v", gotIsDefinedValid, tt.wantIsDefinedValid)
			}

			gotPrettyString := tt.ledger.ToPrettyString()
			if gotPrettyString != tt.wantPrettyString {
				t.Errorf("ToPrettyString() = %q, want %q", gotPrettyString, tt.wantPrettyString)
			}
		})
	}
}

// BenchmarkLedger_IsValid benchmarks the IsValid method.
func BenchmarkLedger_IsValid(b *testing.B) {
	ledger := Ledger_LEDGER_STELLAR

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = ledger.IsValid()
	}
}

// BenchmarkLedger_IsValidAndDefined benchmarks the IsValidAndDefined method.
func BenchmarkLedger_IsValidAndDefined(b *testing.B) {
	ledger := Ledger_LEDGER_STELLAR

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = ledger.IsValidAndDefined()
	}
}

// BenchmarkLedger_ToPrettyString benchmarks the ToPrettyString method.
func BenchmarkLedger_ToPrettyString(b *testing.B) {
	ledger := Ledger_LEDGER_STELLAR

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = ledger.ToPrettyString()
	}
}
