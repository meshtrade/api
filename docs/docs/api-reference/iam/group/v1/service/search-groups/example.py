from meshtrade.iam.group.v1 import (
    GroupService,
    SearchGroupsRequest,
)
from meshtrade.type.v1 import SortingOrder


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = GroupService()

    with service:
        # Create request with search criteria
        request = SearchGroupsRequest(
            display_name="trading",      # Search for groups with "trading" in display name
            description="derivatives",   # OR groups with "derivatives" in description
            sorting=SearchGroupsRequest.Sorting(
                field="display_name",
                order=SortingOrder.SORTING_ORDER_ASC
            )
        )

        # Call the SearchGroups method
        response = service.search_groups(request)

        # Process search results with OR logic
        print(f"Found {len(response.groups)} groups matching search criteria:")
        print("(Groups matching 'trading' in name OR 'derivatives' in description)")

        for i, group in enumerate(response.groups, 1):
            print(f"Result {i}:")
            print(f"  Name: {group.name}")
            print(f"  Display Name: {group.display_name}")
            print(f"  Description: {group.description}")
            print(f"  Owner: {group.owner}")
            print()

        # Use filtered results for targeted operations
        if response.groups:
            print("Search found relevant groups for specialized operations")


if __name__ == "__main__":
    main()
