package user_v1

import (
	"testing"

	"buf.build/go/protovalidate"
	role_v1 "github.com/meshtrade/api/go/iam/role/v1"
	"github.com/stretchr/testify/require"
)

// TestValidationDemo showcases the enhanced error messages from proto validation
func TestValidationDemo(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Log("=== Proto Validation Demo with Custom Error Messages ===")

	// Example 1: Completely invalid request
	t.Log("\n1. Testing completely invalid request:")
	invalidRequest := &AssignRoleToUserRequest{
		Email: "",                              // Empty email
		Group: "",                              // Empty group  
		Role:  role_v1.Role_ROLE_UNSPECIFIED, // Unspecified role
	}
	
	err = validator.Validate(invalidRequest)
	t.Logf("Validation errors:\n%s\n", err.Error())

	// Example 2: Invalid email format
	t.Log("2. Testing invalid email format:")
	invalidEmailRequest := &AssignRoleToUserRequest{
		Email: "not-an-email",
		Group: "admin-group",
		Role:  role_v1.Role_ROLE_COMPLIANCE_ADMIN,
	}
	
	err = validator.Validate(invalidEmailRequest)
	t.Logf("Validation errors:\n%s\n", err.Error())

	// Example 3: Valid request (should pass)
	t.Log("3. Testing valid request:")
	validRequest := &AssignRoleToUserRequest{
		Email: "user@example.com",
		Group: "admin-group",
		Role:  role_v1.Role_ROLE_COMPLIANCE_ADMIN,
	}
	
	err = validator.Validate(validRequest)
	if err != nil {
		t.Logf("Unexpected validation error: %s", err.Error())
	} else {
		t.Log("✅ Valid request passed validation successfully!")
	}

	t.Log("\n=== Demo Complete ===")
}