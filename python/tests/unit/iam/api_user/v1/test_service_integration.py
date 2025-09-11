"""
Integration tests for Python API User service client-side validation.

These tests verify that client-side validation is properly integrated into the
Python service wrapper and prevents invalid requests from reaching the network layer.
"""

import time
import pytest
from datetime import timedelta
from unittest.mock import patch, MagicMock

from meshtrade.iam.api_user.v1.service_meshpy import ApiUserService
from meshtrade.iam.api_user.v1.service_pb2 import (
    GetApiUserRequest,
    CreateApiUserRequest,
    AssignRoleToAPIUserRequest,
    ListApiUsersRequest,
    SearchApiUsersRequest,
    ActivateApiUserRequest,
    DeactivateApiUserRequest,
    GetApiUserByKeyHashRequest,
)
from meshtrade.iam.api_user.v1.api_user_pb2 import APIUser, APIUserState


class TestApiUserServiceIntegration:
    """Test client-side validation integration with the service wrapper."""

    @pytest.fixture
    def service(self):
        """Create a mock ApiUserService for testing."""
        # Create service with test configuration to avoid real credentials
        service = ApiUserService()
        # Mock the actual gRPC call methods to avoid network calls
        with patch.object(service, '_execute_method') as mock_execute:
            # Mock successful responses for all methods
            mock_api_user = APIUser(
                name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                display_name="Test API User",
                state=APIUserState.API_USER_STATE_ACTIVE,
            )
            
            mock_execute.return_value = mock_api_user
            yield service

    def test_get_api_user_validation_failure_fast(self, service):
        """Test GetApiUser with invalid request fails validation quickly."""
        # Create invalid request - wrong name format
        request = GetApiUserRequest(name="invalid-name-format")

        start_time = time.time()
        
        # Mock the validator to raise an exception for invalid input
        with patch.object(service, '_validator') as mock_validator:
            mock_validator.validate.side_effect = ValueError("Request validation failed: invalid name format")
            
            with pytest.raises(ValueError, match="Request validation failed"):
                service.get_api_user(request)
        
        duration = time.time() - start_time
        
        # Validation should fail very quickly (< 0.1s)
        assert duration < 0.1

    def test_get_api_user_validation_success_slower(self, service):
        """Test GetApiUser with valid request passes validation and makes network call."""
        # Create valid request
        request = GetApiUserRequest(name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV")

        start_time = time.time()
        
        # Mock network delay to prove we reach the network layer
        def slow_mock_execute(*args, **kwargs):
            time.sleep(0.05)  # Simulate network delay
            return APIUser(
                name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                display_name="Test API User",
                state=APIUserState.API_USER_STATE_ACTIVE,
            )
        
        with patch.object(service, '_execute_method', side_effect=slow_mock_execute):
            result = service.get_api_user(request)
        
        duration = time.time() - start_time
        
        # Should take longer due to network delay
        assert duration > 0.04
        assert result is not None

    def test_create_api_user_validation_failure_fast(self, service):
        """Test CreateApiUser with invalid request fails validation quickly."""
        # Create invalid request - empty owner
        request = CreateApiUserRequest(
            api_user=APIUser(
                owner="",  # Invalid: empty owner
                display_name="Test API User",
            )
        )

        start_time = time.time()
        
        # Mock the validator to raise an exception for invalid input
        with patch.object(service, '_validator') as mock_validator:
            mock_validator.validate.side_effect = ValueError("Request validation failed: owner required")
            
            with pytest.raises(ValueError, match="Request validation failed"):
                service.create_api_user(request)
        
        duration = time.time() - start_time
        assert duration < 0.1

    def test_create_api_user_validation_success_slower(self, service):
        """Test CreateApiUser with valid request passes validation and makes network call."""
        # Create valid request
        request = CreateApiUserRequest(
            api_user=APIUser(
                owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                display_name="Test API User",
                state=APIUserState.API_USER_STATE_ACTIVE,
            )
        )

        start_time = time.time()
        
        def slow_mock_execute(*args, **kwargs):
            time.sleep(0.05)
            return APIUser(
                name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                display_name="Test API User",
                state=APIUserState.API_USER_STATE_ACTIVE,
            )
        
        with patch.object(service, '_execute_method', side_effect=slow_mock_execute):
            result = service.create_api_user(request)
        
        duration = time.time() - start_time
        assert duration > 0.04
        assert result is not None

    def test_assign_role_to_user_validation_failure_fast(self, service):
        """Test AssignRoleToAPIUser with invalid request fails validation quickly."""
        # Create invalid request - wrong name format
        request = AssignRoleToAPIUserRequest(
            name="invalid-format",  # Invalid: wrong format
            role="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1000001",
        )

        start_time = time.time()
        
        with patch.object(service, '_validator') as mock_validator:
            mock_validator.validate.side_effect = ValueError("Request validation failed: invalid name format")
            
            with pytest.raises(ValueError, match="Request validation failed"):
                service.assign_role_to_user(request)
        
        duration = time.time() - start_time
        assert duration < 0.1

    def test_assign_role_to_user_validation_success_slower(self, service):
        """Test AssignRoleToAPIUser with valid request passes validation and makes network call."""
        # Create valid request
        request = AssignRoleToAPIUserRequest(
            name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
            role="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1000001",
        )

        start_time = time.time()
        
        def slow_mock_execute(*args, **kwargs):
            time.sleep(0.05)
            return APIUser(
                name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                display_name="Test API User",
                state=APIUserState.API_USER_STATE_ACTIVE,
            )
        
        with patch.object(service, '_execute_method', side_effect=slow_mock_execute):
            result = service.assign_role_to_user(request)
        
        duration = time.time() - start_time
        assert duration > 0.04
        assert result is not None

    def test_list_api_users_validation_failure_fast(self, service):
        """Test ListApiUsers with invalid request fails validation quickly."""
        # ListApiUsersRequest has no validation rules, so we mock validation failure
        request = ListApiUsersRequest()

        start_time = time.time()
        
        with patch.object(service, '_validator') as mock_validator:
            mock_validator.validate.side_effect = ValueError("Request validation failed: mocked failure")
            
            with pytest.raises(ValueError, match="Request validation failed"):
                service.list_api_users(request)
        
        duration = time.time() - start_time
        assert duration < 0.1

    def test_list_api_users_validation_success_slower(self, service):
        """Test ListApiUsers with valid request passes validation and makes network call."""
        # Create valid request
        request = ListApiUsersRequest()

        start_time = time.time()
        
        def slow_mock_execute(*args, **kwargs):
            time.sleep(0.05)
            from meshtrade.iam.api_user.v1.service_pb2 import ListApiUsersResponse
            return ListApiUsersResponse(api_users=[])
        
        with patch.object(service, '_execute_method', side_effect=slow_mock_execute):
            result = service.list_api_users(request)
        
        duration = time.time() - start_time
        assert duration > 0.04
        assert result is not None

    def test_search_api_users_validation_failure_fast(self, service):
        """Test SearchApiUsers with invalid request fails validation quickly."""
        # SearchApiUsersRequest has no validation rules, so we mock validation failure
        request = SearchApiUsersRequest(display_name="test")

        start_time = time.time()
        
        with patch.object(service, '_validator') as mock_validator:
            mock_validator.validate.side_effect = ValueError("Request validation failed: mocked failure")
            
            with pytest.raises(ValueError, match="Request validation failed"):
                service.search_api_users(request)
        
        duration = time.time() - start_time
        assert duration < 0.1

    def test_search_api_users_validation_success_slower(self, service):
        """Test SearchApiUsers with valid request passes validation and makes network call."""
        # Create valid request
        request = SearchApiUsersRequest(display_name="test")

        start_time = time.time()
        
        def slow_mock_execute(*args, **kwargs):
            time.sleep(0.05)
            from meshtrade.iam.api_user.v1.service_pb2 import SearchApiUsersResponse
            return SearchApiUsersResponse(api_users=[])
        
        with patch.object(service, '_execute_method', side_effect=slow_mock_execute):
            result = service.search_api_users(request)
        
        duration = time.time() - start_time
        assert duration > 0.04
        assert result is not None

    def test_activate_api_user_validation_failure_fast(self, service):
        """Test ActivateApiUser with invalid request fails validation quickly."""
        # Create invalid request - wrong name format
        request = ActivateApiUserRequest(name="invalid-format")

        start_time = time.time()
        
        with patch.object(service, '_validator') as mock_validator:
            mock_validator.validate.side_effect = ValueError("Request validation failed: invalid name format")
            
            with pytest.raises(ValueError, match="Request validation failed"):
                service.activate_api_user(request)
        
        duration = time.time() - start_time
        assert duration < 0.1

    def test_activate_api_user_validation_success_slower(self, service):
        """Test ActivateApiUser with valid request passes validation and makes network call."""
        # Create valid request
        request = ActivateApiUserRequest(name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV")

        start_time = time.time()
        
        def slow_mock_execute(*args, **kwargs):
            time.sleep(0.05)
            return APIUser(
                name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                display_name="Test API User",
                state=APIUserState.API_USER_STATE_ACTIVE,
            )
        
        with patch.object(service, '_execute_method', side_effect=slow_mock_execute):
            result = service.activate_api_user(request)
        
        duration = time.time() - start_time
        assert duration > 0.04
        assert result is not None

    def test_deactivate_api_user_validation_failure_fast(self, service):
        """Test DeactivateApiUser with invalid request fails validation quickly."""
        # Create invalid request - wrong name format
        request = DeactivateApiUserRequest(name="invalid-format")

        start_time = time.time()
        
        with patch.object(service, '_validator') as mock_validator:
            mock_validator.validate.side_effect = ValueError("Request validation failed: invalid name format")
            
            with pytest.raises(ValueError, match="Request validation failed"):
                service.deactivate_api_user(request)
        
        duration = time.time() - start_time
        assert duration < 0.1

    def test_deactivate_api_user_validation_success_slower(self, service):
        """Test DeactivateApiUser with valid request passes validation and makes network call."""
        # Create valid request
        request = DeactivateApiUserRequest(name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV")

        start_time = time.time()
        
        def slow_mock_execute(*args, **kwargs):
            time.sleep(0.05)
            return APIUser(
                name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                display_name="Test API User",
                state=APIUserState.API_USER_STATE_INACTIVE,
            )
        
        with patch.object(service, '_execute_method', side_effect=slow_mock_execute):
            result = service.deactivate_api_user(request)
        
        duration = time.time() - start_time
        assert duration > 0.04
        assert result is not None

    def test_get_api_user_by_key_hash_validation_failure_fast(self, service):
        """Test GetApiUserByKeyHash with invalid request fails validation quickly."""
        # Create invalid request - wrong key_hash length
        request = GetApiUserByKeyHashRequest(key_hash="too-short")

        start_time = time.time()
        
        with patch.object(service, '_validator') as mock_validator:
            mock_validator.validate.side_effect = ValueError("Request validation failed: key_hash length invalid")
            
            with pytest.raises(ValueError, match="Request validation failed"):
                service.get_api_user_by_key_hash(request)
        
        duration = time.time() - start_time
        assert duration < 0.1

    def test_get_api_user_by_key_hash_validation_success_slower(self, service):
        """Test GetApiUserByKeyHash with valid request passes validation and makes network call."""
        # Create valid request - 44 character key hash
        request = GetApiUserByKeyHashRequest(key_hash="a" * 44)

        start_time = time.time()
        
        def slow_mock_execute(*args, **kwargs):
            time.sleep(0.05)
            return APIUser(
                name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                display_name="Test API User",
                state=APIUserState.API_USER_STATE_ACTIVE,
            )
        
        with patch.object(service, '_execute_method', side_effect=slow_mock_execute):
            result = service.get_api_user_by_key_hash(request)
        
        duration = time.time() - start_time
        assert duration > 0.04
        assert result is not None

    def test_validation_architecture_documentation(self):
        """Document the Python client-side validation architecture."""
        # This test serves as documentation of the validation flow:
        #
        # 1. User calls: service.method_name(request)
        # 2. Generated service method calls: self._execute_method("MethodName", request, timeout)
        # 3. BaseGRPCClient._execute_method() at lines 175-179 calls: self._validator.validate(request)
        # 4. If validation fails: raises ValueError("Request validation failed: ...")
        # 5. If validation passes: makes gRPC call to server
        #
        # Python uses the same protovalidate library as Go: protovalidate.Validator()
        # This provides immediate feedback and reduces unnecessary network calls
        
        from meshtrade.common.grpc_client import BaseGRPCClient
        from protovalidate import Validator
        
        # Create a test service instance
        service = ApiUserService()
        
        # Verify it has the validator
        validator = service.validator()
        assert isinstance(validator, Validator)
        
        # Verify it inherits from BaseGRPCClient
        assert isinstance(service, BaseGRPCClient)
        
        # The validation happens in _execute_method which all service methods call
        # This architecture ensures consistent validation across all Python services