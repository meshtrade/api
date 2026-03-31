from meshtrade.compliance.client.v1 import (
    ClientService,
    StartClientVerificationRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ClientService()

    with service:
        # Start verification for a client
        request = StartClientVerificationRequest(client="compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR")

        # Call the StartClientVerification method
        client = service.start_client_verification(request)

        print(f"Verification started, status: {client.verification_status}")


if __name__ == "__main__":
    main()
