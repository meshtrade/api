from meshtrade.compliance.client.v1 import (
    ClientService,
    FailClientVerificationRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ClientService()

    with service:
        # Fail verification with comments explaining the reason
        request = FailClientVerificationRequest(
            client="compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR",
            comments=["Missing proof of address documentation"],
        )

        # Call the FailClientVerification method
        client = service.fail_client_verification(request)

        print(f"Verification failed, status: {client.verification_status}")


if __name__ == "__main__":
    main()
