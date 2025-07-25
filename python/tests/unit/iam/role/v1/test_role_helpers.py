"""Unit tests for IAM role helper functions."""


from meshtrade.iam.role.v1 import Role, full_resource_name_from_group_name


class TestRoleHelpers:
    """Test cases for role helper functions."""

    def test_full_resource_name_from_group_name_with_iam_admin(self):
        """Test full_resource_name_from_group_name with ROLE_IAM_ADMIN."""
        group_name = "groups/01DD32GZ7R0000000000000001"
        result = full_resource_name_from_group_name(Role.ROLE_IAM_ADMIN, group_name)
        expected = f"{group_name}/5"  # ROLE_IAM_ADMIN = 5
        assert result == expected

    def test_full_resource_name_from_group_name_with_iam_viewer(self):
        """Test full_resource_name_from_group_name with ROLE_IAM_VIEWER."""
        group_name = "groups/01DD32GZ7R0000000000000001"
        result = full_resource_name_from_group_name(Role.ROLE_IAM_VIEWER, group_name)
        expected = f"{group_name}/6"  # ROLE_IAM_VIEWER = 6
        assert result == expected

    def test_full_resource_name_from_group_name_with_different_roles(self):
        """Test full_resource_name_from_group_name with various roles."""
        group_name = "groups/01DD32GZ7R0000000000000001"

        test_cases = [
            (Role.ROLE_UNSPECIFIED, f"{group_name}/0"),
            (Role.ROLE_WALLET_ADMIN, f"{group_name}/1"),
            (Role.ROLE_WALLET_VIEWER, f"{group_name}/2"),
            (Role.ROLE_COMPLIANCE_ADMIN, f"{group_name}/3"),
            (Role.ROLE_COMPLIANCE_VIEWER, f"{group_name}/4"),
            (Role.ROLE_IAM_ADMIN, f"{group_name}/5"),
            (Role.ROLE_IAM_VIEWER, f"{group_name}/6"),
            (Role.ROLE_ISSUANCE_HUB_ADMIN, f"{group_name}/7"),
            (Role.ROLE_ISSUANCE_HUB_VIEWER, f"{group_name}/8"),
            (Role.ROLE_TRADING_ADMIN, f"{group_name}/9"),
            (Role.ROLE_TRADING_VIEWER, f"{group_name}/10"),
        ]

        for role, expected in test_cases:
            result = full_resource_name_from_group_name(role, group_name)
            assert result == expected, f"Failed for role {role}: expected {expected}, got {result}"

    def test_full_resource_name_from_group_name_with_different_groups(self):
        """Test full_resource_name_from_group_name with different group names."""
        test_cases = [
            ("groups/01DD32GZ7R0000000000000001", "groups/01DD32GZ7R0000000000000001/5"),
            ("groups/01DD32GZ7R0000000000000002", "groups/01DD32GZ7R0000000000000002/5"),
            ("groups/test-group", "groups/test-group/5"),
            ("", "/5"),  # Edge case: empty group name
        ]

        for group_name, expected in test_cases:
            result = full_resource_name_from_group_name(Role.ROLE_IAM_ADMIN, group_name)
            assert result == expected

    def test_full_resource_name_equivalence_with_manual_construction(self):
        """Test that helper function produces same result as manual string construction."""
        group_name = "groups/01DD32GZ7R0000000000000001"

        # Test with multiple roles
        roles = [Role.ROLE_IAM_ADMIN, Role.ROLE_IAM_VIEWER, Role.ROLE_WALLET_ADMIN]

        for role in roles:
            helper_result = full_resource_name_from_group_name(role, group_name)
            manual_result = f"{group_name}/{role}"
            assert helper_result == manual_result, f"Results differ for {role}"

    def test_function_is_exported(self):
        """Test that the helper function is properly exported."""
        from meshtrade.iam.role.v1 import full_resource_name_from_group_name

        # Function should be callable
        assert callable(full_resource_name_from_group_name)

        # Test it works when imported this way
        result = full_resource_name_from_group_name(Role.ROLE_IAM_ADMIN, "test-group")
        assert result == "test-group/5"
