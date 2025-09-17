from meshtrade.iam.user.v1 import (
    SearchUsersRequest,
    UserService,
)
from meshtrade.type.v1 import SortingOrder


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserService()

    with service:
        # Search for users by email substring
        request = SearchUsersRequest(
            email="thompson",  # Substring to search for in email addresses
            sorting=SearchUsersRequest.Sorting(
                field="email",  # Sort results by email address
                order=SortingOrder.SORTING_ORDER_ASC,
            ),
        )

        # Call the SearchUsers method
        response = service.search_users(request)

        # Process search results
        if not response.users:
            print(f"No users found matching email pattern: {request.email}")
        else:
            print(f"Found {len(response.users)} users matching '{request.email}':")
            for i, user in enumerate(response.users):
                print(f"User {i + 1}:")
                print(f"  Name: {user.name}")
                print(f"  Email: {user.email}")
                print(f"  Owner: {user.owner}")
                print(f"  Roles: {len(user.roles)} assigned")
                print()


if __name__ == "__main__":
    main()
