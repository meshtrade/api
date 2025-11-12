package generate

import (
	"testing"

	"google.golang.org/protobuf/encoding/protowire"
)

func TestExtractMethodOptionsFromBytes_ValidData(t *testing.T) {
	// Build valid wire format bytes for MethodOptions message
	var buf []byte

	// Field 1: type = METHOD_TYPE_WRITE (2)
	buf = protowire.AppendTag(buf, 1, protowire.VarintType)
	buf = protowire.AppendVarint(buf, 2)

	// Field 2: access_level = METHOD_ACCESS_LEVEL_AUTHORISED (3)
	buf = protowire.AppendTag(buf, 2, protowire.VarintType)
	buf = protowire.AppendVarint(buf, 3)

	// Field 3: roles = [3000000, 3000002] (packed)
	var rolesBuf []byte
	rolesBuf = protowire.AppendVarint(rolesBuf, 3000000)
	rolesBuf = protowire.AppendVarint(rolesBuf, 3000002)
	buf = protowire.AppendTag(buf, 3, protowire.BytesType)
	buf = protowire.AppendBytes(buf, rolesBuf)

	// Create enum maps
	methodTypeMap := map[int32]string{
		1: "METHOD_TYPE_READ",
		2: "METHOD_TYPE_WRITE",
	}
	accessLevelMap := map[int32]string{
		1: "METHOD_ACCESS_LEVEL_PUBLIC",
		2: "METHOD_ACCESS_LEVEL_AUTHENTICATED",
		3: "METHOD_ACCESS_LEVEL_AUTHORISED",
	}
	roleMap := map[int32]string{
		3000000: "ROLE_IAM_ADMIN",
		3000002: "ROLE_IAM_API_USER_ADMIN",
	}

	// Execute
	methodType, accessLevel, roles := extractMethodOptionsFromBytes("TestMethod", buf, methodTypeMap, accessLevelMap, roleMap)

	// Verify
	if methodType != "METHOD_TYPE_WRITE" {
		t.Errorf("Expected METHOD_TYPE_WRITE, got %s", methodType)
	}
	if accessLevel != "METHOD_ACCESS_LEVEL_AUTHORISED" {
		t.Errorf("Expected METHOD_ACCESS_LEVEL_AUTHORISED, got %s", accessLevel)
	}
	if len(roles) != 2 {
		t.Errorf("Expected 2 roles, got %d", len(roles))
	}
	if roles[0] != "ROLE_IAM_ADMIN" || roles[1] != "ROLE_IAM_API_USER_ADMIN" {
		t.Errorf("Unexpected roles: %v", roles)
	}
}

func TestExtractMethodOptionsFromBytes_MalformedData(t *testing.T) {
	// Test truncated buffer
	buf := []byte{0x08} // Incomplete tag
	methodTypeMap := make(map[int32]string)
	accessLevelMap := make(map[int32]string)
	roleMap := make(map[int32]string)

	methodType, accessLevel, roles := extractMethodOptionsFromBytes("TestMethod", buf, methodTypeMap, accessLevelMap, roleMap)

	// Should return defaults on parse error
	if methodType != "Unknown" {
		t.Errorf("Expected Unknown on malformed data, got %s", methodType)
	}
	if accessLevel != "Unknown" {
		t.Errorf("Expected Unknown on malformed data, got %s", accessLevel)
	}
	if len(roles) != 0 {
		t.Errorf("Expected empty roles on malformed data, got %v", roles)
	}
}

func TestExtractMethodOptionsFromBytes_UnknownRoleNumbers(t *testing.T) {
	// Build buffer with role number not in map
	var buf []byte
	var rolesBuf []byte
	rolesBuf = protowire.AppendVarint(rolesBuf, 9999999) // Unknown role
	buf = protowire.AppendTag(buf, 3, protowire.BytesType)
	buf = protowire.AppendBytes(buf, rolesBuf)

	methodTypeMap := make(map[int32]string)
	accessLevelMap := make(map[int32]string)
	roleMap := make(map[int32]string) // Empty map

	_, _, roles := extractMethodOptionsFromBytes("TestMethod", buf, methodTypeMap, accessLevelMap, roleMap)

	// Should use fallback format
	if len(roles) != 1 || roles[0] != "ROLE_ENUM_9999999" {
		t.Errorf("Expected fallback format ROLE_ENUM_9999999, got %v", roles)
	}
}

