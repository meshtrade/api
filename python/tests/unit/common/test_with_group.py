"""
Unit tests for with_group method in Python SDK clients.

This test module verifies that the with_group method correctly creates
new client instances with different group contexts while preserving
all other configuration.
"""

from datetime import timedelta

from meshtrade.common.service_options import ServiceOptions
from meshtrade.iam.group.v1.service_meshpy import GroupService


class TestWithGroupMethod:
    """Test with_group method behavior across SDK clients."""

    def test_with_group_returns_new_instance(self):
        """Verify with_group returns a new instance, not the same object."""
        original = GroupService(
            ServiceOptions(
                url="test.example.com",
                port=443,
                api_key="test-key",
                group="groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
                timeout=timedelta(seconds=30),
                tls=True,
            )
        )

        new_client = original.with_group("groups/01BX5ZZKBKACTAV9WEVGEMMVRZ")

        assert new_client is not original

    def test_with_group_changes_group_context(self):
        """Verify with_group creates client with different group."""
        original = GroupService(
            ServiceOptions(
                url="test.example.com",
                port=443,
                api_key="test-key",
                group="groups/original-id",
                timeout=timedelta(seconds=30),
                tls=True,
            )
        )

        new_client = original.with_group("groups/new-id")

        assert new_client.group() == "groups/new-id"
        assert original.group() == "groups/original-id"

    def test_with_group_preserves_url(self):
        """Verify with_group preserves URL configuration."""
        original = GroupService(
            ServiceOptions(
                url="test.example.com",
                port=443,
                api_key="test-key",
                group="groups/original-id",
                timeout=timedelta(seconds=30),
                tls=True,
            )
        )

        new_client = original.with_group("groups/new-id")

        assert new_client.url == original.url
        assert new_client.url == "test.example.com"

    def test_with_group_preserves_port(self):
        """Verify with_group preserves port configuration."""
        original = GroupService(
            ServiceOptions(
                url="test.example.com",
                port=8443,
                api_key="test-key",
                group="groups/original-id",
                timeout=timedelta(seconds=30),
                tls=True,
            )
        )

        new_client = original.with_group("groups/new-id")

        assert new_client.port == original.port
        assert new_client.port == 8443

    def test_with_group_preserves_api_key(self):
        """Verify with_group preserves API key configuration."""
        original = GroupService(
            ServiceOptions(
                url="test.example.com",
                port=443,
                api_key="test-api-key-12345",
                group="groups/original-id",
                timeout=timedelta(seconds=30),
                tls=True,
            )
        )

        new_client = original.with_group("groups/new-id")

        assert new_client.api_key == original.api_key
        assert new_client.api_key == "test-api-key-12345"

    def test_with_group_preserves_timeout(self):
        """Verify with_group preserves timeout configuration."""
        custom_timeout = timedelta(seconds=60)
        original = GroupService(
            ServiceOptions(
                url="test.example.com",
                port=443,
                api_key="test-key",
                group="groups/original-id",
                timeout=custom_timeout,
                tls=True,
            )
        )

        new_client = original.with_group("groups/new-id")

        assert new_client.timeout == original.timeout
        assert new_client.timeout == custom_timeout

    def test_with_group_preserves_tls_setting(self):
        """Verify with_group preserves TLS configuration."""
        original = GroupService(
            ServiceOptions(
                url="test.example.com",
                port=443,
                api_key="test-key",
                group="groups/original-id",
                timeout=timedelta(seconds=30),
                tls=False,
            )
        )

        new_client = original.with_group("groups/new-id")

        assert new_client.tls == original.tls
        assert new_client.tls is False

    def test_with_group_allows_independent_usage(self):
        """Verify both original and new client can be used independently."""
        # This test verifies that both clients are truly independent
        # by checking that their configurations don't interfere with each other
        original = GroupService(
            ServiceOptions(
                url="original.example.com",
                port=443,
                api_key="original-key",
                group="groups/original-id",
                timeout=timedelta(seconds=30),
                tls=True,
            )
        )

        new_client = original.with_group("groups/new-id")

        # Verify original is unchanged
        assert original.url == "original.example.com"
        assert original.group() == "groups/original-id"
        assert original.api_key == "original-key"

        # Verify new client has new group but preserves other config
        assert new_client.url == "original.example.com"
        assert new_client.group() == "groups/new-id"
        assert new_client.api_key == "original-key"
