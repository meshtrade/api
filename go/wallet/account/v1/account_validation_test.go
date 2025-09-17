package account_v1

import (
	"testing"

	"buf.build/go/protovalidate"
	"github.com/meshtrade/api/go/studio/instrument/v1"
	"github.com/meshtrade/api/go/type/v1"
)

func TestAccount_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name    string
		account *Account
		wantErr bool
		errMsg  string
	}{
		{
			name: "valid account with all required fields",
			account: &Account{
				Name:        "accounts/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Valid ULIDv2 but optional
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Number:      "1234567", // Valid but optional
				LedgerId:    "GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37", // Stellar address example
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "My Test Account",
				State:       AccountState_ACCOUNT_STATE_OPEN,
			},
			wantErr: false,
		},
		{
			name: "valid account with minimal required fields",
			account: &Account{
				Name:        "", // Empty name is valid (system-generated)
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Number:      "", // Empty number is valid (system-generated) 
				LedgerId:    "",
				Ledger:      type_v1.Ledger_LEDGER_BITCOIN,
				DisplayName: "A",
				State:       AccountState_ACCOUNT_STATE_CLOSED,
			},
			wantErr: false,
		},
		{
			name: "missing owner field",
			account: &Account{
				Name:        "",
				Owner:       "", // Required field missing
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "owner",
		},
		{
			name: "invalid owner format - wrong length",
			account: &Account{
				Name:        "",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FA", // Too short by 1 char
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "owner",
		},
		{
			name: "invalid owner format - wrong pattern",
			account: &Account{
				Name:        "",
				Owner:       "users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Wrong resource type
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "owner",
		},
		{
			name: "invalid owner format - lowercase chars",
			account: &Account{
				Name:        "",
				Owner:       "groups/01arz3ndektsv4rrffq69g5fav", // Lowercase not allowed in ULIDv2
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "owner",
		},
		{
			name: "invalid owners array - wrong length",
			account: &Account{
				Name:        "",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "owners",
		},
		{
			name: "invalid owners array - wrong pattern",
			account: &Account{
				Name:        "",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "owners",
		},
		{
			name: "invalid name format - wrong length", 
			account: &Account{
				Name:        "accounts/01ARZ3NDEKTSV4RRFFQ69G5FA", // Too short by 1 char
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "name",
		},
		{
			name: "invalid name format - wrong pattern",
			account: &Account{
				Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Wrong resource type
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "name",
		},
		{
			name: "invalid number format - wrong length",
			account: &Account{
				Name:        "",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Number:      "123456", // Too short
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "number",
		},
		{
			name: "invalid number format - doesn't start with 1",
			account: &Account{
				Name:        "",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Number:      "2234567", // Must start with 1
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "number",
		},
		{
			name: "invalid ledger_id - too long",
			account: &Account{
				Name:        "",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				LedgerId:    "a" + string(make([]byte, 255)), // Exceeds 255 chars
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "ledger_id",
		},
		{
			name: "missing ledger field",
			account: &Account{
				Name:        "",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Ledger:      type_v1.Ledger_LEDGER_UNSPECIFIED, // Not allowed
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "ledger",
		},
		{
			name: "missing display_name field",
			account: &Account{
				Name:        "",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: "", // Required field missing
			},
			wantErr: true,
			errMsg:  "display_name",
		},
		{
			name: "display_name too long",
			account: &Account{
				Name:        "",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Ledger:      type_v1.Ledger_LEDGER_STELLAR,
				DisplayName: string(make([]byte, 256)), // Exceeds 255 chars
			},
			wantErr: true,
			errMsg:  "display_name",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.account)
			if tt.wantErr {
				if err == nil {
					t.Errorf("expected validation error but got none")
				} else if tt.errMsg != "" && !containsError(err.Error(), tt.errMsg) {
					t.Errorf("expected error containing %q, got %q", tt.errMsg, err.Error())
				}
			} else {
				if err != nil {
					t.Errorf("unexpected validation error: %v", err)
				}
			}
		})
	}
}

func TestInstrumentMetaData_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name         string
		metadata     *InstrumentMetaData
		wantErr      bool
		errMsg       string
	}{
		{
			name: "valid instrument metadata",
			metadata: &InstrumentMetaData{
				Name: "Apple Inc.",
				Type: instrument_v1.InstrumentType_INSTRUMENT_TYPE_SHARE,
				Unit: instrument_v1.Unit_UNIT_SHARE,
			},
			wantErr: false,
		},
		{
			name: "valid instrument metadata - cryptocurrency",
			metadata: &InstrumentMetaData{
				Name: "Bitcoin",
				Type: instrument_v1.InstrumentType_INSTRUMENT_TYPE_CRYPTO_CURRENCY,
				Unit: instrument_v1.Unit_UNIT_TOKEN,
			},
			wantErr: false,
		},
		{
			name: "empty metadata fields",
			metadata: &InstrumentMetaData{
				Name: "",
				Type: instrument_v1.InstrumentType_INSTRUMENT_TYPE_UNSPECIFIED,
				Unit: instrument_v1.Unit_UNIT_UNSPECIFIED,
			},
			wantErr: false, // No validation constraints defined in proto
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.metadata)
			if tt.wantErr {
				if err == nil {
					t.Errorf("expected validation error but got none")
				} else if tt.errMsg != "" && !containsError(err.Error(), tt.errMsg) {
					t.Errorf("expected error containing %q, got %q", tt.errMsg, err.Error())
				}
			} else {
				if err != nil {
					t.Errorf("unexpected validation error: %v", err)
				}
			}
		})
	}
}

func TestBalance_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name    string
		balance *Balance
		wantErr bool
		errMsg  string
	}{
		{
			name: "valid balance with amount and metadata",
			balance: &Balance{
				Amount: &type_v1.Amount{
					Value: &type_v1.Decimal{
						Value: "100.50",
					},
					Token: &type_v1.Token{
						Code:   "AAPL",
						Issuer: "__LEDGER__",
						Ledger: type_v1.Ledger_LEDGER_STELLAR,
					},
				},
				InstrumentMetadata: &InstrumentMetaData{
					Name: "Apple Inc.",
					Type: instrument_v1.InstrumentType_INSTRUMENT_TYPE_SHARE,
					Unit: instrument_v1.Unit_UNIT_SHARE,
				},
			},
			wantErr: false,
		},
		{
			name: "valid balance with nil amount and metadata",
			balance: &Balance{
				Amount:             nil, // No validation constraints defined
				InstrumentMetadata: nil, // No validation constraints defined
			},
			wantErr: false,
		},
		{
			name: "empty balance",
			balance: &Balance{},
			wantErr: false, // No validation constraints defined in proto
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.balance)
			if tt.wantErr {
				if err == nil {
					t.Errorf("expected validation error but got none")
				} else if tt.errMsg != "" && !containsError(err.Error(), tt.errMsg) {
					t.Errorf("expected error containing %q, got %q", tt.errMsg, err.Error())
				}
			} else {
				if err != nil {
					t.Errorf("unexpected validation error: %v", err)
				}
			}
		})
	}
}

// Helper function to check if error message contains expected substring
func containsError(errMsg, expected string) bool {
	return len(errMsg) > 0 && len(expected) > 0 && 
		(errMsg == expected || 
		 (len(errMsg) > len(expected) && 
		  (errMsg[:len(expected)] == expected || 
		   errMsg[len(errMsg)-len(expected):] == expected ||
		   containsSubstring(errMsg, expected))))
}

// Helper function to check substring match
func containsSubstring(str, substr string) bool {
	for i := 0; i <= len(str)-len(substr); i++ {
		if str[i:i+len(substr)] == substr {
			return true
		}
	}
	return false
}