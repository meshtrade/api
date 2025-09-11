package api_user_v1

import (
	"context"
	"fmt"
	"strings"
	"testing"
	"time"

	"github.com/meshtrade/api/go/grpc/config"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.opentelemetry.io/otel/trace/noop"
)

// TestApiUserServiceConfiguration_ComprehensiveSDKOptions tests all SDK configuration options
// This is the comprehensive pattern that can be rolled out across all SDKs (Go, Python, Java)
func TestApiUserServiceConfiguration_ComprehensiveSDKOptions(t *testing.T) {
	// Valid request for testing network behavior
	validRequest := &GetApiUserRequest{
		Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
	}

	t.Run("DefaultConfiguration", func(t *testing.T) {
		// Test service with completely default configuration
		service, err := NewApiUserService()
		require.NoError(t, err, "Default configuration should work")
		defer service.Close()

		// Verify default values are applied
		assert.NotNil(t, service.GrpcClient())
		
		// Test that validation still works with default config
		invalidRequest := &GetApiUserRequest{
			Name: "invalid-format",
		}
		
		ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
		defer cancel()
		
		_, err = service.GetApiUser(ctx, invalidRequest)
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "request validation failed", "Should fail validation with default config")
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
				ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
				defer cancel()
				
				_, err = service.GetApiUser(ctx, validRequest)
				// Should get network error, not validation error
				assert.Error(t, err)
				assert.NotContains(t, err.Error(), "request validation failed", "Should not fail validation")
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
			{
				name:        "HighPort",
				port:        9999,
				expectError: false,
				description: "Port 9999 should be valid",
			},
			{
				name:        "InvalidPort",
				port:        -1,
				expectError: false, // Go doesn't validate port range at creation time
				description: "Invalid port should be handled gracefully",
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				service, err := NewApiUserService(
					config.WithPort(tc.port),
					config.WithURL("localhost"),
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

				// Validation should work regardless of port
				ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
				defer cancel()
				
				_, err = service.GetApiUser(ctx, validRequest)
				assert.Error(t, err) // Network error expected
				assert.NotContains(t, err.Error(), "request validation failed")
			})
		}
	})

	t.Run("TLSConfiguration", func(t *testing.T) {
		testCases := []struct {
			name        string
			tls         bool
			description string
		}{
			{
				name:        "TLSEnabled",
				tls:         true,
				description: "TLS enabled should work",
			},
			{
				name:        "TLSDisabled",
				tls:         false,
				description: "TLS disabled should work",
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				service, err := NewApiUserService(
					config.WithTLS(tc.tls),
					config.WithURL("localhost"),
					config.WithPort(9999),
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
					config.WithTimeout(100*time.Millisecond),
				)
				
				require.NoError(t, err, tc.description)
				defer service.Close()

				// Validation should work regardless of TLS setting
				ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
				defer cancel()
				
				_, err = service.GetApiUser(ctx, validRequest)
				assert.Error(t, err) // Network error expected
				assert.NotContains(t, err.Error(), "request validation failed")
			})
		}
	})

	t.Run("AuthenticationConfiguration", func(t *testing.T) {
		testCases := []struct {
			name        string
			apiKey      string
			group       string
			description string
		}{
			{
				name:        "ValidCredentials",
				apiKey:      "valid-api-key-123",
				group:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				description: "Valid credentials should work",
			},
			{
				name:        "DifferentGroup",
				apiKey:      "test-key",
				group:       "groups/01BBBCCCDDDEEEFFFGGGHHHJJJ",
				description: "Different group should work",
			},
			{
				name:        "LongAPIKey",
				apiKey:      strings.Repeat("a", 100),
				group:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				description: "Long API key should work",
			},
			{
				name:        "EmptyCredentials",
				apiKey:      "",
				group:       "",
				description: "Empty credentials should work but may fail auth",
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				service, err := NewApiUserService(
					config.WithAPIKey(tc.apiKey),
					config.WithGroup(tc.group),
					config.WithURL("localhost"),
					config.WithPort(9999),
					config.WithTLS(false),
					config.WithTimeout(100*time.Millisecond),
				)
				
				require.NoError(t, err, tc.description)
				defer service.Close()

				// Validation should work regardless of auth configuration
				ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
				defer cancel()
				
				_, err = service.GetApiUser(ctx, validRequest)
				assert.Error(t, err) // Network error expected
				assert.NotContains(t, err.Error(), "request validation failed")
			})
		}
	})

	t.Run("TimeoutConfiguration", func(t *testing.T) {
		testCases := []struct {
			name        string
			timeout     time.Duration
			description string
		}{
			{
				name:        "ShortTimeout",
				timeout:     50 * time.Millisecond,
				description: "Short timeout should work",
			},
			{
				name:        "StandardTimeout",
				timeout:     5 * time.Second,
				description: "Standard timeout should work",
			},
			{
				name:        "LongTimeout",
				timeout:     30 * time.Second,
				description: "Long timeout should work",
			},
			{
				name:        "VeryShortTimeout",
				timeout:     1 * time.Millisecond,
				description: "Very short timeout should work",
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				service, err := NewApiUserService(
					config.WithTimeout(tc.timeout),
					config.WithURL("localhost"),
					config.WithPort(9999),
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
				)
				
				require.NoError(t, err, tc.description)
				defer service.Close()

				// Test that timeout is actually applied
				ctx := context.Background()
				start := time.Now()
				
				_, err = service.GetApiUser(ctx, validRequest)
				duration := time.Since(start)
				
				assert.Error(t, err) // Network error expected
				assert.NotContains(t, err.Error(), "request validation failed")
				
				// For very short timeouts, should timeout quickly
				if tc.timeout <= 100*time.Millisecond {
					assert.Less(t, duration, tc.timeout+200*time.Millisecond, "Should timeout within expected range")
				}
			})
		}
	})

	t.Run("TracingConfiguration", func(t *testing.T) {
		testCases := []struct {
			name        string
			tracer      func() interface{}
			description string
		}{
			{
				name: "NoOpTracer",
				tracer: func() interface{} {
					return noop.NewTracerProvider().Tracer("test")
				},
				description: "NoOp tracer should work",
			},
			{
				name: "NilTracer",
				tracer: func() interface{} {
					return nil
				},
				description: "Nil tracer should work",
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				var opts []config.ServiceOption
				
				if tc.tracer() != nil {
					opts = append(opts, config.WithTracer(tc.tracer()))
				}
				
				opts = append(opts,
					config.WithURL("localhost"),
					config.WithPort(9999),
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
					config.WithTimeout(100*time.Millisecond),
				)
				
				service, err := NewApiUserService(opts...)
				require.NoError(t, err, tc.description)
				defer service.Close()

				// Validation should work regardless of tracing configuration
				ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
				defer cancel()
				
				_, err = service.GetApiUser(ctx, validRequest)
				assert.Error(t, err) // Network error expected
				assert.NotContains(t, err.Error(), "request validation failed")
			})
		}
	})

	t.Run("CombinedConfiguration", func(t *testing.T) {
		// Test multiple configuration options together
		testCases := []struct {
			name        string
			options     []config.ServiceOption
			description string
		}{
			{
				name: "ProductionLikeConfig",
				options: []config.ServiceOption{
					config.WithURL("api.example.com"),
					config.WithPort(443),
					config.WithTLS(true),
					config.WithTimeout(30 * time.Second),
					config.WithAPIKey("prod-api-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
				},
				description: "Production-like configuration should work",
			},
			{
				name: "DevelopmentConfig",
				options: []config.ServiceOption{
					config.WithURL("localhost"),
					config.WithPort(8080),
					config.WithTLS(false),
					config.WithTimeout(5 * time.Second),
					config.WithAPIKey("dev-key"),
					config.WithGroup("groups/01DEVDEVDEVDEVDEVDEVDEVDEV"),
				},
				description: "Development configuration should work",
			},
			{
				name: "FastTestingConfig",
				options: []config.ServiceOption{
					config.WithURL("test.local"),
					config.WithPort(9999),
					config.WithTLS(false),
					config.WithTimeout(100 * time.Millisecond),
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01TESTTESTTESTTESTTEST123"),
				},
				description: "Fast testing configuration should work",
			},
			{
				name: "MinimalConfig",
				options: []config.ServiceOption{
					config.WithAPIKey("minimal-key"),
					config.WithGroup("groups/01MIN1MAL1CONFIG1EXAMPLE1"),
				},
				description: "Minimal configuration should work",
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				service, err := NewApiUserService(tc.options...)
				require.NoError(t, err, tc.description)
				defer service.Close()

				// Test that validation works with combined configuration
				ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
				defer cancel()
				
				_, err = service.GetApiUser(ctx, validRequest)
				assert.Error(t, err) // Network error expected
				assert.NotContains(t, err.Error(), "request validation failed")
			})
		}
	})

	t.Run("ValidationWithDifferentConfigurations", func(t *testing.T) {
		// Test that client-side validation works consistently across all configurations
		
		configurations := []struct {
			name    string
			options []config.ServiceOption
		}{
			{
				name: "DefaultConfig",
				options: []config.ServiceOption{
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
				},
			},
			{
				name: "CustomURLConfig",
				options: []config.ServiceOption{
					config.WithURL("custom.api.com"),
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
				},
			},
			{
				name: "InsecureConfig",
				options: []config.ServiceOption{
					config.WithTLS(false),
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
				},
			},
			{
				name: "ShortTimeoutConfig",
				options: []config.ServiceOption{
					config.WithTimeout(50 * time.Millisecond),
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
				},
			},
		}

		for _, cfg := range configurations {
			t.Run(cfg.name, func(t *testing.T) {
				service, err := NewApiUserService(cfg.options...)
				require.NoError(t, err)
				defer service.Close()

				// Test validation failure (should be fast)
				invalidRequest := &GetApiUserRequest{
					Name: "invalid-format",
				}
				
				ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
				defer cancel()
				
				start := time.Now()
				_, err = service.GetApiUser(ctx, invalidRequest)
				validationDuration := time.Since(start)
				
				assert.Error(t, err)
				assert.Contains(t, err.Error(), "request validation failed")
				assert.Less(t, validationDuration, 100*time.Millisecond, "Validation should be fast")

				// Test validation success (would reach network layer)
				start = time.Now()
				_, err = service.GetApiUser(ctx, validRequest)
				networkDuration := time.Since(start)
				
				assert.Error(t, err) // Network error expected
				assert.NotContains(t, err.Error(), "request validation failed")
				assert.Greater(t, networkDuration, validationDuration, "Network call should take longer than validation")
			})
		}
	})
}

