"""Example: Revoke a role from an API user."""

from meshtrade.api.iam.api_user.v1 import (
    ApiUserService,
    RevokeRoleFromAPIUserRequest,
)
from meshtrade.api.iam.role.v1.role import full_resource_name_from_group_name
from meshtrade.api.iam.role.v1.role_pb2 import Role


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Revoke role from existing API user
        request = RevokeRoleFromAPIUserRequest(
            name="api_users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6",  # API user to revoke role from
            role=full_resource_name_from_group_name(Role.ROLE_IAM_VIEWER, service.group()),
        )

        # Call the RevokeRoleFromAPIUser method
        api_user = service.revoke_role_from_api_user(request)

        # Role has been successfully revoked
        print("Role revoked successfully:")
        print(f"  API User: {api_user.name}")
        print(f"  Display Name: {api_user.display_name}")
        print(f"  Remaining Roles: {len(api_user.roles)}")


if __name__ == "__main__":
    main()
