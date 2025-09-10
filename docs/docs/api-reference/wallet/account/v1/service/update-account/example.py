from meshtrade.wallet.account.v1 import (
    AccountService,
    UpdateAccountRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Create request with service-specific parameters
        request = UpdateAccountRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the UpdateAccount method
        account = service.update_account(request)

        # FIXME: Add relevant response object usage
        print("UpdateAccount successful:", account)


if __name__ == "__main__":
    main()
