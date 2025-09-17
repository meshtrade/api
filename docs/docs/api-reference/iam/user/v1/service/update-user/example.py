from meshtrade.iam.user.v1 import (
    UpdateUserRequest,
    User,
    UserService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserService()

    with service:
        # Update user with modified information
        request = UpdateUserRequest(
            user=User(
                name="users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6",  # Existing user identifier
                owner="groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU",  # Owner must match current ownership
                email="sarah.t.johnson@company.com",  # Updated email address
                roles=[
                    "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU/1000000",  # ROLE_IAM_ADMIN
                    "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU/2000001",  # ROLE_TRADING_ADMIN
                    "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU/4000001",  # ROLE_COMPLIANCE_VIEWER
                ],
            )
        )

        # Call the UpdateUser method
        user = service.update_user(request)

        # Use the updated user
        print("User updated successfully:")
        print(f"  Name: {user.name}")
        print(f"  Email: {user.email}")
        print(f"  Owner: {user.owner}")
        print(f"  Roles: {user.roles}")
        print(f"User permissions updated with {len(user.roles)} active roles")


if __name__ == "__main__":
    main()
