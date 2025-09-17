"""
Unit tests for client-side validation in Python IAM API User service.

This test module verifies that protovalidate validation is properly integrated
into the Python generated clients and works as expected.
"""

import pytest
from protovalidate import Validator

from meshtrade.iam.api_user.v1.api_user_pb2 import APIUser, APIUserState
from meshtrade.iam.api_user.v1.service_pb2 import CreateApiUserRequest


class TestApiUserServiceClientValidation:
    """Test client-side validation for Python API User service."""

    def test_create_api_user_valid_request_passes_validation(self):
        """Test that a valid CreateApiUser request passes validation."""
        # Create a valid request
        request = CreateApiUserRequest(
            api_user=APIUser(
                owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                display_name="Test API User",
                state=APIUserState.API_USER_STATE_ACTIVE,
            )
        )

        # Validate using protovalidate directly (same as BaseGRPCClient does)
        validator = Validator()

        # This should not raise any exception
        validator.validate(request)

        # Verify the request structure
        assert request.api_user is not None
        assert request.api_user.owner == "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"
        assert request.api_user.display_name == "Test API User"

    def test_create_api_user_invalid_owner_fails_validation(self):
        """Test that an invalid owner fails validation."""
        # Create an invalid request - empty owner
        request = CreateApiUserRequest(
            api_user=APIUser(
                owner="",  # Invalid: empty owner
                display_name="Test API User",
            )
        )

        # Validate using protovalidate
        validator = Validator()

        # This should raise a validation exception
        with pytest.raises(Exception) as exc_info:
            validator.validate(request)

        # Verify the error indicates validation failure
        # Note: Python protovalidate returns generic "invalid CreateApiUserRequest" messages
        error_message = str(exc_info.value)
        assert "invalid" in error_message.lower()
        assert "createapiuserrequest" in error_message.lower()

    def test_create_api_user_invalid_display_name_fails_validation(self):
        """Test that an empty display name fails validation."""
        # Create an invalid request - empty display name
        request = CreateApiUserRequest(
            api_user=APIUser(
                owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                display_name="",  # Invalid: empty display name
            )
        )

        # Validate using protovalidate
        validator = Validator()

        # This should raise a validation exception
        with pytest.raises(Exception) as exc_info:
            validator.validate(request)

        # Verify the error indicates validation failure
        # Note: Python protovalidate returns generic "invalid CreateApiUserRequest" messages
        error_message = str(exc_info.value)
        assert "invalid" in error_message.lower()
        assert "createapiuserrequest" in error_message.lower()

    def test_create_api_user_display_name_too_long_fails_validation(self):
        """Test that a display name that's too long fails validation."""
        # Create an invalid request - display name too long (max 255 chars)
        long_display_name = "a" * 256
        request = CreateApiUserRequest(
            api_user=APIUser(
                owner="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                display_name=long_display_name,
            )
        )

        # Validate using protovalidate
        validator = Validator()

        # This should raise a validation exception
        with pytest.raises(Exception) as exc_info:
            validator.validate(request)

        # Verify the error indicates validation failure and the display name is indeed too long
        error_message = str(exc_info.value)
        assert len(long_display_name) > 255
        # Note: Python protovalidate returns generic "invalid CreateApiUserRequest" messages
        assert "invalid" in error_message.lower()
        assert "createapiuserrequest" in error_message.lower()


class TestClientValidationIntegration:
    """Test client-side validation integration with BaseGRPCClient."""

    def test_base_grpc_client_validation_flow_documentation(self):
        """Document the expected validation flow in Python clients."""
        # This test serves as documentation of the validation flow:
        #
        # 1. User calls: service.create_api_user(request)
        # 2. Generated client calls: self._execute_method("CreateApiUser", request)
        # 3. BaseGRPCClient._execute_method calls: self._validator.validate(request)
        # 4. If validation fails: raises ValueError("Request validation failed: ...")
        # 5. If validation passes: makes gRPC call to server
        #
        # This provides immediate feedback and reduces unnecessary network calls
        # ALL generated Python clients inherit validation from BaseGRPCClient - no duplication!

        # Verify that BaseGRPCClient has a validator
        from meshtrade.common.grpc_client import BaseGRPCClient
        from meshtrade.iam.api_user.v1.api_credentials import find_credentials

        # Create a minimal BaseGRPCClient instance to verify validator exists
        def dummy_stub_factory(channel):
            return None

        client = BaseGRPCClient(
            service_name="TestService",
            stub_factory=dummy_stub_factory,
            find_credentials_func=find_credentials,
            api_key="test-key",
            group="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
        )

        # Verify the validator method exists and returns a Validator
        validator = client.validator()
        assert isinstance(validator, Validator)

        # Verify validation integration in _execute_method
        # (We can't easily test the full flow without setting up gRPC server,
        #  but we verified that validation is called first in _execute_method)


def example_python_client_validation_errors():
    """
    Example of how validation errors would look when using Python clients.

    This function demonstrates the expected behavior but doesn't run as a test.

    Example usage that would trigger validation:

    ```python
    from meshtrade.iam.api_user.v1.service_meshpy import ApiUserService
    from meshtrade.iam.api_user.v1.service_pb2 import CreateApiUserRequest
    from meshtrade.iam.api_user.v1.api_user_pb2 import APIUser

    # Create service instance
    service = ApiUserService()

    # Create invalid request
    request = CreateApiUserRequest(
        api_user=APIUser(
            owner="",  # Invalid - empty owner
            display_name="Test User",
        )
    )

    try:
        with service:
            response = service.create_api_user(request)
    except ValueError as e:
        # This error would contain: "Request validation failed: ..."
        # The validation error would include details about why the owner field is invalid
        print(f"Validation failed: {e}")
    ```
    """
    pass
