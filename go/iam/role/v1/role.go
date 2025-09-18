package role_v1

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/oklog/ulid/v2"
)

// IsValid reports whether r corresponds to a defined Role enum value.
func (r Role) IsValid() bool {
	_, ok := Role_name[int32(r)]
	return ok
}

// IsValidAndSpecified reports whether r is defined and not Role_ROLE_UNSPECIFIED.
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

// ParseRoleParts splits a role resource name formatted as "groups/{ULID}/{role}" into its
// group resource name and the corresponding Role value. It validates the group identifier
// and ensures the role is a recognised, non-unspecified enum value.
func ParseRoleParts(roleFullResourceName string) (group string, role Role, err error) {
	roleParts := strings.Split(roleFullResourceName, "/")
	if len(roleParts) != 3 || roleParts[0] != "groups" {
		err = fmt.Errorf("invalid role format, expected groups/{groupID}/{role}, got %s", roleFullResourceName)
		return
	}

	groupID := roleParts[1]
	if _, parseErr := ulid.Parse(groupID); parseErr != nil {
		err = fmt.Errorf("group id not valid: %w", parseErr)
		return
	}

	group = "groups/" + groupID

	roleEnumRaw, convErr := strconv.Atoi(roleParts[2])
	if convErr != nil {
		err = fmt.Errorf("error parsing role enum value '%s'", roleParts[2])
		return
	}

	role = Role(roleEnumRaw)
	if !role.IsValidAndSpecified() {
		err = fmt.Errorf("parsed role enum value '%d' is not valid", role)
		return
	}

	return
}

// MustParseRoleParts parses a role resource name formatted as "groups/{ULID}/{role}" and
// panics if the input cannot be validated or decoded. Prefer ParseRoleParts when you can
// handle an error result.
func MustParseRoleParts(roleFullResourceName string) (string, Role) {
	group, role, err := ParseRoleParts(roleFullResourceName)
	if err != nil {
		panic(err)
	}
	return group, role
}
