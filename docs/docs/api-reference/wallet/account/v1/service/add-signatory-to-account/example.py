from meshtrade.wallet.account.v1 import (
    AccountService,
    AddSignatoryToAccountRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = AccountService()

    with service:
        # Create request with service-specific parameters
        request = AddSignatoryToAccountRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the AddSignatoryToAccount method
        response = service.add_signatory_to_account(request)

        # FIXME: Add relevant response object usage
        print("AddSignatoryToAccount successful:", response)


if __name__ == "__main__":
    main()
