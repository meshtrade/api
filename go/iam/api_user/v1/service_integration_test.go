package api_user_v1

import (
	"context"
	"strings"
	"testing"
	"time"

	"github.com/meshtrade/api/go/grpc/config"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestApiUserServiceIntegration_ClientSideValidation(t *testing.T) {
	ctx := context.Background()
	
	// Create a service instance with configuration that won't actually connect
	// (using invalid endpoint to avoid real network calls while testing validation)
	service, err := NewApiUserService(
		config.WithURL("invalid-endpoint:443"),
		config.WithAPIKey("test-api-key"),
		config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
		config.WithTimeout(1*time.Second),
	)
	require.NoError(t, err, "Service creation should not fail")
	defer service.Close()

	t.Run("GetApiUser", func(t *testing.T) {
		t.Run("validation_failure", func(t *testing.T) {
			// Test with invalid request - should fail validation
			_, err := service.GetApiUser(ctx, &GetApiUserRequest{
				Name: "invalid-name", // Wrong format - should be api_users/{ULIDv2}
			})
			
			require.Error(t, err, "Should fail validation")
			assert.Contains(t, err.Error(), "request validation failed", "Error should be validation failure")
			assert.Contains(t, strings.ToLower(err.Error()), "pattern", "Should mention pattern validation")
		})

		t.Run("validation_success", func(t *testing.T) {
			// Test with valid request - should pass validation but fail on network
			_, err := service.GetApiUser(ctx, &GetApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Valid format
			})
			
			require.Error(t, err, "Should fail on network call (no server)")
			assert.NotContains(t, err.Error(), "request validation failed", "Should NOT be validation error")
			// Should be network/connection error since we're using invalid endpoint
			assert.True(t, 
				strings.Contains(strings.ToLower(err.Error()), "connection") ||
				strings.Contains(strings.ToLower(err.Error()), "dial") ||
				strings.Contains(strings.ToLower(err.Error()), "resolve") ||
				strings.Contains(strings.ToLower(err.Error()), "network") ||
				strings.Contains(strings.ToLower(err.Error()), "address") ||
				strings.Contains(strings.ToLower(err.Error()), "target") ||
				strings.Contains(strings.ToLower(err.Error()), "idle mode"),
				"Should be network error, got: %s", err.Error())
		})
	})

	t.Run("CreateApiUser", func(t *testing.T) {
		t.Run("validation_failure", func(t *testing.T) {
			// Test with missing required field
			_, err := service.CreateApiUser(ctx, &CreateApiUserRequest{
				ApiUser: nil, // Required field missing
			})
			
			require.Error(t, err, "Should fail validation")
			assert.Contains(t, err.Error(), "request validation failed", "Error should be validation failure")
			assert.Contains(t, strings.ToLower(err.Error()), "required", "Should mention required field")
		})

		t.Run("validation_success", func(t *testing.T) {
			// Test with valid request
			_, err := service.CreateApiUser(ctx, &CreateApiUserRequest{
				ApiUser: &APIUser{
					DisplayName: "Test API User",
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					State:       APIUserState_API_USER_STATE_ACTIVE,
				},
			})
			
			require.Error(t, err, "Should fail on network call (no server)")
			assert.NotContains(t, err.Error(), "request validation failed", "Should NOT be validation error")
		})
	})

	t.Run("AssignRoleToUser", func(t *testing.T) {
		t.Run("validation_failure", func(t *testing.T) {
			// Test with invalid name format
			_, err := service.AssignRoleToUser(ctx, &AssignRoleToAPIUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Wrong prefix - should be api_users/
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			})
			
			require.Error(t, err, "Should fail validation")
			assert.Contains(t, err.Error(), "request validation failed", "Error should be validation failure")
			assert.Contains(t, strings.ToLower(err.Error()), "pattern", "Should mention pattern validation")
		})

		t.Run("validation_success", func(t *testing.T) {
			// Test with valid request
			_, err := service.AssignRoleToUser(ctx, &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Correct format
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			})
			
			require.Error(t, err, "Should fail on network call (no server)")
			assert.NotContains(t, err.Error(), "request validation failed", "Should NOT be validation error")
		})
	})

	t.Run("ListApiUsers", func(t *testing.T) {
		t.Run("validation_success", func(t *testing.T) {
			// ListApiUsersRequest has no validation rules, so should always pass validation
			_, err := service.ListApiUsers(ctx, &ListApiUsersRequest{})
			
			require.Error(t, err, "Should fail on network call (no server)")
			assert.NotContains(t, err.Error(), "request validation failed", "Should NOT be validation error")
		})
	})

	t.Run("SearchApiUsers", func(t *testing.T) {
		t.Run("validation_success", func(t *testing.T) {
			// SearchApiUsersRequest has no validation rules on display_name
			_, err := service.SearchApiUsers(ctx, &SearchApiUsersRequest{
				DisplayName: "test search term",
			})
			
			require.Error(t, err, "Should fail on network call (no server)")
			assert.NotContains(t, err.Error(), "request validation failed", "Should NOT be validation error")
		})
	})

	t.Run("ActivateApiUser", func(t *testing.T) {
		t.Run("validation_failure", func(t *testing.T) {
			// Test with invalid name format
			_, err := service.ActivateApiUser(ctx, &ActivateApiUserRequest{
				Name: "", // Empty name - required field
			})
			
			require.Error(t, err, "Should fail validation")
			assert.Contains(t, err.Error(), "request validation failed", "Error should be validation failure")
			assert.Contains(t, strings.ToLower(err.Error()), "required", "Should mention required field")
		})

		t.Run("validation_success", func(t *testing.T) {
			// Test with valid request
			_, err := service.ActivateApiUser(ctx, &ActivateApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			})
			
			require.Error(t, err, "Should fail on network call (no server)")
			assert.NotContains(t, err.Error(), "request validation failed", "Should NOT be validation error")
		})
	})

	t.Run("DeactivateApiUser", func(t *testing.T) {
		t.Run("validation_failure", func(t *testing.T) {
			// Test with invalid name length
			_, err := service.DeactivateApiUser(ctx, &DeactivateApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FA", // Too short - 35 chars instead of 36
			})
			
			require.Error(t, err, "Should fail validation")
			assert.Contains(t, err.Error(), "request validation failed", "Error should be validation failure")
			assert.True(t,
				strings.Contains(strings.ToLower(err.Error()), "length") ||
				strings.Contains(strings.ToLower(err.Error()), "len"),
				"Should mention length validation, got: %s", err.Error())
		})

		t.Run("validation_success", func(t *testing.T) {
			// Test with valid request
			_, err := service.DeactivateApiUser(ctx, &DeactivateApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			})
			
			require.Error(t, err, "Should fail on network call (no server)")
			assert.NotContains(t, err.Error(), "request validation failed", "Should NOT be validation error")
		})
	})

	t.Run("GetApiUserByKeyHash", func(t *testing.T) {
		t.Run("validation_failure", func(t *testing.T) {
			// Test with invalid key hash length
			_, err := service.GetApiUserByKeyHash(ctx, &GetApiUserByKeyHashRequest{
				KeyHash: "too-short", // Should be exactly 44 characters
			})
			
			require.Error(t, err, "Should fail validation")
			assert.Contains(t, err.Error(), "request validation failed", "Error should be validation failure")
			assert.Contains(t, err.Error(), "44", "Should mention 44 character requirement")
		})

		t.Run("validation_success", func(t *testing.T) {
			// Test with valid request
			_, err := service.GetApiUserByKeyHash(ctx, &GetApiUserByKeyHashRequest{
				KeyHash: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk1234567", // Exactly 44 characters
			})
			
			require.Error(t, err, "Should fail on network call (no server)")
			assert.NotContains(t, err.Error(), "request validation failed", "Should NOT be validation error")
		})
	})
}