func TestExtractMethodOptionsFromBytes_NonPackedRoles(t *testing.T) {
	// Test non-packed repeated field encoding (individual varints)
	var buf []byte

	// Field 3: roles (non-packed) = [3000000, 3000002]
	buf = protowire.AppendTag(buf, 3, protowire.VarintType)
	buf = protowire.AppendVarint(buf, 3000000)
	buf = protowire.AppendTag(buf, 3, protowire.VarintType)
	buf = protowire.AppendVarint(buf, 3000002)

	methodTypeMap := make(map[int32]string)
	accessLevelMap := make(map[int32]string)
	roleMap := map[int32]string{
		3000000: "ROLE_IAM_ADMIN",
		3000002: "ROLE_IAM_API_USER_ADMIN",
	}

	_, _, roles := extractMethodOptionsFromBytes("TestMethod", buf, methodTypeMap, accessLevelMap, roleMap)

	// Verify roles parsed correctly
	if len(roles) != 2 {
		t.Errorf("Expected 2 roles, got %d", len(roles))
	}
	if roles[0] != "ROLE_IAM_ADMIN" || roles[1] != "ROLE_IAM_API_USER_ADMIN" {
		t.Errorf("Unexpected roles: %v", roles)
	}
}

func TestExtractMethodOptionsFromBytes_UnknownEnumValues(t *testing.T) {
	// Test with enum values not in the map
	var buf []byte

	// Field 1: type = 99 (unknown)
	buf = protowire.AppendTag(buf, 1, protowire.VarintType)
	buf = protowire.AppendVarint(buf, 99)

	// Field 2: access_level = 88 (unknown)
	buf = protowire.AppendTag(buf, 2, protowire.VarintType)
	buf = protowire.AppendVarint(buf, 88)

	methodTypeMap := map[int32]string{
		1: "METHOD_TYPE_READ",
		2: "METHOD_TYPE_WRITE",
	}
	accessLevelMap := map[int32]string{
		1: "METHOD_ACCESS_LEVEL_PUBLIC",
		2: "METHOD_ACCESS_LEVEL_AUTHENTICATED",
		3: "METHOD_ACCESS_LEVEL_AUTHORISED",
	}
	roleMap := make(map[int32]string)

	methodType, accessLevel, roles := extractMethodOptionsFromBytes("TestMethod", buf, methodTypeMap, accessLevelMap, roleMap)

	// Should fallback to UNSPECIFIED for unknown enum values
	if methodType != "METHOD_TYPE_UNSPECIFIED" {
		t.Errorf("Expected METHOD_TYPE_UNSPECIFIED for unknown value, got %s", methodType)
	}
	if accessLevel != "METHOD_ACCESS_LEVEL_UNSPECIFIED" {
		t.Errorf("Expected METHOD_ACCESS_LEVEL_UNSPECIFIED for unknown value, got %s", accessLevel)
	}
	if len(roles) != 0 {
		t.Errorf("Expected no roles, got %v", roles)
	}
}

func TestExtractMethodOptionsFromBytes_EmptyData(t *testing.T) {
	// Test with empty data
	buf := []byte{}
	methodTypeMap := make(map[int32]string)
	accessLevelMap := make(map[int32]string)
	roleMap := make(map[int32]string)

	methodType, accessLevel, roles := extractMethodOptionsFromBytes("TestMethod", buf, methodTypeMap, accessLevelMap, roleMap)

	// Should return default values
	if methodType != "Unknown" {
		t.Errorf("Expected Unknown for empty data, got %s", methodType)
	}
	if accessLevel != "Unknown" {
		t.Errorf("Expected Unknown for empty data, got %s", accessLevel)
	}
	if len(roles) != 0 {
		t.Errorf("Expected no roles for empty data, got %v", roles)
	}
}
