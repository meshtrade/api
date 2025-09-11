from meshtrade.iam.user.v1 import (
    AssignRoleToUserRequest,
    UserService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserService()

    with service:
        # Assign role to existing user
        request = AssignRoleToUserRequest(
            name="users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6",  # User to assign role to
            role="groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU/1000000",  # ROLE_IAM_ADMIN
        )

        # Call the AssignRoleToUser method
        user = service.assign_role_to_user(request)

        # Role has been successfully assigned
        print("Role assigned successfully:")
        print(f"  User: {user.name}")
        print(f"  Email: {user.email}")
        print(f"  Total Roles: {len(user.roles)}")


if __name__ == "__main__":
    main()
