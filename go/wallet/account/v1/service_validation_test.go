package account_v1

import (
	"strings"
	"testing"

	"buf.build/go/protovalidate"
	"github.com/meshtrade/api/go/type/v1"
)

func TestCreateAccountRequest_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name    string
		request *CreateAccountRequest
		wantErr bool
		errMsg  string
	}{
		{
			name: "valid create account request",
			request: &CreateAccountRequest{
				Account: &Account{
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Ledger:      type_v1.Ledger_LEDGER_STELLAR,
					DisplayName: "My New Account",
				},
			},
			wantErr: false,
		},
		{
			name: "missing account field",
			request: &CreateAccountRequest{
				Account: nil, // Required field missing
			},
			wantErr: true,
			errMsg:  "account",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.request)
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

func TestUpdateAccountRequest_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name    string
		request *UpdateAccountRequest
		wantErr bool
		errMsg  string
	}{
		{
			name: "valid update account request",
			request: &UpdateAccountRequest{
				Account: &Account{
					Name:        "accounts/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Ledger:      type_v1.Ledger_LEDGER_STELLAR,
					DisplayName: "Updated Account Name",
				},
			},
			wantErr: false,
		},
		{
			name: "missing account field",
			request: &UpdateAccountRequest{
				Account: nil, // Required field missing
			},
			wantErr: true,
			errMsg:  "account",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.request)
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

func TestOpenAccountRequest_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name    string
		request *OpenAccountRequest
		wantErr bool
		errMsg  string
	}{
		{
			name: "valid open account request",
			request: &OpenAccountRequest{
				Name: "accounts/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantErr: false,
		},
		{
			name: "invalid name format - wrong length",
			request: &OpenAccountRequest{
				Name: "accounts/01ARZ3NDEKTSV4RRFFQ69G5FA", // Too short by 1 char
			},
			wantErr: true,
			errMsg:  "name",
		},
		{
			name: "invalid name format - wrong pattern",
			request: &OpenAccountRequest{
				Name: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Wrong resource type
			},
			wantErr: true,
			errMsg:  "name",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.request)
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

func TestCloseAccountRequest_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name    string
		request *CloseAccountRequest
		wantErr bool
		errMsg  string
	}{
		{
			name: "valid close account request",
			request: &CloseAccountRequest{
				Name: "accounts/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantErr: false,
		},
		{
			name: "invalid name format - wrong length",
			request: &CloseAccountRequest{
				Name: "accounts/01ARZ3NDEKTSV4RRFFQ69G5FA", // Too short by 1 char
			},
			wantErr: true,
			errMsg:  "name",
		},
		{
			name: "invalid name format - wrong pattern",
			request: &CloseAccountRequest{
				Name: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Wrong resource type
			},
			wantErr: true,
			errMsg:  "name",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.request)
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

func TestGetAccountRequest_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name    string
		request *GetAccountRequest
		wantErr bool
		errMsg  string
	}{
		{
			name: "valid get account request",
			request: &GetAccountRequest{
				Name:                "accounts/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				PopulateLedgerData: true,
			},
			wantErr: false,
		},
		{
			name: "valid get account request without ledger data",
			request: &GetAccountRequest{
				Name:                "accounts/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				PopulateLedgerData: false,
			},
			wantErr: false,
		},
		{
			name: "invalid name format - wrong length",
			request: &GetAccountRequest{
				Name: "accounts/01ARZ3NDEKTSV4RRFFQ69G5FA", // Too short by 1 char
			},
			wantErr: true,
			errMsg:  "name",
		},
		{
			name: "invalid name format - wrong pattern",
			request: &GetAccountRequest{
				Name: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Wrong resource type
			},
			wantErr: true,
			errMsg:  "name",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.request)
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

func TestGetAccountByNumberRequest_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name    string
		request *GetAccountByNumberRequest
		wantErr bool
		errMsg  string
	}{
		{
			name: "valid get account by number request",
			request: &GetAccountByNumberRequest{
				AccountNumber:      "1234567",
				PopulateLedgerData: true,
			},
			wantErr: false,
		},
		{
			name: "valid get account by number request without ledger data",
			request: &GetAccountByNumberRequest{
				AccountNumber:      "1987654",
				PopulateLedgerData: false,
			},
			wantErr: false,
		},
		{
			name: "invalid account number - wrong length",
			request: &GetAccountByNumberRequest{
				AccountNumber: "123456", // Too short
			},
			wantErr: true,
			errMsg:  "account_number",
		},
		{
			name: "invalid account number - doesn't start with 1",
			request: &GetAccountByNumberRequest{
				AccountNumber: "2234567", // Must start with 1
			},
			wantErr: true,
			errMsg:  "account_number",
		},
		{
			name: "invalid account number - contains letters",
			request: &GetAccountByNumberRequest{
				AccountNumber: "123456A", // Must be digits only
			},
			wantErr: true,
			errMsg:  "account_number",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.request)
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

func TestListAccountsRequest_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name    string
		request *ListAccountsRequest
		wantErr bool
		errMsg  string
	}{
		{
			name: "valid list accounts request with number sorting",
			request: &ListAccountsRequest{
				Sorting: &ListAccountsRequest_Sorting{
					Field: "number",
					Order: type_v1.SortingOrder_SORTING_ORDER_ASC,
				},
				PopulateLedgerData: true,
			},
			wantErr: false,
		},
		{
			name: "valid list accounts request with empty sorting",
			request: &ListAccountsRequest{
				Sorting: &ListAccountsRequest_Sorting{
					Field: "",
					Order: type_v1.SortingOrder_SORTING_ORDER_DESC,
				},
				PopulateLedgerData: false,
			},
			wantErr: false,
		},
		{
			name: "valid list accounts request without sorting",
			request: &ListAccountsRequest{
				PopulateLedgerData: false,
			},
			wantErr: false,
		},
		{
			name: "invalid sorting field",
			request: &ListAccountsRequest{
				Sorting: &ListAccountsRequest_Sorting{
					Field: "invalid_field", // Not in allowed list
					Order: type_v1.SortingOrder_SORTING_ORDER_ASC,
				},
			},
			wantErr: true,
			errMsg:  "field",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.request)
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

func TestSearchAccountsRequest_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name    string
		request *SearchAccountsRequest
		wantErr bool
		errMsg  string
	}{
		{
			name: "valid search accounts request",
			request: &SearchAccountsRequest{
				Sorting: &SearchAccountsRequest_Sorting{
					Field: "number",
					Order: type_v1.SortingOrder_SORTING_ORDER_ASC,
				},
				DisplayName:        "My Account",
				PopulateLedgerData: true,
			},
			wantErr: false,
		},
		{
			name: "valid search accounts request with empty display name",
			request: &SearchAccountsRequest{
				Sorting: &SearchAccountsRequest_Sorting{
					Field: "",
					Order: type_v1.SortingOrder_SORTING_ORDER_DESC,
				},
				DisplayName:        "",
				PopulateLedgerData: false,
			},
			wantErr: false,
		},
		{
			name: "valid search accounts request without sorting",
			request: &SearchAccountsRequest{
				DisplayName: "Test",
			},
			wantErr: false,
		},
		{
			name: "invalid sorting field",
			request: &SearchAccountsRequest{
				Sorting: &SearchAccountsRequest_Sorting{
					Field: "invalid_field", // Not in allowed list
					Order: type_v1.SortingOrder_SORTING_ORDER_ASC,
				},
				DisplayName: "Test Account",
			},
			wantErr: true,
			errMsg:  "field",
		},
		{
			name: "display_name too long",
			request: &SearchAccountsRequest{
				DisplayName: strings.Repeat("a", 256), // Exceeds 255 chars
			},
			wantErr: true,
			errMsg:  "display_name",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.request)
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

// Response message tests (should have no validation rules)

func TestOpenAccountResponse_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name     string
		response *OpenAccountResponse
		wantErr  bool
	}{
		{
			name: "valid open account response",
			response: &OpenAccountResponse{
				Account: &Account{
					Name:        "accounts/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Ledger:      type_v1.Ledger_LEDGER_STELLAR,
					DisplayName: "Opened Account",
					State:       AccountState_ACCOUNT_STATE_OPEN,
				},
				LedgerTransaction: "transactions/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantErr: false,
		},
		{
			name: "empty open account response",
			response: &OpenAccountResponse{},
			wantErr:  false, // No validation constraints on response
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.response)
			if tt.wantErr {
				if err == nil {
					t.Errorf("expected validation error but got none")
				}
			} else {
				if err != nil {
					t.Errorf("unexpected validation error: %v", err)
				}
			}
		})
	}
}

