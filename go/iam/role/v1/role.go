package rolev1

import (
	"fmt"
	"strconv"
	"strings"
)

// FullResourceNameFromGroupID returns the full qualified resource name of the role given a particular owner group id.
func (r Role) FullResourceNameFromGroupID(groupID string) string {
	return fmt.Sprintf("groups/%s/%d", groupID, r)
}

// RoleFromFullResourceName parses a full resource name and returns the Role.
// The full resource name should be in the format "groups/{groupID}/{roleNumber}".
// Returns Role_ROLE_UNSPECIFIED and an error if the format is invalid or the role number cannot be parsed.
func RoleFromFullResourceName(fullResourceName string) (Role, error) {
	parts := strings.Split(fullResourceName, "/")
	if len(parts) != 3 || parts[0] != "groups" {
		return Role_ROLE_UNSPECIFIED, fmt.Errorf("invalid full resource name format: %s", fullResourceName)
	}

	roleNum, err := strconv.ParseInt(parts[2], 10, 32)
	if err != nil {
		return Role_ROLE_UNSPECIFIED, fmt.Errorf("invalid role number in full resource name: %s", fullResourceName)
	}

	if roleNum < 0 {
		return Role_ROLE_UNSPECIFIED, fmt.Errorf("invalid role number in full resource name: %s", fullResourceName)
	}

	return Role(roleNum), nil
}

// MustRoleFromFullResourceName parses a full resource name and returns the Role.
// Panics if the full resource name is invalid or cannot be parsed.
// Use this function only when you are certain the input is valid.
func MustRoleFromFullResourceName(fullResourceName string) Role {
	role, err := RoleFromFullResourceName(fullResourceName)
	if err != nil {
		panic(err)
	}
	return role
}
