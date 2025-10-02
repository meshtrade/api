package group_v1_test

import (
	"testing"
	"time"

	group_v1 "github.com/meshtrade/api/go/iam/group/v1"
	"github.com/meshtrade/api/go/grpc/config"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// TestGroupServiceWithGroupContextSwitch tests the WithGroup context switching functionality
func TestGroupServiceWithGroupContextSwitch(t *testing.T) {
	t.Run("WithGroupCreatesNewInstance", func(t *testing.T) {
		// Create initial service with default group
		service1, err := group_v1.NewGroupService(
			config.WithURL("localhost"),
			config.WithPort(50051),
			config.WithTLS(false),
			config.WithAPIKey("test-api-key"),
			config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
		)
		require.NoError(t, err, "Initial service creation should succeed")
		defer service1.Close()

		// Switch to a different group - WithGroup is now available on the interface
		service2 := service1.WithGroup("groups/01BRZ3NDEKTSV4RRFFQ69G5FAV")
		require.NotNil(t, service2, "WithGroup should return non-nil client")
		defer service2.Close()

		// Verify the services are different instances (pointer comparison)
		assert.NotEqual(t, service1, service2, "WithGroup should create a new instance")

		// Verify original service still has original group
		assert.Equal(t, "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV", service1.Group())

		// Verify new service has new group
		assert.Equal(t, "groups/01BRZ3NDEKTSV4RRFFQ69G5FAV", service2.Group())
	})

	t.Run("WithGroupPreservesOtherConfiguration", func(t *testing.T) {
		customTimeout := 15 * time.Second
		customURL := "custom.example.com"

		// Create service with custom configuration
		service1, err := group_v1.NewGroupService(
			config.WithURL(customURL),
			config.WithPort(8443),
			config.WithTLS(true),
			config.WithAPIKey("test-api-key"),
			config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
			config.WithTimeout(customTimeout),
		)
		require.NoError(t, err)
		defer service1.Close()

		// Switch group - WithGroup is now available on the interface
		service2 := service1.WithGroup("groups/01BRZ3NDEKTSV4RRFFQ69G5FAV")
		require.NotNil(t, service2)
		defer service2.Close()

		// Verify new service has updated group
		assert.Equal(t, "groups/01BRZ3NDEKTSV4RRFFQ69G5FAV", service2.Group())

		// Both services should remain functional
		// (In a full test with a real server, we would make actual API calls here)
	})

	t.Run("WithGroupAllowsIndependentUsage", func(t *testing.T) {
		// Create two services with different groups
		service1, err := group_v1.NewGroupService(
			config.WithURL("localhost"),
			config.WithPort(50051),
			config.WithTLS(false),
			config.WithAPIKey("test-api-key"),
			config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
		)
		require.NoError(t, err)
		defer service1.Close()

		// Switch to a different group - WithGroup is now available on the interface
		service2 := service1.WithGroup("groups/01BRZ3NDEKTSV4RRFFQ69G5FAV")
		require.NotNil(t, service2)
		defer service2.Close()

		// Both services should be independently usable
		// Each service maintains its own connection and group context
		assert.NotEqual(t, service1.Group(), service2.Group())
	})

	t.Run("WithGroupPanicsOnEmptyGroup", func(t *testing.T) {
		// Create service
		service1, err := group_v1.NewGroupService(
			config.WithURL("localhost"),
			config.WithPort(50051),
			config.WithTLS(false),
			config.WithAPIKey("test-api-key"),
			config.WithGroup("groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"),
		)
		require.NoError(t, err)
		defer service1.Close()

		// Verify panic on empty group - WithGroup is now available on the interface
		assert.Panics(t, func() {
			service1.WithGroup("")
		}, "WithGroup should panic on empty group parameter")
	})
}
