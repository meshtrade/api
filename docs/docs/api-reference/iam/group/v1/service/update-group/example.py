from meshtrade.iam.group.v1 import (
    GetGroupRequest,
    Group,
    GroupService,
    UpdateGroupRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = GroupService()

    with service:
        # Get the existing group to update (example assumes you know the group name)
        # Note: Group names are in format "groups/{ULIDv2}" (e.g. "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU")
        # In practice, you would get this from a previous create_group call or list_groups result
        existing_group_name = "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU"  # Example group name
        existing_group = service.get_group(GetGroupRequest(name=existing_group_name))

        # Create request with complete group data (immutable fields must match existing)
        request = UpdateGroupRequest(
            group=Group(
                name=existing_group.name,        # Must match existing
                owner=existing_group.owner,      # Must match existing
                display_name="Trading Team Alpha - Updated",  # Can be modified
                description="Primary trading team specializing in equity markets, derivatives, and fixed income instruments"  # Can be modified
            )
        )

        # Call the UpdateGroup method
        group = service.update_group(request)

        # Verify the updated group information
        print("Group updated successfully:")
        print(f"  Name: {group.name} (immutable)")
        print(f"  Display Name: {group.display_name} (updated)")
        print(f"  Description: {group.description} (updated)")
        print(f"  Owner: {group.owner} (immutable)")
        print(f"  Full Ownership Path: {list(group.owners)}")

        # Updated group retains all existing relationships and permissions
        print("Group identity preserved, metadata updated successfully")


if __name__ == "__main__":
    main()