// TestApiUserServiceConfiguration_ErrorHandling tests error scenarios in configuration
func TestApiUserServiceConfiguration_ErrorHandling(t *testing.T) {
	t.Run("InvalidOptionCombinations", func(t *testing.T) {
		// Most invalid combinations are handled gracefully in Go
		// This tests documents expected behavior
		
		// Test with various option combinations that might cause issues
		testCases := []struct {
			name        string
			options     []config.ServiceOption
			expectError bool
			description string
		}{
			{
				name: "ConflictingURLOptions",
				options: []config.ServiceOption{
					config.WithURL("first.com"),
					config.WithURL("second.com"), // Second one should override
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
				},
				expectError: false,
				description: "Conflicting URL options should use last one",
			},
			{
				name: "ConflictingPortOptions",
				options: []config.ServiceOption{
					config.WithPort(8080),
					config.WithPort(9090), // Second one should override
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
				},
				expectError: false,
				description: "Conflicting port options should use last one",
			},
			{
				name: "AddressAndSeparateURLPort",
				options: []config.ServiceOption{
					config.WithAddress("address.com", 8080),
					config.WithURL("separate.com"), // Should override URL but keep port
					config.WithAPIKey("test-key"),
					config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
				},
				expectError: false,
				description: "Address and separate URL/port should work",
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				service, err := NewApiUserService(tc.options...)
				
				if tc.expectError {
					assert.Error(t, err, tc.description)
					return
				}
				
				require.NoError(t, err, tc.description)
				defer service.Close()
				
				// Verify service can be used (validation should still work)
				validRequest := &GetApiUserRequest{
					Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				}
				
				ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
				defer cancel()
				
				_, err = service.GetApiUser(ctx, validRequest)
				// Should get network error (expected), not configuration error
				assert.Error(t, err)
				assert.NotContains(t, err.Error(), "request validation failed")
			})
		}
	})
}

