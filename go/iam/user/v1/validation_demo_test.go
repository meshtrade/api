package user_v1

import (
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/require"
)

// TestValidationDemo showcases the enhanced error messages from proto validation
func TestValidationDemo(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Log("=== Proto Validation Demo with Custom Error Messages ===")

	// Example 1: Completely invalid request
	t.Log("\n1. Testing completely invalid request:")
	invalidRequest := &AssignRolesToUserRequest{
		Name:  "",         // Empty name
		Roles: []string{}, // Empty roles
	}
	
	err = validator.Validate(invalidRequest)
	t.Logf("Validation errors:\n%s\n", err.Error())

	// Example 2: Invalid name format
	t.Log("2. Testing invalid name format:")
	invalidNameRequest := &AssignRolesToUserRequest{
		Name:  "not-a-valid-name",
		Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1000000"},
	}
	
	err = validator.Validate(invalidNameRequest)
	t.Logf("Validation errors:\n%s\n", err.Error())

	// Example 3: Valid request (should pass)
	t.Log("3. Testing valid request:")
	validRequest := &AssignRolesToUserRequest{
		Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
		Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1000000"},
	}
	
	err = validator.Validate(validRequest)
	if err != nil {
		t.Logf("Unexpected validation error: %s", err.Error())
	} else {
		t.Log("✅ Valid request passed validation successfully!")
	}

	t.Log("\n=== Demo Complete ===")
}