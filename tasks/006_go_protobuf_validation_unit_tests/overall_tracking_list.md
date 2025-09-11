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
- ✅ **AssignRoleToUserRequest** (`./go/iam/user/v1/service_validation_test.go`) - COMPLETED
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
- ✅ **Group** (`./go/iam/group/v1/group_validation_test.go`) - COMPLETED
  - `name` field: CEL validation (optional, groups/{ULIDv2} format)
  - `owner` field: required, length 33, strict ULIDv2 pattern `^groups/[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$`
  - `owners` field: repeated, each item length 33, strict ULIDv2 pattern
  - `display_name` field: required, length 1-255 characters
  - `description` field: optional, max 1000 characters

### Request/Response Message Types  
- ✅ **Service Request/Response Types** (`./go/iam/group/v1/service_validation_test.go`) - COMPLETED
  - CreateGroupRequest: `group` field (required Group object)
  - UpdateGroupRequest: `group` field (required Group object)
  - ListGroupsRequest: sorting field validation (name, display_name, or empty)
  - ListGroupsResponse: no validation rules (response type)
  - SearchGroupsRequest: display_name and description search fields (max 255 chars), plus sorting validation
  - SearchGroupsResponse: no validation rules (response type)
  - GetGroupRequest: `name` field (required, groups/{ULIDv2} pattern)

---

## 4. wallet/account/v1 Package

### Resource Message Types
- ✅ **Account** (`./go/wallet/account/v1/account_validation_test.go`) - COMPLETED
  - `name` field: CEL validation (optional, accounts/{ULIDv2} format)
  - `owner` field: required, length 33, strict ULIDv2 pattern `^groups/[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$`
  - `owners` field: repeated, each item length 33, strict ULIDv2 pattern
  - `number` field: CEL validation (optional, 7-digit number starting with 1)
  - `ledger_id` field: max length 255 characters
  - `ledger` field: required, enum validation (not UNSPECIFIED)
  - `display_name` field: required, length 1-255 characters

- ✅ **InstrumentMetaData** (`./go/wallet/account/v1/account_validation_test.go`) - COMPLETED
  - No validation rules defined in proto (all fields optional)

- ✅ **Balance** (`./go/wallet/account/v1/account_validation_test.go`) - COMPLETED
  - No validation rules defined in proto (all fields optional)

### Request/Response Message Types
- ✅ **Service Request/Response Types** (`./go/wallet/account/v1/service_validation_test.go`) - COMPLETED
  - CreateAccountRequest: `account` field (required Account object)
  - UpdateAccountRequest: `account` field (required Account object)
  - OpenAccountRequest: `name` field (length 35, accounts/{ULIDv2} pattern)
  - OpenAccountResponse: no validation rules (response type)
  - CloseAccountRequest: `name` field (length 35, accounts/{ULIDv2} pattern)
  - CloseAccountResponse: no validation rules (response type)
  - GetAccountRequest: `name` field (length 35, accounts/{ULIDv2} pattern)
  - GetAccountByNumberRequest: `account_number` field (pattern `^1[0-9]{6}$`)
  - ListAccountsRequest: sorting field validation (number or empty)
  - ListAccountsResponse: no validation rules (response type)
  - SearchAccountsRequest: display_name max 255 chars, sorting field validation
  - SearchAccountsResponse: no validation rules (response type)

---

## Summary Statistics

**Total Test Files Required**: 11
- ✅ Completed: 11 (APIUser + User + APICredentials + iam/api_user/v1 Service + iam/user/v1 Service + Group + iam/group/v1 Service + Account + wallet/account/v1 Service validation tests)
- 🔄 In Progress: 0
- ❌ Not Started: 0

**Total Message Types to Test**: ~35+ individual message types - ALL COMPLETED

**Status**: 
🎉 **ALL VALIDATION TESTS COMPLETED!** All 11 test files have been successfully implemented and tested.

## Notes

- Some request/response types (especially response types and simple list requests) may have no validation rules defined, which should be verified during implementation
- Focus first on message types with complex validation rules (required fields, patterns, length constraints)  
- Each test file should use the same pattern as the existing `api_user_validation_test.go`
- Use `buf.build/go/protovalidate` for validation testing
- Follow table-driven test approach with comprehensive test cases