func TestCloseAccountResponse_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name     string
		response *CloseAccountResponse
		wantErr  bool
	}{
		{
			name: "valid close account response",
			response: &CloseAccountResponse{
				Account: &Account{
					Name:        "accounts/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Ledger:      type_v1.Ledger_LEDGER_STELLAR,
					DisplayName: "Closed Account",
					State:       AccountState_ACCOUNT_STATE_CLOSED,
				},
				LedgerTransaction: "transactions/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantErr: false,
		},
		{
			name: "empty close account response",
			response: &CloseAccountResponse{},
			wantErr:  false, // No validation constraints on response
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.response)
			if tt.wantErr {
				if err == nil {
					t.Errorf("expected validation error but got none")
				}
			} else {
				if err != nil {
					t.Errorf("unexpected validation error: %v", err)
				}
			}
		})
	}
}

func TestListAccountsResponse_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name     string
		response *ListAccountsResponse
		wantErr  bool
	}{
		{
			name: "valid list accounts response",
			response: &ListAccountsResponse{
				Accounts: []*Account{
					{
						Name:        "accounts/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Ledger:      type_v1.Ledger_LEDGER_STELLAR,
						DisplayName: "Account 1",
					},
				},
			},
			wantErr: false,
		},
		{
			name: "empty list accounts response",
			response: &ListAccountsResponse{
				Accounts: []*Account{},
			},
			wantErr: false, // No validation constraints on response
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.response)
			if tt.wantErr {
				if err == nil {
					t.Errorf("expected validation error but got none")
				}
			} else {
				if err != nil {
					t.Errorf("unexpected validation error: %v", err)
				}
			}
		})
	}
}

func TestSearchAccountsResponse_Validation(t *testing.T) {
	v, err := protovalidate.New()
	if err != nil {
		t.Fatalf("failed to initialize validator: %v", err)
	}

	tests := []struct {
		name     string
		response *SearchAccountsResponse
		wantErr  bool
	}{
		{
			name: "valid search accounts response",
			response: &SearchAccountsResponse{
				Accounts: []*Account{
					{
						Name:        "accounts/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Ledger:      type_v1.Ledger_LEDGER_STELLAR,
						DisplayName: "Matching Account",
					},
				},
			},
			wantErr: false,
		},
		{
			name: "empty search accounts response",
			response: &SearchAccountsResponse{
				Accounts: []*Account{},
			},
			wantErr: false, // No validation constraints on response
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Validate(tt.response)
			if tt.wantErr {
				if err == nil {
					t.Errorf("expected validation error but got none")
				}
			} else {
				if err != nil {
					t.Errorf("unexpected validation error: %v", err)
				}
			}
		})
	}
}

