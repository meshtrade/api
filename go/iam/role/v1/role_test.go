package role_v1

import (
	"testing"
)

func TestFullResourceNameFromGroupID(t *testing.T) {
	tests := []struct {
		name     string
		role     Role
		groupID  string
		expected string
	}{
		{
			name:     "wallet admin role",
			role:     Role_ROLE_WALLET_ADMIN,
			groupID:  "test-group-123",
			expected: "groups/test-group-123/roles/1000000",
		},
		{
			name:     "compliance viewer role",
			role:     Role_ROLE_COMPLIANCE_VIEWER,
			groupID:  "compliance-team",
			expected: "groups/compliance-team/roles/2000001",
		},
		{
			name:     "iam admin role",
			role:     Role_ROLE_IAM_ADMIN,
			groupID:  "admin-group",
			expected: "groups/admin-group/roles/3000000",
		},
		{
			name:     "trading viewer role",
			role:     Role_ROLE_TRADING_VIEWER,
			groupID:  "trading-viewers",
			expected: "groups/trading-viewers/roles/5000001",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := tt.role.FullResourceNameFromGroupID(tt.groupID)
			if result != tt.expected {
				t.Errorf("FullResourceNameFromGroupID() = %v, expected %v", result, tt.expected)
			}
		})
	}
}

func TestRoleFromFullResourceName(t *testing.T) {
	tests := []struct {
		name             string
		fullResourceName string
		expectedRole     Role
		expectedError    bool
	}{
		{
			name:             "valid wallet admin role",
			fullResourceName: "groups/test-group/roles/1000000",
			expectedRole:     Role_ROLE_WALLET_ADMIN,
			expectedError:    false,
		},
		{
			name:             "valid compliance viewer role",
			fullResourceName: "groups/compliance-team/roles/2000001",
			expectedRole:     Role_ROLE_COMPLIANCE_VIEWER,
			expectedError:    false,
		},
		{
			name:             "valid iam admin role",
			fullResourceName: "groups/admin-group/roles/3000000",
			expectedRole:     Role_ROLE_IAM_ADMIN,
			expectedError:    false,
		},
		{
			name:             "valid trading viewer role",
			fullResourceName: "groups/trading-viewers/roles/5000001",
			expectedRole:     Role_ROLE_TRADING_VIEWER,
			expectedError:    false,
		},
		{
			name:             "valid role unspecified",
			fullResourceName: "groups/test-group/roles/0",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    false,
		},
		{
			name:             "invalid format - missing groups prefix",
			fullResourceName: "test-group/roles/1",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    true,
		},
		{
			name:             "invalid format - wrong prefix",
			fullResourceName: "users/test-group/roles/1",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    true,
		},
		{
			name:             "invalid format - too many parts",
			fullResourceName: "groups/test-group/roles/1/extra",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    true,
		},
		{
			name:             "invalid format - too few parts",
			fullResourceName: "groups/test-group",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    true,
		},
		{
			name:             "invalid format - missing roles part",
			fullResourceName: "groups/test-group/1",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    true,
		},
		{
			name:             "invalid role number - not a number",
			fullResourceName: "groups/test-group/roles/abc",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    true,
		},
		{
			name:             "invalid role number - negative",
			fullResourceName: "groups/test-group/roles/-1",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    true,
		},
		{
			name:             "empty string",
			fullResourceName: "",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			role, err := RoleFromFullResourceName(tt.fullResourceName)

			if tt.expectedError {
				if err == nil {
					t.Errorf("RoleFromFullResourceName() expected error but got none")
				}
			} else {
				if err != nil {
					t.Errorf("RoleFromFullResourceName() unexpected error: %v", err)
				}
			}

			if role != tt.expectedRole {
				t.Errorf("RoleFromFullResourceName() = %v, expected %v", role, tt.expectedRole)
			}
		})
	}
}

