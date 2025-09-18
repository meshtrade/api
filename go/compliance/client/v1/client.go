package client_v1

import (
	"fmt"
	"sync"

	role_v1 "github.com/meshtrade/api/go/iam/role/v1"
	"google.golang.org/protobuf/proto"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
)

const clientMessageTypeFullName = protoreflect.FullName("meshtrade.compliance.client.v1.Client")

var (
	clientDefaultRolesOnce sync.Once
	clientDefaultRoles     []role_v1.Role
	clientDefaultRolesErr  error
)

// GetClientDefaultRoles returns the roles declared on the
// meshtrade.compliance.client.v1.Client message via the
// meshtrade.iam.role.v1.message_roles option. The returned slice is a copy
// so callers can safely mutate it without affecting subsequent reads.
func GetClientDefaultRoles() ([]role_v1.Role, error) {
	clientDefaultRolesOnce.Do(func() {
		messageDescriptor := (*Client)(nil).ProtoReflect().Descriptor()
		messageOptions := messageDescriptor.Options()

		if !proto.HasExtension(messageOptions, role_v1.E_MessageRoles) {
			clientDefaultRolesErr = fmt.Errorf(
				"proto message %s does not define extension %s",
				clientMessageTypeFullName,
				role_v1.E_MessageRoles.TypeDescriptor().FullName(),
			)
			return
		}

		extensionValue := proto.GetExtension(messageOptions, role_v1.E_MessageRoles)

		roleList, ok := extensionValue.(*role_v1.RoleList)
		if !ok {
			clientDefaultRolesErr = fmt.Errorf(
				"extension %s on proto message %s has unexpected type %T",
				role_v1.E_MessageRoles.TypeDescriptor().FullName(),
				clientMessageTypeFullName,
				extensionValue,
			)
			return
		}

		clientDefaultRoles = append([]role_v1.Role(nil), roleList.GetRoles()...)
	})

	if clientDefaultRolesErr != nil {
		return nil, clientDefaultRolesErr
	}

	return append([]role_v1.Role(nil), clientDefaultRoles...), nil
}

// MustGetClientDefaultRoles is equivalent to GetClientDefaultRoles but panics if the
// roles cannot be discovered. This is useful during package initialization where
// failure should prevent the program from continuing.
func MustGetClientDefaultRoles() []role_v1.Role {
	roles, err := GetClientDefaultRoles()
	if err != nil {
		panic(err)
	}
	return roles
}

// GetClientDefaultRoleIndex builds a set-like map keyed by roles declared on the
// meshtrade.compliance.client.v1.Client message. The map's values are always true;
// the structure is intended for efficient membership checks.
func GetClientDefaultRoleIndex() (map[role_v1.Role]bool, error) {
	roles, err := GetClientDefaultRoles()
	if err != nil {
		return nil, err
	}

	index := make(map[role_v1.Role]bool, len(roles))
	for _, role := range roles {
		index[role] = true
	}

	return index, nil
}

// MustGetClientDefaultRoleIndex is equivalent to GetClientDefaultRoleIndex but panics if
// the index cannot be generated.
func MustGetClientDefaultRoleIndex() map[role_v1.Role]bool {
	index, err := GetClientDefaultRoleIndex()
	if err != nil {
		panic(err)
	}
	return index
}
