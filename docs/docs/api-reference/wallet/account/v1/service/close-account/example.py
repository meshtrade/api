from meshtrade.wallet.account.v1 import (
    AccountService,
    CloseAccountRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Create request with service-specific parameters
        request = CloseAccountRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the CloseAccount method
        response = service.close_account(request)

        # FIXME: Add relevant response object usage
        print("CloseAccount successful:", response)


if __name__ == "__main__":
    main()
