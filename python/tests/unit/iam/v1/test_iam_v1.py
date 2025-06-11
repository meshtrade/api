from meshtrade.iam.v1 import Role


def test_role_creation():
    """
    Tests that an Role message can be instantiated and has the correct type.
    """
    role_name = "test-role-123"
    role = Role(name=role_name)

    assert isinstance(role, Role)

    assert role.name == role_name
