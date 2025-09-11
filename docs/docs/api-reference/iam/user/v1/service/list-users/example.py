from meshtrade.iam.user.v1 import (
    ListUsersRequest,
    UserService,
)
from meshtrade.type.v1 import SortingOrder


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserService()

    with service:
        # Create request with optional sorting
        request = ListUsersRequest(
            sorting=ListUsersRequest.Sorting(
                field="email",  # Sort by email address
                order=SortingOrder.SORTING_ORDER_ASC,
            )
        )

        # Call the ListUsers method
        response = service.list_users(request)

        # Process the user directory
        print(f"Found {len(response.users)} users in the accessible hierarchy:")
        for i, user in enumerate(response.users):
            print(f"User {i + 1}:")
            print(f"  Name: {user.name}")
            print(f"  Email: {user.email}")
            print(f"  Owner: {user.owner}")
            print(f"  Roles: {len(user.roles)} assigned")
            print()


if __name__ == "__main__":
    main()
