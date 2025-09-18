package client_v1

import (
	"reflect"
	"testing"

	role_v1 "github.com/meshtrade/api/go/iam/role/v1"
)

func TestGetClientDefaultRoles(t *testing.T) {
	roles, err := GetClientDefaultRoles()
	if err != nil {
		t.Fatalf("GetClientDefaultRoles() error = %v", err)
	}

	want := []role_v1.Role{
		role_v1.Role_ROLE_COMPLIANCE_CLIENT_VIEWER,
		role_v1.Role_ROLE_IAM_VIEWER,
		role_v1.Role_ROLE_IAM_API_USER_VIEWER,
		role_v1.Role_ROLE_IAM_GROUP_VIEWER,
		role_v1.Role_ROLE_IAM_USER_VIEWER,
	}

	if !reflect.DeepEqual(roles, want) {
		t.Fatalf("GetClientDefaultRoles() = %v, want %v", roles, want)
	}
}

func TestGetClientDefaultRolesImmutable(t *testing.T) {
	roles, err := GetClientDefaultRoles()
	if err != nil {
		t.Fatalf("GetClientDefaultRoles() error = %v", err)
	}

	if len(roles) == 0 {
		t.Fatal("expected at least one default role")
	}

	roles[0] = role_v1.Role_ROLE_UNSPECIFIED

	reloaded, err := GetClientDefaultRoles()
	if err != nil {
		t.Fatalf("GetClientDefaultRoles() error = %v", err)
	}

	if reloaded[0] == role_v1.Role_ROLE_UNSPECIFIED {
		t.Fatal("mutating returned slice must not affect cached roles")
	}
}

func TestMustGetClientDefaultRoles(t *testing.T) {
	defer func() {
		if r := recover(); r != nil {
			t.Fatalf("MustGetClientDefaultRoles() panicked: %v", r)
		}
	}()

	roles := MustGetClientDefaultRoles()
	if len(roles) == 0 {
		t.Fatal("MustGetClientDefaultRoles() returned no roles")
	}
}

func TestGetClientDefaultRoleIndex(t *testing.T) {
	index, err := GetClientDefaultRoleIndex()
	if err != nil {
		t.Fatalf("GetClientDefaultRoleIndex() error = %v", err)
	}

	wantRoles := MustGetClientDefaultRoles()

	if len(index) != len(wantRoles) {
		t.Fatalf("GetClientDefaultRoleIndex() size = %d, want %d", len(index), len(wantRoles))
	}

	for _, role := range wantRoles {
		if !index[role] {
			t.Fatalf("GetClientDefaultRoleIndex() missing role %v", role)
		}
	}
}

func TestMustGetClientDefaultRoleIndex(t *testing.T) {
	defer func() {
		if r := recover(); r != nil {
			t.Fatalf("MustGetClientDefaultRoleIndex() panicked: %v", r)
		}
	}()

	index := MustGetClientDefaultRoleIndex()
	if len(index) == 0 {
		t.Fatal("MustGetClientDefaultRoleIndex() returned empty index")
	}
}
