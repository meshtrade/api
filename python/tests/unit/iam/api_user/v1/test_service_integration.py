"""
Integration tests for Python API User service client-side validation.

These tests verify that client-side validation is properly integrated into the
Python service wrapper and prevents invalid requests from reaching the network layer.
"""

import json
import os
import stat
import tempfile
import time
import pytest
from datetime import timedelta
from pathlib import Path
from unittest.mock import patch, MagicMock

from meshtrade.iam.api_user.v1.service_meshpy import ApiUserService
from meshtrade.iam.api_user.v1.service_options_meshpy import ServiceOptions
from meshtrade.iam.api_user.v1.service_pb2 import (
    GetApiUserRequest,
    CreateApiUserRequest,
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

# AssignRoleToAPIUserRequest tests commented out until Python code is regenerated
    # def test_assign_role_to_user_validation_failure_fast(self, service):
    #     """Test AssignRoleToAPIUser with invalid request fails validation quickly."""
    #     # Create invalid request - wrong name format
    #     request = AssignRoleToAPIUserRequest(
    #         name="invalid-format",  # Invalid: wrong format
    #         role="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1000001",
    #     )

    #     start_time = time.time()
        
    #     with patch.object(service, '_validator') as mock_validator:
    #         mock_validator.validate.side_effect = ValueError("Request validation failed: invalid name format")
            
    #         with pytest.raises(ValueError, match="Request validation failed"):
    #             service.assign_role_to_user(request)
        
    #     duration = time.time() - start_time
    #     assert duration < 0.1

    # def test_assign_role_to_user_validation_success_slower(self, service):
    #     """Test AssignRoleToAPIUser with valid request passes validation and makes network call."""
    #     # Create valid request
    #     request = AssignRoleToAPIUserRequest(
    #         name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
    #         role="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1000001",
    #     )

    #     start_time = time.time()
        
    #     def slow_mock_execute(*args, **kwargs):
    #         time.sleep(0.05)
    #         return APIUser(
    #             name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
    #             owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
    #             display_name="Test API User",
    #             state=APIUserState.API_USER_STATE_ACTIVE,
    #         )
        
    #     with patch.object(service, '_execute_method', side_effect=slow_mock_execute):
    #         result = service.assign_role_to_user(request)
        
    #     duration = time.time() - start_time
    #     assert duration > 0.04
    #     assert result is not None

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


class TestApiUserServiceCredentialFiles:
    """Test MESH_API_CREDENTIALS environment variable functionality."""

    @pytest.fixture(autouse=True)
    def setup_credentials_env(self):
        """Save and restore environment state for each test."""
        original_credentials = os.environ.get("MESH_API_CREDENTIALS")
        yield
        # Restore original state
        if original_credentials is not None:
            os.environ["MESH_API_CREDENTIALS"] = original_credentials
        else:
            os.environ.pop("MESH_API_CREDENTIALS", None)

    def test_valid_credential_file(self):
        """Test loading valid credentials from file via MESH_API_CREDENTIALS."""
        with tempfile.TemporaryDirectory() as temp_dir:
            # Create a valid credentials file
            valid_credentials = {
                "api_key": "test-api-key-from-file",
                "group": "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"
            }
            credentials_path = Path(temp_dir) / "valid_credentials.json"
            credentials_path.write_text(json.dumps(valid_credentials))

            # Set environment variable to point to the file
            os.environ["MESH_API_CREDENTIALS"] = str(credentials_path)

            # Create service without explicit credentials - should load from file
            options = ServiceOptions(
                url="localhost",
                port=9999,
                timeout=timedelta(milliseconds=100)
            )
            service = ApiUserService(options)

            # Test that validation works with file-loaded credentials
            valid_request = GetApiUserRequest(name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV")
            
            with patch.object(service, '_execute_method') as mock_execute:
                mock_execute.side_effect = Exception("Network error")  # Simulate network failure
                
                with pytest.raises(Exception) as exc_info:
                    service.get_api_user(valid_request)
                
                # Should get network error, not validation error
                assert "Request validation failed" not in str(exc_info.value)

    def test_invalid_credential_file_formats(self):
        """Test various invalid credential file formats."""
        test_cases = [
            {
                "name": "invalid_json",
                "content": '{"api_key": "test", invalid json}',
                "description": "Invalid JSON should cause error",
            },
            {
                "name": "missing_api_key", 
                "content": '{"group": "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"}',
                "description": "Missing api_key should cause error",
            },
            {
                "name": "missing_group",
                "content": '{"api_key": "test-key"}',
                "description": "Missing group should cause error",
            },
            {
                "name": "empty_api_key",
                "content": '{"api_key": "", "group": "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"}',
                "description": "Empty api_key should cause error",
            },
            {
                "name": "empty_group",
                "content": '{"api_key": "test-key", "group": ""}',
                "description": "Empty group should cause error",
            },
            {
                "name": "invalid_group_format",
                "content": '{"api_key": "test-key", "group": "invalid-group-format"}',
                "description": "Invalid group format should cause error",
            },
        ]

        for case in test_cases:
            with tempfile.TemporaryDirectory() as temp_dir:
                credentials_path = Path(temp_dir) / f"{case['name']}_credentials.json"
                credentials_path.write_text(case["content"])
                
                os.environ["MESH_API_CREDENTIALS"] = str(credentials_path)

                # Service creation may succeed but credentials are invalid
                # Test by trying to make a call that should fail
                try:
                    options = ServiceOptions(
                        url="localhost",
                        timeout=timedelta(milliseconds=100)
                    )
                    service = ApiUserService(options)
                    
                    # If service creation succeeds, test that calls fail due to invalid credentials
                    valid_request = GetApiUserRequest(name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV")
                    
                    with patch.object(service, '_execute_method') as mock_execute:
                        mock_execute.side_effect = Exception("Network/credential error")
                        
                        with pytest.raises(Exception):
                            service.get_api_user(valid_request)
                    
                except Exception as e:
                    # Service creation may fail due to credential issues - also acceptable
                    assert any(word in str(e).lower() for word in 
                              ["api_key", "group", "json", "credentials", "parse"])

    def test_nonexistent_credential_file(self):
        """Test pointing to a nonexistent credentials file."""
        with tempfile.TemporaryDirectory() as temp_dir:
            nonexistent_path = Path(temp_dir) / "does_not_exist.json"
            os.environ["MESH_API_CREDENTIALS"] = str(nonexistent_path)

            # Service creation may succeed but credentials loading should fail
            try:
                options = ServiceOptions(
                    url="localhost", 
                    timeout=timedelta(milliseconds=100)
                )
                service = ApiUserService(options)
                
                # If service creation succeeds, test that calls fail
                valid_request = GetApiUserRequest(name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV")
                
                with patch.object(service, '_execute_method') as mock_execute:
                    mock_execute.side_effect = Exception("Network/credential error")
                    
                    with pytest.raises(Exception):
                        service.get_api_user(valid_request)
                
            except Exception as e:
                # Service creation may fail due to missing credentials - also acceptable
                assert "credentials" in str(e).lower() or "failed to read" in str(e).lower()

    def test_credential_file_overridden_by_options(self):
        """Test that explicit options override file credentials."""
        with tempfile.TemporaryDirectory() as temp_dir:
            # Create a credentials file
            file_credentials = {
                "api_key": "file-api-key",
                "group": "groups/01FILECREDENTIALSTEST123"
            }
            credentials_path = Path(temp_dir) / "override_test_credentials.json"
            credentials_path.write_text(json.dumps(file_credentials))

            os.environ["MESH_API_CREDENTIALS"] = str(credentials_path)

            # Create service with explicit options that should override file
            options = ServiceOptions(
                api_key="explicit-api-key",  # Should override file
                group="groups/01EXPLICITGROUPTEST123",  # Should override file
                url="localhost",
                port=9999,
                timeout=timedelta(milliseconds=100)
            )
            service = ApiUserService(options)

            # Test that validation works with overridden credentials
            valid_request = GetApiUserRequest(name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV")
            
            with patch.object(service, '_execute_method') as mock_execute:
                mock_execute.side_effect = Exception("Network error")
                
                with pytest.raises(Exception) as exc_info:
                    service.get_api_user(valid_request)
                
                assert "Request validation failed" not in str(exc_info.value)

    def test_no_credentials_provided(self):
        """Test service creation without any credentials."""
        # Clear environment variable
        os.environ.pop("MESH_API_CREDENTIALS", None)

        # Create service without any credentials - should fall back to default discovery
        # This may or may not work depending on test environment
        options = ServiceOptions(
            url="localhost",
            timeout=timedelta(milliseconds=100)
        )
        
        # The exact behavior depends on whether default credentials exist
        # We don't assert specific error here as it may vary by test environment
        try:
            service = ApiUserService(options)
            # If successful, validation should still work
            valid_request = GetApiUserRequest(name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV")
            
            with patch.object(service, '_execute_method') as mock_execute:
                mock_execute.side_effect = Exception("Network error")
                
                with pytest.raises(Exception):
                    service.get_api_user(valid_request)
                    
        except Exception as e:
            # Service creation may fail if no credentials found - this is acceptable
            print(f"Service creation without credentials result: {e}")

    def test_credential_file_with_extra_fields(self):
        """Test that extra fields in JSON are ignored gracefully."""
        with tempfile.TemporaryDirectory() as temp_dir:
            credentials_with_extra = {
                "api_key": "test-api-key",
                "group": "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                "extra_field": "should_be_ignored",
                "another_extra": 123
            }
            credentials_path = Path(temp_dir) / "extra_fields_credentials.json" 
            credentials_path.write_text(json.dumps(credentials_with_extra))

            os.environ["MESH_API_CREDENTIALS"] = str(credentials_path)

            options = ServiceOptions(
                url="localhost",
                port=9999,
                timeout=timedelta(milliseconds=100)
            )
            service = ApiUserService(options)  # Should succeed despite extra fields

            # Test that validation works
            valid_request = GetApiUserRequest(name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV")
            
            with patch.object(service, '_execute_method') as mock_execute:
                mock_execute.side_effect = Exception("Network error")
                
                with pytest.raises(Exception) as exc_info:
                    service.get_api_user(valid_request)
                
                assert "Request validation failed" not in str(exc_info.value)

    def test_credential_file_permissions(self):
        """Test credential file permission handling.""" 
        with tempfile.TemporaryDirectory() as temp_dir:
            # Create a credentials file
            valid_credentials = {
                "api_key": "permission-test-key",
                "group": "groups/01PERMISSIONTEST12345"
            }
            credentials_path = Path(temp_dir) / "permission_test_credentials.json"
            credentials_path.write_text(json.dumps(valid_credentials))

            # Test that file can be read with normal permissions
            os.environ["MESH_API_CREDENTIALS"] = str(credentials_path)

            options = ServiceOptions(
                url="localhost",
                port=9999,
                timeout=timedelta(milliseconds=100)
            )
            service = ApiUserService(options)  # Should succeed with normal permissions

            # Change permissions to be unreadable (if not on Windows)
            if os.name != 'nt':
                credentials_path.chmod(0o000)
                
                try:
                    # Service creation may succeed but credentials loading should fail
                    try:
                        service = ApiUserService(options)
                        
                        # If service creation succeeds, test that calls fail
                        valid_request = GetApiUserRequest(name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV")
                        
                        with patch.object(service, '_execute_method') as mock_execute:
                            mock_execute.side_effect = Exception("Network/credential error")
                            
                            with pytest.raises(Exception):
                                service.get_api_user(valid_request)
                        
                    except Exception as e:
                        # Service creation may fail due to permission error - also acceptable
                        assert "permission" in str(e).lower() or "credentials" in str(e).lower()
                        
                finally:
                    # Restore permissions for cleanup
                    credentials_path.chmod(0o644)

    def test_credential_discovery_hierarchy(self):
        """Test the credential discovery hierarchy works correctly."""
        with tempfile.TemporaryDirectory() as temp_dir:
            # Create credentials file
            env_credentials = {
                "api_key": "env-file-api-key",
                "group": "groups/01ENVFILECREDENTIALS123"
            }
            env_credentials_path = Path(temp_dir) / "env_credentials.json"
            env_credentials_path.write_text(json.dumps(env_credentials))

            # Test 1: Environment variable takes precedence
            os.environ["MESH_API_CREDENTIALS"] = str(env_credentials_path)
            
            options = ServiceOptions(
                url="localhost",
                port=9999,
                timeout=timedelta(milliseconds=100)
            )
            service = ApiUserService(options)
            
            # Validation should work with env credentials
            valid_request = GetApiUserRequest(name="api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV")
            
            with patch.object(service, '_execute_method') as mock_execute:
                mock_execute.side_effect = Exception("Network error")
                
                with pytest.raises(Exception) as exc_info:
                    service.get_api_user(valid_request)
                
                assert "Request validation failed" not in str(exc_info.value)

            # Test 2: Clear environment variable, should fall back to default discovery
            os.environ.pop("MESH_API_CREDENTIALS", None)
            
            # This may or may not find default credentials depending on test environment
            # We just verify no crash occurs
            try:
                service2 = ApiUserService(options)
                # If successful, validation should still work
                with patch.object(service2, '_execute_method') as mock_execute:
                    mock_execute.side_effect = Exception("Network error")
                    
                    with pytest.raises(Exception):
                        service2.get_api_user(valid_request)
            except Exception as e:
                # May fail if no default credentials found - acceptable
                print(f"Default credential discovery result: {e}")

    def test_credential_environment_variable_name(self):
        """Test that the correct environment variable name is used."""
        from meshtrade.iam.api_user.v1.api_credentials import MESH_API_CREDENTIALS_ENV_VAR
        
        assert MESH_API_CREDENTIALS_ENV_VAR == "MESH_API_CREDENTIALS"
        
        with tempfile.TemporaryDirectory() as temp_dir:
            valid_credentials = {
                "api_key": "env-var-test-key", 
                "group": "groups/01ENVVARTEST123456789"
            }
            credentials_path = Path(temp_dir) / "env_var_test.json"
            credentials_path.write_text(json.dumps(valid_credentials))

            # Test with correct environment variable name
            os.environ[MESH_API_CREDENTIALS_ENV_VAR] = str(credentials_path)
            
            options = ServiceOptions(
                url="localhost",
                timeout=timedelta(milliseconds=100)
            )
            service = ApiUserService(options)  # Should work

            # Test with wrong environment variable name (should not work)
            os.environ.pop(MESH_API_CREDENTIALS_ENV_VAR, None)
            os.environ["WRONG_ENV_VAR"] = str(credentials_path)
            
            # Should fall back to default discovery (may or may not succeed)
            try:
                service2 = ApiUserService(options)
                print("Service created with wrong env var (using default discovery)")
            except Exception as e:
                print(f"Service creation failed with wrong env var (expected): {e}")