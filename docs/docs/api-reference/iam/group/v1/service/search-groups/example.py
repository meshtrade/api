from meshtrade.iam.group.v1 import (
    GroupService,
    SearchGroupsRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = GroupService()

    with service:
        # Create request with service-specific parameters
        request = SearchGroupsRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the SearchGroups method
        response = service.search_groups(request)

        # FIXME: Add relevant response object usage
        print("SearchGroups successful:", response)


if __name__ == "__main__":
    main()
