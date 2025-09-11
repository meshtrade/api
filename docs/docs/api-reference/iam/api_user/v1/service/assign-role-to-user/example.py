from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    AssignRoleToAPIUserRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Assign role to existing API user
        request = AssignRoleToAPIUserRequest(
            name="api_users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6",  # API user to assign role to
            role="groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU/1000001",  # ROLE_IAM_VIEWER
        )

        # Call the AssignRoleToUser method
        api_user = service.assign_role_to_user(request)

        # Role has been successfully assigned
        print("Role assigned successfully:")
        print(f"  API User: {api_user.name}")
        print(f"  Display Name: {api_user.display_name}")
        print(f"  Total Roles: {len(api_user.roles)}")


if __name__ == "__main__":
    main()
