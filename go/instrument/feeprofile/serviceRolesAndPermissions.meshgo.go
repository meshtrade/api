// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: api/proto/instrument/feeprofile/service.proto
package feeprofile

import (
	role "github.com/meshtrade/api/go/iam/role"
)

var (
	// CreatePermission provides permission to call the Create method on the Service service provider
	CreatePermission = &role.Permission{
		ServiceProvider: ServiceServiceProviderName,
		Service:         "Create",
		Description:     "Provides permission to call the Service.Create method",
	}

	// UpdatePermission provides permission to call the Update method on the Service service provider
	UpdatePermission = &role.Permission{
		ServiceProvider: ServiceServiceProviderName,
		Service:         "Update",
		Description:     "Provides permission to call the Service.Update method",
	}

	// ListPermission provides permission to call the List method on the Service service provider
	ListPermission = &role.Permission{
		ServiceProvider: ServiceServiceProviderName,
		Service:         "List",
		Description:     "Provides permission to call the Service.List method",
	}

	// GetPermission provides permission to call the Get method on the Service service provider
	GetPermission = &role.Permission{
		ServiceProvider: ServiceServiceProviderName,
		Service:         "Get",
		Description:     "Provides permission to call the Service.Get method",
	}

	// ServiceReaderRole contains read only service permissions for the Service
	ServiceReaderRole = role.Role{
		Name: "ServiceReader",
		Permissions: []*role.Permission{
			ListPermission,
			GetPermission,
		},
	}

	// ServiceAdminRole provides access to all methods on the Service service provider.
	ServiceAdminRole = role.Role{
		Name: "ServiceAdmin",
		Permissions: []*role.Permission{
			CreatePermission,
			UpdatePermission,
			ListPermission,
			GetPermission,
		},
	}
)