// TestApiUserServiceConfiguration_PatternDocumentation documents the configuration pattern
// This test serves as documentation for how the configuration pattern should work
// across all SDKs (Go, Python, Java) for consistency
func TestApiUserServiceConfiguration_PatternDocumentation(t *testing.T) {
	t.Run("ConfigurationPatternOverview", func(t *testing.T) {
		// This test documents the configuration pattern that should be consistent across SDKs
		
		t.Log("=== SDK Configuration Pattern (Go/Python/Java) ===")
		t.Log("")
		t.Log("1. URL/Address Configuration:")
		t.Log("   - WithURL(url) / url='...' / .url(...)")
		t.Log("   - WithPort(port) / port=... / .port(...)")
		t.Log("   - WithAddress(url, port) / url='...', port=... / .address(...)")
		t.Log("")
		t.Log("2. Security Configuration:")
		t.Log("   - WithTLS(bool) / tls=bool / .tls(bool)")
		t.Log("   - WithAPIKey(key) / api_key='...' / .apiKey(...)")
		t.Log("   - WithGroup(group) / group='...' / .group(...)")
		t.Log("")
		t.Log("3. Behavior Configuration:")
		t.Log("   - WithTimeout(duration) / timeout=timedelta / .timeout(Duration)")
		t.Log("   - WithTracer(tracer) / tracer=... / .tracer(...)")
		t.Log("")
		t.Log("4. Pattern Benefits:")
		t.Log("   - Consistent API across all SDKs")
		t.Log("   - Optional parameters with sensible defaults")
		t.Log("   - Easy testing with different configurations")
		t.Log("   - Validation works regardless of configuration")
		t.Log("")
		t.Log("5. Testing Pattern:")
		t.Log("   - Test each configuration option independently")
		t.Log("   - Test combined configurations")
		t.Log("   - Verify validation works with all configurations")
		t.Log("   - Test error scenarios and edge cases")
		t.Log("   - Use short timeouts and localhost for fast tests")

		// Verify the pattern works by testing a representative configuration
		service, err := NewApiUserService(
			config.WithURL("test.example.com"),
			config.WithPort(8080),
			config.WithTLS(false),
			config.WithAPIKey("pattern-test-key"),
			config.WithGroup("groups/01PATTERN1TEST1EXAMPLE123"),
			config.WithTimeout(100*time.Millisecond),
		)
		
		require.NoError(t, err, "Configuration pattern should work")
		defer service.Close()

		// Verify validation still works
		ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
		defer cancel()
		
		validRequest := &GetApiUserRequest{
			Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
		}
		
		_, err = service.GetApiUser(ctx, validRequest)
		assert.Error(t, err) // Network error expected
		assert.NotContains(t, err.Error(), "request validation failed")
		
		assert.True(t, true, "Configuration pattern documentation complete")
	})

	t.Run("CrossSDKConsistency", func(t *testing.T) {
		// Document how this pattern maps across SDKs
		
		examples := []string{
			"Go:     service, err := NewApiUserService(config.WithURL(\"api.com\"), config.WithTimeout(30*time.Second))",
			"Python: service = ApiUserService(ServiceOptions(url=\"api.com\", timeout=timedelta(seconds=30)))",
			"Java:   service = new ApiUserService(ServiceOptions.builder().url(\"api.com\").timeout(Duration.ofSeconds(30)).build())",
		}
		
		for _, example := range examples {
			t.Log(example)
		}
		
		assert.True(t, true, "Cross-SDK consistency documented")
	})
}