func TestApiUserServiceIntegration_ValidationOccursFirst(t *testing.T) {
	ctx := context.Background()
	
	// Create service with invalid endpoint to ensure no network calls succeed
	service, err := NewApiUserService(
		config.WithURL("definitely-invalid-endpoint-that-does-not-exist:443"),
		config.WithAPIKey("test-api-key"),
		config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
		config.WithTimeout(100*time.Millisecond), // Very short timeout
	)
	require.NoError(t, err)
	defer service.Close()

	t.Run("validation_happens_before_network_call", func(t *testing.T) {
		start := time.Now()
		
		// Call with invalid request - should fail immediately on validation
		_, err := service.GetApiUser(ctx, &GetApiUserRequest{
			Name: "definitely-invalid-name-format",
		})
		
		duration := time.Since(start)
		
		require.Error(t, err)
		assert.Contains(t, err.Error(), "request validation failed", "Should be validation error")
		
		// Validation should happen instantly, well before the 100ms timeout
		assert.Less(t, duration, 50*time.Millisecond, 
			"Validation should happen immediately, not after network timeout. Duration: %v", duration)
	})

	t.Run("network_call_happens_after_validation_passes", func(t *testing.T) {
		start := time.Now()
		
		// Call with valid request - should pass validation but fail on network with timeout
		_, err := service.GetApiUser(ctx, &GetApiUserRequest{
			Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
		})
		
		duration := time.Since(start)
		
		require.Error(t, err)
		assert.NotContains(t, err.Error(), "request validation failed", "Should NOT be validation error")
		
		// Should take close to the timeout duration since it tries the network call
		assert.GreaterOrEqual(t, duration, 80*time.Millisecond, 
			"Should attempt network call and hit timeout. Duration: %v", duration)
	})
}