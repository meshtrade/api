from meshtrade.iam.group.v1 import (
    GetGroupRequest,
    GroupService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = GroupService()

    with service:
        # Create request with group resource name
        request = GetGroupRequest(
            name="groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU"  # Group ULIDv2 identifier
        )

        # Call the GetGroup method
        group = service.get_group(request)

        # Access group details and hierarchy information
        print("Group retrieved successfully:")
        print(f"  Name: {group.name}")
        print(f"  Display Name: {group.display_name}")
        print(f"  Description: {group.description}")
        print(f"  Direct Owner: {group.owner}")
        print(f"  Full Ownership Path: {list(group.owners)}")

        # Use group information for resource ownership validation
        if len(group.owners) > 1:
            print(f"Group has {len(group.owners)} levels in the hierarchy")


if __name__ == "__main__":
    main()
