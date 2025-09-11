# Go Protobuf Validation Unit Tests - Overall Tracking List

This document tracks the comprehensive set of Go unit tests needed for protobuf validation across all target API directories. Each test file should follow the pattern of `./api/go/iam/api_user/v1/api_user_validation_test.go` with table-driven tests covering success and failure cases.

## Test Requirements
- ✅ = Completed and tested  
- 🔄 = In Progress
- ❌ = Not Started
- 🚫 = Skipped (no validations defined)

Each test must cover:
1. **Success cases**: Valid messages that should pass validation
2. **Failure cases**: Invalid messages that should fail validation with specific error messages
3. **Edge cases**: Boundary conditions and special scenarios
4. **All validation rules**: Required fields, patterns, lengths, formats, etc.

---

## 1. iam/user/v1 Package

### Resource Message Types
- ✅ **User** (`./go/iam/user/v1/user_validation_test.go`) - COMPLETED
  - `name` field: CEL validation (optional, users/{ULIDv2} format)
  - `owner` field: required, length 33, strict ULIDv2 pattern `^groups/[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$`
  - `owners` field: repeated, each item length 33, strict ULIDv2 pattern
  - `email` field: required, email validation
  - `roles` field: repeated, each item length 41, role pattern `^groups/[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}/1[0-9]{6}$`

### Request/Response Message Types
- ❌ **AssignRoleToUserRequest** (`./go/iam/user/v1/service_validation_test.go`)
  - `name` field: length 32, pattern `^users/[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$`
  - `role` field: required, length 41, role pattern `^groups/[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}/1[0-9]{6}$`

---

## 2. iam/api_user/v1 Package

### Resource Message Types
- ✅ **APIUser** (`./go/iam/api_user/v1/api_user_validation_test.go`) - *ALREADY EXISTS*

- ✅ **APICredentials** (`./go/iam/api_user/v1/api_credentials_validation_test.go`) - COMPLETED
  - `api_key` field: length 43, pattern `^[A-Za-z0-9_-]{43}$`, CEL validations for required and format
  - `group` field: length 33, strict ULIDv2 pattern, CEL validations for required and format

### Request/Response Message Types
- ✅ **Service Request/Response Types** (`./go/iam/api_user/v1/service_validation_test.go`) - COMPLETED
  - GetApiUserRequest: `name` field (required, length 36, ULIDv2 pattern)
  - GetApiUserByKeyHashRequest: `key_hash` field (required, length 44)
  - CreateApiUserRequest: `api_user` field (required APIUser object)
  - ActivateApiUserRequest: `name` field (required, length 36, ULIDv2 pattern)
  - DeactivateApiUserRequest: `name` field (required, length 36, ULIDv2 pattern)
  - ListApiUsersRequest: no validation rules (empty message)
  - ListApiUsersResponse: no validation rules (response type)
  - SearchApiUsersRequest: no validation rules on `display_name` field
  - SearchApiUsersResponse: no validation rules (response type)

---

## 3. iam/group/v1 Package

### Resource Message Types
- ❌ **Group** (`./go/iam/group/v1/group_validation_test.go`)
  - Need to examine group.proto for validation rules

### Request/Response Message Types  
- ❌ **Service Request/Response Types** (`./go/iam/group/v1/service_validation_test.go`)
  - CreateGroupRequest
  - UpdateGroupRequest
  - ListGroupsRequest
  - ListGroupsResponse (likely no validations)
  - SearchGroupsRequest
  - SearchGroupsResponse (likely no validations) 
  - GetGroupRequest

---

## 4. wallet/account/v1 Package

### Resource Message Types
- ❌ **Account** (`./go/wallet/account/v1/account_validation_test.go`)
  - Need to examine account.proto for validation rules

- ❌ **InstrumentMetaData** (`./go/wallet/account/v1/instrument_metadata_validation_test.go`)
  - Need to examine account.proto for validation rules

- ❌ **Balance** (`./go/wallet/account/v1/balance_validation_test.go`)
  - Need to examine account.proto for validation rules

### Request/Response Message Types
- ❌ **Service Request/Response Types** (`./go/wallet/account/v1/service_validation_test.go`)
  - CreateAccountRequest
  - UpdateAccountRequest  
  - OpenAccountRequest
  - OpenAccountResponse (likely no validations)
  - CloseAccountRequest
  - CloseAccountResponse (likely no validations)
  - GetAccountRequest
  - GetAccountByNumberRequest
  - ListAccountsRequest
  - ListAccountsResponse (likely no validations)
  - SearchAccountsRequest
  - SearchAccountsResponse (likely no validations)

---

## Summary Statistics

**Total Test Files Required**: 11
- ✅ Completed: 4 (APIUser + User + APICredentials + Service Request/Response validation tests)
- 🔄 In Progress: 0
- ❌ Not Started: 7

**Total Message Types to Test**: ~35+ individual message types

**Next Priority**: 
1. Start with User resource validation (most complex validation rules)
2. Then APICredentials (has comprehensive validation patterns)
3. Follow with service request/response types that have validation rules

## Notes

- Some request/response types (especially response types and simple list requests) may have no validation rules defined, which should be verified during implementation
- Focus first on message types with complex validation rules (required fields, patterns, length constraints)  
- Each test file should use the same pattern as the existing `api_user_validation_test.go`
- Use `buf.build/go/protovalidate` for validation testing
- Follow table-driven test approach with comprehensive test cases