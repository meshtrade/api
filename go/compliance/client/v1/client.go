package client_v1

import (
	"fmt"

	role_v1 "github.com/meshtrade/api/go/iam/role/v1"
	"google.golang.org/protobuf/proto"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	"google.golang.org/protobuf/reflect/protoregistry"
)

const clientMessageTypeFullName = protoreflect.FullName("meshtrade.compliance.client.v1.Client")

// TODO: review function, add good function documentation
func GetClientDefaultRoles() ([]role_v1.Role, error) {
	// Look up the message descriptor of the client type in the global registry using its full name
	desc, err := protoregistry.GlobalFiles.FindDescriptorByName(clientMessageTypeFullName)
	if err != nil {
		return nil, fmt.Errorf("could not find proto service descriptor for '%s': %w", clientMessageTypeFullName, err)
	}

	// The found descriptor could be for a message, enum, etc. We must verify
	// it's specifically a service descriptor before proceeding.
	messageDescriptor, ok := desc.(protoreflect.MessageDescriptor)
	if !ok {
		return nil, fmt.Errorf("descriptor for '%s' is a %T, not a MessageDescriptor", clientMessageTypeFullName, desc)
	}

	// Retrieve the options defined for the client message
	messageOptions := messageDescriptor.Options()

	// Check if our custom `roles` extension option is present on the method.
	if !proto.HasExtension(messageOptions, role_v1.E_MessageRoles) {
		return nil, fmt.Errorf("very descriptive error")
	}

	// If the extension exists, get its value.
	rolesExtension := proto.GetExtension(messageOptions, role_v1.E_MessageRoles)

	// Type-assert the extension to its expected generated Go type (*role_v1.RoleList).
	// A mismatch here would indicate a definition error in the .proto file.
	roleList, ok := rolesExtension.(*role_v1.RoleList)
	if !ok {
		return nil, fmt.Errorf(
			"very descriptive error",
		)
	}

	return roleList.GetRoles(), nil
}

// TODO: review function add good documentation to this
func MustGetClientDefaultRoles() []role_v1.Role {
	roles, err := GetClientDefaultRoles()
	if err != nil {
		panic(err)
	}
	return roles
}
