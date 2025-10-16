package grpc

import (
	"context"
	"testing"

	"github.com/meshtrade/api/go/auth"
	"github.com/meshtrade/api/go/grpc/config"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
	"google.golang.org/protobuf/reflect/protoreflect"
)

// mockMessage implements proto.Message for testing
type mockMessage struct{}

func (m *mockMessage) ProtoReflect() protoreflect.Message { return nil }
func (m *mockMessage) Reset()                             {}
func (m *mockMessage) String() string                     { return "" }

// mockGRPCClient is a mock gRPC client type for testing
type mockGRPCClient struct{}

// TestAuthInterceptor tests the unary authentication interceptor
func TestAuthInterceptor(t *testing.T) {
	// Create a test client
	client := &BaseGRPCClient[mockGRPCClient]{
		apiKey: "test-api-key",
		group:  "groups/test-group",
	}

	// Create the interceptor
	interceptor := client.authInterceptor()

	// Create a test context
	ctx := context.Background()

	// Mock invoker that captures the context
	var capturedCtx context.Context
	mockInvoker := func(ctx context.Context, method string, req, reply any, cc *grpc.ClientConn, opts ...grpc.CallOption) error {
		capturedCtx = ctx
		return nil
	}

	// Call the interceptor
	err := interceptor(ctx, "/test.Method", nil, nil, nil, mockInvoker)
	if err != nil {
		t.Fatalf("Expected no error, got: %v", err)
	}

	// Verify metadata was added
	md, ok := metadata.FromOutgoingContext(capturedCtx)
	if !ok {
		t.Fatal("Expected metadata in context, got none")
	}

	// Verify API key header
	apiKeys := md.Get(auth.APIKeyHeader)
	if len(apiKeys) != 1 || apiKeys[0] != "test-api-key" {
		t.Errorf("Expected API key 'test-api-key', got: %v", apiKeys)
	}

	// Verify group header
	groups := md.Get(auth.GroupHeaderKey)
	if len(groups) != 1 || groups[0] != "groups/test-group" {
		t.Errorf("Expected group 'groups/test-group', got: %v", groups)
	}
}

// TestStreamAuthInterceptor tests the streaming authentication interceptor
func TestStreamAuthInterceptor(t *testing.T) {
	// Create a test client
	client := &BaseGRPCClient[mockGRPCClient]{
		apiKey: "test-api-key",
		group:  "groups/test-group",
	}

	// Create the interceptor
	interceptor := client.streamAuthInterceptor()

	// Create a test context
	ctx := context.Background()

	// Mock streamer that captures the context
	var capturedCtx context.Context
	mockStreamer := func(ctx context.Context, desc *grpc.StreamDesc, cc *grpc.ClientConn, method string, opts ...grpc.CallOption) (grpc.ClientStream, error) {
		capturedCtx = ctx
		return nil, nil
	}

	// Call the interceptor
	_, err := interceptor(ctx, nil, nil, "/test.StreamMethod", mockStreamer)
	if err != nil {
		t.Fatalf("Expected no error, got: %v", err)
	}

	// Verify metadata was added
	md, ok := metadata.FromOutgoingContext(capturedCtx)
	if !ok {
		t.Fatal("Expected metadata in context, got none")
	}

	// Verify API key header
	apiKeys := md.Get(auth.APIKeyHeader)
	if len(apiKeys) != 1 || apiKeys[0] != "test-api-key" {
		t.Errorf("Expected API key 'test-api-key', got: %v", apiKeys)
	}

	// Verify group header
	groups := md.Get(auth.GroupHeaderKey)
	if len(groups) != 1 || groups[0] != "groups/test-group" {
		t.Errorf("Expected group 'groups/test-group', got: %v", groups)
	}
}

