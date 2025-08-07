from meshtrade.compliance.client.v1 import (
    ClientService,
    CreateClientRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ClientService()

    with service:
        # Create request with service-specific parameters
        request = CreateClientRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the CreateClient method
        client = service.create_client(request)

        # FIXME: Add relevant response object usage
        print("CreateClient successful:", client)


if __name__ == "__main__":
    main()
