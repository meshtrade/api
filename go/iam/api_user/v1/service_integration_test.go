package api_user_v1

import (
	"os"
	"path/filepath"
	"testing"
	"time"

	"buf.build/go/protovalidate"
	"github.com/meshtrade/api/go/grpc/config"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.opentelemetry.io/otel/trace/noop"
)

// TestApiUserServiceConfiguration_ComprehensiveSDKOptions tests all SDK configuration options
// This tests client construction and configuration without making actual network calls
func TestApiUserServiceConfiguration_ComprehensiveSDKOptions(t *testing.T) {
	// Valid request for testing validation behavior
	validRequest := &GetApiUserRequest{
		Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
	}

	// Invalid request for testing validation
	invalidRequest := &GetApiUserRequest{
		Name: "invalid-format",
	}

	t.Run("DefaultConfiguration", func(t *testing.T) {
		// Test service with completely default configuration
		service, err := NewApiUserService()
		require.NoError(t, err, "Default configuration should work")
		defer service.Close()

		// Verify service is constructed properly
		assert.NotNil(t, service)

		// Test that validation works by using protovalidate directly
		validator, err := protovalidate.New()
		require.NoError(t, err)

		// This should fail validation
		err = validator.Validate(invalidRequest)
		assert.Error(t, err, "Invalid request should fail validation")

		// Valid request should pass validation
		err = validator.Validate(validRequest)
		assert.NoError(t, err, "Valid request should pass validation")
	})

	t.Run("URLConfiguration", func(t *testing.T) {
		testCases := []struct {
			name        string
			url         string
			expectError bool
			description string
		}{
			{
				name:        "ProductionURL",
				url:         "production-service-mesh-api-gateway-lb-frontend.mesh.trade",
				expectError: false,
				description: "Production URL should be valid",
			},
			{
				name:        "StagingURL",
				url:         "staging-api.meshtrade.co",
				expectError: false,
				description: "Staging URL should be valid",
			},
			{
				name:        "LocalhostURL",
				url:         "localhost",
				expectError: false,
				description: "Localhost URL should be valid",
			},
			{
				name:        "CustomURL",
				url:         "custom.api.example.com",
				expectError: false,
				description: "Custom URL should be valid",
			},
			{
				name:        "EmptyURL",
				url:         "",
				expectError: false, // Empty URL will use defaults
				description: "Empty URL should fall back to default",
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				service, err := NewApiUserService(
					config.WithURL(tc.url),
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
					config.WithTimeout(100*time.Millisecond), // Short timeout for fast test
				)

				if tc.expectError {
					assert.Error(t, err, tc.description)
					return
				}

				require.NoError(t, err, tc.description)
				defer service.Close()

				// Test that validation still works regardless of URL configuration
				validator, err := protovalidate.New()
				require.NoError(t, err)
				
				err = validator.Validate(validRequest)
				assert.NoError(t, err, "Valid request should pass validation")

				err = validator.Validate(invalidRequest)
				assert.Error(t, err, "Invalid request should fail validation")
			})
		}
	})

	t.Run("PortConfiguration", func(t *testing.T) {
		testCases := []struct {
			name        string
			port        int
			expectError bool
			description string
		}{
			{
				name:        "StandardHTTPS",
				port:        443,
				expectError: false,
				description: "Port 443 should be valid",
			},
			{
				name:        "StandardHTTP",
				port:        80,
				expectError: false,
				description: "Port 80 should be valid",
			},
			{
				name:        "CustomPort",
				port:        8080,
				expectError: false,
				description: "Port 8080 should be valid",
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				service, err := NewApiUserService(
					config.WithURL("localhost"),
					config.WithPort(tc.port),
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
					config.WithTimeout(100*time.Millisecond),
				)

				if tc.expectError {
					assert.Error(t, err, tc.description)
					return
				}

				require.NoError(t, err, tc.description)
				defer service.Close()

				// Test that validation works
				validator, err := protovalidate.New()
				require.NoError(t, err)
				
				err = validator.Validate(validRequest)
				assert.NoError(t, err, "Valid request should pass validation")
			})
		}
	})

	t.Run("TimeoutConfiguration", func(t *testing.T) {
		testCases := []struct {
			name        string
			timeout     time.Duration
			expectError bool
			description string
		}{
			{
				name:        "ShortTimeout",
				timeout:     100 * time.Millisecond,
				expectError: false,
				description: "100ms timeout should be valid",
			},
			{
				name:        "StandardTimeout",
				timeout:     30 * time.Second,
				expectError: false,
				description: "30s timeout should be valid",
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				service, err := NewApiUserService(
					config.WithURL("localhost"),
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
					config.WithTimeout(tc.timeout),
				)

				if tc.expectError {
					assert.Error(t, err, tc.description)
					return
				}

				require.NoError(t, err, tc.description)
				defer service.Close()

				// Test validation works
				validator, err := protovalidate.New()
				require.NoError(t, err)
				
				err = validator.Validate(validRequest)
				assert.NoError(t, err, "Valid request should pass validation")
			})
		}
	})

	t.Run("TracingConfiguration", func(t *testing.T) {
		// Test with custom tracer
		service, err := NewApiUserService(
			config.WithURL("localhost"),
			config.WithAPIKey("test-key"),
			config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
			config.WithTracer(noop.NewTracerProvider().Tracer("test")),
		)

		require.NoError(t, err, "Service with custom tracer should work")
		defer service.Close()

		// Test validation works
		validator, err := protovalidate.New()
		require.NoError(t, err)
		
		err = validator.Validate(validRequest)
		assert.NoError(t, err, "Valid request should pass validation")
	})


	t.Run("ValidationConfiguration", func(t *testing.T) {
		// Test that validation can be properly configured
		service, err := NewApiUserService(
			config.WithURL("localhost"),
			config.WithAPIKey("test-key"),
			config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
		)

		require.NoError(t, err, "Service should initialize")
		defer service.Close()

		// Test different validation scenarios
		testCases := []struct {
			name        string
			request     *GetApiUserRequest
			expectError bool
			description string
		}{
			{
				name: "ValidRequest",
				request: &GetApiUserRequest{
					Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				},
				expectError: false,
				description: "Valid request should pass",
			},
			{
				name: "InvalidFormat",
				request: &GetApiUserRequest{
					Name: "invalid-format",
				},
				expectError: true,
				description: "Invalid format should fail",
			},
			{
				name: "EmptyName",
				request: &GetApiUserRequest{
					Name: "",
				},
				expectError: true,
				description: "Empty name should fail",
			},
		}

		validator, err := protovalidate.New()
		require.NoError(t, err)

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				err := validator.Validate(tc.request)
				if tc.expectError {
					assert.Error(t, err, tc.description)
				} else {
					assert.NoError(t, err, tc.description)
				}
			})
		}
	})
}

