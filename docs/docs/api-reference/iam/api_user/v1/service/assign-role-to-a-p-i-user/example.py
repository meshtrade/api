from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    AssignRoleToAPIUserRequest,
)
from meshtrade.iam.role.v1.role import full_resource_name_from_group_name
from meshtrade.iam.role.v1.role_pb2 import Role


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Assign role to existing API user
        request = AssignRoleToAPIUserRequest(
            name="api_users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6",  # API user to assign role to
            role=full_resource_name_from_group_name(Role.ROLE_IAM_VIEWER, service.group()),
        )

        # Call the AssignRoleToAPIUser method
        api_user = service.assign_role_to_a_p_i_user(request)

        # Role has been successfully assigned
        print("Role assigned successfully:")
        print(f"  API User: {api_user.name}")
        print(f"  Display Name: {api_user.display_name}")
        print(f"  Total Roles: {len(api_user.roles)}")


if __name__ == "__main__":
    main()
