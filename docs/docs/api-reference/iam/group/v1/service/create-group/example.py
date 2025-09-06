from meshtrade.iam.group.v1 import (
    CreateGroupRequest,
    GroupService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = GroupService()

    with service:
        # Create request with service-specific parameters
        request = CreateGroupRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the CreateGroup method
        group = service.create_group(request)

        # FIXME: Add relevant response object usage
        print("CreateGroup successful:", group)


if __name__ == "__main__":
    main()
