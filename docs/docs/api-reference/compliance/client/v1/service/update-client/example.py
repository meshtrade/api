from meshtrade.compliance.client.v1 import (
    Client,
    ClientService,
    UpdateClientRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ClientService()

    with service:
        # Update the client's display name
        request = UpdateClientRequest(
            client=Client(
                name="compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR",
                display_name="Updated Client Name",
                short_name="UCN",
            )
        )

        # Call the UpdateClient method
        client = service.update_client(request)

        print(f"Client updated: {client.display_name}")


if __name__ == "__main__":
    main()
