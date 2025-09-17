from meshtrade.iam.group.v1 import (
    GroupService,
    ListGroupsRequest,
)
from meshtrade.type.v1 import SortingOrder


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = GroupService()

    with service:
        # Create request with optional sorting
        request = ListGroupsRequest(
            sorting=ListGroupsRequest.Sorting(
                field="display_name",  # Sort by human-readable name
                order=SortingOrder.SORTING_ORDER_ASC,
            )
        )

        # Call the ListGroups method
        response = service.list_groups(request)

        # Process the complete organizational hierarchy
        print(f"Found {len(response.groups)} groups in the accessible hierarchy:")
        for i, group in enumerate(response.groups, 1):
            print(f"Group {i}:")
            print(f"  Name: {group.name}")
            print(f"  Display Name: {group.display_name}")
            print(f"  Owner: {group.owner}")
            print(f"  Hierarchy Depth: {len(group.owners)} levels")
            if group.description:
                print(f"  Description: {group.description}")
            print()

        # Use groups for resource ownership and access control
        print("All groups are available for owning resources and managing access")


if __name__ == "__main__":
    main()