// TestApiUserServiceCredentialFiles tests credential file handling
func TestApiUserServiceCredentialFiles(t *testing.T) {
	// Save original environment
	originalCredentials := os.Getenv("MESH_API_CREDENTIALS")
	defer func() {
		if originalCredentials == "" {
			os.Unsetenv("MESH_API_CREDENTIALS")
		} else {
			os.Setenv("MESH_API_CREDENTIALS", originalCredentials)
		}
	}()

	t.Run("ServiceCreationWithoutCredentials", func(t *testing.T) {
		// Test that service can be created without credentials for unit testing
		os.Unsetenv("MESH_API_CREDENTIALS")
		
		service, err := NewApiUserService()
		require.NoError(t, err, "Service should work without credentials for unit testing")
		defer service.Close()
		
		// Test that validation works
		validator, err := protovalidate.New()
		require.NoError(t, err)
		
		validRequest := &GetApiUserRequest{
			Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
		}
		err = validator.Validate(validRequest)
		assert.NoError(t, err, "Validation should work")
	})

	t.Run("ServiceCreationWithValidCredentials", func(t *testing.T) {
		// Create a valid credentials file
		tempDir := t.TempDir()
		credFile := filepath.Join(tempDir, "valid-creds.json")
		content := `{
			"api_key": "test-api-key-12345678901234567890123456789012",
			"group": "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"
		}`
		
		err := os.WriteFile(credFile, []byte(content), 0600)
		require.NoError(t, err)
		
		os.Setenv("MESH_API_CREDENTIALS", credFile)
		
		service, err := NewApiUserService()
		require.NoError(t, err, "Service should work with valid credentials")
		defer service.Close()
		
		// Test validation works
		validator, err := protovalidate.New()
		require.NoError(t, err)
		
		validRequest := &GetApiUserRequest{
			Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
		}
		err = validator.Validate(validRequest)
		assert.NoError(t, err, "Validation should work")
	})
}

// TestApiUserServiceRequestValidation tests request validation functionality
func TestApiUserServiceRequestValidation(t *testing.T) {
	service, err := NewApiUserService(
		config.WithURL("localhost"),
		config.WithAPIKey("test-key"),
		config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
	)
	require.NoError(t, err)
	defer service.Close()

	t.Run("GetApiUserRequestValidation", func(t *testing.T) {
		testCases := []struct {
			name        string
			request     *GetApiUserRequest
			expectError bool
			description string
		}{
			{
				name: "ValidRequest",
				request: &GetApiUserRequest{
					Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				},
				expectError: false,
				description: "Valid request should pass",
			},
			{
				name: "InvalidNameFormat",
				request: &GetApiUserRequest{
					Name: "invalid-format",
				},
				expectError: true,
				description: "Invalid name format should fail",
			},
		}

		validator, err := protovalidate.New()
		require.NoError(t, err)

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				err := validator.Validate(tc.request)
				if tc.expectError {
					assert.Error(t, err, tc.description)
				} else {
					assert.NoError(t, err, tc.description)
				}
			})
		}
	})

	t.Run("CreateApiUserRequestValidation", func(t *testing.T) {
		testCases := []struct {
			name        string
			request     *CreateApiUserRequest
			expectError bool
			description string
		}{
			{
				name: "ValidRequest",
				request: &CreateApiUserRequest{
					ApiUser: &APIUser{
						DisplayName: "Test User",
						Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						State:       APIUserState_API_USER_STATE_ACTIVE,
					},
				},
				expectError: false,
				description: "Valid request should pass",
			},
			{
				name: "MissingApiUser",
				request: &CreateApiUserRequest{
					ApiUser: nil,
				},
				expectError: true,
				description: "Missing api_user should fail",
			},
		}

		validator, err := protovalidate.New()
		require.NoError(t, err)

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				err := validator.Validate(tc.request)
				if tc.expectError {
					assert.Error(t, err, tc.description)
				} else {
					assert.NoError(t, err, tc.description)
				}
			})
		}
	})
}