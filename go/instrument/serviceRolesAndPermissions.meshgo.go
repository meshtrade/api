// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: instrument/service.proto
package instrument

import (
	role "github.com/meshtrade/api/go/iam/role"
)

var (
	// MintPermission provides permission to call the Mint method on the Service service provider
	MintPermission = role.Permission{
		ServiceProvider: ServiceServiceProviderName,
		Service:         "Mint",
		Description:     "Provides permission to call the Service.Mint method",
	}

	// BurnPermission provides permission to call the Burn method on the Service service provider
	BurnPermission = role.Permission{
		ServiceProvider: ServiceServiceProviderName,
		Service:         "Burn",
		Description:     "Provides permission to call the Service.Burn method",
	}

	// ServiceAdminRole provides access to all methods on the Service service provider.
	ServiceAdminRole = role.Role{
		Name: "ServiceAdmin",
		Permissions: []*role.Permission{
			&MintPermission,
			&BurnPermission,
		},
	}
)
