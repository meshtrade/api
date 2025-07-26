package rolev1

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
			expected: "groups/test-group-123/1",
		},
		{
			name:     "compliance viewer role",
			role:     Role_ROLE_COMPLIANCE_VIEWER,
			groupID:  "compliance-team",
			expected: "groups/compliance-team/4",
		},
		{
			name:     "iam admin role",
			role:     Role_ROLE_IAM_ADMIN,
			groupID:  "admin-group",
			expected: "groups/admin-group/5",
		},
		{
			name:     "trading viewer role",
			role:     Role_ROLE_TRADING_VIEWER,
			groupID:  "trading-viewers",
			expected: "groups/trading-viewers/10",
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
			fullResourceName: "groups/test-group/1",
			expectedRole:     Role_ROLE_WALLET_ADMIN,
			expectedError:    false,
		},
		{
			name:             "valid compliance viewer role",
			fullResourceName: "groups/compliance-team/4",
			expectedRole:     Role_ROLE_COMPLIANCE_VIEWER,
			expectedError:    false,
		},
		{
			name:             "valid iam admin role",
			fullResourceName: "groups/admin-group/5",
			expectedRole:     Role_ROLE_IAM_ADMIN,
			expectedError:    false,
		},
		{
			name:             "valid trading viewer role",
			fullResourceName: "groups/trading-viewers/10",
			expectedRole:     Role_ROLE_TRADING_VIEWER,
			expectedError:    false,
		},
		{
			name:             "valid role unspecified",
			fullResourceName: "groups/test-group/0",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    false,
		},
		{
			name:             "invalid format - missing groups prefix",
			fullResourceName: "test-group/1",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    true,
		},
		{
			name:             "invalid format - wrong prefix",
			fullResourceName: "users/test-group/1",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    true,
		},
		{
			name:             "invalid format - too many parts",
			fullResourceName: "groups/test-group/1/extra",
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
			name:             "invalid role number - not a number",
			fullResourceName: "groups/test-group/abc",
			expectedRole:     Role_ROLE_UNSPECIFIED,
			expectedError:    true,
		},
		{
			name:             "invalid role number - negative",
			fullResourceName: "groups/test-group/-1",
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
		fullResourceName := "groups/test-group/1"
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