// TestValidateAuth tests authentication validation
func TestValidateAuth(t *testing.T) {
	tests := []struct {
		name    string
		apiKey  string
		group   string
		wantErr bool
	}{
		{
			name:    "valid credentials",
			apiKey:  "test-api-key",
			group:   "groups/test-group",
			wantErr: false,
		},
		{
			name:    "missing api key",
			apiKey:  "",
			group:   "groups/test-group",
			wantErr: true,
		},
		{
			name:    "missing group",
			apiKey:  "test-api-key",
			group:   "",
			wantErr: true,
		},
		{
			name:    "missing both",
			apiKey:  "",
			group:   "",
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			client := &BaseGRPCClient[mockGRPCClient]{
				apiKey: tt.apiKey,
				group:  tt.group,
			}

			err := client.validateAuth()
			if (err != nil) != tt.wantErr {
				t.Errorf("validateAuth() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

// TestContains tests the substring matching utility
func TestContains(t *testing.T) {
	tests := []struct {
		name   string
		s      string
		substr string
		want   bool
	}{
		{
			name:   "contains at start",
			s:      "connection refused",
			substr: "connection",
			want:   true,
		},
		{
			name:   "contains at end",
			s:      "connection refused",
			substr: "refused",
			want:   true,
		},
		{
			name:   "contains in middle",
			s:      "no such host found",
			substr: "such",
			want:   true,
		},
		{
			name:   "exact match",
			s:      "test",
			substr: "test",
			want:   true,
		},
		{
			name:   "does not contain",
			s:      "connection refused",
			substr: "timeout",
			want:   false,
		},
		{
			name:   "empty substring",
			s:      "test",
			substr: "",
			want:   true,
		},
		{
			name:   "substring longer than string",
			s:      "test",
			substr: "testing",
			want:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := contains(tt.s, tt.substr); got != tt.want {
				t.Errorf("contains(%q, %q) = %v, want %v", tt.s, tt.substr, got, tt.want)
			}
		})
	}
}

// TestWithGroup tests the WithGroup method
func TestWithGroup(t *testing.T) {
	// This test would require a real client factory, so we test the panic cases
	t.Run("empty group panics", func(t *testing.T) {
		defer func() {
			if r := recover(); r == nil {
				t.Error("Expected panic for empty group, got none")
			}
		}()

		// Create a minimal client (won't actually work but sufficient for panic test)
		client := &BaseGRPCClient[mockGRPCClient]{
			apiKey: "test-key",
			group:  "groups/original",
		}

		// This should panic
		_ = client.WithGroup("")
	})

	t.Run("valid group does not panic with nil factory", func(t *testing.T) {
		// This will panic when trying to create the new client, but not from validation
		defer func() {
			r := recover()
			if r == nil {
				t.Error("Expected panic from client creation, got none")
			}
			// Verify the panic is from client creation, not group validation
			msg, ok := r.(string)
			if ok && msg == "group parameter cannot be empty" {
				t.Error("Panic was from group validation, should be from client creation")
			}
		}()

		client := &BaseGRPCClient[mockGRPCClient]{
			apiKey: "test-key",
			group:  "groups/original",
		}

		// This will panic due to nil clientFactory, but not from validation
		_ = client.WithGroup("groups/new-group")
	})
}

// TestNewBaseGRPCClientValidation tests client creation validation
func TestNewBaseGRPCClientValidation(t *testing.T) {
	t.Run("fails without credentials", func(t *testing.T) {
		factory := func(cc grpc.ClientConnInterface) mockGRPCClient {
			return mockGRPCClient{}
		}

		// Try to create client without providing credentials (and assuming no file exists)
		_, err := NewBaseGRPCClient("test-service", factory,
			config.WithAPIKey(""),
			config.WithGroup(""),
		)

		if err == nil {
			t.Error("Expected error for missing credentials, got none")
		}
	})

	t.Run("succeeds with valid credentials", func(t *testing.T) {
		factory := func(cc grpc.ClientConnInterface) mockGRPCClient {
			return mockGRPCClient{}
		}

		// Provide valid credentials
		client, err := NewBaseGRPCClient("test-service", factory,
			config.WithAPIKey("test-api-key"),
			config.WithGroup("groups/test-group"),
		)

		if err != nil {
			t.Errorf("Expected no error with valid credentials, got: %v", err)
		}

		if client == nil {
			t.Error("Expected client to be created, got nil")
		}

		// Verify credentials were set
		if client != nil {
			if client.apiKey != "test-api-key" {
				t.Errorf("Expected apiKey 'test-api-key', got: %s", client.apiKey)
			}
			if client.group != "groups/test-group" {
				t.Errorf("Expected group 'groups/test-group', got: %s", client.group)
			}
		}

		// Clean up connection
		if client != nil {
			_ = client.Close()
		}
	})
}

// TestClientAccessors tests the client accessor methods
func TestClientAccessors(t *testing.T) {
	factory := func(cc grpc.ClientConnInterface) mockGRPCClient {
		return mockGRPCClient{}
	}

	client, err := NewBaseGRPCClient("test-service", factory,
		config.WithAPIKey("test-api-key"),
		config.WithGroup("groups/test-group"),
	)
	if err != nil {
		t.Fatalf("Failed to create test client: %v", err)
	}
	defer client.Close()

	t.Run("Group returns correct group", func(t *testing.T) {
		if got := client.Group(); got != "groups/test-group" {
			t.Errorf("Group() = %v, want %v", got, "groups/test-group")
		}
	})

	t.Run("GrpcClient returns client", func(t *testing.T) {
		grpcClient := client.GrpcClient()
		// Just verify it doesn't panic and returns something
		_ = grpcClient
	})

	t.Run("Validator returns validator", func(t *testing.T) {
		validator := client.Validator()
		if validator == nil {
			t.Error("Validator() returned nil")
		}
	})

	t.Run("Executor returns executor", func(t *testing.T) {
		executor := client.Executor()
		if executor == nil {
			t.Error("Executor() returned nil")
		}
		if executor.client != client {
			t.Error("Executor client does not match base client")
		}
	})
}

// Note: TestExecuteStreamValidation is skipped because creating valid proto.Message
// instances for testing would require importing generated protobuf code, which would
// create circular dependencies. The validation functionality is tested through
// integration tests in the mesh repository (app/scratch/sdk_client/main.go).
//
// The unit tests above provide coverage for:
// - Authentication interceptors (both unary and streaming)
// - Credential validation
// - Client construction and accessors
// - Utility functions (contains)
//
// ExecuteStream's validation is implicitly tested via the integration examples.
