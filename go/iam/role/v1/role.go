package role_v1

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/oklog/ulid/v2"
)

// TODO: improve function documentation
// IsValid returns...
func (r Role) IsValid() bool {
	_, ok := Role_name[int32(r)]
	return ok
}

// TODO: improve function documentation
// IsValidAndSpecified returns...
func (r Role) IsValidAndSpecified() bool {
	return r.IsValid() && r != Role_ROLE_UNSPECIFIED
}

// FullResourceNameFromGroupID returns the full qualified resource name of the role given a particular owner group id.
func (r Role) FullResourceNameFromGroupID(groupID string) string {
	return fmt.Sprintf("groups/%s/%d", groupID, r)
}

func (r Role) FullResourceNameFromGroupName(groupName string) string {
	return fmt.Sprintf("%s/%d", groupName, r)
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

// FullResourceNameFromGroup returns the full qualified resource name of the role given a group resource name.
// The group parameter should be in the format "groups/{groupID}".
// This is a convenience method that extracts the group ID and delegates to FullResourceNameFromGroupID.
func (r Role) FullResourceNameFromGroup(group string) (string, error) {
	if !strings.HasPrefix(group, "groups/") {
		return "", fmt.Errorf("invalid group format, expected groups/{groupID}, got: %s", group)
	}

	groupID := strings.TrimPrefix(group, "groups/")
	if groupID == "" {
		return "", fmt.Errorf("group ID cannot be empty in group resource name: %s", group)
	}

	return r.FullResourceNameFromGroupID(groupID), nil
}

// TODO: review this function, add tests for this function, improve function documentation
// ParseRoleParts parses a full role resource name into its constituent parts
// e.g. ....
func ParseRoleParts(roleFullResourceName string) (group string, role Role, err error) {
	// Break role up into its parts
	// groups/{{groupID}}/roles/{{meshtrade.iam.role.v1.Role enum}}
	roleParts := strings.Split(roleFullResourceName, "/")
	if len(roleParts) != 4 {
		err = fmt.Errorf("invalid role format, should be groups/{{groupID}}/roles/{{meshtrade.iam.role.v1.Role enum}}, got %s", roleFullResourceName)
		return
	}

	// get group ID and confirm validity
	groupID := roleParts[1]
	if _, parseErr := ulid.Parse(groupID); parseErr != nil {
		err = fmt.Errorf("group id not valid: %w", parseErr)
		return
	}

	// construct final group name
	group = "groups/" + roleParts[1]

	// parse role enum part
	roleEnumRaw, err := strconv.Atoi(roleParts[3])
	if err != nil {
		err = fmt.Errorf("error parsing role enum value '%s'", roleParts[3])
		return
	}

	// cast to final enum
	role = Role(roleEnumRaw)

	// confirm validity
	if !role.IsValidAndSpecified() {
		err = fmt.Errorf("parsed role enum value '%d' is not valid", role)
		return
	}

	// return, role parts valid
	return
}

// TODO: review this function, add tests for this function, improve function documentation
// MustParseRoleParts parses a full role resource name into its constituent parts
// e.g. ....
func MustParseRoleParts(roleFullResourceName string) (string, Role) {
	group, role, err := ParseRoleParts(roleFullResourceName)
	if err != nil {
		panic(err)
	}
	return group, role
}