func TestMustRoleFromFullResourceName(t *testing.T) {
	t.Run("valid resource name", func(t *testing.T) {
		fullResourceName := "groups/test-group/roles/1000000"
		role := MustRoleFromFullResourceName(fullResourceName)
		if role != Role_ROLE_WALLET_ADMIN {
			t.Errorf("MustRoleFromFullResourceName() = %v, expected %v", role, Role_ROLE_WALLET_ADMIN)
		}
	})

	t.Run("panics on invalid resource name", func(t *testing.T) {
		defer func() {
			if r := recover(); r == nil {
				t.Errorf("MustRoleFromFullResourceName() should have panicked but didn't")
			}
		}()
		MustRoleFromFullResourceName("invalid-format")
	})
}

func TestRoundTrip(t *testing.T) {
	testCases := []struct {
		name    string
		role    Role
		groupID string
	}{
		{"wallet admin", Role_ROLE_WALLET_ADMIN, "test-group"},
		{"compliance viewer", Role_ROLE_COMPLIANCE_VIEWER, "compliance-team"},
		{"iam admin", Role_ROLE_IAM_ADMIN, "admin-group"},
		{"trading viewer", Role_ROLE_TRADING_VIEWER, "trading-viewers"},
		{"role unspecified", Role_ROLE_UNSPECIFIED, "unspecified-group"},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			fullResourceName := tc.role.FullResourceNameFromGroupID(tc.groupID)

			parsedRole, err := RoleFromFullResourceName(fullResourceName)
			if err != nil {
				t.Errorf("RoleFromFullResourceName() unexpected error: %v", err)
			}

			if parsedRole != tc.role {
				t.Errorf("Round trip failed: original=%v, parsed=%v", tc.role, parsedRole)
			}
		})
	}
}

func TestParseRoleParts(t *testing.T) {
	const groupID = "01ARZ3NDEKTSV4RRFFQ69G5FAV"
	const groupResourceName = "groups/" + groupID
	const validResourceName = "groups/" + groupID + "/roles/1000000"

	testCases := []struct {
		name     string
		input    string
		expGroup string
		expRole  Role
		expErr   bool
	}{
		{
			name:     "valid role resource",
			input:    validResourceName,
			expGroup: groupResourceName,
			expRole:  Role_ROLE_WALLET_ADMIN,
		},
		{
			name:   "invalid prefix",
			input:  "users/" + groupID + "/roles/1000000",
			expErr: true,
		},
		{
			name:   "missing role component",
			input:  "groups/" + groupID,
			expErr: true,
		},
		{
			name:   "invalid group id",
			input:  "groups/notaulid/roles/1000000",
			expErr: true,
		},
		{
			name:   "non numeric role",
			input:  "groups/" + groupID + "/roles/not-a-role",
			expErr: true,
		},
		{
			name:   "unspecified role value",
			input:  "groups/" + groupID + "/roles/0",
			expErr: true,
		},
		{
			name:   "missing roles keyword",
			input:  "groups/" + groupID + "/1000000",
			expErr: true,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			group, role, err := ParseRoleParts(tc.input)

			if tc.expErr {
				if err == nil {
					t.Fatalf("ParseRoleParts() expected error but got none")
				}
				return
			}

			if err != nil {
				t.Fatalf("ParseRoleParts() unexpected error: %v", err)
			}

			if group != tc.expGroup {
				t.Errorf("ParseRoleParts() group = %q, expected %q", group, tc.expGroup)
			}

			if role != tc.expRole {
				t.Errorf("ParseRoleParts() role = %v, expected %v", role, tc.expRole)
			}
		})
	}
}

func TestMustParseRoleParts(t *testing.T) {
	const groupID = "01ARZ3NDEKTSV4RRFFQ69G5FAV"
	const validResourceName = "groups/" + groupID + "/roles/1000000"

	t.Run("valid resource", func(t *testing.T) {
		group, role := MustParseRoleParts(validResourceName)
		if group != "groups/"+groupID {
			t.Errorf("MustParseRoleParts() group = %q, expected %q", group, "groups/"+groupID)
		}
		if role != Role_ROLE_WALLET_ADMIN {
			t.Errorf("MustParseRoleParts() role = %v, expected %v", role, Role_ROLE_WALLET_ADMIN)
		}
	})

	t.Run("panics on invalid resource", func(t *testing.T) {
		defer func() {
			if r := recover(); r == nil {
				t.Errorf("MustParseRoleParts() should have panicked but did not")
			}
		}()
		MustParseRoleParts("invalid-resource")
	})
}
