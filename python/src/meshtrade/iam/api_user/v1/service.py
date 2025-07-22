"""
ApiUserService interface definition.
"""

from abc import ABC, abstractmethod
from datetime import timedelta

from .api_user_pb2 import APIUser
from .service_pb2 import (
    ActivateApiUserRequest,
    CreateApiUserRequest,
    DeactivateApiUserRequest,
    GetApiUserByKeyHashRequest,
    GetApiUserRequest,
    ListApiUsersRequest,
    ListApiUsersResponse,
    SearchApiUsersRequest,
    SearchApiUsersResponse,
)


class ApiUserService(ABC):
    """Abstract base class defining the ApiUserService interface."""

    @abstractmethod
    def get_api_user(self, request: GetApiUserRequest, timeout: timedelta | None = None) -> APIUser:
        """Get an API user by name."""
        pass

    @abstractmethod
    def create_api_user(self, request: CreateApiUserRequest, timeout: timedelta | None = None) -> APIUser:
        """Create a new API user."""
        pass

    @abstractmethod
    def list_api_users(self, request: ListApiUsersRequest, timeout: timedelta | None = None) -> ListApiUsersResponse:
        """List API users."""
        pass

    @abstractmethod
    def search_api_users(self, request: SearchApiUsersRequest, timeout: timedelta | None = None) -> SearchApiUsersResponse:
        """Search API users by display name."""
        pass

    @abstractmethod
    def activate_api_user(self, request: ActivateApiUserRequest, timeout: timedelta | None = None) -> APIUser:
        """Activate an API user."""
        pass

    @abstractmethod
    def deactivate_api_user(self, request: DeactivateApiUserRequest, timeout: timedelta | None = None) -> APIUser:
        """Deactivate an API user."""
        pass

    @abstractmethod
    def get_api_user_by_key_hash(self, request: GetApiUserByKeyHashRequest, timeout: timedelta | None = None) -> APIUser:
        """Get an API user by key hash."""
        pass
