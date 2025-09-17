from meshtrade.iam.group.v1 import (
    CreateGroupRequest,
    Group,
    GroupService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = GroupService()

    with service:
        # Get current executing group to use as owner for the new child group
        # Note: Owner format is "groups/{ULIDv2}" (e.g. "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU")
        # but you can only create groups owned by your authenticated context

        # Create request with group configuration
        request = CreateGroupRequest(
            group=Group(
                owner=service.group(),  # Current executing group becomes the parent
                display_name="Trading Team Alpha",
                description="Primary trading team for equity markets and derivatives",
            )
        )

        # Call the CreateGroup method
        group = service.create_group(request)

        # Use the newly created group
        print("Group created successfully:")
        print(f"  Name: {group.name}")
        print(f"  Display Name: {group.display_name}")
        print(f"  Owner: {group.owner}")
        print(f"  Description: {group.description}")

        # The group can now be used to own resources and manage users
        print("Group is ready to own API users, accounts, and trading resources")


if __name__ == "__main__":
    main()
