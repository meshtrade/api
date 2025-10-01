package group_v1_test

import (
	"context"
	"testing"

	group_v1 "github.com/meshtrade/api/go/iam/group/v1"
	"github.com/meshtrade/api/go/grpc/config"
)

// TestWithGroupOnInterface demonstrates that WithGroup is accessible
// when the client is typed as an interface
func TestWithGroupOnInterface(t *testing.T) {
	// This test verifies the interface exposes WithGroup
	// It's expected to fail during construction due to missing credentials,
	// but should compile successfully, proving the interface has the method

	// This will fail with credentials error, which is expected
	client, err := group_v1.NewGroupService(
		config.WithURL("api.example.com"),
		config.WithPort(443),
	)
	if err != nil {
		// Expected to fail with auth errors in test environment
		t.Skip("Skipping - expected auth failure in test environment")
		return
	}
	defer client.Close()

	// The key test: this should compile because WithGroup is on the interface
	var interfaceClient group_v1.GroupServiceClientInterface = client
	newClient := interfaceClient.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV")
	defer newClient.Close()

	// If we got here, the interface method is accessible
	t.Log("WithGroup method successfully called on interface-typed variable")
}

// ExampleGroupServiceClientInterface_WithGroup demonstrates interface usage
func ExampleGroupServiceClientInterface_WithGroup() {
	// Create initial client (will fail in this example context)
	client, err := group_v1.NewGroupService()
	if err != nil {
		return // Expected in example
	}
	defer client.Close()

	// Switch group context - works on interface type
	var interfaceClient group_v1.GroupServiceClientInterface = client
	altClient := interfaceClient.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV")
	defer altClient.Close()

	// Both clients can now be used independently
	ctx := context.Background()
	_, _ = client.GetGroup(ctx, &group_v1.GetGroupRequest{Name: "groups/123"})
	_, _ = altClient.GetGroup(ctx, &group_v1.GetGroupRequest{Name: "groups/456"})
}
